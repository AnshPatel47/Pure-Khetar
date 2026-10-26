import type { Metadata } from 'next';
import { BlogPage } from '@/components/pages/BlogPage';

export const metadata: Metadata = {
  title: 'Farm journal',
  description: 'Stories, seasons and recipes from our family farm in Kamana, Gujarat.',
};

export default function Page() {
  return <BlogPage />;
}
