"use server"
import { getUserIdFromSession } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function getCurrentppt(id: string) {
  try {
    const userId = await getUserIdFromSession();
    if (!userId) {
      throw new Error("unauthenticated");
    }
    const presentation = await prisma.presentation.findUnique({
      where: {
        id,
      },
      include:{
        slides:true
      }
    });
    if (!presentation) {
      throw new Error("no presentation found");
    }
    const slides = presentation.slides
    return slides;
  } catch (error: any) {
    console.error(error.message || "something went wrong");
    throw new Error(error.message || "internal server error");
  }
}
