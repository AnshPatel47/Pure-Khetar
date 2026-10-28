import { MapPin } from 'lucide-react';

export function ContactMap() {
  return (
    <section className="overflow-hidden rounded-3xl border border-sage/15 bg-white shadow-card">
      <div className="flex items-center gap-3 border-b border-sage/10 px-5 py-4">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-forest/10 text-forest"><MapPin className="h-4 w-4" /></span>
        <div><h2 className="font-serif text-lg font-bold text-forest">Visit Pure Khetar</h2><p className="text-xs text-forest/55">Kamana, Visnagar, Gujarat</p></div>
      </div>
      <a
        href="https://maps.app.goo.gl/f4V9vf3yS3qrqEoi6?g_st=iwb"
        target="_blank"
        rel="noopener noreferrer"
        className="mx-5 mt-3 inline-block text-xs font-bold text-forest underline-offset-4 hover:text-terracotta hover:underline"
      >
        Open exact location in Google Maps
      </a>
      <iframe
        title="Pure Khetar location on Google Maps"
        src="https://www.google.com/maps?q=Kamana%2C%20Visnagar%2C%20Mehsana%2C%20Gujarat&output=embed"
        width="100%"
        height="430"
        style={{ border: 0, display: 'block' }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />
    </section>
  );
}
