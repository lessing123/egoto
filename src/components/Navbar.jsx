import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import Logo from "./Logo";

const links = [
  { to: "/probleme", label: "Pourquoi Egoto" },
  { to: "/solution", label: "Fonctionnalités" },
  { to: "/equipe", label: "Équipe" },
  { to: "/telecharger", label: "Télécharger" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

        <Link
          to="/contact"
          className="hidden md:inline-flex items-center gap-2 bg-gold hover:bg-gold-deep text-ink font-body font-bold text-sm px-5 py-2.5 rounded-full transition-colors"
        >
          Je veux l'app
        </Link>

        <button
          className="md:hidden w-9 h-9 flex flex-col justify-center items-center gap-1.5"
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
            <li>
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="inline-flex bg-gold text-ink font-bold px-5 py-2.5 rounded-full"
              >
                Rejoindre le pilote
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
