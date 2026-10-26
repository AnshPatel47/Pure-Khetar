import { Mail, MapPin, MessageCircle, Phone, type LucideIcon } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { CONTACT, SITE, mailLink, telLink, whatsappLink } from '@/lib/constants';
import { PageHero } from './PageHero';

interface Channel {
  icon: LucideIcon;
  title: string;
  value: string;
  href?: string;
  external?: boolean;
  note: string;
  primary?: boolean;
}

const CHANNELS: Channel[] = [
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    value: CONTACT.phoneDisplay,
    href: whatsappLink(`Hello ${SITE.name}! I have a question.`),
    external: true,
    note: 'The fastest way to order or ask a question.',
    primary: true,
  },
  { icon: Phone, title: 'Call us', value: CONTACT.phoneDisplay, href: telLink, note: 'Speak to the farm team directly.' },
  { icon: Mail, title: 'Email', value: CONTACT.email, href: mailLink, note: 'For partnerships and longer questions.' },
  { icon: MapPin, title: 'The farm', value: CONTACT.location, note: 'Where your vegetables are grown.' },
];

export function ContactPage() {
  return (
    <>
      <PageHero
        bgImage="/images/farm/Farming.jpeg"
        eyebrow="Get in touch"
        title="Talk to the farm"
        description="Questions about an order, a crop or our farming? Reach us the way that suits you best."
      />

      <Container className="py-14">
        <ul className="grid gap-5 sm:grid-cols-2">
          {CHANNELS.map(({ icon: Icon, title, value, href, external, note, primary }) => {
            const body = (
              <>
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                    primary ? 'bg-whatsapp/15 text-whatsapp-dk' : 'bg-forest/10 text-forest'
                  }`}
                >
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <div className="min-w-0">
                  <h2 className="font-serif text-lg font-bold text-forest">{title}</h2>
                  <p className="mt-0.5 break-words text-sm font-semibold text-forest/80">{value}</p>
                  <p className="mt-1 text-sm text-forest/55">{note}</p>
                </div>
              </>
            );
            const classes =
              'flex items-start gap-4 rounded-3xl border border-sage/20 bg-white p-6 shadow-card transition-all';

            return (
              <li key={title}>
                {href ? (
                  <a
                    href={href}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className={`${classes} hover:-translate-y-0.5 hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marigold`}
                  >
                    {body}
                  </a>
                ) : (
                  <div className={classes}>{body}</div>
                )}
              </li>
            );
          })}
        </ul>

        {/* ── Google Maps Embed ── */}
        <div className="mt-14">
          <div className="mb-6 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-forest/10">
              <MapPin className="h-5 w-5 text-forest" aria-hidden />
            </span>
            <div>
              <h2 className="font-serif text-xl font-bold text-forest">Find us on the map</h2>
              <p className="text-sm text-forest/60">Kamana, Visnagar, Mehsana, Gujarat, India</p>
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl border border-sage/20 shadow-card">
            <iframe
              title="Pure Khetar farm location on Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3670.0!2d72.5!3d23.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sPure+Khetar+Farm+Kamana!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin&q=Kamana,Visnagar,Mehsana,Gujarat"
              width="100%"
              height="420"
              style={{ border: 0, display: 'block' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <p className="mt-3 text-center text-xs text-forest/50">
            View on{' '}
            <a
              href="https://maps.app.goo.gl/f4V9vf3yS3qrqEoi6?g_st=iwb"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-forest underline hover:text-terracotta"
            >
              Google Maps ↗
            </a>
          </p>
        </div>
      </Container>
    </>
  );
}
