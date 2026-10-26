<<<<<<< HEAD
import type { Metadata } from 'next';
import LoginPage from '@/components/pages/LoginPage';

export const metadata: Metadata = { title: 'Sign in', robots: { index: false } };

export default function Page({ searchParams }: { searchParams?: { callbackUrl?: string } }) {
  return <LoginPage callbackUrl={searchParams?.callbackUrl} />;
=======
import LoginPage from '@/components/pages/LoginPage';

export default function Page() {
  return <LoginPage />;
>>>>>>> 92b162cf2f90d0b1754d9132ba0a059cf0292deb
}
