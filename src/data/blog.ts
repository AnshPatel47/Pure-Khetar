export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  /** ISO date, e.g. "2026-10-14" */
  date: string;
  author: string;
  image?: string;
  /** One string per paragraph. */
  body: string[];
}

/**
 * Add real stories here — the blog list, post pages, sitemap and the home-page
 * preview all pick them up automatically. While this list is empty, the blog
 * shows a friendly "coming soon" state instead of fake articles.
 */
export const BLOG_POSTS: BlogPost[] = [];
