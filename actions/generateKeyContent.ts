"use server";
import axios from "axios";

const API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn";
const API_KEY = process.env.HUGGINGFACE_API_KEY;

export async function generateKeyContent(slides: { slideNumber: number; content: string }[]) {
  try {
    const results: { slideNumber: number; keyContent: string }[] = [];

    for (const slide of slides) {
      const trimmedContent = slide.content.slice(0, 800); // ~800 chars to stay under token limit
      const prompt = `Summarize the key points of the following slide:\n\n"${trimmedContent}"`;

      const res = await axios.post(
        API_URL,
        { inputs: prompt },
        {
          headers: { Authorization: `Bearer ${API_KEY}` },
        }
      );

      const key = res.data?.[0]?.summary_text || "";
      results.push({ slideNumber: slide.slideNumber, keyContent: key });
    }

    return results;
  } catch (err) {
    console.error("Error generating slide key contents:", err);
    return [];
  }
}
