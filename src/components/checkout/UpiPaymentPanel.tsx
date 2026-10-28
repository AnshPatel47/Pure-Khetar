'use client';

import { useEffect, useMemo, useState } from 'react';
import { Clock3, QrCode } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import type { PaymentIntent } from '@/types/payment';

interface Props {
  intent: PaymentIntent;
  onCompleted?: () => void;
  onExpired?: () => void;
}

export function UpiPaymentPanel({ intent, onCompleted, onExpired }: Props) {
  const [secondsLeft, setSecondsLeft] = useState(() =>
    Math.max(0, Math.ceil((new Date(intent.expiresAt).getTime() - Date.now()) / 1000)),
  );
  const [mobile, setMobile] = useState(false);
  const merchantVpa = process.env.NEXT_PUBLIC_UPI_VPA?.trim();
  const expired = intent.status === 'EXPIRED' || intent.status === 'FAILED' || secondsLeft === 0;

  useEffect(() => setMobile(/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)), []);

  useEffect(() => {
    if (expired) return;
    const timer = window.setInterval(() => {
      const remaining = Math.max(0, Math.ceil((new Date(intent.expiresAt).getTime() - Date.now()) / 1000));
      setSecondsLeft(remaining);
      if (remaining === 0) onExpired?.();
    }, 1000);
    return () => window.clearInterval(timer);
  }, [expired, intent.expiresAt, onExpired]);

  useEffect(() => {
    if (intent.status !== 'PENDING') return;
    const source = new EventSource(`/api/payment-events?tr=${encodeURIComponent(intent.tr)}`);
    source.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data) as { type?: string };
        if (data.type === 'PAYMENT_SUCCESSFUL') onCompleted?.();
        if (data.type === 'PAYMENT_EXPIRED') onExpired?.();
      } catch { /* Ignore malformed events. */ }
    };
    return () => source.close();
  }, [intent.status, intent.tr, onCompleted, onExpired]);

  const upiUrl = useMemo(() => {
    if (!merchantVpa) return '';
    const params = new URLSearchParams({
      pa: merchantVpa,
      pn: 'Pure Khetar',
      am: intent.amount.toFixed(2),
      cu: 'INR',
      tr: intent.tr,
    });
    return `upi://pay?${params.toString()}`;
  }, [intent.amount, intent.tr, merchantVpa]);

  const launchApp = () => {
    if (expired || !upiUrl) return;
    if (!mobile) {
      document.getElementById('upi-desktop-message')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    window.location.href = upiUrl;
  };

  if (expired) {
    return <div className="mt-3 rounded-xl border border-red-200 bg-red-50 p-4 text-center text-sm font-bold text-red-700" role="alert">Payment Expired</div>;
  }

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <div className="mt-3 rounded-2xl border border-forest/15 bg-forest/5 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div><p className="text-xs font-bold uppercase tracking-wide text-forest/70">UPI Payment</p><p className="mt-1 text-sm font-bold text-forest">{formatPrice(intent.amount)}</p></div>
        <div className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-sm font-bold text-forest shadow-sm" aria-live="polite">
          <Clock3 className="h-4 w-4 text-marigold" />Time remaining to complete payment: {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
      </div>

      {!merchantVpa && <div className="mt-3 rounded-xl bg-red-50 px-3 py-2 text-xs font-semibold text-red-700">Payment is not configured. Set NEXT_PUBLIC_UPI_VPA to the verified merchant UPI ID.</div>}
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <button type="button" onClick={launchApp} disabled={!merchantVpa} className="rounded-xl bg-forest px-4 py-3 text-sm font-bold text-cream disabled:cursor-not-allowed disabled:opacity-50">Pay via Google Pay</button>
        <button type="button" onClick={launchApp} disabled={!merchantVpa} className="rounded-xl bg-[#5f259f] px-4 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50">Pay via PhonePe</button>
      </div>

      {!mobile && (
        <div id="upi-desktop-message" className="mt-4 flex items-center gap-3 rounded-xl border border-sage/20 bg-white p-3">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-dashed border-forest/30 text-forest/40"><QrCode className="h-10 w-10" /></div>
          <p className="text-xs text-forest/65"><span className="font-bold text-forest">Desktop checkout:</span> Open this checkout on mobile and tap a payment button.</p>
        </div>
      )}
      <p className="mt-3 text-xs text-forest/55">Company contact: +91 83200 19977</p>
    </div>
  );
}
