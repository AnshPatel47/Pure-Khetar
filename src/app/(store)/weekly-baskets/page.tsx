<<<<<<< HEAD
import type { Metadata } from 'next';
import { WeeklyBasketsPage } from '@/components/pages/WeeklyBasketsPage';

export const metadata: Metadata = {
  title: 'Weekly harvest baskets',
  description: 'Weekly baskets of seasonal vegetables from our Kamana farm are opening soon. Join the waitlist.',
};

export const revalidate = 120;

export default function Page() {
  return <WeeklyBasketsPage />;
}
=======
import { ComingSoonPage } from '@/components/pages/ComingSoonPage';

export default function Page() {
  return (
    <ComingSoonPage
      title="Weekly Harvest Baskets"
      description="Our weekly basket plans are being prepared. Explore the fresh produce currently available from Kamana Farm."
    />
  );
}
>>>>>>> 92b162cf2f90d0b1754d9132ba0a059cf0292deb
