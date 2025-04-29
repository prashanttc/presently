import { convertPPTAndUpload } from "@/actions/convertppt";
import { getUserIdFromSession } from "@/lib/auth";
import { processPresentationInBackground } from "@/lib/pptprocess";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const userId = await getUserIdFromSession();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Step 1. Convert PPT to images (this you should WAIT for)
    const uploadedImageUrls = await convertPPTAndUpload(file);

    // Step 2. Create Presentation and Slides with empty keyContent
    const presentation = await prisma.presentation.create({
      data: { title: "Untitled Presentation", userId },
    });

    const slidesData = uploadedImageUrls.map((url: string, index: number) => ({
      slideNumber: index + 1,
      title: `Slide ${index + 1}`, // Temp title
      content: "", // Empty content
      keycontent: "", // Empty keycontent
      imageUrl: url,
      notes: "",
      presentationId: presentation.id,
    }));

    await prisma.slide.createMany({ data: slidesData });

    // Step 3. 🔥 Launch background processing (async, don't await)
    processPresentationInBackground(file, presentation.id);

    // Step 4. ✅ Return response now (images are ready)
    return NextResponse.json({
      success: true,
      presentationId: presentation.id,
      slides: uploadedImageUrls, // front-end can show images immediately
    });
  } catch (err) {
    console.error("PPTX upload error:", err);
    return NextResponse.json(
      { error: "Failed to process file" },
      { status: 500 }
    );
  }
}
