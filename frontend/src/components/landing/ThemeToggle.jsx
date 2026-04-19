import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export function applyTheme(next) {
  const isDark = next === "dark";
  document.documentElement.classList.toggle("dark", isDark);
  try { localStorage.setItem("altura-theme", next); } catch (e) { /* noop */ }
  window.dispatchEvent(new CustomEvent("altura:theme-change", { detail: next }));
}

export function getInitialTheme() {
  if (typeof window === "undefined") return "dark";
  try { return localStorage.getItem("altura-theme") || "dark"; } catch (e) { return "dark"; }
}

export default function ThemeToggle({ className = "" }) {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    applyTheme(next);
    setTheme(next);
  };

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Aktifkan mode terang" : "Aktifkan mode gelap"}
      data-testid="theme-toggle"
      className={`relative w-11 h-11 rounded-full border border-brand-line bg-brand-panel/60 backdrop-blur-md flex items-center justify-center hover:border-brand-gold/50 transition ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="sun"
            initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.25 }}
            className="absolute"
          >
            <Sun size={16} className="text-brand-gold" />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ rotate: 90, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -90, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.25 }}
            className="absolute"
          >
            <Moon size={16} className="text-brand-gold" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
