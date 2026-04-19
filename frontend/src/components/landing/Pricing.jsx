import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";

const TIERS = [
  {
    id: "starter",
    name: "Starter",
    priceMonthly: 1900000,
    subtitle: "Agency kecil · 1–3 agen",
    features: [
      "200 lead/bulan",
      "WhatsApp + 1 channel",
      "AI Responder 24/7",
      "Lead scoring dasar",
      "Email support",
    ],
    badge: null,
  },
  {
    id: "growth",
    name: "Growth",
    priceMonthly: 3900000,
    subtitle: "Agency berkembang · 5–10 agen",
    features: [
      "500 lead/bulan",
      "Semua channel (IG, FB, portal)",
      "AI Matching RAG",
      "Pipeline Visual (Kanban)",
      "Priority support",
      "Analytics dashboard",
    ],
    badge: "Paling Populer",
    featured: true,
  },
  {
    id: "pro",
    name: "Pro",
    priceMonthly: 7900000,
    subtitle: "Agency besar · Unlimited agen",
    features: [
      "Lead unlimited",
      "White-label branding",
      "API akses penuh",
      "Dedicated account manager",
      "Custom integrations",
      "SLA 99.9% uptime",
    ],
    badge: null,
  },
];

function formatRp(n) {
  return "Rp " + n.toLocaleString("id-ID");
}

function scrollToForm(plan) {
  const el = document.getElementById("daftar");
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    window.dispatchEvent(new CustomEvent("altura:select-plan", { detail: plan }));
  }
}

export default function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="harga" className="relative section-pad" data-testid="pricing">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <div className="text-xs uppercase tracking-[0.25em] text-brand-gold mb-4">Paket Harga</div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-tight text-brand-text">
            Pilih skala yang tepat, tanpa biaya tersembunyi.
          </h2>
          <p className="mt-4 text-brand-mute">14 hari gratis di semua paket. Batalkan kapan saja.</p>
        </motion.div>

        {/* Toggle */}
        <div className="mt-10 flex items-center justify-center gap-3" data-testid="pricing-toggle">
          <span className={`text-sm ${!yearly ? "text-brand-text" : "text-brand-mute"}`}>Bulanan</span>
          <button
            onClick={() => setYearly((v) => !v)}
            aria-pressed={yearly}
            className="relative w-[60px] h-[32px] rounded-full border border-brand-line bg-brand-panel p-1 min-h-[44px] md:min-h-0"
            data-testid="pricing-toggle-btn"
          >
            <motion.span
              layout
              className="block w-[24px] h-[24px] rounded-full bg-brand-emerald"
              animate={{ x: yearly ? 28 : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </button>
          <span className={`text-sm flex items-center gap-2 ${yearly ? "text-brand-text" : "text-brand-mute"}`}>
            Tahunan
            <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-brand-gold/15 text-brand-gold border border-brand-gold/30">
              Hemat 20%
            </span>
          </span>
        </div>

        {/* Cards */}
        <div className="mt-12 grid md:grid-cols-3 gap-5 md:gap-6 items-stretch">
          {TIERS.map((t, i) => {
            const price = yearly ? Math.round(t.priceMonthly * 0.8) : t.priceMonthly;
            const isFeatured = t.featured;
            return (
              <motion.div
                key={t.id}
                data-testid={`pricing-card-${t.id}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className={`relative rounded-2xl p-7 md:p-8 flex flex-col ${
                  isFeatured
                    ? "border-2 border-brand-gold bg-gradient-to-b from-brand-gold/[0.06] to-brand-panel shadow-[0_20px_60px_-30px_rgba(245,196,83,0.35)]"
                    : "border border-brand-line bg-brand-panel"
                }`}
              >
                {t.badge && (
                  <div
                    data-testid={isFeatured ? "pricing-popular-badge" : `pricing-badge-${t.id}`}
                    className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold text-white dark:text-brand-ink text-[11px] font-semibold tracking-wide uppercase"
                  >
                    <Sparkles size={12} /> {t.badge}
                  </div>
                )}

                <h3 className="font-display text-2xl text-brand-text">{t.name}</h3>
                <p className="text-sm text-brand-mute mt-1">{t.subtitle}</p>

                <div className="mt-6 flex items-end gap-2">
                  <motion.div
                    key={price}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    data-testid={`pricing-price-${t.id}`}
                    className="font-mono text-3xl md:text-4xl text-brand-text"
                  >
                    {formatRp(price)}
                  </motion.div>
                  <div className="text-sm text-brand-mute mb-1.5">/bulan</div>
                </div>
                {yearly && (
                  <div className="mt-1 text-xs text-brand-emerald">
                    Hemat {formatRp(t.priceMonthly - price)} / bulan · ditagih tahunan
                  </div>
                )}

                <ul className="mt-7 space-y-3">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-brand-text/90">
                      <Check size={16} className={isFeatured ? "text-brand-gold mt-0.5 shrink-0" : "text-brand-emerald mt-0.5 shrink-0"} />
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => scrollToForm(t.name)}
                  data-testid={`pricing-cta-${t.id}`}
                  className={`mt-8 h-[48px] rounded-full font-semibold text-sm transition ${
                    isFeatured
                      ? "bg-brand-gold text-white dark:text-brand-ink hover:brightness-110"
                      : "border border-brand-line text-brand-text hover:bg-brand-panel2"
                  }`}
                >
                  Coba Gratis 14 Hari
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
