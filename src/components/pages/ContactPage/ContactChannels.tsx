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
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {channels.map(({ icon: Icon, title, value, href, external, note, primary }) => {
        const content = <><span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${primary ? 'bg-whatsapp/15 text-whatsapp-dk' : 'bg-forest/10 text-forest'}`}><Icon className="h-5 w-5" /></span><span className="min-w-0"><span className="block font-serif text-base font-bold text-forest">{title}</span><span className="mt-1 block break-words text-xs font-semibold text-forest/75">{value}</span><span className="mt-1 block text-[11px] leading-relaxed text-forest/50">{note}</span></span></>;
        const className = 'flex h-full items-start gap-3 rounded-2xl border border-sage/15 bg-white p-4 shadow-card transition hover:-translate-y-0.5 hover:shadow-card-hover';
        return <li key={title}>{href ? <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className={className}>{content}</a> : <div className={className}>{content}</div>}</li>;
      })}
    </ul>
  );
}
