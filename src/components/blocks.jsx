import React from "react";
import { Pill, PrimaryButton, GhostButton, Eyebrow } from "./ui";
import {
  SavingsIllustration,
  CircleIllustration,
  ScoreGaugeIllustration,
  VisaCardIllustration,
  WhatsAppBotIllustration,
  ContactIllustration
} from "./Illustrations";

const getIllustration = (id) => {
  switch (id) {
    case "tontines":
      return <CircleIllustration />;
    case "epargne":
      return <SavingsIllustration />;
    case "score":
      return <ScoreGaugeIllustration />;
    case "carte":
      return <VisaCardIllustration />;
    case "whatsapp":
      return <WhatsAppBotIllustration />;
    default:
      return null;
  }
};

export const StatBand = ({ stats }) => (
  <section className="relative border-y border-ink-line bg-ink-soft/60">
    <div className="max-w-[1400px] mx-auto px-6 sm:px-10 py-20 grid grid-cols-2 md:grid-cols-4 gap-8">
      {stats.map((s, i) => (
        <div key={i} className="text-center md:text-left">
          <p className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-gold tracking-tight">{s.value}</p>
          <p className="font-body text-paper/85 text-lg sm:text-lg lg:text-xl mt-4 leading-relaxed font-medium">{s.label}</p>
        </div>
      ))}
    </div>
  </section>
);

export const ProblemCard = ({ tag, title, text }) => (
  <div className="card-surface rounded-3xl p-8 hover:border-terracotta/40 transition-colors">
    <span className="font-display italic text-terracotta text-4xl">{tag}</span>
    <h3 className="font-display font-semibold text-xl text-paper mt-4">{title}</h3>
    <p className="font-body text-paper-dim text-sm mt-3 leading-relaxed">{text}</p>
  </div>
);

export const RealityRow = ({ title, text }) => (
  <div className="flex gap-5 py-6 border-b border-ink-line last:border-0">
    <div className="w-2 h-2 rounded-full bg-gold mt-2 shrink-0" />
    <div>
      <h4 className="font-display font-semibold text-paper text-lg">{title}</h4>
      <p className="font-body text-paper-dim text-sm mt-1.5 leading-relaxed">{text}</p>
    </div>
  </div>
);

export const ModuleCard = ({ mod }) => {
  const illustration = getIllustration(mod.id);

  return (
    <div
      id={mod.id}
      className={`scroll-mt-28 rounded-3xl p-8 sm:p-10 card-surface relative overflow-hidden ${
        mod.highlight ? "ring-1 ring-gold/50" : ""
      }`}
    >
      {mod.highlight && (
        <div className="absolute top-0 right-0">
          <Pill tone="gold">
            <span className="px-1">★ Fonctionnalité clé</span>
          </Pill>
        </div>
      )}

      <div className={illustration ? "grid md:grid-cols-[1fr_260px] gap-8 items-center" : ""}>
        <div>
          <div className="flex items-baseline gap-4">
            <span className="font-display italic text-gold/50 text-5xl">{mod.number}</span>
            <div>
              <h3 className="font-display font-semibold text-2xl sm:text-3xl text-paper">{mod.title}</h3>
              <p className="font-body text-terracotta text-sm font-bold uppercase tracking-wide mt-1">
                {mod.subtitle}
              </p>
            </div>
          </div>
          <p className="font-body text-paper-dim mt-5 text-base leading-relaxed">{mod.summary}</p>
          <ul className="mt-6 flex flex-col gap-3">
            {mod.points.map((p, i) => (
              <li key={i} className="flex gap-3 font-body text-sm text-paper/85">
                <span className="text-gold mt-0.5">✓</span>
                <span className="leading-relaxed">{p}</span>
              </li>
            ))}
          </ul>
        </div>

        {illustration && (
          <div className="flex justify-center items-center select-none shrink-0 md:max-w-[260px]">
            {illustration}
          </div>
        )}
      </div>
    </div>
  );
};

export const ScoreLadder = ({ tiers }) => (
  <div className="flex flex-col gap-4">
    {tiers.map((t, i) => (
      <div key={i} className="flex items-center gap-5">
        <span className="font-display font-semibold text-gold text-sm w-24 shrink-0">{t.range}</span>
        <div className="flex-1 h-3 rounded-full bg-ink-line overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-terracotta to-gold score-fill"
            style={{ width: `${t.pct}%` }}
          />
        </div>
        <span className="font-body text-paper-dim text-xs sm:text-sm max-w-[220px] hidden sm:block">
          {t.label}
        </span>
      </div>
    ))}
  </div>
);

