// inside /api/transcribe/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;
const api = process.env.ASSEMBLY_API!   
  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  try {
    // 1. Upload audio file to AssemblyAI
    const uploadResponse = await fetch("https://api.assemblyai.com/v2/upload", {
      method: "POST",
      headers: {
        authorization: api,
      },
      body: buffer,
    });

    const uploadData = await uploadResponse.json();
    const audioUrl = uploadData.upload_url; // 🔥 Now we have audio URL!

    // 2. Request transcription
    const transcriptResponse = await fetch("https://api.assemblyai.com/v2/transcript", {
      method: "POST",
      headers: {
        authorization: api,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        audio_url: audioUrl,
      }),
    });

    const transcriptData = await transcriptResponse.json();
    const transcriptId = transcriptData.id;

    // 3. Polling for transcript completion (because it takes a few seconds)
    let completedTranscript;
    while (true) {
      const pollingRes = await fetch(`https://api.assemblyai.com/v2/transcript/${transcriptId}`, {
        method: "GET",
        headers: {
          authorization:api,
        },
      });
      const pollingData = await pollingRes.json();

      if (pollingData.status === "completed") {
        completedTranscript = pollingData;
        break;
      } else if (pollingData.status === "failed") {
        throw new Error("Transcription failed");
      }

      await new Promise((resolve) => setTimeout(resolve, 3000)); // wait 3 seconds before polling again
    }

    return NextResponse.json({ text: completedTranscript.text });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Transcription failed" }, { status: 500 });
  }
}
  