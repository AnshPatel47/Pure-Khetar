import type { Metadata } from 'next';
import LoginPage from '@/components/pages/LoginPage';

export const metadata: Metadata = { title: 'Sign in', robots: { index: false } };

export default function Page({ searchParams }: { searchParams?: { callbackUrl?: string } }) {
  return <LoginPage callbackUrl={searchParams?.callbackUrl} />;
}
