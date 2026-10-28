'use client';

import { motion } from 'framer-motion';
import { Leaf, Phone, Mail } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { TEAM } from '@/data/team';

export function TeamCards() {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-16">
          {TEAM.map((member, i) => (
            <Reveal key={member.id} delay={i * 0.08}>
              <div className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${i % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
                {/* Photo / Avatar Card */}
                <div className={i % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="relative">
                    <motion.div
                      whileHover={{ y: -6 }}
                      transition={{ duration: 0.35 }}
                      className="relative bg-white rounded-4xl overflow-hidden shadow-organic-lg border border-sage/10"
                    >
                      <div className={`aspect-[4/3] bg-gradient-to-br ${member.accent} flex items-center justify-center relative`}>
                        <div
                          className="absolute inset-0 opacity-10"
                          style={{
                            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                            backgroundSize: '20px 20px',
                          }}
                        />
                        <span className="font-serif text-8xl font-bold text-white/30 select-none relative z-10">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                        {member.since && (
                          <div className="absolute top-4 left-4 glass border border-white/25 text-white px-3 py-1.5 rounded-full text-xs font-bold">
                            Since {member.since}
                          </div>
                        )}
                        <Leaf className="absolute bottom-4 right-4 w-12 h-12 text-white/20" />
                      </div>
                      <div className="p-5">
                        <p className="font-serif text-lg font-bold text-forest">{member.name}</p>
                        <p className="text-xs text-sage font-medium mt-0.5">{member.role}</p>
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {member.specialties.map((s) => (
                            <span key={s} className="text-[10px] bg-cream border border-sage/20 text-forest/70 px-2 py-0.5 rounded-full font-medium">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                    <div className={`absolute -top-3 -right-3 ${member.badgeColor} px-3 py-1.5 rounded-full text-[11px] font-bold shadow-card border border-white`}>
                      {member.role_detail}
                    </div>
                  </div>
                </div>

                {/* Bio Content */}
                <div className={i % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                  <blockquote className="font-serif text-lg italic text-forest/70 mb-6 border-l-4 border-marigold pl-5 leading-relaxed">
                    {member.tagline}
                  </blockquote>
                  <h2 className="font-serif text-3xl font-bold text-forest mb-2">{member.name}</h2>
                  <p className="text-sm font-semibold text-terracotta uppercase tracking-wide mb-5">{member.role}</p>
                  <p className="text-gray-600 leading-relaxed text-base">{member.bio}</p>
                  <div className="mt-6 flex items-center gap-3">
                    <a
                      href="https://wa.me/919876543210"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-semibold text-whatsapp-dk bg-whatsapp/10 border border-whatsapp/30 px-4 py-2.5 rounded-full hover:bg-whatsapp/20 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      WhatsApp
                    </a>
                    <a
                      href="mailto:hello@purekhetar.com"
                      className="flex items-center gap-1.5 text-xs font-semibold text-forest/70 bg-forest/5 border border-forest/15 px-4 py-2.5 rounded-full hover:bg-forest/10 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      Email Us
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
