import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

const columns = [
  {
    title: "Produit",
    links: [
      { to: "/solution#tontines", label: "Tontines digitales" },
      { to: "/solution#epargne", label: "Épargne individuelle" },
      { to: "/solution#score", label: "Score Egoto" },
      { to: "/telecharger", label: "Télécharger" },
    ],
  },
  {
    title: "Ressources",
    links: [
      { to: "/probleme", label: "Pourquoi Egoto" },
      { to: "/contact", label: "Contact" },
      { to: "/", label: "Accueil" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-ink-soft border-t border-ink-line">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 py-16">
        <div className="flex flex-col md:flex-row gap-12 md:gap-8 justify-between">
          <div className="max-w-xs">
            <Logo />
            <p className="font-body text-paper-dim text-sm mt-4 leading-relaxed">
              L'épargne togolaise digitalisée : tontines, épargne individuelle et score financier
              accessibles depuis ton mobile, WhatsApp et USSD.
            </p>
            {/*
            <div className="flex gap-4 mt-6">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-11 h-11 rounded-full border-2 border-gold flex items-center justify-center hover:bg-gold/10 transition-all text-gold"
                >
                  <img src={s.icon} alt={s.label} className="w-5 h-5" />
                </a>
              ))}
            </div>
            */}
          </div>

          <div className="grid grid-cols-2 gap-10 flex-1 max-w-md">
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="font-display text-paper text-base mb-4">{col.title}</h4>
                <ul className="flex flex-col gap-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        to={l.to}
                        className="font-body text-sm text-paper-dim hover:text-gold transition-colors"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="knot-divider my-10" />

        <div className="flex justify-center items-center text-center text-xs font-body text-paper-dim/70">
          <div className="flex flex-col sm:flex-row gap-2 justify-center items-center">
            <p>Egoto - Bientôt disponible</p>
            <p className="hidden sm:block">· Pilote mobile, WhatsApp et USSD</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
