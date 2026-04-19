import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function StickyMobileCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const formEl = document.getElementById("daftar");
    let formVisible = false;
    let scrollPast = false;

    const onScroll = () => {
      const p = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
      scrollPast = window.scrollY > window.innerHeight * 0.4;
      setShow(scrollPast && !formVisible && p < 0.98);
    };

    const io = formEl
      ? new IntersectionObserver(
          (entries) => {
            entries.forEach((e) => {
              formVisible = e.isIntersecting;
              onScroll();
            });
          },
          { threshold: 0.2 }
        )
      : null;
    if (io && formEl) io.observe(formEl);

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (io) io.disconnect();
    };
  }, []);

  const scrollToForm = () => {
    const el = document.getElementById("daftar");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
          className="md:hidden fixed bottom-0 left-0 right-0 z-40 safe-bottom px-4 pt-3 bg-gradient-to-t from-brand-ink via-brand-ink/95 to-transparent"
          data-testid="sticky-mobile-cta"
        >
          <button
            onClick={scrollToForm}
            data-testid="sticky-mobile-cta-btn"
            className="w-full h-[56px] rounded-full bg-brand-emerald text-white font-semibold flex items-center justify-center gap-2 shadow-[0_8px_30px_-6px_rgba(16,185,129,0.5)]"
          >
            Coba Gratis 14 Hari <ArrowRight size={18} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
