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
