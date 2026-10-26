<<<<<<< HEAD
import type { Metadata } from 'next';
import { BlogPage } from '@/components/pages/BlogPage';

export const metadata: Metadata = {
  title: 'Farm journal',
  description: 'Stories, seasons and recipes from our family farm in Kamana, Gujarat.',
};

export default function Page() {
  return <BlogPage />;
}
=======
import { ComingSoonPage } from '@/components/pages/ComingSoonPage';

export default function Page() {
  return (
    <ComingSoonPage
      title="Farm Journal"
      description="Stories, recipes, and seasonal notes from the farm are coming soon."
    />
  );
}
>>>>>>> 92b162cf2f90d0b1754d9132ba0a059cf0292deb
