<<<<<<< HEAD
import type { Metadata, Viewport } from 'next';
=======
import type { Metadata } from 'next';
>>>>>>> 92b162cf2f90d0b1754d9132ba0a059cf0292deb
import { Fraunces, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
<<<<<<< HEAD
import { CartDrawerLoader } from '@/components/cart/CartDrawerLoader';
import { StoreProvider } from '@/components/providers/StoreProvider';
import { SITE } from '@/lib/constants';

const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces', display: 'swap' });
const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-plus-jakarta', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'Pure Khetar — Farm-fresh vegetables from Kamana, Gujarat',
    template: '%s | Pure Khetar',
  },
  description: SITE.description,
  keywords: ['organic vegetables', 'Gujarat farm', 'Kamana farm', 'Visnagar', 'traditional farming', 'pure khetar'],
  openGraph: {
    title: 'Pure Khetar — Farm-fresh vegetables from Kamana, Gujarat',
    description: SITE.description,
    type: 'website',
    locale: SITE.locale,
    siteName: SITE.name,
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = {
  themeColor: '#1F4D2E',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${plusJakartaSans.variable}`}>
      <body className="flex min-h-screen flex-col bg-cream font-sans text-forest antialiased selection:bg-marigold selection:text-white">
        <a
          href="#main"
          className="sr-only z-[100] rounded-full bg-forest px-5 py-3 text-sm font-bold text-cream focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <StoreProvider>
          <Navbar />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <CartDrawerLoader />
        </StoreProvider>
=======
import { CartDrawer } from '@/components/cart/CartDrawer';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Pure Khetar — 100% Organic Farm Produce | Kamana, Gujarat',
    template: '%s | Pure Khetar',
  },
  description:
    'Directly from Patel Sureshbhai\'s organic farm in Kamana, Gujarat. 50+ years of Vedic farming — zero chemicals, lab-verified, harvested at sunrise and delivered to your door.',
  keywords: ['organic vegetables', 'Gujarat farm', 'Kamana farm', 'zero pesticide', 'vedic farming', 'A2 cow manure', 'pure khetar'],
  openGraph: {
    title: 'Pure Khetar — 100% Organic Farm Produce',
    description: 'Harvested at sunrise from Kamana farm. Zero chemicals. Delivered fresh.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${plusJakartaSans.variable}`}>
      <body className="bg-cream text-forest font-sans antialiased min-h-screen flex flex-col selection:bg-marigold selection:text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
>>>>>>> 92b162cf2f90d0b1754d9132ba0a059cf0292deb
      </body>
    </html>
  );
}