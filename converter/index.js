import express from "express";
import multer from "multer";
import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

const upload = multer({ dest: "/tmp/uploads" });

app.post("/convert", upload.single("ppt"), async (req, res) => {
  const inputPath = req.file.path;
  const outputDir = `/tmp/output-${uuidv4()}`;

  fs.mkdirSync(outputDir, { recursive: true });

  const convertCommand = `libreoffice --headless --convert-to png --outdir ${outputDir} ${inputPath}`;

  exec(convertCommand, (err, stdout, stderr) => {
    if (err) {
      console.error("Conversion error:", stderr);
      return res
        .status(500)
        .json({ error: "Conversion failed", details: stderr });
    }

    const images = fs
      .readdirSync(outputDir)
      .filter((file) => file.endsWith(".png"))
      .map((file) => ({
        filename: file,
        localPath: path.join(outputDir, file),
      }));

    if (!images.length) {
      return res.status(500).json({ error: "No images generated." });
    }

    // Send image paths only (not base64)
    const response = images.map(({ filename, localPath }) => ({
      filename,
      path: localPath, // Send the path for uploading to Supabase later
    }));

    // Cleanup after 10 minutes
    setTimeout(() => {
      try {
        fs.rmSync(outputDir, { recursive: true, force: true });
        console.log(`🧹 Cleaned up: ${outputDir}`);
      } catch (cleanupErr) {
        console.error(`Failed to clean up ${outputDir}:`, cleanupErr);
      }
    }, 10 * 60 * 1000); // 10 minutes

    // Remove the input file after processing
    fs.unlink(inputPath, (err) => {
      if (err)
        console.error(`❌ Failed to delete input file: ${inputPath}`, err);
      else console.log(`🧹 Deleted input file: ${inputPath}`);
    });

    res.status(200).json({ slides: response });
  });
});

app.get("/", (_, res) => res.send("PPT Converter is up!"));

app.listen(PORT, () => {
  console.log(`🚀 PPT Converter running on http://localhost:${PORT}`);
});
