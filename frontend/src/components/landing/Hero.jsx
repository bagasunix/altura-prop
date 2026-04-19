import React, { useState } from "react";
import { motion } from "framer-motion";
import { PlayCircle, ArrowRight, CheckCircle2, Zap, CalendarCheck } from "lucide-react";

const HERO_IMG =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80&auto=format&fit=crop";

function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

const FloatingCard = ({ children, className, delay = 0, initial, testId }) => (
  <motion.div
    data-testid={testId}
    initial={initial}
    whileInView={{ opacity: 1, x: 0, y: 0 }}
    viewport={{ once: true, amount: 0.4 }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    className={`absolute backdrop-blur-xl bg-[#0D0D0D]/80 border border-brand-line rounded-2xl p-3 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] ${className}`}
  >
    {children}
  </motion.div>
);

export default function Hero() {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <section id="top" className="relative section-pad pt-[120px] md:pt-[140px] overflow-hidden">
      {/* Background ambience */}
      <div aria-hidden className="absolute inset-0 -z-10 opacity-[0.35] bg-grid-faint [background-size:42px_42px]" />
      <div aria-hidden className="absolute -z-10 top-[-120px] left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-brand-emerald/10 blur-[140px] rounded-full" />
      <div aria-hidden className="absolute -z-10 top-[60px] right-[-100px] w-[400px] h-[400px] bg-brand-teal/10 blur-[120px] rounded-full" />

      <div className="mx-auto max-w-7xl px-5 md:px-8 grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
        {/* LEFT: Copy */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand-line bg-white/[0.02] text-xs tracking-widest uppercase text-brand-mute"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-emerald animate-pulseDot" />
            The Future of Property is Automated
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-brand-text"
            data-testid="hero-headline"
          >
            <span className="gold-shine">37%</span> lead properti
            <br className="hidden sm:block" /> tidak pernah direspons.
            <br />
            <span className="text-brand-text/90">Altura merespons semua lead dalam</span>{" "}
            <span className="italic text-brand-emerald">18 detik</span>, 24 jam nonstop.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 max-w-xl text-base md:text-lg text-brand-mute leading-relaxed"
          >
            Sistem otomatisasi lead properti untuk agency Indonesia. AI merespons, mengkualifikasi,
            dan menjadwalkan survei secara otomatis — agen Anda fokus closing, bukan mengejar chat yang terlewat.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-8 flex flex-col sm:flex-row gap-3"
          >
            <button
              onClick={() => scrollToId("daftar")}
              data-testid="hero-primary-cta"
              className="group inline-flex items-center justify-center gap-2 h-[52px] px-6 rounded-full bg-brand-emerald text-brand-ink font-semibold hover:brightness-110 transition shadow-[0_8px_30px_-8px_rgba(16,185,129,0.55)]"
            >
              Mulai Gratis 14 Hari
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => scrollToId("cara-kerja")}
              data-testid="hero-secondary-cta"
              className="inline-flex items-center justify-center gap-2 h-[52px] px-6 rounded-full border border-brand-line bg-white/[0.02] text-brand-text hover:bg-white/[0.05] transition"
            >
              <PlayCircle size={18} className="text-brand-gold" />
              Lihat Demo
            </button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-4 text-xs text-brand-mute/80"
          >
            Tidak perlu kartu kredit · Setup 5 menit · Batalkan kapan saja
          </motion.p>
        </div>

        {/* RIGHT: Image with floating cards */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative aspect-[4/5] lg:aspect-[5/6] w-full rounded-[28px] overflow-hidden border border-brand-line bg-brand-panel"
          data-testid="hero-visual"
        >
          {!imgLoaded && <div className="absolute inset-0 skel" />}
          <img
            src={HERO_IMG}
            alt="Dashboard Altura Property memantau lead properti secara real-time"
            loading="eager"
            onLoad={() => setImgLoaded(true)}
            className={`w-full h-full object-cover transition-opacity duration-700 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/20 to-transparent" />

          <FloatingCard
            testId="floating-lead-card"
            initial={{ opacity: 0, x: 40 }}
            delay={0.7}
            className="top-6 right-6 w-[230px]"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-brand-emerald/15 border border-brand-emerald/40 flex items-center justify-center">
                <Zap size={16} className="text-brand-emerald" />
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-brand-mute">Lead baru · WhatsApp</div>
                <div className="text-sm font-medium text-brand-text">Budi Santoso</div>
              </div>
            </div>
          </FloatingCard>

          <FloatingCard
            testId="floating-survey-card"
            initial={{ opacity: 0, y: 40 }}
            delay={1.0}
            className="bottom-6 left-6 w-[240px]"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-brand-gold/15 border border-brand-gold/40 flex items-center justify-center">
                <CalendarCheck size={16} className="text-brand-gold" />
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-brand-mute">Survey terjadwal</div>
                <div className="text-sm font-medium text-brand-text">Sabtu · 10.00 WIB</div>
              </div>
            </div>
          </FloatingCard>

          <FloatingCard
            testId="floating-speed-badge"
            initial={{ opacity: 0, scale: 0.8 }}
            delay={1.2}
            className="top-1/2 -translate-y-1/2 left-6 flex items-center gap-2 px-3 py-2"
          >
            <span className="w-2 h-2 rounded-full bg-brand-emerald animate-pulseDot" />
            <span className="font-mono text-xs tracking-wider text-brand-text">
              AI respons: <span className="text-brand-emerald font-semibold">18s</span>
            </span>
          </FloatingCard>

          <FloatingCard
            testId="floating-check"
            initial={{ opacity: 0, x: -30 }}
            delay={1.4}
            className="bottom-[40%] right-8 flex items-center gap-2"
          >
            <CheckCircle2 size={16} className="text-brand-emerald" />
            <span className="text-xs text-brand-text">Kualifikasi lolos</span>
          </FloatingCard>
        </motion.div>
      </div>
    </section>
  );
}
