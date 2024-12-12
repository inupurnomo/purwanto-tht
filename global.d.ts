import { PrismaClient } from "@prisma/client";

declare global {
  // Tambahkan properti `prisma` ke dalam globalThis
  let prisma: PrismaClient | undefined;
}