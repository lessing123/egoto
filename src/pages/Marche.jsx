import React from "react";
import { PageHero, SectionHeading } from "../components/ui";
import { SegmentCard, PersonaCard, PositioningTable, CTASection } from "../components/blocks";
import { segments, persona, positioning } from "../content/egoto";
import { useLanguage } from "../context/LanguageContext";

const Marche = () => {
  const { language, t } = useLanguage();
  const currentSegments = segments[language];
  const currentPersona = persona[language];
  const currentPositioning = positioning[language];

  return (
    <>
      <PageHero
        eyebrow={t("market.hero.eyebrow")}
        title={t("market.hero.title")}
        text={t("market.hero.text")}
      />

      <section className="max-w-[1400px] mx-auto px-6 sm:px-10 pb-24">
        <SectionHeading
          eyebrow={t("market.target.title")}
          title={t("market.target.text")}
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
          {currentSegments.map((s) => (
            <SegmentCard key={s.title} {...s} />
          ))}
        </div>
      </section>

      <section className="bg-ink-soft/60 border-y border-ink-line py-24">
        <div className="max-w-4xl mx-auto px-6 sm:px-10">
          <SectionHeading
            eyebrow={t("market.persona.title")}
            title={t("market.persona.text")}
          />
          <div className="mt-10">
            <PersonaCard persona={currentPersona} />
          </div>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-6 sm:px-10 py-24">
        <SectionHeading
          eyebrow={t("market.comp.title")}
          title={t("market.comp.text")}
        />
        <div className="mt-10">
          <PositioningTable rows={currentPositioning} />
        </div>
      </section>

      <CTASection />
    </>
  );
};

export default Marche;
