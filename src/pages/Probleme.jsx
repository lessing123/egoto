import React from "react";
import { PageHero } from "../components/ui";
import { ProblemCard, RealityRow, CTASection } from "../components/blocks";
import { SectionHeading } from "../components/ui";
import { problems, marketRealities } from "../content/egoto";
import { ProblemIllustration } from "../components/Illustrations";
import { useLanguage } from "../context/LanguageContext";

const Probleme = () => {
  const { language } = useLanguage();
  const currentRealities = marketRealities[language];
  const currentProblems = problems[language];

  return (
    <>
      <PageHero
        eyebrow={language === "fr" ? "Contexte et problème" : "Context & Problem"}
        title={language === "fr" ? "Le Togo a une réalité particulière." : "Togo has a unique reality."}
        text={
          language === "fr"
            ? "Beaucoup de personnes n'ont pas accès aux banques, mais des millions pratiquent l'épargne collective. Cette discipline existe - elle mérite d'être reconnue et soutenue."
            : "Many people lack access to banks, but millions practice collective savings. This discipline exists - it deserves to be recognized and supported."
        }
      />

      <section className="relative max-w-[1400px] mx-auto px-6 sm:px-10 pb-24 overflow-hidden">
        {/* Giant background illustration (1080px) */}
        <div className="absolute right-[-350px] lg:right-[-150px] -top-[10%] w-[1080px] h-[1080px] pointer-events-none opacity-[0.12] blur-[1px] z-0 select-none">
          <ProblemIllustration />
        </div>

        <div className="relative z-10 max-w-4xl">
          <SectionHeading
            eyebrow={language === "fr" ? "Réalités du marché" : "Market Realities"}
            title={language === "fr" ? "Cinq constats simples." : "Five simple observations."}
          />
          <div className="mt-10">
            {currentRealities.map((r) => (
              <RealityRow key={r.title} {...r} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink-soft/60 border-y border-ink-line py-24">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
          <SectionHeading
            eyebrow={language === "fr" ? "Trois problèmes spécifiques" : "Three specific problems"}
            title={
              language === "fr"
                ? "Trois enjeux concrets que rencontrent les commerçantes."
                : "Three concrete challenges that market traders face."
            }
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {currentProblems.map((p) => (
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
