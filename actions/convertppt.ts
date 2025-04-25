"use server";

import { createClient } from "@supabase/supabase-js";

export async function convertPPTAndUpload(file: File) {
  if (!file) throw new Error("No file provided");

  const upload = new FormData();
  upload.append("ppt", file);

  const res = await fetch("https://ppt-converter.onrender.com/convert", {
    method: "POST",
    body: upload,
  });

  if (!res.ok) throw new Error("Conversion failed");

  const data = await res.json();
  const slides = data.slides as { filename: string; base64: string }[];
console.log("data",slides.map((id)=>id.filename))
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
  );

  const uploadedUrls: string[] = [];

  for (let i = 0; i < slides.length; i++) {
    const { base64, filename } = slides[i];
    const base64Data = base64.split(",")[1];
    const buffer = Buffer.from(base64Data, "base64");
    const path = `slides/${Date.now()}-${filename}`;

    const { error } = await supabase.storage
      .from("ppt-bucket")
      .upload(path, buffer, { contentType: "image/png" });

    if (error) throw error;

    uploadedUrls.push(
      `${process.env.SUPABASE_URL}/storage/v1/object/public/ppt-bucket/${path}`
    );
  }

  return uploadedUrls;
}
