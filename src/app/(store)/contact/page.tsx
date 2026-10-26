import type { Metadata } from 'next';
import { ContactPage } from '@/components/pages/ContactPage';

export const metadata: Metadata = {
  title: 'Contact the farm',
  description: 'Reach Pure Khetar on WhatsApp, phone or email, or find our farm in Kamana, Visnagar.',
};

export default function Page() {
  return <ContactPage />;
}
