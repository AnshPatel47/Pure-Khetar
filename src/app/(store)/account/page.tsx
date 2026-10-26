import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { AccountPage } from '@/components/pages/AccountPage';
import { auth } from '@/lib/auth';
import { getOrdersForUser } from '@/services/order.service';
import { getUserProfile } from '@/services/user.service';

export const metadata: Metadata = { title: 'My account', robots: { index: false } };

export default async function Page() {
  const session = await auth();
  if (!session?.user?.id) redirect('/login?callbackUrl=/account');

  const [user, orders] = await Promise.all([getUserProfile(session.user.id), getOrdersForUser(session.user.id)]);
  // The account was deleted but the browser still holds an old session cookie.
  if (!user) redirect('/login');

  return <AccountPage user={user} orders={orders} />;
}
