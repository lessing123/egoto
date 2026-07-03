import React from "react";
import { PageHero } from "../components/ui";
import { ProblemCard, RealityRow, CTASection } from "../components/blocks";
import { SectionHeading } from "../components/ui";
import { problems, marketRealities } from "../content/egoto";

const Probleme = () => {
  return (
    <>
      <PageHero
        eyebrow="Contexte et problème"
          title="Le Togo a une réalité particulière."
          text="Beaucoup de personnes n'ont pas accès aux banques, mais des millions pratiquent l'épargne collective. Cette discipline existe - elle mérite d'être reconnue et soutenue."
      />

      <section className="max-w-[1400px] mx-auto px-6 sm:px-10 pb-24">
        <SectionHeading eyebrow="Réalités du marché" title="Cinq constats simples." />
        <div className="mt-10 max-w-3xl">
          {marketRealities.map((r) => (
            <RealityRow key={r.title} {...r} />
          ))}
        </div>
      </section>

      <section className="bg-ink-soft/60 border-y border-ink-line py-24">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
          <SectionHeading
            eyebrow="Trois problèmes spécifiques"
            title="Trois enjeux concrets que rencontrent les commerçantes."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {problems.map((p) => (
              <ProblemCard key={p.tag} {...p} />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
};

export default Probleme;
