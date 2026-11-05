import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin';
import { prisma } from '@/lib/prisma';
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { status } = await request.json();
  const contact = await prisma.contactSubmission.update({ where: { id: params.id }, data: { status } });
  await prisma.adminAuditLog.create({ data: { actorId: session.user.id, action: 'CONTACT_STATUS_UPDATED', entity: 'ContactSubmission', entityId: contact.id, metadata: { status } } });
  return NextResponse.json(contact);
}
