# Pure Khetar

Farm-fresh vegetables from Kamana, Visnagar (Gujarat) — Next.js 14 · React 18 · TypeScript · Tailwind · Prisma 6.19.3 · PostgreSQL (Neon) · Auth.js v5.

## First-time setup (in this order)

```bash
npm install                      # also runs "prisma generate"
cp .env.example .env             # then fill DATABASE_URL, DIRECT_URL, AUTH_SECRET
npx prisma migrate deploy        # applies BOTH migrations (init + checkout_fields)
npm run db:seed                  # adds categories + products (safe to re-run)
npm run dev                      # http://localhost:3000
```

> Already have a `.env`? Keep it. Just make sure it has `DATABASE_URL`, `DIRECT_URL` and `AUTH_SECRET`.
> `.env` is git-ignored — never commit it.

## Folder structure

```
prisma/              schema, migrations, seed (safe: never deletes users/orders)
public/              farm photos (images/), videos + poster frames (videos/)
src/
  app/               routes only — thin files that compose components
    (store)/         shop, products/[slug], cart, checkout, account, blog, journey…
    (auth)/          login, register
    api/             auth, products (search), health
  components/
    layout/          Navbar, NavLinks, MegaMenu, MobileNav, SearchOverlay, UserMenu, Footer…
    home/            hero + home sections (FarmReels, WeeklyBasket… are lazy-loaded)
    products/        ProductCard, Grid, Filters, Gallery, PurchasePanel, AddToCartButton
    cart/  checkout/  auth/  pages/  providers/
    ui/              Button, Badge, SmartImage, LazyVideo, LazyMount, Reveal, Skeleton…
  services/          ALL database access (product, category, order, user)
  server/actions/    server actions (login, register, place order)
  lib/               constants (phone, delivery fee…), utils, pricing, auth, validations/
  data/              editable content: team, farm media, navigation, blog, seed data
  store/ hooks/ types/
```

## Where to change things

| I want to change…                    | Edit                       |
|--------------------------------------|----------------------------|
| Phone, WhatsApp, email, delivery fee | `src/lib/constants.ts`     |
| Navbar tabs / dropdowns              | `src/data/navigation.ts`   |
| Team members                         | `src/data/team.ts`         |
| Farm videos / photos                 | `src/data/farm.ts`         |
| Blog posts                           | `src/data/blog.ts`         |
| Delivery cities / slots / payment    | `src/data/checkout.ts`     |
| Products (first time)                | `src/data/products.ts` + `npm run db:seed` |
| Colors / fonts                       | `tailwind.config.ts`       |

## Lazy loading used

- Videos download only near the viewport and pause off-screen (`LazyVideo`).
- Below-the-fold sections load their JavaScript on scroll (`LazyMount` + `next/dynamic`).
- Search overlay, mobile menu and cart drawer load on first use (preloaded on hover / idle).
- Images are lazy by default with a blur placeholder (`SmartImage`); only the hero is `priority`.
- Database sections stream in behind skeletons (`Suspense`); `loading.tsx` on shop and product pages.

## Deploying (Vercel)

<<<<<<< HEAD
Add `DATABASE_URL`, `DIRECT_URL`, `AUTH_SECRET`, `NEXT_PUBLIC_SITE_URL` as environment variables.
Use a **different** `AUTH_SECRET` than your laptop. Build command is already `prisma generate && next build`.
=======
The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# Pure-Khetar
>>>>>>> 92b162cf2f90d0b1754d9132ba0a059cf0292deb
