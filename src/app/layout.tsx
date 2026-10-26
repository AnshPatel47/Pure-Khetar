import type { Metadata, Viewport } from 'next';
import { Fraunces, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
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
      </body>
    </html>
  );
}
