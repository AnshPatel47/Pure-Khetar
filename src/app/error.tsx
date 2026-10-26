'use client';

import { useEffect } from 'react';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <h1 className="font-serif text-3xl font-bold text-forest">Something went wrong</h1>
      <p className="mt-3 max-w-md text-forest/65">
        We couldn&apos;t load this page. It is usually temporary — please try again.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button onClick={reset}>Try again</Button>
        <WhatsAppButton label="Order on WhatsApp instead" />
      </div>
    </Container>
  );
}
