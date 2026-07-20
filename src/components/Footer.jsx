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
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 flex-1 max-w-xl">
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="font-display text-paper text-base mb-4">{col.title}</h4>
                <ul className="flex flex-col gap-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        to={l.to}
                        className="font-body text-sm text-paper-dim hover:text-terracotta transition-colors"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Contact column */}
            <div>
              <h4 className="font-display text-paper text-base mb-4">Contact</h4>
              <ul className="flex flex-col gap-3">
                <li>
                  <a href="mailto:contact@egoto.xyz" className="font-body text-sm text-paper-dim hover:text-terracotta transition-colors">
                    contact@egoto.xyz
                  </a>
                </li>
                <li>
                  <a href="mailto:prisille.gogoyi@egoto.xyz" className="font-body text-sm text-paper-dim hover:text-terracotta transition-colors">
                    Partenariats
                  </a>
                </li>
                <li>
                  <span className="font-body text-sm text-paper-dim">
                    Lomé, Togo
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="knot-divider my-10" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-body text-paper-dim/70">
          <p>© {new Date().getFullYear()} Egoto — Tous droits réservés</p>
          <div className="flex items-center gap-4">
            <a href="mailto:contact@egoto.xyz" className="hover:text-terracotta transition-colors">contact@egoto.xyz</a>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">Pilote mobile, WhatsApp et USSD</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
