import React from "react";
import { Link } from "react-router-dom";

export const Eyebrow = ({ children }) => (
  <div className="inline-flex items-center gap-2 mb-5">
    <span className="w-6 h-px bg-gold" />
    <span className="font-body font-bold text-xs tracking-[0.2em] uppercase text-gold">
      {children}
    </span>
  </div>
);

export const SectionHeading = ({ eyebrow, title, text, align = "left" }) => (
  <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
    {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
    <h2 className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl text-paper leading-[1.1]">
      {title}
    </h2>
    {text && (
      <p className="font-body text-paper-dim text-base sm:text-lg mt-5 leading-relaxed">
        {text}
      </p>
    )}
  </div>
);

export const PrimaryButton = ({ to, children, className = "" }) => (
  <Link
    to={to}
    className={`inline-flex items-center gap-2 bg-gold hover:bg-gold-deep text-ink font-body font-bold px-7 py-3.5 rounded-full transition-all hover:gap-3 hover:shadow-gold ${className}`}
  >
    {children}
    <span aria-hidden>→</span>
  </Link>
);

export const GhostButton = ({ to, children, className = "" }) => (
  <Link
    to={to}
    className={`inline-flex items-center gap-2 border border-ink-line hover:border-gold text-paper font-body font-semibold px-7 py-3.5 rounded-full transition-colors ${className}`}
  >
    {children}
  </Link>
);

export const Pill = ({ children, tone = "gold" }) => {
  const tones = {
    gold: "bg-gold/10 text-gold border-gold/30",
    palm: "bg-palm/15 text-palm-light border-palm/30",
    terracotta: "bg-terracotta/10 text-terracotta border-terracotta/30",
    gold1: "bg-gold/10 text-gold border-gold/30",
    palm1: "bg-palm/15 text-palm-light border-palm/30",
    terracotta1: "bg-terracotta/10 text-terracotta border-terracotta/30",
  };
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full border text-xs font-body font-bold uppercase tracking-wide ${tones[tone]}`}
    >
      {children}
    </span>
  );
};

export const PageHero = ({ eyebrow, title, text, children }) => (
  <section className="relative overflow-hidden pt-16 pb-20 sm:pt-20 sm:pb-24">
    <div className="absolute inset-0 wax-dots opacity-40" />
    <div className="absolute -top-40 -right-40 w-[32rem] h-[32rem] bg-gold/10 rounded-full blur-[120px]" />
    <div className="relative max-w-[1400px] mx-auto px-6 sm:px-10">
      <SectionHeading eyebrow={eyebrow} title={title} text={text} />
      {children}
    </div>
  </section>
);