const getStepIllustration = (index) => {
  switch (index) {
    case 0:
      return <CircleIllustration />;
    case 1:
      return <WhatsAppBotIllustration />;
    case 2:
      return <ScoreGaugeIllustration />;
    case 3:
      return <VisaCardIllustration />;
    default:
      return null;
  }
};

export const JourneySteps = ({ steps }) => (
  <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
    {steps.map((s, i) => {
      const illustration = getStepIllustration(i);
      return (
        <div key={i} className="relative flex flex-col items-center text-center">
          {illustration && (
            <div className="w-32 h-32 flex justify-center items-center mb-2 select-none">
              {illustration}
            </div>
          )}
          <span className="font-display italic text-5xl text-ink-line">{s.step}</span>
          <h4 className="font-display font-semibold text-paper text-lg mt-2">{s.title}</h4>
          <p className="font-body text-paper-dim text-sm mt-2 leading-relaxed">{s.text}</p>
          {i < steps.length - 1 && (
            <span className="hidden md:block absolute top-[110px] -right-4 text-gold/40 text-2xl">→</span>
          )}
        </div>
      );
    })}
  </div>
);

export const SegmentCard = ({ title, desc, size }) => (
  <div className="card-surface rounded-2xl p-6">
    <p className="font-display font-bold text-2xl text-gold">{size}</p>
    <h4 className="font-body font-bold text-paper mt-2">{title}</h4>
    <p className="font-body text-paper-dim text-sm mt-1.5 leading-relaxed">{desc}</p>
  </div>
);

export const PersonaCard = ({ persona }) => (
  <div className="card-surface rounded-3xl p-8 sm:p-10 grid sm:grid-cols-[auto_1fr] gap-8 items-start">
    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-terracotta to-gold flex items-center justify-center font-display font-bold text-2xl text-ink shrink-0">
      {persona.name.split(" ").map((n) => n[0]).join("")}
    </div>
    <div>
      <h3 className="font-display font-semibold text-2xl text-paper">
        {persona.name}, {persona.age} ans
      </h3>
      <p className="font-body text-terracotta text-sm font-bold mt-1">{persona.role}</p>
      <ul className="mt-5 flex flex-col gap-2.5">
        {persona.facts.map((f, i) => (
          <li key={i} className="font-body text-sm text-paper/80 flex gap-2">
            <span className="text-gold">-</span>
            {f}
          </li>
        ))}
      </ul>
      <blockquote className="font-display italic text-lg text-gold mt-6 border-l-2 border-gold pl-4">
        "{persona.quote}"
      </blockquote>
    </div>
  </div>
);

export const PositioningTable = ({ rows }) => (
  <div className="overflow-x-auto rounded-2xl border border-ink-line">
    <table className="w-full text-sm font-body min-w-[640px]">
      <thead>
        <tr className="bg-ink-soft text-left">
          <th className="p-4 text-paper-dim font-semibold"> </th>
          <th className="p-4 text-gold font-bold">Egoto</th>
          <th className="p-4 text-paper-dim font-semibold">Banque traditionnelle</th>
          <th className="p-4 text-paper-dim font-semibold">Mobile Money seul</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i} className="border-t border-ink-line">
            <td className="p-4 font-semibold text-paper">{r.label}</td>
            <td className="p-4 text-gold">{r.egoto}</td>
            <td className="p-4 text-paper-dim">{r.banque}</td>
            <td className="p-4 text-paper-dim">{r.momo}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const RevenueCard = ({ title, rate, text }) => (
  <div className="card-surface rounded-2xl p-7">
    <div className="flex justify-between items-start gap-3">
      <h4 className="font-display font-semibold text-lg text-paper">{title}</h4>
      <Pill tone="palm">{rate}</Pill>
    </div>
    <p className="font-body text-paper-dim text-sm mt-3 leading-relaxed">{text}</p>
  </div>
);

export const RevenueTable = ({ rows, totals }) => (
  <div className="overflow-x-auto rounded-2xl border border-ink-line">
    <table className="w-full text-sm font-body min-w-[560px]">
      <thead>
        <tr className="bg-ink-soft text-left">
          <th className="p-4 text-paper-dim font-semibold">Source</th>
          <th className="p-4 text-paper-dim font-semibold">Mois 6 (5K users)</th>
          <th className="p-4 text-paper-dim font-semibold">Mois 12 (15K users)</th>
          <th className="p-4 text-paper-dim font-semibold">Mois 18 (35K users)</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i} className="border-t border-ink-line">
            <td className="p-4 font-semibold text-paper">{r.source}</td>
            <td className="p-4 text-paper-dim">{r.m6} FCFA</td>
            <td className="p-4 text-paper-dim">{r.m12} FCFA</td>
            <td className="p-4 text-paper-dim">{r.m18} FCFA</td>
          </tr>
        ))}
        <tr className="border-t border-gold/30 bg-gold/5">
          <td className="p-4 font-display font-bold text-gold">Total mensuel</td>
          <td className="p-4 font-display font-bold text-gold">{totals.m6} FCFA</td>
          <td className="p-4 font-display font-bold text-gold">{totals.m12} FCFA</td>
          <td className="p-4 font-display font-bold text-gold">{totals.m18} FCFA</td>
        </tr>
      </tbody>
    </table>
  </div>
);

