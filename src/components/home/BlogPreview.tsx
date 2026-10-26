import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SmartImage } from '@/components/ui/SmartImage';
import { BLOG_POSTS } from '@/data/blog';
import { formatDate } from '@/lib/utils';

/** Latest stories. Renders nothing until real posts are added to data/blog.ts. */
export function BlogPreview() {
  const posts = [...BLOG_POSTS].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <Container as="section" className="py-16 lg:py-24">
      <SectionHeading
        title="From the farm journal"
        description="Stories, seasons and recipes from Kamana."
        action={{ label: 'All stories', href: '/blog' }}
        className="mb-10"
      />
      <ul className="grid gap-6 md:grid-cols-3">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="group block">
              {post.image && (
                <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-2xl">
                  <SmartImage
                    src={post.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}
              <p className="text-xs font-semibold text-sage">{formatDate(post.date)}</p>
              <h3 className="mt-1 font-serif text-xl font-bold text-forest transition-colors group-hover:text-terracotta">
                {post.title}
              </h3>
              <p className="mt-1.5 line-clamp-2 text-sm text-forest/65">{post.excerpt}</p>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
