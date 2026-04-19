import React from "react";
import { MessageCircle } from "lucide-react";

const Logo = () => (
  <div className="flex items-center gap-2">
    <svg width="22" height="22" viewBox="0 0 32 32" fill="none" aria-hidden>
      <circle cx="16" cy="16" r="13" stroke="#F5C453" strokeWidth="1.5" />
      <path d="M9 22 L16 8 L23 22 M12 18 H20" stroke="#10B981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
    <span className="font-display text-brand-text text-[16px]">Altura<span className="text-brand-gold">.</span></span>
  </div>
);

const LINKS = [
  { label: "Fitur", href: "#fitur" },
  { label: "Harga", href: "#harga" },
  { label: "Blog", href: "#" },
  { label: "Kontak", href: "https://wa.me/6281234567890" },
  { label: "Kebijakan Privasi", href: "#" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-brand-line bg-[#080808] pt-16 pb-10" data-testid="footer">
      <div className="mx-auto max-w-7xl px-5 md:px-8 grid md:grid-cols-[1.2fr_1fr_1fr] gap-10">
        <div>
          <Logo />
          <p className="mt-4 text-sm text-brand-mute max-w-sm leading-relaxed">
            The Future of Property is Automated. Lead properti otomatis untuk agency modern di Indonesia.
          </p>
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noreferrer"
            data-testid="footer-wa"
            className="mt-6 inline-flex items-center gap-2 h-[44px] px-5 rounded-full border border-brand-line bg-brand-panel text-brand-text hover:border-brand-emerald/60 transition"
          >
            <MessageCircle size={16} className="text-brand-emerald" />
            WhatsApp kami
          </a>
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-brand-mute mb-4">Tautan</div>
          <ul className="space-y-3">
            {LINKS.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="text-sm text-brand-text/90 hover:text-brand-gold transition">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-brand-mute mb-4">Kantor</div>
          <p className="text-sm text-brand-text/90 leading-relaxed">
            Jl. Sudirman Kav. 52-53<br />
            SCBD, Jakarta Selatan 12190<br />
            Indonesia
          </p>
          <p className="mt-4 text-xs text-brand-mute">halo@altura.id · +62 812 3456 7890</p>
        </div>
      </div>

      <div className="mt-14 border-t border-brand-line pt-6 mx-auto max-w-7xl px-5 md:px-8 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs text-brand-mute">
        <div>© 2026 Altura Property · Dibuat dengan ❤️ di Indonesia</div>
        <div className="font-mono tracking-wider">ver. 1.0 · PWA ready</div>
      </div>
    </footer>
  );
}
