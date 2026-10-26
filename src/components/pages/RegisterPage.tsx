import { AuthShell } from '@/components/auth/AuthShell';
import { RegisterForm } from '@/components/auth/RegisterForm';

export default function RegisterPage({ callbackUrl }: { callbackUrl?: string }) {
  return (
    <AuthShell
      title="Create your account"
      switchText="Already have an account?"
      switchLabel="Sign in"
      switchHref="/login"
      headline={
        <>
          Fresh from our farm,
          <br />
          to your family.
        </>
      }
      intro="Create an account to order vegetables grown on our family farm in Kamana and follow your deliveries."
    >
      <RegisterForm callbackUrl={callbackUrl} />
    </AuthShell>
  );
}
