import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const LINKS = [
  { id: "fitur", label: "Fitur" },
  { id: "cara-kerja", label: "Cara Kerja" },
  { id: "harga", label: "Harga" },
  { id: "testimoni", label: "Testimoni" },
];

const Logo = () => (
  <div className="flex items-center gap-2" data-testid="brand-logo">
    <svg width="26" height="26" viewBox="0 0 32 32" fill="none" aria-hidden>
      <circle cx="16" cy="16" r="13" stroke="#F5C453" strokeWidth="1.5" />
      <path d="M9 22 L16 8 L23 22 M12 18 H20" stroke="#10B981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
    <span className="font-display text-[17px] tracking-wide text-brand-text">
      Altura<span className="text-brand-gold">.</span>
    </span>
  </div>
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean);
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  return (
    <motion.header
      data-testid="navbar"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-[#0A0A0A]/80 border-b border-brand-line"
          : "bg-transparent"
      }`}
    >
      <nav
        className={`mx-auto max-w-7xl px-5 md:px-8 flex items-center justify-between transition-[height] duration-300 ${
          scrolled ? "h-[52px]" : "h-[64px]"
        }`}
      >
        <button onClick={() => scrollTo("top")} className="min-h-[44px] flex items-center" data-testid="logo-btn">
          <Logo />
        </button>

        <ul className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => scrollTo(l.id)}
                data-testid={`nav-link-${l.id}`}
                className={`text-sm tracking-wide transition-colors relative py-2 ${
                  active === l.id ? "text-brand-gold" : "text-brand-mute hover:text-brand-text"
                }`}
              >
                {l.label}
                {active === l.id && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute left-0 right-0 -bottom-0.5 h-[2px] bg-brand-gold rounded-full"
                  />
                )}
              </button>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <button
            onClick={() => scrollTo("daftar")}
            data-testid="navbar-cta"
            className="inline-flex items-center gap-2 h-[44px] px-5 rounded-full bg-brand-emerald text-brand-ink font-semibold text-sm hover:brightness-110 transition"
          >
            Coba Gratis 14 Hari
          </button>
        </div>

        <button
          className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg text-brand-text"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          data-testid="mobile-menu-toggle"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
            className="md:hidden border-t border-brand-line bg-[#0A0A0A]/95 backdrop-blur-xl"
            data-testid="mobile-menu"
          >
            <div className="px-5 py-4 flex flex-col gap-1">
              {LINKS.map((l) => (
                <button
                  key={l.id}
                  onClick={() => scrollTo(l.id)}
                  data-testid={`mobile-nav-link-${l.id}`}
                  className="text-left px-3 py-3 rounded-lg text-brand-text/90 hover:bg-white/5 min-h-[44px]"
                >
                  {l.label}
                </button>
              ))}
              <button
                onClick={() => scrollTo("daftar")}
                data-testid="mobile-nav-cta"
                className="mt-2 h-[48px] rounded-full bg-brand-emerald text-brand-ink font-semibold"
              >
                Coba Gratis 14 Hari
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
