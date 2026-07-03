import React from "react";
import { PageHero, SectionHeading } from "../components/ui";
import { SegmentCard, PersonaCard, PositioningTable, CTASection } from "../components/blocks";
import { segments, persona, positioning } from "../content/egoto";

const Marche = () => {
  return (
    <>
      <PageHero
        eyebrow="Marché cible et positionnement"
        title="Un marché immense, une cible déjà organisée."
        text="Le cœur de cible d'Egoto n'a pas de comportement à créer - seulement à digitaliser une discipline financière déjà en place."
      />

      <section className="max-w-[1400px] mx-auto px-6 sm:px-10 pb-24">
        <SectionHeading eyebrow="Segmentation" title="Du cœur de cible à l'expansion CEDEAO." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
          {segments.map((s) => (
            <SegmentCard key={s.title} {...s} />
          ))}
        </div>
      </section>

      <section className="bg-ink-soft/60 border-y border-ink-line py-24">
        <div className="max-w-4xl mx-auto px-6 sm:px-10">
          <SectionHeading eyebrow="Profil utilisateur" title="Da Adjo, 34 ans, commerçante à Adawlato." />
          <div className="mt-10">
            <PersonaCard persona={persona} />
          </div>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-6 sm:px-10 py-24">
        <SectionHeading eyebrow="Positionnement concurrentiel" title="Egoto face aux alternatives existantes." />
        <div className="mt-10">
          <PositioningTable rows={positioning} />
        </div>
      </section>

      <CTASection />
    </>
  );
};

export default Marche;
