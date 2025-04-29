"use server";

import { getUserIdFromSession } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function getallPpt() {
  try {
    const user = await getUserIdFromSession();
    if (!user) {
      throw new Error("unauthorized");
    }
    const ppt = await prisma.presentation.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include:{
        slides:true
      }
    });
    if (ppt.length < 1) {
      throw new Error("no ppt found");
    }
    return ppt;
  } catch (error: any) {
    console.error(error.Message);
    throw new Error("internal server error");
  }
}
