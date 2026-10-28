export interface PaymentIntent {
  tr: string;
  orderId: string;
  amount: number;
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'EXPIRED';
  expiresAt: string;
}
