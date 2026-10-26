'use client';

<<<<<<< HEAD
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { AddressStep, type AddressForm } from '@/components/checkout/AddressStep';
import { CheckoutStepBar, type CheckoutStep } from '@/components/checkout/CheckoutStepBar';
import { OrderPreview } from '@/components/checkout/OrderPreview';
import { OrderSuccess } from '@/components/checkout/OrderSuccess';
import { PaymentStep } from '@/components/checkout/PaymentStep';
import { SlotStep } from '@/components/checkout/SlotStep';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { DELIVERY_CITIES } from '@/data/checkout';
import { useCart } from '@/hooks/useCart';
import { placeOrderAction } from '@/server/actions/order.actions';
import type { CheckoutInput } from '@/lib/validations/checkout.schema';
import type { PaymentMethod } from '@/types/order';

const STEP_TITLES: Record<CheckoutStep, string> = {
  address: '📍 Delivery address',
  slot: '⏰ Choose a delivery window',
  payment: '💳 Payment',
};

const EMPTY_ADDRESS: AddressForm = {
  name: '',
  phone: '',
  address: '',
  area: '',
  city: DELIVERY_CITIES[0],
  pincode: '',
  landmark: '',
};

const slideVariants = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
};

export default function CheckoutPage() {
  const { data: session } = useSession();
  const { items, totals, hydrated, clearCart, note } = useCart();

  const [step, setStep] = useState<CheckoutStep>('address');
  const [address, setAddress] = useState<AddressForm>(EMPTY_ADDRESS);
  const [slot, setSlot] = useState('morning');
  const [date, setDate] = useState('');
  const [method, setMethod] = useState<PaymentMethod>('UPI');
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState<string>();
  const [placed, setPlaced] = useState<{ orderId: string; total: number } | null>(null);

  // Pre-fill the receiver's name from their account.
  const accountName = session?.user?.name;
  useEffect(() => {
    if (accountName) setAddress((current) => (current.name ? current : { ...current, name: accountName }));
  }, [accountName]);

  const handlePlace = async () => {
    setError(undefined);
    setPlacing(true);

    const result = await placeOrderAction({
      items: items.map((item) => ({ productId: item.id, quantity: item.quantity })),
      shipping: { ...address, landmark: address.landmark || undefined },
      deliverySlot: slot as CheckoutInput['deliverySlot'],
      deliveryDate: date,
      paymentMethod: method,
      note: note || undefined,
    }).catch(() => ({ ok: false as const, message: 'Something went wrong. Please try again.' }));

    setPlacing(false);
    if (result.ok) {
      clearCart();
      setPlaced({ orderId: result.orderId, total: result.total });
    } else {
      setError(result.message);
    }
=======
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check, ChevronRight, Sprout, MapPin, Clock,
  CreditCard, Smartphone, Banknote, Truck, ShieldCheck,
  ArrowLeft, Leaf
} from 'lucide-react';
import { useCartStore } from '@/store/cart.store';

/* ─── Types ─────────────────────────────────────────────────────────── */
type Step = 'address' | 'slot' | 'payment';

/* ─── Step indicator ────────────────────────────────────────────────── */
const STEPS: { id: Step; label: string; icon: React.ReactNode }[] = [
  { id: 'address', label: 'Delivery', icon: <MapPin className="w-4 h-4" /> },
  { id: 'slot', label: 'Time Slot', icon: <Clock className="w-4 h-4" /> },
  { id: 'payment', label: 'Payment', icon: <CreditCard className="w-4 h-4" /> },
];

function StepBar({ current }: { current: Step }) {
  const idx = STEPS.findIndex((s) => s.id === current);
  return (
    <div className="flex items-center gap-0">
      {STEPS.map((step, i) => {
        const done = i < idx;
        const active = i === idx;
        return (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                  done
                    ? 'bg-forest text-cream'
                    : active
                    ? 'bg-marigold text-forest shadow-glow-gold'
                    : 'bg-sage/15 text-sage'
                }`}
              >
                {done ? <Check className="w-4 h-4" /> : step.icon}
              </div>
              <span className={`text-[11px] font-semibold ${active ? 'text-forest' : 'text-gray-400'}`}>
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-0.5 mx-2 mb-5 transition-colors duration-300 ${i < idx ? 'bg-forest' : 'bg-sage/20'}`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

/* ─── Address Step ──────────────────────────────────────────────────── */
function AddressStep({ onNext }: { onNext: () => void }) {
  const [form, setForm] = useState({
    name: '', phone: '', address: '', area: '', city: 'Ahmedabad', pincode: '', landmark: '',
  });

  const handleChange = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const inputCls = 'w-full bg-cream border border-sage/20 rounded-2xl px-4 py-3.5 text-sm text-forest placeholder-gray-400 outline-none focus:border-forest/50 focus:ring-2 focus:ring-forest/10 transition-all';
  const labelCls = 'block text-xs font-semibold text-forest/70 mb-1.5 uppercase tracking-wide';

  return (
    <motion.div
      key="address"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.35 }}
      className="space-y-5"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Full Name *</label>
          <input className={inputCls} placeholder="Ramesh Patel" value={form.name} onChange={handleChange('name')} />
        </div>
        <div>
          <label className={labelCls}>Phone *</label>
          <input className={inputCls} placeholder="98765 43210" type="tel" value={form.phone} onChange={handleChange('phone')} />
        </div>
      </div>

      <div>
        <label className={labelCls}>House / Flat / Building *</label>
        <input className={inputCls} placeholder="B-204, Shanti Heights" value={form.address} onChange={handleChange('address')} />
      </div>

      <div>
        <label className={labelCls}>Area / Street *</label>
        <input className={inputCls} placeholder="Satellite Road, Near Jodhpur Circle" value={form.area} onChange={handleChange('area')} />
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label className={labelCls}>City</label>
          <select className={inputCls} value={form.city} onChange={handleChange('city')}>
            {['Ahmedabad', 'Gandhinagar', 'Anand', 'Nadiad', 'Vadodara'].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelCls}>Pincode *</label>
          <input className={inputCls} placeholder="380015" maxLength={6} value={form.pincode} onChange={handleChange('pincode')} />
        </div>
        <div>
          <label className={labelCls}>State</label>
          <input className={inputCls} value="Gujarat" readOnly />
        </div>
      </div>

      <div>
        <label className={labelCls}>Landmark (optional)</label>
        <input className={inputCls} placeholder="Near ISKCON temple" value={form.landmark} onChange={handleChange('landmark')} />
      </div>

      <button
        onClick={onNext}
        disabled={!form.name || !form.phone || !form.address || !form.area || !form.pincode}
        className="w-full flex items-center justify-center gap-2 bg-forest text-cream py-4 rounded-2xl font-bold text-sm hover:bg-forest-l transition-colors shadow-organic disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-organic-lg hover:-translate-y-0.5 transition-all duration-300"
      >
        Continue to Time Slot
        <ChevronRight className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

/* ─── Time Slot Step ────────────────────────────────────────────────── */
const SLOTS = [
  { id: 'morning', label: 'Morning Harvest', time: '6 AM – 9 AM', desc: 'Freshest possible — picked at sunrise', emoji: '🌅', premium: true },
  { id: 'noon', label: 'Mid-Morning', time: '9 AM – 12 PM', desc: 'Still fresh from this morning\'s harvest', emoji: '☀️', premium: false },
  { id: 'evening', label: 'Afternoon', time: '3 PM – 6 PM', desc: 'Same-day harvest, cooled for freshness', emoji: '🌿', premium: false },
];

function SlotStep({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [selected, setSelected] = useState('morning');
  const [date, setDate] = useState('');

  return (
    <motion.div
      key="slot"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.35 }}
      className="space-y-5"
    >
      <div>
        <label className="block text-xs font-semibold text-forest/70 mb-1.5 uppercase tracking-wide">Delivery Date *</label>
        <input
          type="date"
          value={date}
          min={new Date(Date.now() + 86400000).toISOString().split('T')[0]}
          onChange={(e) => setDate(e.target.value)}
          className="w-full bg-cream border border-sage/20 rounded-2xl px-4 py-3.5 text-sm text-forest outline-none focus:border-forest/50 focus:ring-2 focus:ring-forest/10 transition-all"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-forest/70 mb-3 uppercase tracking-wide">Preferred Time Window</label>
        <div className="space-y-3">
          {SLOTS.map((slot) => (
            <label key={slot.id} className="cursor-pointer block">
              <input
                type="radio"
                name="slot"
                value={slot.id}
                checked={selected === slot.id}
                onChange={() => setSelected(slot.id)}
                className="sr-only"
              />
              <div className={`relative flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-200 ${
                selected === slot.id
                  ? 'border-forest bg-forest/5 shadow-organic'
                  : 'border-sage/15 bg-white hover:border-sage/40'
              }`}>
                <span className="text-2xl">{slot.emoji}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-forest">{slot.label}</p>
                    {slot.premium && (
                      <span className="text-[10px] bg-marigold text-forest px-2 py-0.5 rounded-full font-bold">Recommended</span>
                    )}
                  </div>
                  <p className="text-xs font-semibold text-sage">{slot.time}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">{slot.desc}</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                  selected === slot.id ? 'border-forest bg-forest' : 'border-sage/30'
                }`}>
                  {selected === slot.id && <Check className="w-3 h-3 text-cream" />}
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="flex items-center gap-2 border border-sage/25 text-forest px-5 py-3.5 rounded-2xl font-semibold text-sm hover:bg-cream transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!date}
          className="flex-1 flex items-center justify-center gap-2 bg-forest text-cream py-3.5 rounded-2xl font-bold text-sm hover:bg-forest-l transition-all shadow-organic disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 hover:shadow-organic-lg"
        >
          Continue to Payment
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}

/* ─── Payment Step ──────────────────────────────────────────────────── */
const PAYMENT_METHODS = [
  { id: 'upi', icon: <Smartphone className="w-5 h-5" />, label: 'UPI / GPay / PhonePe', sub: 'Instant, no charges', recommended: true },
  { id: 'cod', icon: <Banknote className="w-5 h-5" />, label: 'Cash on Delivery', sub: 'Pay when produce arrives', recommended: false },
  { id: 'card', icon: <CreditCard className="w-5 h-5" />, label: 'Credit / Debit Card', sub: 'All major cards accepted', recommended: false },
];

function PaymentStep({ onBack, total }: { onBack: () => void; total: number }) {
  const [method, setMethod] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [placing, setPlacing] = useState(false);
  const [placed, setPlaced] = useState(false);

  const handlePlace = () => {
    setPlacing(true);
    setTimeout(() => { setPlacing(false); setPlaced(true); }, 2000);
>>>>>>> 92b162cf2f90d0b1754d9132ba0a059cf0292deb
  };

  if (placed) {
    return (
<<<<<<< HEAD
      <Container>
        <OrderSuccess orderId={placed.orderId} total={placed.total} />
      </Container>
    );
  }

  if (!hydrated) {
    return (
      <Container className="max-w-5xl space-y-6 py-12" aria-busy>
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-96 w-full" />
      </Container>
    );
  }

  if (items.length === 0) {
    return (
      <Container className="flex min-h-[50vh] max-w-lg flex-col items-center justify-center gap-4 py-20 text-center">
        <span className="text-5xl" aria-hidden>🧺</span>
        <h1 className="font-serif text-2xl font-bold text-forest">Your crate is empty</h1>
        <p className="text-sm text-forest/60">Add something fresh from the farm before checking out.</p>
        <Button href="/shop">Explore the harvest</Button>
      </Container>
=======
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12 space-y-5"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
          className="w-20 h-20 bg-forest rounded-full flex items-center justify-center mx-auto shadow-organic-lg"
        >
          <Check className="w-10 h-10 text-cream" />
        </motion.div>
        <div>
          <h2 className="font-serif text-2xl font-bold text-forest">Order Placed! 🌾</h2>
          <p className="text-gray-500 text-sm mt-2 max-w-sm mx-auto">
            Patel Sureshbhai will harvest your produce fresh tomorrow morning and dispatch by 6 AM.
          </p>
        </div>
        <div className="bg-marigold/10 border border-marigold/25 rounded-2xl px-5 py-3 inline-block">
          <p className="text-sm font-bold text-forest">Order #PK{Math.floor(Math.random() * 9000 + 1000)}</p>
          <p className="text-xs text-sage">Track via WhatsApp — we&apos;ll message you</p>
        </div>
        <Link href="/shop" className="inline-flex items-center gap-2 bg-forest text-cream px-7 py-4 rounded-full font-bold text-sm hover:bg-forest-l transition-colors shadow-organic">
          <Sprout className="w-4 h-4" />
          Continue Shopping
        </Link>
      </motion.div>
>>>>>>> 92b162cf2f90d0b1754d9132ba0a059cf0292deb
    );
  }

  return (
<<<<<<< HEAD
    <div className="bg-cream">
      <div className="border-b border-sage/10 bg-white">
        <Container className="max-w-5xl py-6">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="font-serif text-xl font-bold text-forest">Checkout</h1>
            <Link href="/cart" className="flex items-center gap-1.5 text-xs font-semibold text-forest/60 transition-colors hover:text-forest">
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
              Back to cart
            </Link>
          </div>
          <CheckoutStepBar current={step} />
        </Container>
      </div>

      <Container className="max-w-5xl py-10">
        <div className="grid items-start gap-8 lg:grid-cols-5">
          <section className="rounded-3xl border border-sage/10 bg-white p-6 shadow-card sm:p-8 lg:col-span-3" aria-labelledby="step-title">
            <h2 id="step-title" className="mb-6 font-serif text-xl font-bold text-forest">
              {STEP_TITLES[step]}
            </h2>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={step} variants={slideVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
                {step === 'address' && <AddressStep value={address} onChange={setAddress} onNext={() => setStep('slot')} />}
                {step === 'slot' && (
                  <SlotStep
                    slot={slot}
                    date={date}
                    onSlotChange={setSlot}
                    onDateChange={setDate}
                    onNext={() => setStep('payment')}
                    onBack={() => setStep('address')}
                  />
                )}
                {step === 'payment' && (
                  <PaymentStep
                    method={method}
                    onMethodChange={setMethod}
                    total={totals.total}
                    placing={placing}
                    error={error}
                    onPlace={handlePlace}
                    onBack={() => setStep('slot')}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </section>

          <div className="lg:sticky lg:top-24 lg:col-span-2">
            <OrderPreview items={items} totals={totals} />
          </div>
        </div>
      </Container>
    </div>
=======
    <motion.div
      key="payment"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.35 }}
      className="space-y-5"
    >
      {/* Payment methods */}
      <div>
        <label className="block text-xs font-semibold text-forest/70 mb-3 uppercase tracking-wide">Payment Method</label>
        <div className="space-y-3">
          {PAYMENT_METHODS.map((pm) => (
            <label key={pm.id} className="cursor-pointer block">
              <input
                type="radio"
                name="payment"
                value={pm.id}
                checked={method === pm.id}
                onChange={() => setMethod(pm.id)}
                className="sr-only"
              />
              <div className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-200 ${
                method === pm.id ? 'border-forest bg-forest/5' : 'border-sage/15 bg-white hover:border-sage/40'
              }`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${method === pm.id ? 'bg-forest text-cream' : 'bg-sage/10 text-forest'}`}>
                  {pm.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-forest">{pm.label}</p>
                    {pm.recommended && <span className="text-[10px] bg-sage/20 text-forest px-2 py-0.5 rounded-full font-bold">Popular</span>}
                  </div>
                  <p className="text-xs text-gray-400">{pm.sub}</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${method === pm.id ? 'border-forest bg-forest' : 'border-sage/30'}`}>
                  {method === pm.id && <Check className="w-3 h-3 text-cream" />}
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* UPI ID input */}
      <AnimatePresence>
        {method === 'upi' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <label className="block text-xs font-semibold text-forest/70 mb-1.5 uppercase tracking-wide">Your UPI ID</label>
            <input
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              placeholder="yourname@upi"
              className="w-full bg-cream border border-sage/20 rounded-2xl px-4 py-3.5 text-sm text-forest placeholder-gray-400 outline-none focus:border-forest/50 focus:ring-2 focus:ring-forest/10 transition-all"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Security note */}
      <div className="flex items-start gap-2.5 text-xs text-gray-500 bg-sage/5 rounded-2xl p-4 border border-sage/10">
        <ShieldCheck className="w-4 h-4 text-sage flex-shrink-0 mt-0.5" />
        <p>Your payment information is encrypted and never stored on our servers. Pure Khetar never charges you before delivery.</p>
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="flex items-center gap-2 border border-sage/25 text-forest px-5 py-3.5 rounded-2xl font-semibold text-sm hover:bg-cream transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <motion.button
          onClick={handlePlace}
          disabled={placing}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="flex-1 flex items-center justify-center gap-2 bg-forest text-cream py-3.5 rounded-2xl font-bold text-sm hover:bg-forest-l transition-all shadow-organic hover:shadow-organic-lg disabled:opacity-70"
        >
          {placing ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-4 h-4 border-2 border-cream/30 border-t-cream rounded-full"
              />
              Placing Order…
            </>
          ) : (
            <>
              Place Order · ₹{total.toFixed(0)}
              <Leaf className="w-4 h-4" />
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────── */
export default function CheckoutPage() {
  const [step, setStep] = useState<Step>('address');
  const { items, subtotal } = useCartStore();

  const deliveryFee = subtotal() >= 499 ? 0 : 49;
  const total = subtotal() + deliveryFee;

  const goTo = (s: Step) => setStep(s);

  return (
    <main className="bg-cream min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-sage/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <Link href="/" className="font-serif text-xl font-bold text-forest">
              Pure <span className="text-terracotta">Khetar</span>
            </Link>
            <Link href="/cart" className="text-xs font-semibold text-forest/60 hover:text-forest transition-colors flex items-center gap-1.5">
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Cart
            </Link>
          </div>
          <StepBar current={step} />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-5 gap-8 items-start">

          {/* ── Form Area ── */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl border border-sage/10 shadow-card p-6 sm:p-8">
              <h2 className="font-serif text-xl font-bold text-forest mb-6">
                {step === 'address' && '📍 Delivery Address'}
                {step === 'slot' && '⏰ Choose Delivery Window'}
                {step === 'payment' && '💳 Payment'}
              </h2>

              <AnimatePresence mode="wait">
                {step === 'address' && (
                  <AddressStep key="address" onNext={() => goTo('slot')} />
                )}
                {step === 'slot' && (
                  <SlotStep key="slot" onNext={() => goTo('payment')} onBack={() => goTo('address')} />
                )}
                {step === 'payment' && (
                  <PaymentStep key="payment" onBack={() => goTo('slot')} total={total} />
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ── Order Preview ── */}
          <div className="lg:col-span-2 sticky top-24">
            <div className="bg-white rounded-3xl border border-sage/10 shadow-card overflow-hidden">
              <div className="bg-forest px-5 py-4">
                <h3 className="font-serif text-base font-bold text-cream flex items-center gap-2">
                  <Sprout className="w-4 h-4 text-marigold" />
                  Order Preview
                </h3>
              </div>

              <div className="p-5 space-y-4">
                {/* Items list */}
                <div className="space-y-3">
                  {items.slice(0, 3).map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-cream flex-shrink-0 border border-sage/10">
                        <Image
                          src={item.image || '/images/products/ringan.jpeg'}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-forest truncate">{item.name}</p>
                        <p className="text-[10px] text-gray-400">× {item.quantity} {item.unit}</p>
                      </div>
                      <p className="text-xs font-bold text-forest">₹{(item.price * item.quantity).toFixed(0)}</p>
                    </div>
                  ))}
                  {items.length > 3 && (
                    <p className="text-xs text-sage text-center">+{items.length - 3} more items</p>
                  )}
                </div>

                <div className="h-px bg-sage/10" />

                {/* Totals */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-500">
                    <span>Subtotal</span>
                    <span>₹{subtotal().toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Delivery</span>
                    <span className={deliveryFee === 0 ? 'text-sage font-semibold' : ''}>
                      {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                    </span>
                  </div>
                  <div className="h-px bg-sage/10" />
                  <div className="flex justify-between font-bold text-forest text-base">
                    <span>Total</span>
                    <span className="font-serif text-lg">₹{total.toFixed(0)}</span>
                  </div>
                </div>

                {/* Trust */}
                <div className="bg-sage/5 rounded-2xl p-3.5 border border-sage/10 flex items-center gap-2.5">
                  <Truck className="w-4 h-4 text-forest flex-shrink-0" />
                  <p className="text-[11px] text-gray-600 font-medium">
                    🌿 Morning harvest delivered before 9 AM. 100% freshness or full refund.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
>>>>>>> 92b162cf2f90d0b1754d9132ba0a059cf0292deb
  );
}
