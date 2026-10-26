<<<<<<< HEAD
import type { Metadata } from 'next';
import RegisterPage from '@/components/pages/RegisterPage';

export const metadata: Metadata = { title: 'Create your account', robots: { index: false } };

export default function Page({ searchParams }: { searchParams?: { callbackUrl?: string } }) {
  return <RegisterPage callbackUrl={searchParams?.callbackUrl} />;
}
=======
import { ComingSoonPage } from '@/components/pages/ComingSoonPage';

export default function Page() {
  return (
    <ComingSoonPage
      title="Create your account"
      description="Account registration is being prepared. You can still browse the harvest and place orders as a guest."
    />
  );
}
>>>>>>> 92b162cf2f90d0b1754d9132ba0a059cf0292deb
