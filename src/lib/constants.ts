/**
 * Single source of truth for brand, contact and commerce settings.
 * Change a value here and it updates everywhere (navbar, footer, WhatsApp links, checkout…).
 */

export const SITE = {
  name: 'Pure Khetar',
  shortName: 'PureKhetar',
  tagline: 'Rooted in nature, cultivated with care',
  description:
    "Fresh vegetables from Patel Sureshbhai's family farm in Kamana, Visnagar (Mehsana, Gujarat) — grown the traditional way with 50+ years of farming experience and delivered to your door.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  locale: 'en_IN',
} as const;

export const CONTACT = {
  /** Shown to customers */
  phoneDisplay: '+91 83200 19977',
  /** Digits only, with country code — used for wa.me and tel: links */
  phoneE164: '918320019977',
  email: 'hello@purekhetar.com',
  location: 'Kamana, Visnagar, Mehsana, Gujarat, India',
} as const;

export const COMMERCE = {
  currency: 'INR',
  freeDeliveryThreshold: 499,
  deliveryFee: 49,
  maxQuantityPerItem: 25,
} as const;

/** Tiny neutral blur used as <Image placeholder="blur" /> while photos load. */
export const BLUR_DATA_URL =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjEwIj48cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSIxMCIgZmlsbD0iI2U2ZTBjYyIvPjwvc3ZnPg==';

export const FALLBACK_PRODUCT_IMAGE = '/images/products/ringan.jpeg';

/** Build a wa.me link with an optional pre-filled message. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${CONTACT.phoneE164}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const telLink = `tel:+${CONTACT.phoneE164}`;
export const mailLink = `mailto:${CONTACT.email}`;