export const PhaseCard = ({ phase, index }) => (
  <div className="card-surface rounded-3xl p-8 flex flex-col h-full">
    <div className="flex justify-between items-start">
      <Pill tone={index === 0 ? "gold" : index === 1 ? "terracotta" : "palm"}>{phase.tag}</Pill>
      <span className="font-body text-paper-dim text-xs">{phase.period}</span>
    </div>
    <h3 className="font-display font-semibold text-2xl text-paper mt-5">{phase.title}</h3>
    <p className="font-display italic text-gold text-lg mt-1">Objectif : {phase.goal}</p>
    <ul className="mt-5 flex flex-col gap-3 flex-1">
      {phase.points.map((p, i) => (
        <li key={i} className="font-body text-sm text-paper/80 flex gap-2.5">
          <span className="text-gold mt-0.5">✓</span>
          <span className="leading-relaxed">{p}</span>
        </li>
      ))}
    </ul>
  </div>
);

export const RoadmapTable = ({ rows }) => (
  <div className="flex flex-col">
    {rows.map((r, i) => (
      <div
        key={i}
        className="grid sm:grid-cols-[140px_1fr_auto_auto] gap-3 sm:gap-6 items-start sm:items-center py-6 border-b border-ink-line last:border-0"
      >
        <span className="font-display font-bold text-gold">{r.period}</span>
        <p className="font-body text-paper/85 text-sm leading-relaxed">{r.milestone}</p>
        <span className="font-body text-paper text-sm font-bold whitespace-nowrap">{r.users} users</span>
        <span className="font-body text-terracotta text-sm font-semibold whitespace-nowrap">{r.revenue}</span>
      </div>
    ))}
  </div>
);

export const TeamCard = ({ member }) => (
  <div className="card-surface rounded-3xl p-8 text-center">
    <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-gold to-terracotta flex items-center justify-center font-display font-bold text-2xl text-ink">
      {member.initials}
    </div>
    <h3 className="font-display font-semibold text-xl text-paper mt-5">{member.name}</h3>
    <p className="font-body text-gold text-sm font-bold mt-1">{member.role}</p>
    <p className="font-body text-paper-dim text-sm mt-3 leading-relaxed">{member.expertise}</p>
  </div>
);

export const RiskCard = ({ risk }) => {
  const levelTone = { Faible: "palm", Moyen: "gold", Élevé: "terracotta" };
  return (
    <div className="card-surface rounded-2xl p-6">
      <div className="flex justify-between items-start gap-3">
        <h4 className="font-display font-semibold text-paper text-base">{risk.title}</h4>
        <Pill tone={levelTone[risk.level] || "gold"}>{risk.level}</Pill>
      </div>
      <p className="font-body text-paper-dim text-sm mt-3 leading-relaxed">{risk.desc}</p>
      <p className="font-body text-sm mt-3 leading-relaxed">
        <span className="text-gold font-semibold">Mitigation - </span>
        <span className="text-paper/80">{risk.mitigation}</span>
      </p>
    </div>
  );
};

export const CTASection = () => (
  <section className="relative py-24 overflow-hidden">
    <div className="absolute inset-0 wax-dots opacity-30" />
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
    <div className="relative max-w-3xl mx-auto px-6 text-center">
      <div className="flex justify-center items-center mb-6 select-none max-w-[120px] mx-auto">
        <ContactIllustration />
      </div>
      <Eyebrow>Prêt à tester</Eyebrow>
      <h2 className="font-display font-semibold text-3xl sm:text-4xl text-paper leading-tight">
        Rejoins la liste d'attente de l'application Egoto.
      </h2>
      <p className="font-body text-paper-dim text-lg mt-5 leading-relaxed">
        Sois informé(e) du lancement, découvre les fonctionnalités en avant-première et
        préinscris-toi pour la version mobile.
      </p>
      <div className="flex flex-wrap justify-center gap-4 mt-9">
        <PrimaryButton to="/contact">Je veux être informé(e)</PrimaryButton>
        <GhostButton to="/telecharger">Télécharger bientôt</GhostButton>
      </div>
    </div>
  </section>
);
