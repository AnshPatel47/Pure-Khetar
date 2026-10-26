'use client';

import { useFormStatus } from 'react-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

/** Submit button that shows a spinner while the server action is running. */
export function SubmitButton({ children, pendingLabel }: { children: string; pendingLabel: string }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" size="lg" fullWidth loading={pending} rightIcon={<ArrowRight className="h-4 w-4" aria-hidden />}>
      {pending ? pendingLabel : children}
    </Button>
  );
}
