'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useCartStore } from '@/store/cart.store';

const loadDrawer = () => import('./CartDrawer').then((m) => m.CartDrawer);
const CartDrawer = dynamic(loadDrawer, { ssr: false });

/**
 * Keeps the drawer's code out of the initial page load. It is fetched while the browser
 * is idle (so the first click feels instant) and mounted the first time the cart opens.
 */
export function CartDrawerLoader() {
  const isOpen = useCartStore((state) => state.isOpen);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isOpen) setMounted(true);
  }, [isOpen]);

  useEffect(() => {
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 2000));
    const handle = idle(() => void loadDrawer());
    return () => {
      if (window.cancelIdleCallback && typeof handle === 'number') window.cancelIdleCallback(handle);
    };
  }, []);

  return mounted ? <CartDrawer /> : null;
}
