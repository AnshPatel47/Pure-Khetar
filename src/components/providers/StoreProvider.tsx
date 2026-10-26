'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { MotionConfig } from 'framer-motion';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CART_STORAGE_KEY, useCartStore } from '@/store/cart.store';

/** App-wide client providers: login session, data-fetching cache and the persisted cart. */
export function StoreProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { staleTime: 60_000, refetchOnWindowFocus: false, retry: 1 } },
      }),
  );

  useEffect(() => {
    void useCartStore.persist.rehydrate();

    // Keep the cart in sync when it changes in another tab.
    const onStorage = (event: StorageEvent) => {
      if (event.key === CART_STORAGE_KEY) void useCartStore.persist.rehydrate();
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  return (
    <SessionProvider refetchOnWindowFocus={false}>
      <QueryClientProvider client={queryClient}>
        {/* Visitors who ask their device to reduce motion get fades only — no sliding or zooming. */}
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </QueryClientProvider>
    </SessionProvider>
  );
}
