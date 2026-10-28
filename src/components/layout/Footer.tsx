
import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, ArrowRight, Sprout } from 'lucide-react';
import { CONTACT, SITE, mailLink, whatsappLink } from '@/lib/constants';
import { Logo } from './Logo';

const FOOTER_LINKS = {
  Shop: [
    { label: 'All Produce', href: '/shop' },
    { label: 'Fresh Vegetables', href: '/shop?category=vegetables' },
    { label: 'Fruiting Veggies', href: '/shop?category=fruiting' },
  ],
  'Our Farm': [
    { label: 'Net-House Farming', href: '/our-farm#nethouse' },
    { label: 'Cow Dairy', href: '/our-farm#dairy' },
    { label: 'Lab Reports', href: '/our-farm#lab-reports' },
    { label: 'Our Journey', href: '/journey' },
  ],
  Company: [
    { label: 'Meet the Team', href: '/team' },
    { label: 'Blog & Recipes', href: '/blog' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'My Account', href: '/account' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-forest text-cream relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #E0A528 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Top CTA strip */}
      <div className="relative z-10 border-b border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
            <div>
              <p className="font-serif text-2xl font-bold text-cream">
                Ready for your morning harvest? 🌾
              </p>
              <p className="text-cream/60 text-sm mt-1">
                Delivered fresh from Kamana farm before 9 AM.
              </p>
            </div>
            <Link
              href="/shop"
              className="group flex items-center gap-2 bg-marigold text-forest px-6 py-3.5 rounded-full font-bold text-sm hover:bg-white transition-colors shadow-glow-gold flex-shrink-0"
            >
              <Sprout className="w-4 h-4" />
              Shop Fresh Harvest
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand column */}
          <div className="col-span-2">
            <Logo tone="light" showTagline className="mb-5" />
            <p className="text-cream/60 text-sm leading-relaxed mb-6 max-w-xs">
              Directly from Patel Sureshbhai&apos;s family farm in Kamana, Gujarat. 50+ years of 
              Vedic farming — zero chemicals, maximum purity.
            </p>

            {/* Contact */}
            <address className="space-y-2.5 not-italic">
              <p className="flex items-start gap-2.5 text-xs text-cream/60">
                <MapPin className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" aria-hidden />
                {CONTACT.location}
              </p>
              <a
                href={whatsappLink()}
                className="flex items-center gap-2.5 text-xs text-cream/60 hover:text-marigold transition-colors"
              >
                <Phone className="w-3.5 h-3.5" aria-hidden />
                {CONTACT.phoneDisplay} (WhatsApp)
              </a>
              <a
                href={mailLink}
                className="flex items-center gap-2.5 text-xs text-cream/60 hover:text-marigold transition-colors"
              >
                <Mail className="w-3.5 h-3.5" aria-hidden />
                {CONTACT.email}
              </a>
            </address>
          </div>

          {/* Nav columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-xs font-bold text-cream/50 uppercase tracking-widest mb-4">{title}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-cream/70 hover:text-cream hover:translate-x-1 transition-all duration-200 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 border-t border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cream/40">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved. Kamana Farm, Gujarat.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-cream/70 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-cream/70 transition-colors">Terms</Link>
            <Link href="/refund" className="hover:text-cream/70 transition-colors">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
