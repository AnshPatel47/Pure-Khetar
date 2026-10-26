<<<<<<< HEAD
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { SmartImage } from '@/components/ui/SmartImage';
import { BLOG_POSTS } from '@/data/blog';
import { formatDate } from '@/lib/utils';

interface PostPageProps {
  params: { slug: string };
}

export const dynamicParams = false;

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: PostPageProps): Metadata {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  return post ? { title: post.title, description: post.excerpt } : { title: 'Story not found' };
}

export default function BlogPostPage({ params }: PostPageProps) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) notFound();

  return (
    <Container as="article" className="max-w-3xl py-12">
      <Link href="/blog" className="mb-8 inline-flex items-center gap-1.5 text-sm font-semibold text-forest/70 hover:text-forest">
        <ArrowLeft className="h-4 w-4" aria-hidden /> All stories
      </Link>
      <p className="text-sm font-semibold text-sage">
        {formatDate(post.date)} · {post.author}
      </p>
      <h1 className="mt-2 font-serif text-4xl font-bold leading-tight text-forest text-balance sm:text-5xl">{post.title}</h1>
      {post.image && (
        <div className="relative my-8 aspect-[16/10] overflow-hidden rounded-3xl">
          <SmartImage src={post.image} alt="" fill priority sizes="(min-width: 768px) 768px, 100vw" className="object-cover" />
        </div>
      )}
      <div className="mt-8 space-y-5 text-lg leading-relaxed text-forest/80">
        {post.body.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </Container>
  );
}
=======
import { ComingSoonPage } from '@/components/pages/ComingSoonPage';

export default function Page() {
  return (
    <ComingSoonPage
      title="Farm Journal"
      description="This story is being prepared. Browse the current harvest while you wait."
    />
  );
}
>>>>>>> 92b162cf2f90d0b1754d9132ba0a059cf0292deb
