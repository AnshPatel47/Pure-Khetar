<<<<<<< HEAD
import type { Metadata } from 'next';
import { ContactPage } from '@/components/pages/ContactPage';

export const metadata: Metadata = {
  title: 'Contact the farm',
  description: 'Reach Pure Khetar on WhatsApp, phone or email, or find our farm in Kamana, Visnagar.',
};

export default function Page() {
  return <ContactPage />;
}
=======
import { ComingSoonPage } from '@/components/pages/ComingSoonPage';

export default function Page() {
  return (
    <ComingSoonPage
      title="Contact the Farm"
      description="Our contact page is being prepared. You can still explore and order today's harvest."
    />
  );
}
>>>>>>> 92b162cf2f90d0b1754d9132ba0a059cf0292deb
