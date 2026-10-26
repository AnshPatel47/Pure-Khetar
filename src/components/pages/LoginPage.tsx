import { AuthShell } from '@/components/auth/AuthShell';
import { LoginForm } from '@/components/auth/LoginForm';
import { CONTACT, whatsappLink } from '@/lib/constants';

export default function LoginPage({ callbackUrl }: { callbackUrl?: string }) {
  return (
    <AuthShell
      title="Sign in"
      switchText="New to Pure Khetar?"
      switchLabel="Create a free account"
      switchHref="/register"
      headline={
        <>
          Welcome back
          <br />
          to the harvest.
        </>
      }
      intro="Sign in to place orders, follow your deliveries and keep your details saved for next time."
    >
      <LoginForm callbackUrl={callbackUrl} />
      <p className="text-center text-xs text-forest/55">
        Forgot your password?{' '}
        <a
          href={whatsappLink('Hello Pure Khetar! I forgot my password. Please help me get back into my account.')}
          className="font-semibold text-forest hover:text-terracotta"
        >
          Message us on WhatsApp ({CONTACT.phoneDisplay})
        </a>
      </p>
    </AuthShell>
  );
}
