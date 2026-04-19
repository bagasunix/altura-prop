import React from "react";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const TESTIS = [
  {
    seed: "Budi",
    name: "Budi Santoso",
    role: "Principal Altura Property Jakarta · 14 agen",
    quote:
      "Sebelumnya banyak lead masuk tapi telat direspon. Setelah pakai sistem ini, hampir semua lead langsung ke-handle. Tim jadi lebih fokus closing dibanding balas chat.",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Budi",
  },
  {
    seed: "Rina",
    name: "Rina Wijaya",
    role: "Marketing Manager Altura Property Bandung · 9 agen",
    quote:
      "Yang paling kerasa itu respons jadi cepat banget, bahkan di luar jam kerja. Banyak calon buyer yang akhirnya lanjut karena responnya nggak telat.",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Rina",
  },
  {
    seed: "Andi",
    name: "Andi Pratama",
    role: "Senior Agent Altura Property Tangerang · 7 agen",
    quote:
      "Biasanya follow up sering miss, sekarang sudah otomatis dan rapi. Saya pribadi closing lebih banyak karena nggak ada lead yang 'hilang' lagi.",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Andi",
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
                  src={t.avatar}
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
