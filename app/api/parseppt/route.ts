import { NextRequest, NextResponse } from "next/server";
import JSZip from "jszip";
import { parseStringPromise } from "xml2js";
import prisma from "@/lib/prisma";
import { getUserIdFromSession } from "@/lib/auth";
import { generateKeyContent } from "@/actions/generateKeyContent";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_PROJECT_URL!,
  process.env.SUPABASE_ANON_KEY!
); 

export const config = {
  api: { bodyParser: false },
};

export async function POST(req: NextRequest) {
  try {
    const userId = await getUserIdFromSession();
    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file)
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Upload PPTX file to Supabase Storage
    const { data, error: uploadError } = await supabase.storage
      .from("ppt-bucket") // Replace with your actual storage bucket name
      .upload(`ppt-files/${file.name}`, buffer);

    if (uploadError) {
      console.error("Error uploading file to Supabase:", uploadError);
      return NextResponse.json(
        { error: "Failed to upload file to storage" },
        { status: 500 }
      );
    }

    // Get the public URL of the uploaded file
    const { data:signedURL } =  supabase.storage
      .from("ppt-bucket")
      .getPublicUrl(data?.path || "");


    const zip = await JSZip.loadAsync(buffer);
    let presentationTitle = "Untitled Presentation";
    try {
      const coreXml = await zip.file("docProps/core.xml")?.async("string");
      if (coreXml) {
        const coreProps = (await parseStringPromise(coreXml))[
          "cp:coreProperties"
        ];
        presentationTitle =
          coreProps?.["dc:title"]?.[0] || "Untitled Presentation";
      }
    } catch (e) {
      console.warn("Title read failed. Default used.");
    }

    const slides: any[] = [];
    const slideFiles = Object.keys(zip.files)
      .filter(
        (name) => name.startsWith("ppt/slides/slide") && name.endsWith(".xml")
      )
      .sort();

    for (let i = 0; i < slideFiles.length; i++) {
      const fileName = slideFiles[i];
      const content = await zip.files[fileName].async("string");
      const parsedXml = await parseStringPromise(content);
      const shapes =
        parsedXml["p:sld"]?.["p:cSld"]?.[0]?.["p:spTree"]?.[0]?.["p:sp"] || [];
      const texts = shapes.flatMap((shape: any) => {
        const paras = shape["p:txBody"]?.[0]?.["a:p"] || [];
        return paras.flatMap((p: any) =>
          (p["a:r"] || []).map((r: any) => r["a:t"]?.[0] || "").filter(Boolean)
        );
      });

      slides.push({
        slideNumber: i + 1,
        title: (texts[0] || `Slide ${i + 1}`).trim(),
        content: texts.slice(1).join(" ").replace(/\s+/g, " ").trim(),
        notes: "",
      });
    }

    const keyContents = await generateKeyContent(slides);
    slides.forEach((slide) => {
      const kc = keyContents.find((k) => k.slideNumber === slide.slideNumber);
      slide.keycontent = kc?.keyContent || "";
    });

    // Create presentation record in the database
    const presentation = await prisma.presentation.create({
      data: { title: presentationTitle, userId, fileUrl: signedURL.publicUrl },
    });

    if (presentation) {
      const slideData = slides.map((slide) => ({
        ...slide,
        presentationId: presentation.id,
      }));
      await prisma.slide.createMany({ data: slideData });
    }

    return NextResponse.json({
      success: true,
      presentationId: presentation.id,
    });
  } catch (err) {
    console.error("PPTX parse error:", err);
    return NextResponse.json(
      { error: "Failed to process file" },
      { status: 500 }
    );
  }
}
