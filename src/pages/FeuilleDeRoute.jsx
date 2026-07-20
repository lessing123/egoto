import React from "react";
import { PageHero, SectionHeading } from "../components/ui";
import { PhaseCard, RoadmapTable, RiskCard, CTASection } from "../components/blocks";
import { phases, roadmap, risks, funding } from "../content/egoto";
import { useLanguage } from "../context/LanguageContext";

const FeuilleDeRoute = () => {
  const { language, t } = useLanguage();
  const currentPhases = phases[language];
  const currentRoadmap = roadmap[language];
  const currentRisks = risks[language];
  const currentFunding = funding[language];

  return (
    <>
      <PageHero
        eyebrow={language === "fr" ? "Stratégie de lancement" : "Launch Strategy"}
        title={
          language === "fr"
            ? "Une acquisition communautaire, pas individuelle."
            : "A community acquisition, not individual."
        }
        text={
          language === "fr"
            ? "Une tontine compte 10 à 20 membres. Convaincre un chef de cercle, c'est embarquer son groupe entier d'un coup - le coût d'acquisition par utilisateur tend vers zéro."
            : "A tontine has 10 to 20 members. Convincing a circle leader means onboarding their entire group at once - the acquisition cost per user tends to zero."
        }
      />

      <section className="max-w-[1400px] mx-auto px-6 sm:px-10 pb-24">
        <div className="grid md:grid-cols-3 gap-6">
          {currentPhases.map((p, i) => (
            <PhaseCard key={p.tag} phase={p} index={i} />
          ))}
        </div>
      </section>

      <section className="bg-ink-soft/60 border-y border-ink-line py-24">
        <div className="max-w-4xl mx-auto px-6 sm:px-10">
          <SectionHeading
            eyebrow={t("roadmap.roadmap.title")}
            title={t("roadmap.roadmap.text")}
          />
          <div className="mt-8">
            <RoadmapTable rows={currentRoadmap} />
          </div>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-6 sm:px-10 py-24">
        <SectionHeading
          eyebrow={language === "fr" ? "Structure de financement" : "Funding Structure"}
          title={
            language === "fr"
              ? "~80 M FCFA pour couvrir les deux premières phases."
              : "~80 M FCFA to cover the first two phases."
          }
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
          {currentFunding.map((f) => (
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
          <SectionHeading
            eyebrow={language === "fr" ? "Risques et mitigation" : "Risks & Mitigation"}
            title={
              language === "fr"
                ? "Ce qui pourrait mal tourner - et comment on s'en prémunit."
                : "What could go wrong - and how we protect against it."
            }
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            {currentRisks.map((r) => (
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
