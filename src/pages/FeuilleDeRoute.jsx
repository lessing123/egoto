import React from "react";
import { PageHero, SectionHeading } from "../components/ui";
import { PhaseCard, RoadmapTable, RiskCard, CTASection } from "../components/blocks";
import { phases, roadmap, risks, funding } from "../content/egoto";

const FeuilleDeRoute = () => {
  return (
    <>
      <PageHero
        eyebrow="Stratégie de lancement"
        title="Une acquisition communautaire, pas individuelle."
        text="Une tontine compte 10 à 20 membres. Convaincre un chef de cercle, c'est embarquer son groupe entier d'un coup - le coût d'acquisition par utilisateur tend vers zéro."
      />

      <section className="max-w-[1400px] mx-auto px-6 sm:px-10 pb-24">
        <div className="grid md:grid-cols-3 gap-6">
          {phases.map((p, i) => (
            <PhaseCard key={p.tag} phase={p} index={i} />
          ))}
        </div>
      </section>

      <section className="bg-ink-soft/60 border-y border-ink-line py-24">
        <div className="max-w-4xl mx-auto px-6 sm:px-10">
          <SectionHeading eyebrow="Feuille de route" title="18 mois, jalon par jalon." />
          <div className="mt-8">
            <RoadmapTable rows={roadmap} />
          </div>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-6 sm:px-10 py-24">
        <SectionHeading eyebrow="Structure de financement" title="~80 M FCFA pour couvrir les deux premières phases." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
          {funding.map((f) => (
            <div key={f.source} className="card-surface rounded-2xl p-6">
              <p className="font-display font-bold text-xl text-gold">{f.amount}</p>
              <h4 className="font-body font-bold text-paper mt-2">{f.source}</h4>
              <p className="font-body text-paper-dim text-sm mt-1.5 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-ink-soft/60 border-y border-ink-line py-24">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
          <SectionHeading eyebrow="Risques et mitigation" title="Ce qui pourrait mal tourner - et comment on s'en prémunit." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            {risks.map((r) => (
              <RiskCard key={r.title} risk={r} />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
};

export default FeuilleDeRoute;
