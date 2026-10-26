import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { SITE } from './constants';

/** Merge conditional class names and resolve Tailwind conflicts. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

const inrWhole = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});
const inrFraction = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** ₹45 for whole amounts, ₹45.50 when there are paise. */
export function formatPrice(amount: number): string {
  return Number.isInteger(amount) ? inrWhole.format(amount) : inrFraction.format(amount);
}

export function formatDate(date: Date | string | number): string {
  return new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(
    new Date(date),
  );
}

export function absoluteUrl(path = '/'): string {
  return new URL(path, SITE.url).toString();
}

/**
 * Returns a safe, same-site path to redirect to after sign-in.
 * Auth.js hands us an absolute URL (http://host/checkout), so we accept an absolute URL only
 * when its host is in `allowedHosts`, and we return just the path — never another site.
 */
export function safeRedirectPath(input: unknown, fallback = '/', allowedHosts: (string | null | undefined)[] = []): string {
  if (typeof input !== 'string' || input === '') return fallback;

  if (input.startsWith('/')) {
    return input.startsWith('//') || input.startsWith('/\\') ? fallback : input;
  }

  try {
    const url = new URL(input);
    if (allowedHosts.includes(url.host)) return `${url.pathname}${url.search}` || fallback;
  } catch {
    /* not a URL */
  }
  return fallback;
}

/** First value of a Next.js searchParams entry. */
export function firstParam(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}
