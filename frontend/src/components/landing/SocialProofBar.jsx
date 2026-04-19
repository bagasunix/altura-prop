import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

function useCounter(target, { duration = 1800, decimals = 0 } = {}) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.4, once: true });

  useEffect(() => {
    if (!inView) return;
    let raf;
    const start = performance.now();
    const step = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(target * eased);
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);

  const fmt = (n) => n.toLocaleString("id-ID", { maximumFractionDigits: decimals, minimumFractionDigits: decimals });
  return [ref, fmt(val)];
}

const Stat = ({ value, suffix, label, testId, decimals = 0 }) => {
  const [ref, formatted] = useCounter(value, { decimals });
  return (
    <div ref={ref} data-testid={testId} className="flex flex-col items-start md:items-center text-left md:text-center">
      <div className="font-mono text-3xl md:text-4xl lg:text-5xl text-brand-text tracking-tight">
        {formatted}
        <span className="text-brand-gold">{suffix}</span>
      </div>
      <div className="mt-2 text-xs md:text-sm uppercase tracking-[0.18em] text-brand-mute">{label}</div>
    </div>
  );
};

export default function SocialProofBar() {
  return (
    <section className="relative py-16 md:py-20 border-y border-brand-line bg-brand-inkSubtle" data-testid="social-proof">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-center text-sm md:text-base text-brand-mute mb-10"
        >
          Dipercaya <span className="text-brand-text font-semibold">150+ agency properti</span> di Indonesia
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
          <Stat testId="stat-leads" value={47000} suffix="+" label="Lead diproses" />
          <Stat testId="stat-response" value={18} suffix=" dtk" label="Rata-rata respons AI" />
          <Stat testId="stat-conversion" value={38} suffix="%" label="Peningkatan konversi" />
          <Stat testId="stat-commission" value={2.1} decimals={1} suffix=" M" label="Komisi dihasilkan (Rp)" />
        </div>
      </div>
    </section>
  );
}
