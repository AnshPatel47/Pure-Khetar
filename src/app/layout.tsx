import type { Metadata } from 'next';
import { Fraunces, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
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
      </body>
    </html>
  );
}