import React from "react";
import { motion } from "framer-motion";
import { Clock, BarChart3, Search, Columns3, Share2, Database } from "lucide-react";

const FEATURES = [
  {
    icon: Clock,
    title: "AI Responder 24/7",
    desc: "Tidak pernah tidur, tidak pernah telat. Balas dalam detik, bahkan saat dini hari.",
  },
  {
    icon: BarChart3,
    title: "Lead Scoring Otomatis",
    desc: "Model AI memberi skor 0–100 per lead berdasar urgensi, budget, dan niat beli.",
  },
  {
    icon: Search,
    title: "Property Matching RAG",
    desc: "Rekomendasi unit paling cocok dengan kebutuhan lead — langsung dari katalog Anda.",
  },
  {
    icon: Columns3,
    title: "Pipeline Visual",
    desc: "Drag-and-drop Kanban dari lead masuk, kualifikasi, survey, sampai closing.",
  },
  {
    icon: Share2,
    title: "Multi-channel",
    desc: "WhatsApp Business, Instagram DM, Facebook, portal Rumah123 — satu inbox.",
  },
  {
    icon: Database,
    title: "CRM Terintegrasi",
    desc: "Histori kontak, notes, file, jadwal survei — semua tersimpan rapi per lead.",
  },
];

export default function Features() {
  return (
    <section id="fitur" className="relative section-pad" data-testid="features">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <div className="text-xs uppercase tracking-[0.25em] text-brand-gold mb-4">Fitur Unggulan</div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-tight text-brand-text">
            Semua yang dibutuhkan agency modern,
            <br className="hidden md:block" /> <span className="italic text-brand-emerald">dalam satu sistem.</span>
          </h2>
        </motion.div>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                data-testid={`feature-${i}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                whileHover={{ y: -4 }}
                className="group relative rounded-2xl border border-brand-line bg-brand-panel p-6 md:p-7 overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-emerald/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="w-11 h-11 rounded-xl bg-brand-emerald/10 border border-brand-emerald/25 flex items-center justify-center mb-5">
                  <Icon size={20} className="text-brand-emerald" />
                </div>
                <h3 className="font-display text-xl text-brand-text mb-2">{f.title}</h3>
                <p className="text-sm md:text-[15px] text-brand-mute leading-relaxed">{f.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
