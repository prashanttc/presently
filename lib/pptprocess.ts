import { parseStringPromise } from "xml2js";
import prisma from "./prisma";
import { generateKeyContent } from "@/actions/generateKeyContent";
import JSZip from "jszip";

export async function processPresentationInBackground(file: File, presentationId: string) {
    try {
      const buffer = Buffer.from(await file.arrayBuffer());
      const zip = await JSZip.loadAsync(buffer);
        
      const slideFiles = Object.keys(zip.files)
        .filter((name) => name.startsWith("ppt/slides/slide") && name.endsWith(".xml"))
        .sort();
  
      const slides = [];
      for (let i = 0; i < slideFiles.length; i++) {
        const fileName = slideFiles[i];
        const content = await zip.files[fileName].async("string");
        const parsedXml = await parseStringPromise(content);
        const shapes = parsedXml["p:sld"]?.["p:cSld"]?.[0]?.["p:spTree"]?.[0]?.["p:sp"] || [];
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
  
      for (let slide of slides) {
        const key = keyContents.find((k) => k.slideNumber === slide.slideNumber);
        await prisma.slide.updateMany({
          where: {
            presentationId,
            slideNumber: slide.slideNumber,
          },
          data: {
            title: slide.title,
            content: slide.content,
            keycontent: key?.keyContent || "",
          },
        });
      }
  
      console.log(`✅ Background processing completed for presentation ${presentationId}`);
    } catch (err) {
      console.error(`Error in background processing:`, err);
    }
  }
  