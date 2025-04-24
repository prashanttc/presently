// lib/prisma.ts
import { PrismaClient } from "@prisma/client";


// Initialize Prisma Client globally
let prisma: PrismaClient

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient()
} else {
  // In development, we use a global variable to avoid creating multiple instances
  // of Prisma Client while hot reloading.
  if (!(global as any).prisma) {
    (global as any).prisma = new PrismaClient()
  }
  prisma = (global as any).prisma
}

export default prisma
