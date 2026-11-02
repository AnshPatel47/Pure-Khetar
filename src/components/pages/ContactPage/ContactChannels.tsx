import Image from 'next/image';
import { Mail, MapPin, MessageCircle, Phone, type LucideIcon } from 'lucide-react';
import { CONTACT, SITE, mailLink, telLink, whatsappLink } from '@/lib/constants';

interface Channel { icon: LucideIcon; title: string; value: string; href?: string; external?: boolean; note: string; primary?: boolean }

const channels: Channel[] = [
  { icon: MessageCircle, title: 'WhatsApp', value: CONTACT.phoneDisplay, href: whatsappLink(`Hello ${SITE.name}! I have a question.`), external: true, note: 'Fastest for orders and quick questions.', primary: true },
  { icon: Phone, title: 'Call us', value: CONTACT.phoneDisplay, href: telLink, note: 'Speak directly with the farm team.' },
  { icon: Mail, title: 'Email', value: CONTACT.email, href: mailLink, note: 'For partnerships and detailed enquiries.' },
  { icon: MapPin, title: 'The farm', value: CONTACT.location, note: 'Kamana village, Visnagar taluka.' },
];

export function ContactChannels() {
  return (
    <div className="space-y-6">
    <div className="grid items-center gap-5 rounded-3xl border border-sage/20 bg-white p-5 shadow-card sm:grid-cols-[1fr_180px]">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-sage">Community</p>
        <h2 className="mt-2 font-serif text-2xl font-bold text-forest">Join the Pure Khetar WhatsApp group</h2>
        <p className="mt-2 text-sm leading-relaxed text-forest/65">Scan the QR code for fresh-harvest updates, farm news and order support.</p>
      </div>
      <div className="relative mx-auto aspect-square w-40 overflow-hidden rounded-2xl border border-sage/20 bg-cream">
        <Image src="/images/wp_group/WP_Group_QR.jpeg" alt="Scan to join the Pure Khetar WhatsApp group" fill sizes="160px" className="object-contain p-2" />
      </div>
    </div>
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {channels.map(({ icon: Icon, title, value, href, external, note, primary }) => {
        const content = <><span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${primary ? 'bg-whatsapp/15 text-whatsapp-dk' : 'bg-forest/10 text-forest'}`}><Icon className="h-5 w-5" /></span><span className="min-w-0"><span className="block font-serif text-base font-bold text-forest">{title}</span><span className="mt-1 block break-words text-xs font-semibold text-forest/75">{value}</span><span className="mt-1 block text-[11px] leading-relaxed text-forest/50">{note}</span></span></>;
        const className = 'flex h-full items-start gap-3 rounded-2xl border border-sage/15 bg-white p-4 shadow-card transition hover:-translate-y-0.5 hover:shadow-card-hover';
        return <li key={title}>{href ? <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className={className}>{content}</a> : <div className={className}>{content}</div>}</li>;
      })}
    </ul>
    </div>
  );
}
