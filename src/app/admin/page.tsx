import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { AdminDashboard } from '@/components/admin/AdminDashboard';

export default async function AdminPage() {
  const session = await auth();
  if (!session?.user) redirect('/admin/login');
  if (session.user.role !== 'ADMIN') redirect('/account');

  const [products, contacts, orders, categories] = await Promise.all([
    prisma.product.findMany({ where: { deletedAt: null }, include: { category: true }, orderBy: { updatedAt: 'desc' } }),
    prisma.contactSubmission.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.order.findMany({ include: { user: true, items: { include: { product: true } } }, orderBy: { createdAt: 'desc' } }),
    prisma.category.findMany({ orderBy: { name: 'asc' } }),
  ]);

  return <AdminDashboard products={products as never} contacts={contacts as never} orders={orders as never} categories={categories as never} />;
}
