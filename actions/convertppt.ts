import { createClient } from "@supabase/supabase-js";
import CloudConvert from "cloudconvert";
import fs from "fs";
import path from "path";
import os from "os";
import { ReadStream } from "fs";

const cloudconvertApiKey = process.env.CLOUD_CONVERT;
if (!cloudconvertApiKey) {
  throw new Error("CloudConvert API key is not set in environment variables.");
}
const cloudconvert = new CloudConvert(cloudconvertApiKey);

export async function convertPPTAndUpload(file: File | undefined): Promise<string[]> {
  if (!file) {
    throw new Error("No file provided or file is undefined.");
  }
  if (
    file.type !==
    "application/vnd.openxmlformats-officedocument.presentationml.presentation"
  ) {
    throw new Error("Provided file is not a valid PPTX file.");
  }

  // Write the incoming File to a temp path
  const tmpDir = os.tmpdir();
  const inputPath = path.join(tmpDir, file.name);
  const buffer = await file.arrayBuffer();
  fs.writeFileSync(inputPath, Buffer.from(buffer));

  try {
    // 1. Create the job with an import/upload task
    const job = await cloudconvert.jobs.create({
      tasks: {
        "import-file": {
          operation: "import/upload"
        },
        "convert": {
          operation: "convert",
          input: ["import-file"],
          output_format: "png"
        },
        "export-url": {
          operation: "export/url",
          input: ["convert"]
        }
      }
    });

    // 2. Upload the PPTX to the import/upload task
    const importTask = job.tasks.find((t: any) => t.name === "import-file");
    if (!importTask) throw new Error("CloudConvert import task not found.");

    await cloudconvert.tasks.upload(importTask as any, fs.createReadStream(inputPath) as ReadStream, file.name);

    // 3. Wait for the entire job (all tasks) to complete
    const completedJob = await cloudconvert.jobs.wait(job.id);

    // 4. Find the export-url task and pull the file URLs
    const exportTask = completedJob.tasks.find((t: any) => t.name === "export-url");
    if (!exportTask || !exportTask.result || !exportTask.result.files?.length) {
      throw new Error("Conversion failed: No exported files.");
    }
    const filesOut = exportTask.result.files as Array<{ url: string; filename: string }>;

    // 5. Initialize Supabase and upload each PNG
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_ANON_KEY!
    );
    const uploadedUrls: string[] = [];

    for (let i = 0; i < filesOut.length; i++) {
      const f = filesOut[i];
      if (!f.url) throw new Error(`No URL for slide ${i}`);

      const res = await fetch(f.url);
      if (!res.ok) throw new Error(`Failed to download slide ${i}: ${res.statusText}`);
      const blob = await res.blob();

      const objectPath = `slides/${Date.now()}-${i}.png`;
      const { error } = await supabase.storage
        .from("ppt-bucket")
        .upload(objectPath, blob, { contentType: "image/png" });
      if (error) throw new Error(`Upload to Supabase failed: ${error.message}`);

      uploadedUrls.push(
        `${process.env.SUPABASE_URL}/storage/v1/object/public/ppt-bucket/${objectPath}`
      );
    }

    return uploadedUrls;
  } finally {
    // Always clean up the temp file
    try {
      fs.unlinkSync(inputPath);
    } catch (e) {
      console.warn("Could not delete temp file:", inputPath, e);
    }
  }
}
