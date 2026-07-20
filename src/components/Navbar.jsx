import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import Logo from "./Logo";
import { useLanguage } from "../context/LanguageContext";
import { LanguageIcon } from "./Icons";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  const links = [
    { to: "/probleme", label: t("nav.why") },
    { to: "/solution", label: t("nav.features") },
    { to: "/equipe", label: t("nav.team") },
    { to: "/telecharger", label: t("nav.download") },
    { to: "/contact", label: t("nav.contact") },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-ink/90 backdrop-blur-md border-b border-ink-line" : "bg-transparent"
      }`}
    >
      <nav className="max-w-[1400px] mx-auto flex items-center justify-between px-6 sm:px-10 py-4">
        <Link to="/" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <ul className="hidden md:flex items-center gap-8 font-body text-sm">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                className={({ isActive }) =>
                  `transition-colors hover:text-gold ${
                    isActive ? "text-gold" : "text-paper-dim"
                  }`
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-ink-line text-paper-dim hover:text-gold hover:border-gold transition-colors font-body text-xs font-semibold uppercase tracking-wider bg-ink-soft/40"
            title={language === "fr" ? "Switch to English" : "Passer en Français"}
          >
            <LanguageIcon className="w-3.5 h-3.5" />
            <span>{language === "fr" ? "EN" : "FR"}</span>
          </button>
          
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-gold hover:bg-gold-deep text-ink font-body font-bold text-sm px-5 py-2.5 rounded-full transition-colors"
          >
            {t("btn.getApp")}
          </Link>
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-ink-line text-paper-dim hover:text-gold transition-colors font-body text-xs font-semibold uppercase bg-ink-soft/40"
          >
            <LanguageIcon className="w-3.5 h-3.5" />
            <span>{language === "fr" ? "EN" : "FR"}</span>
          </button>
          
          <button
            className="w-9 h-9 flex flex-col justify-center items-center gap-1.5"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            <span
              className={`block h-0.5 w-6 bg-paper transition-transform ${
                open ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span className={`block h-0.5 w-6 bg-paper transition-opacity ${open ? "opacity-0" : ""}`} />
            <span
              className={`block h-0.5 w-6 bg-paper transition-transform ${
                open ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden bg-ink-soft border-t border-ink-line px-6 py-6 animate-rise">
          <ul className="flex flex-col gap-5 font-body text-base">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) => (isActive ? "text-gold" : "text-paper-dim")}
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
            <li className="pt-2 border-t border-ink-line flex justify-between items-center">
              <span className="font-body text-sm text-paper-dim uppercase tracking-wider">Langue / Language</span>
              <button
                onClick={() => {
                  toggleLanguage();
                  setOpen(false);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-ink-line text-paper font-bold text-sm bg-ink"
              >
                <LanguageIcon className="w-4 h-4 text-paper" />
                <span>{language === "fr" ? "English" : "Français"}</span>
              </button>
            </li>
            <li className="mt-2">
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="inline-flex w-full justify-center bg-gold text-ink font-bold px-5 py-2.5 rounded-full"
              >
                {t("btn.joinPilot")}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
