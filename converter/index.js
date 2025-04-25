import express from 'express';
import multer from 'multer';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

const upload = multer({ dest: '/tmp/uploads' });

app.post('/convert', upload.single('ppt'), async (req, res) => {
  const inputPath = req.file.path;
  const outputDir = `/tmp/output-${uuidv4()}`;

  fs.mkdirSync(outputDir, { recursive: true });

  const convertCommand = `libreoffice --headless --convert-to png --outdir ${outputDir} ${inputPath}`;

  exec(convertCommand, (err, stdout, stderr) => {
    if (err) {
      console.error('Conversion error:', stderr);
      return res.status(500).json({ error: 'Conversion failed', details: stderr });
    }

    // Log the stdout and stderr to understand the conversion result
    console.log('stdout:', stdout);
    console.error('stderr:', stderr);

    // Ensure all the generated images are listed
    const images = fs
      .readdirSync(outputDir)
      .filter((file) => file.endsWith('.png'))
      .map((file) => ({
        filename: file,
        localPath: path.join(outputDir, file),
      }));

    console.log("images found:", images.map((img) => img.filename));  // Debug log

    if (!images.length) {
      return res.status(500).json({ error: 'No images generated.' });
    }

    // Send base64 image previews (optional, or send image paths for storage)
    const response = images.map(({ filename, localPath }) => {
      const base64 = fs.readFileSync(localPath, { encoding: 'base64' });
      return {
        filename,
        base64: `data:image/png;base64,${base64}`,
      };
    });

    return res.status(200).json({ slides: response });
  });
});

app.get('/', (_, res) => res.send('PPT Converter is up!'));

app.listen(PORT, () => {
  console.log(`🚀 PPT Converter running on http://localhost:${PORT}`);
});
