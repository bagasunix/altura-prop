import React from "react";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const TESTIS = [
  {
    seed: "budi",
    name: "Budi Santoso",
    role: "Principal Agency Jakarta · 12 agen",
    quote: "Dulu 60% lead tidak terfollow-up. Sekarang semua terjawab dalam detik, bahkan saat weekend.",
  },
  {
    seed: "maya",
    name: "Maya Putri",
    role: "Century 21 Partner Surabaya · 8 agen",
    quote: "Agen saya fokus ke survei, kualifikasi diurus AI sepenuhnya. Produktivitas naik dua kali lipat.",
  },
  {
    seed: "arif",
    name: "Arif Rahman",
    role: "ERA Realty Bali · 20 agen",
    quote: "ROI-nya jelas. 2 bulan sudah balik modal dari 1 deal yang sebelumnya sudah hilang.",
  },
];

export default function Testimonials() {
  return (
    <section id="testimoni" className="relative section-pad" data-testid="testimonials">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <div className="text-xs uppercase tracking-[0.25em] text-brand-gold mb-4">Testimoni</div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-tight text-brand-text">
            Cerita nyata dari agency yang <span className="italic text-brand-emerald">sudah bertransformasi</span>.
          </h2>
        </motion.div>

        <div className="mt-14 grid md:grid-cols-3 gap-5 md:gap-6">
          {TESTIS.map((t, i) => (
            <motion.figure
              key={t.seed}
              data-testid={`testimonial-${i}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              whileHover={{ y: -4 }}
              className="relative rounded-2xl border border-brand-line bg-brand-panel p-7 md:p-8 flex flex-col"
            >
              <Quote size={28} className="text-brand-gold/70 mb-5" />
              <blockquote className="font-display text-lg md:text-[22px] leading-snug text-brand-text">
                "{t.quote}"
              </blockquote>
              <div className="mt-1 flex gap-0.5 mt-6">
                {[...Array(5)].map((_, s) => (
                  <Star key={s} size={14} fill="#F5C453" className="text-brand-gold" />
                ))}
              </div>
              <figcaption className="mt-5 flex items-center gap-3 pt-5 border-t border-brand-line">
                <img
                  src={`https://api.dicebear.com/7.x/notionists/svg?seed=${t.seed}&backgroundColor=0d9488,10b981,f5c453&backgroundType=gradientLinear`}
                  alt={t.name}
                  loading="lazy"
                  className="w-11 h-11 rounded-full border border-brand-line bg-brand-panel2"
                />
                <div>
                  <div className="text-sm font-medium text-brand-text">{t.name}</div>
                  <div className="text-xs text-brand-mute">{t.role}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
