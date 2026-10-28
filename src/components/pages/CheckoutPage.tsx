'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { AddressStep, type AddressForm } from '@/components/checkout/AddressStep';
import { CheckoutStepBar, type CheckoutStep } from '@/components/checkout/CheckoutStepBar';
import { OrderPreview } from '@/components/checkout/OrderPreview';
import { OrderSuccess } from '@/components/checkout/OrderSuccess';
import { PaymentStep, type PaymentIntent } from '@/components/checkout/PaymentStep';
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
  village: '',
  customVillage: '',
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
  const { items, totals, hydrated, clearCart, removeItem, updateQuantity, note } = useCart();

  const [step, setStep] = useState<CheckoutStep>('address');
  const [address, setAddress] = useState<AddressForm>(EMPTY_ADDRESS);
  const [slot, setSlot] = useState('morning');
  const [date, setDate] = useState('');
  const [method, setMethod] = useState<PaymentMethod>('UPI');
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState<string>();
  const [placed, setPlaced] = useState<{ orderId: string; total: number } | null>(null);
  const [paymentIntent, setPaymentIntent] = useState<PaymentIntent>();

  // Pre-fill the receiver's name from their account.
  const accountName = session?.user?.name;
  useEffect(() => {
    if (accountName) setAddress((current) => (current.name ? current : { ...current, name: accountName }));
  }, [accountName]);

  const cartReconciled = useRef(false);
  useEffect(() => {
    if (!hydrated || cartReconciled.current || items.length === 0) return;
    cartReconciled.current = true;

    void fetch('/api/cart/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids: items.map((item) => item.id) }),
    })
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((result: { products: Array<{ id: string; name: string; stock: number }> }) => {
        const liveProducts = new Map(result.products.map((product) => [product.id, product]));
        let removedCount = 0;
        for (const item of items) {
          const live = liveProducts.get(item.id);
          if (!live || live.stock <= 0) {
            removeItem(item.id);
            removedCount += 1;
          } else if (item.quantity > live.stock) {
            updateQuantity(item.id, live.stock);
          }
        }
        if (removedCount > 0) {
          setError(`${removedCount} unavailable item${removedCount === 1 ? ' was' : 's were'} removed from your crate. Please review your order.`);
        }
      })
      .catch(() => setError('We could not verify the latest product availability.'));
  }, [hydrated, items, removeItem, updateQuantity]);

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
      if (method === 'COD') {
        clearCart();
        setPlaced({ orderId: result.orderId, total: result.total });
        return;
      }

      const intentResponse = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: result.orderId }),
      });
      const intent = await intentResponse.json().catch(() => null);
      if (!intentResponse.ok || !intent?.tr) {
        setError(intent?.error ?? 'We could not start UPI payment. Please try again.');
        return;
      }
      setPaymentIntent(intent as PaymentIntent);
    } else {
      setError(result.message);
    }
  };

  if (placed) {
    return (
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
    );
  }

  return (
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
                    paymentIntent={paymentIntent}
                    onPaymentCompleted={() => {
                      if (!paymentIntent) return;
                      clearCart();
                      setPlaced({ orderId: paymentIntent.orderId, total: paymentIntent.amount });
                    }}
                    onPaymentExpired={() => {
                      setPaymentIntent((current) => current ? { ...current, status: 'EXPIRED' } : current);
                    }}
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
  );
}
