import { createClient } from "@supabase/supabase-js";
import * as fs from "fs";

export async function convertPPTAndUpload(file: File) {
  if (!file) throw new Error("No file provided");

  // Wrap the File in FormData
  const upload = new FormData();
  upload.append("ppt", file);

  // Send to the converter API
  const res = await fetch("https://ppt-converter.onrender.com/convert", {
    method: "POST",
    body: upload,
  });
  if (!res.ok) throw new Error("Conversion failed");

  const data = await res.json();
  console.log("json", data);

  // Assuming the response has 'slides' field which contains paths
  const slides = data.slides; // Now contains { filename, path }

  // Supabase upload
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
  );

  const uploadedUrls: string[] = [];

  for (let i = 0; i < slides.length; i++) {
    const imgPath = slides[i].path;

    const imgBlob = fs.readFileSync(imgPath);  // Reading the local file
    const path = `slides/${Date.now()}-${i}.png`;

    const { error } = await supabase.storage
      .from("ppt-bucket")
      .upload(path, imgBlob, { contentType: "image/png" });

    if (error) throw error;

    uploadedUrls.push(
      `${process.env.SUPABASE_URL}/storage/v1/object/public/ppt-bucket/${path}`
    );
  }

  return uploadedUrls;
}
