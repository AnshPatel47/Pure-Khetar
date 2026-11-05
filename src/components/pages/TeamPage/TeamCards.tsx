'use client';

import { motion } from 'framer-motion';
import { Leaf, Phone } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { TEAM } from '@/data/team';

export function TeamCards() {
  return (
    <section className="py-16 sm:py-20 lg:py-28" aria-labelledby="team-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((member, i) => (
            <Reveal key={member.id} delay={i * 0.07}>
              <motion.article
                whileHover={{ y: -8 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="group relative h-full overflow-hidden rounded-[2rem] border border-sage/15 bg-white shadow-card transition-shadow hover:shadow-card-hover"
              >
                <div className={`relative aspect-[4/5] overflow-hidden bg-gradient-to-br ${member.accent}`}>
                  <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '18px 18px' }} />
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-forest/50 to-transparent" />
                  <span className="absolute inset-0 flex items-center justify-center font-serif text-7xl font-bold text-white/35 transition-transform duration-700 group-hover:scale-105">
                    {member.name.split(/\s+/).map((part) => part[0]).join('').slice(0, 3)}
                  </span>
                  <Leaf className="absolute bottom-4 right-4 h-10 w-10 text-white/25" aria-hidden />
                  {member.since && (
                    <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-white/15 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md">
                      Since {member.since}
                    </span>
                  )}
                  <span className={`absolute bottom-4 left-4 rounded-full px-3 py-1.5 text-[11px] font-bold shadow-card ${member.badgeColor}`}>
                    {member.role_detail}
                  </span>
                </div>

                <div className="flex h-full flex-col p-5 sm:p-6">
                  <h2 id={i === 0 ? 'team-heading' : undefined} className="font-serif text-xl font-bold text-forest">{member.name}</h2>
                  <p className="mt-1 text-xs font-bold uppercase tracking-wide text-terracotta">{member.role}</p>
                  <blockquote className="mt-4 border-l-2 border-marigold pl-3 text-sm italic leading-relaxed text-forest/70">
                    {member.tagline}
                  </blockquote>
                  <p className="mt-4 line-clamp-4 flex-1 text-sm leading-relaxed text-forest/60">{member.bio}</p>

                  {member.phone && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      <a href={`tel:+91${member.phone}`} className="inline-flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-full border border-forest/15 bg-forest/5 px-3 text-xs font-bold text-forest transition-colors hover:bg-forest hover:text-white">
                        <Phone className="h-3.5 w-3.5" aria-hidden /> Call
                      </a>
                      <a href={`https://wa.me/91${member.phone}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-full border border-whatsapp/30 bg-whatsapp/10 px-3 text-xs font-bold text-whatsapp-dk transition-colors hover:bg-whatsapp/20">
                        WhatsApp
                      </a>
                    </div>
                  )}
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
