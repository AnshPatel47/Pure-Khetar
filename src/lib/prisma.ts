import { PrismaClient } from '@prisma/client';

<<<<<<< HEAD
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

/** One PrismaClient per server process (avoids exhausting connections during hot reload). */
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
=======
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
>>>>>>> 92b162cf2f90d0b1754d9132ba0a059cf0292deb
