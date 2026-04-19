import React from "react";
import { motion } from "framer-motion";
import { Inbox, Brain, Handshake } from "lucide-react";

const STEPS = [
  {
    icon: Inbox,
    title: "Lead masuk dari semua channel",
    desc: "WhatsApp, Instagram DM, Facebook, Rumah123, iklan Google — semua masuk ke inbox tunggal Altura, tidak ada yang tercecer.",
  },
  {
    icon: Brain,
    title: "AI merespons & mengkualifikasi dalam detik",
    desc: "AI bahasa Indonesia natural menanyakan budget, lokasi, tipe properti, dan urgensi. Lead diberi skor otomatis.",
  },
  {
    icon: Handshake,
    title: "Agen terima lead panas siap disurvei",
    desc: "Hanya lead berkualitas tinggi yang di-assign ke agen, lengkap dengan jadwal survei yang sudah disepakati.",
  },
];

export default function HowItWorks() {
  return (
    <section id="cara-kerja" className="relative section-pad bg-[#0C0C0C] border-y border-brand-line" data-testid="how-it-works">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <div className="text-xs uppercase tracking-[0.25em] text-brand-gold mb-4">Cara Kerja</div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-tight text-brand-text">
            Tiga langkah, nol usaha manual.
          </h2>
          <p className="mt-5 text-brand-mute">
            Dari lead pertama masuk sampai survei terjadwal — Altura menjaga setiap titik kontak
            bekerja untuk Anda, bahkan saat Anda tidur.
          </p>
        </motion.div>

        <div className="mt-16 relative">
          {/* Desktop connector line */}
          <svg
            aria-hidden
            className="hidden md:block absolute top-[42px] left-[12%] right-[12%] h-[2px] w-[76%]"
            viewBox="0 0 100 2"
            preserveAspectRatio="none"
          >
            <motion.line
              x1="0" y1="1" x2="100" y2="1"
              stroke="#F5C453"
              strokeWidth="0.6"
              strokeDasharray="1.6 1.6"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.6 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1.6, ease: "easeInOut" }}
            />
          </svg>

          <div className="grid md:grid-cols-3 gap-10 md:gap-6 relative">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.title}
                  data-testid={`step-${i + 1}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: i * 0.18 }}
                  className="relative text-center md:px-4"
                >
                  <div className="relative mx-auto w-[84px] h-[84px] rounded-2xl bg-brand-panel border border-brand-line flex items-center justify-center shadow-[0_12px_32px_-12px_rgba(0,0,0,0.7)]">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-emerald/15 to-brand-gold/10 opacity-70" />
                    <Icon size={30} className="relative text-brand-gold" />
                    <span className="absolute -top-3 -right-3 font-mono text-xs px-2 py-1 rounded-full bg-brand-ink border border-brand-gold/40 text-brand-gold">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-xl md:text-[22px] text-brand-text">{s.title}</h3>
                  <p className="mt-3 text-sm md:text-[15px] text-brand-mute leading-relaxed max-w-sm mx-auto">
                    {s.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
