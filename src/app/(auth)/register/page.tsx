import type { Metadata } from 'next';
import RegisterPage from '@/components/pages/RegisterPage';

export const metadata: Metadata = { title: 'Create your account', robots: { index: false } };

export default function Page({ searchParams }: { searchParams?: { callbackUrl?: string } }) {
  return <RegisterPage callbackUrl={searchParams?.callbackUrl} />;
}
