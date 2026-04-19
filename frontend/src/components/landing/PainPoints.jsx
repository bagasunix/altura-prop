import React from "react";
import { motion } from "framer-motion";
import { Clock, Filter, AlertTriangle, TrendingUp } from "lucide-react";

const PAINS = [
  {
    icon: Clock,
    title: "Respons Lambat",
    body: "Lead bertanya jam 11 malam, agen baru balas jam 9 pagi. 10 jam senyap cukup untuk membuat prospek pindah ke kompetitor.",
  },
  {
    icon: Filter,
    title: "Kualifikasi Manual",
    body: "40% waktu agen habis menyortir lead serius dari window-shopper. Energi yang seharusnya untuk closing, terbuang di scroll chat.",
  },
  {
    icon: AlertTriangle,
    title: "Lead Bocor",
    body: "37% lead dari portal seperti Rumah123 tidak pernah terfollow-up. Setiap lead yang hilang adalah komisi yang menguap.",
  },
];

export default function PainPoints() {
  return (
    <section className="relative section-pad" data-testid="pain-points">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <div className="text-xs uppercase tracking-[0.25em] text-brand-gold mb-4">Masalahnya</div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-tight text-brand-text">
            Agen properti kehilangan deal bukan karena <span className="italic text-brand-gold">kurang kerja keras</span>.
          </h2>
          <p className="mt-5 text-brand-mute max-w-2xl">
            Tiga kebocoran paling mahal di industri properti Indonesia — dan mengapa kerja keras saja
            tidak cukup untuk menutupnya.
          </p>
        </motion.div>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {PAINS.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.article
                key={p.title}
                data-testid={`pain-card-${i}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                whileHover={{ y: -4 }}
                className="relative rounded-2xl border border-brand-line bg-brand-panel p-7 overflow-hidden group"
              >
                <div className="absolute -top-20 -right-20 w-52 h-52 bg-brand-emerald/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="w-11 h-11 rounded-xl border border-brand-line bg-white/[0.03] flex items-center justify-center mb-5">
                  <Icon size={20} className="text-brand-gold" />
                </div>
                <h3 className="font-display text-xl text-brand-text mb-3">{p.title}</h3>
                <p className="text-sm md:text-[15px] leading-relaxed text-brand-mute">{p.body}</p>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="mt-12 flex items-center gap-4 p-5 md:p-6 rounded-2xl border border-brand-gold/25 bg-gradient-to-r from-brand-gold/[0.06] to-transparent"
          data-testid="pain-callout"
        >
          <div className="w-11 h-11 rounded-full bg-brand-gold/15 border border-brand-gold/40 flex items-center justify-center shrink-0">
            <TrendingUp size={20} className="text-brand-gold" />
          </div>
          <p className="text-sm md:text-base text-brand-text">
            Lead yang direspons dalam <span className="font-semibold text-brand-gold">&lt; 5 menit</span> memiliki
            kemungkinan closing <span className="font-mono text-brand-gold">21×</span> lebih tinggi.
            <span className="text-brand-mute"> — Harvard Business Review</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
