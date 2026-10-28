type PaymentListener = (message: string) => void;

const listeners = new Set<PaymentListener>();

export function subscribeToPaymentEvents(listener: PaymentListener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function broadcastPaymentEvent(message: string) {
  for (const listener of listeners) listener(message);
}
