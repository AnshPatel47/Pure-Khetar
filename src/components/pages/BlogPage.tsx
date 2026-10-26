import Link from 'next/link';
import { PenLine } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { SmartImage } from '@/components/ui/SmartImage';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { BLOG_POSTS } from '@/data/blog';
import { formatDate } from '@/lib/utils';
import { PageHeader } from './PageHeader';

export function BlogPage() {
  const posts = [...BLOG_POSTS].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <PageHeader
        title="Farm journal"
        description="Stories, seasons and recipes from our family farm in Kamana."
      />
      <Container className="py-14">
        {posts.length === 0 ? (
          <div className="mx-auto max-w-lg rounded-3xl border border-sage/20 bg-white px-6 py-14 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-forest/10 text-forest">
              <PenLine className="h-6 w-6" aria-hidden />
            </div>
            <h2 className="font-serif text-2xl font-bold text-forest">Our first stories are coming</h2>
            <p className="mt-2 text-sm text-forest/65">
              We are writing about the farm, the seasons and what to cook with them. Until then, see what is fresh today.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button href="/shop">Browse produce</Button>
              <WhatsAppButton label="Ask us anything" />
            </div>
          </div>
        ) : (
          <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  {post.image && (
                    <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-2xl">
                      <SmartImage
                        src={post.image}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <p className="text-xs font-semibold text-sage">
                    {formatDate(post.date)} · {post.author}
                  </p>
                  <h2 className="mt-1 font-serif text-xl font-bold text-forest transition-colors group-hover:text-terracotta">
                    {post.title}
                  </h2>
                  <p className="mt-1.5 line-clamp-3 text-sm text-forest/65">{post.excerpt}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </>
  );
}
