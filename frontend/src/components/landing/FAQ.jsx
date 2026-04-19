import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const FAQS = [
  { q: "Berapa lama proses setup?", a: "Sekitar 5 menit. Tim kami memandu live via WhatsApp atau Zoom selama setup awal — import kontak, hubungkan WhatsApp Business, dan konfigurasi alur AI." },
  { q: "Bisa integrasi dengan WhatsApp Business yang sudah ada?", a: "Ya. Altura kompatibel dengan semua nomor WhatsApp Business resmi. Anda tetap memakai nomor yang sudah dikenal klien." },
  { q: "Apakah AI bisa bicara seperti agen sungguhan?", a: "AI dilatih dengan bahasa Indonesia natural dan percakapan properti autentik. Bisa menjawab harga, menanyakan kebutuhan, mengirim foto unit, dan menjadwalkan survei." },
  { q: "Di mana data lead disimpan?", a: "Server di Indonesia (Jakarta) dengan enkripsi end-to-end dan kepatuhan UU PDP. Data hanya dapat diakses oleh tim Anda." },
  { q: "Apakah bisa dibatalkan kapan saja?", a: "Ya, tidak ada biaya penalti. Untuk paket tahunan, kami kembalikan prorata sisa bulan yang belum terpakai." },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="relative section-pad bg-brand-inkSubtle border-y border-brand-line" data-testid="faq">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="text-xs uppercase tracking-[0.25em] text-brand-gold mb-4">Pertanyaan Umum</div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-tight text-brand-text">
            Masih ragu? Ini jawabannya.
          </h2>
        </motion.div>

        <div className="mt-12 divide-y divide-brand-line border-y border-brand-line">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} data-testid={`faq-item-${i}`}>
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="w-full py-6 flex items-start justify-between gap-6 text-left min-h-[64px]"
                  aria-expanded={isOpen}
                  data-testid={`faq-toggle-${i}`}
                >
                  <span className="font-display text-lg md:text-xl text-brand-text">{f.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="shrink-0 w-9 h-9 rounded-full border border-brand-line flex items-center justify-center"
                  >
                    <Plus size={16} className="text-brand-gold" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      data-testid={`faq-answer-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pr-12 text-brand-mute leading-relaxed">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
