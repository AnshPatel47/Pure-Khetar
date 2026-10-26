import { Banknote, Smartphone, type LucideIcon } from 'lucide-react';

/** Cities we currently deliver to — edit this list as delivery expands. */
export const DELIVERY_CITIES = ['Ahmedabad', 'Gandhinagar', 'Anand', 'Nadiad', 'Vadodara'] as const;

export const DELIVERY_SLOTS_INFO = [
  { id: 'morning', label: 'Morning Harvest', time: '6 AM – 9 AM', desc: 'Freshest possible — picked at sunrise', emoji: '🌅', recommended: true },
  { id: 'noon', label: 'Mid-Morning', time: '9 AM – 12 PM', desc: "Still fresh from this morning's harvest", emoji: '☀️', recommended: false },
  { id: 'evening', label: 'Afternoon', time: '3 PM – 6 PM', desc: 'Same-day harvest, cooled for freshness', emoji: '🌿', recommended: false },
] as const;

export interface PaymentOption {
  id: 'COD' | 'UPI';
  icon: LucideIcon;
  label: string;
  sub: string;
  recommended?: boolean;
}

export const PAYMENT_OPTIONS: PaymentOption[] = [
  { id: 'UPI', icon: Smartphone, label: 'UPI on delivery', sub: 'Scan and pay with GPay, PhonePe or any UPI app', recommended: true },
  { id: 'COD', icon: Banknote, label: 'Cash on delivery', sub: 'Pay in cash when your produce arrives' },
];
