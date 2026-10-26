import { MessageCircle } from 'lucide-react';
import { Button } from './Button';
import { whatsappLink } from '@/lib/constants';
import type { ComponentProps } from 'react';

interface WhatsAppButtonProps {
  message?: string;
  label?: string;
  size?: ComponentProps<typeof Button>['size'];
  className?: string;
  fullWidth?: boolean;
}

/** "Chat / order on WhatsApp" button with an optional pre-filled message. */
export function WhatsAppButton({
  message,
  label = 'Chat on WhatsApp',
  size = 'md',
  className,
  fullWidth,
}: WhatsAppButtonProps) {
  return (
    <Button
      href={whatsappLink(message)}
      variant="whatsapp"
      size={size}
      fullWidth={fullWidth}
      className={className}
      leftIcon={<MessageCircle className="h-4 w-4" aria-hidden />}
    >
      {label}
    </Button>
  );
}
