import { prisma } from '@/lib/prisma';

export function getUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export function getUserProfile(id: string) {
  return prisma.user.findUnique({
    where: { id },
    select: { id: true, name: true, email: true, phone: true, role: true, createdAt: true },
  });
}

export function createUser(data: { name: string; email: string; phone?: string; passwordHash: string }) {
  return prisma.user.create({
    data: { name: data.name, email: data.email, phone: data.phone, password: data.passwordHash },
    select: { id: true, name: true, email: true },
  });
}
