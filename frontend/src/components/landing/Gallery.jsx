import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=75&auto=format&fit=crop",
    area: "Menteng, Jakarta",
    type: "Town House",
  },
  {
    src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=75&auto=format&fit=crop",
    area: "Kemang, Jakarta",
    type: "Apartment Studio",
  },
  {
    src: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=75&auto=format&fit=crop",
    area: "BSD, Tangerang",
    type: "Modern House",
  },
  {
    src: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=75&auto=format&fit=crop",
    area: "Seminyak, Bali",
    type: "Pool Villa",
  },
  {
    src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=75&auto=format&fit=crop",
    area: "Dago, Bandung",
    type: "Family House",
  },
  {
    src: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=1200&q=75&auto=format&fit=crop",
    area: "Pakuwon, Surabaya",
    type: "Premium Residence",
  },
];

function Card({ img, index, onOpen }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <motion.button
      onClick={() => onOpen(index)}
      data-testid={`gallery-item-${index}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.08 }}
      whileHover={{ y: -4 }}
      className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-brand-line bg-brand-panel text-left"
    >
      {!loaded && <div className="absolute inset-0 skel" />}
      <img
        src={img.src}
        alt={`${img.type} — ${img.area}`}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${loaded ? "opacity-100" : "opacity-0"}`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <div className="text-[11px] uppercase tracking-[0.2em] text-brand-gold">{img.type}</div>
        <div className="font-display text-lg md:text-xl text-white mt-1">{img.area}</div>
      </div>
    </motion.button>
  );
}

export default function Gallery() {
  const [open, setOpen] = useState(null);
  return (
    <section className="relative section-pad bg-brand-inkSubtle border-y border-brand-line" data-testid="gallery">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.25em] text-brand-gold mb-4">Portofolio</div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-tight text-brand-text">
              Properti yang dijual agency Altura
            </h2>
          </div>
          <p className="text-brand-mute max-w-md text-sm md:text-base">
            Sistem kami telah membantu closing ratusan unit — dari town house kota sampai villa pantai premium.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {IMAGES.map((img, i) => (
            <Card key={img.src} img={img} index={i} onOpen={setOpen} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            data-testid="gallery-lightbox"
          >
            <motion.img
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              src={IMAGES[open].src}
              alt={`${IMAGES[open].type} — ${IMAGES[open].area}`}
              className="max-h-[85vh] max-w-[92vw] rounded-2xl border border-brand-line"
            />
            <button
              onClick={() => setOpen(null)}
              data-testid="gallery-close"
              className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/10 border border-brand-line flex items-center justify-center"
              aria-label="Tutup"
            >
              <X size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
