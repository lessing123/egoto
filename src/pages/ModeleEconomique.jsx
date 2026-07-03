import React from "react";
import { PageHero, SectionHeading } from "../components/ui";
import { RevenueCard, RevenueTable, CTASection } from "../components/blocks";
import { revenueSources, revenueProjection, revenueTotals } from "../content/egoto";

const ModeleEconomique = () => {
  return (
    <>
      <PageHero
        eyebrow="Modèle économique"
        title="Quatre sources de revenus, aucun agrément de crédit requis."
        text="Toutes les sources sont accessibles sans agrément spécifique de la BCEAO pour les phases 1 et 2. Egoto ne pratique pas le crédit direct : c'est l'IMF partenaire qui porte le risque."
      />

      <section className="max-w-[1400px] mx-auto px-6 sm:px-10 pb-24">
        <div className="grid sm:grid-cols-2 gap-6">
          {revenueSources.map((r) => (
            <RevenueCard key={r.title} {...r} />
          ))}
        </div>
      </section>

      <section className="bg-ink-soft/60 border-y border-ink-line py-24">
        <div className="max-w-5xl mx-auto px-6 sm:px-10">
          <SectionHeading
            eyebrow="Projection des revenus"
            title="Vers 10,18 M FCFA de revenu mensuel à 18 mois."
            text="Hypothèses : transaction moyenne 15 000 FCFA/mois/utilisateur, commission 0,65%, 8% des utilisateurs avec carte payante à mois 18, 2% en mise en relation IMF."
          />
          <div className="mt-10">
            <RevenueTable rows={revenueProjection} totals={revenueTotals} />
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 sm:px-10 py-24 text-center">
        <SectionHeading
          align="center"
          eyebrow="Note sur le micro-crédit"
          title="Pas de crédit direct en phase 1 et 2."
          text="Décision volontaire : elle évite l'agrément BCEAO lourd, préserve la trésorerie, et élimine le risque de défaut avant que le scoring soit suffisamment fiable. En phase 3+, une licence de microfinance pourra être envisagée."
        />
      </section>

      <CTASection />
    </>
  );
};

export default ModeleEconomique;
