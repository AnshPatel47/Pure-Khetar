import Link from 'next/link';
import type { ReactNode } from 'react';
import { Leaf, MessageCircle, PackageCheck, ShieldCheck, Sprout } from 'lucide-react';
import { Logo } from '@/components/layout/Logo';
import { SmartImage } from '@/components/ui/SmartImage';

const POINTS = [
  { icon: PackageCheck, text: 'Track your orders in one place' },
  { icon: ShieldCheck, text: 'Your data is never shared or sold' },
  { icon: MessageCircle, text: 'Direct WhatsApp support from the farm team' },
];

const STATS = [
  { num: '50+', label: 'Years of farming' },
  { num: '1', label: 'Family farm, Kamana' },
  { num: '0', label: 'Middlemen' },
];

interface AuthShellProps {
  title: string;
  switchText: string;
  switchLabel: string;
  switchHref: string;
  headline: ReactNode;
  intro: string;
  children: ReactNode;
}

/** Shared split-screen layout for sign in and register. */
export function AuthShell({ title, switchText, switchLabel, switchHref, headline, intro, children }: AuthShellProps) {
  return (
    <div className="flex min-h-[calc(100vh-72px)] bg-cream">
      <aside className="relative hidden flex-col justify-between overflow-hidden lg:flex lg:w-1/2">
        <div className="absolute inset-0">
          <SmartImage
            src="/images/farm/nethouse-farming.jpeg"
            alt=""
            fill
            priority
            sizes="50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-forest/95 via-forest/80 to-forest/55" />
        </div>

        <div className="relative z-10 p-10">
          <Logo tone="light" />
        </div>

        <div className="relative z-10 space-y-6 p-10">
          <p className="glass inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs font-bold text-marigold">
            <Sprout className="h-3.5 w-3.5" aria-hidden />
            Kamana Farm · Gujarat
          </p>
          <h2 className="font-serif text-4xl font-bold leading-tight text-cream">{headline}</h2>
          <p className="max-w-sm text-base leading-relaxed text-cream/70">{intro}</p>
          <ul className="space-y-3 pt-2">
            {POINTS.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3 text-sm text-cream/80">
                <Icon className="h-4 w-4 text-marigold" aria-hidden />
                {text}
              </li>
            ))}
          </ul>
        </div>

        <dl className="relative z-10 grid grid-cols-3 gap-6 border-t border-white/10 p-10">
          {STATS.map(({ num, label }) => (
            <div key={label}>
              <dd className="font-serif text-2xl font-bold text-marigold">{num}</dd>
              <dt className="mt-0.5 text-[11px] font-medium text-cream/55">{label}</dt>
            </div>
          ))}
        </dl>
      </aside>

      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-md animate-fade-in space-y-8">
          <div className="flex justify-center lg:hidden">
            <span className="flex items-center gap-2 font-serif text-xl font-bold text-forest">
              <Leaf className="h-5 w-5 text-terracotta" aria-hidden /> Pure Khetar
            </span>
          </div>

          <div>
            <h1 className="font-serif text-3xl font-bold text-forest">{title}</h1>
            <p className="mt-1.5 text-sm text-forest/60">
              {switchText}{' '}
              <Link href={switchHref} className="font-semibold text-forest transition-colors hover:text-terracotta">
                {switchLabel}
              </Link>
            </p>
          </div>

          {children}

          <p className="text-center text-[11px] leading-relaxed text-forest/45">
            We use your details only to deliver your orders. Pure Khetar never shares your data.
          </p>
        </div>
      </div>
    </div>
  );
}
