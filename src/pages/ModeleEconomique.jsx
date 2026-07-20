import React from "react";
import { PageHero, SectionHeading } from "../components/ui";
import { RevenueCard, RevenueTable, CTASection } from "../components/blocks";
import { revenueSources, revenueProjection, revenueTotals } from "../content/egoto";
import { useLanguage } from "../context/LanguageContext";

const ModeleEconomique = () => {
  const { language, t } = useLanguage();
  const currentSources = revenueSources[language];
  const currentProjection = revenueProjection[language];
  const currentTotals = revenueTotals[language];

  return (
    <>
      <PageHero
        eyebrow={t("bm.hero.eyebrow")}
        title={t("bm.hero.title")}
        text={
          language === "fr"
            ? "Toutes les sources sont accessibles sans agrément spécifique de la BCEAO pour les phases 1 et 2. Egoto ne pratique pas le crédit direct : c'est l'IMF partenaire qui porte le risque."
            : "All streams are accessible without specific BCEAO licensing for phases 1 and 2. Egoto does not provide direct credit: the partner MFI carries the risk."
        }
      />

      <section className="max-w-[1400px] mx-auto px-6 sm:px-10 pb-24">
        <div className="grid sm:grid-cols-2 gap-6">
          {currentSources.map((r) => (
            <RevenueCard key={r.title} {...r} />
          ))}
        </div>
      </section>

      <section className="bg-ink-soft/60 border-y border-ink-line py-24">
        <div className="max-w-5xl mx-auto px-6 sm:px-10">
          <SectionHeading
            eyebrow={t("bm.proj.title")}
            title={
              language === "fr"
                ? "Vers 10,18 M FCFA de revenu mensuel à 18 mois."
                : "Towards 10.18 M FCFA monthly revenue at 18 months."
            }
            text={
              language === "fr"
                ? "Hypothèses : transaction moyenne 15 000 FCFA/mois/utilisateur, commission 0,65%, 8% des utilisateurs avec carte payante à mois 18, 2% en mise en relation IMF."
                : "Assumptions: average transaction 15,000 FCFA/month/user, commission 0.65%, 8% of users with paid card at month 18, 2% in MFI introductions."
            }
          />
          <div className="mt-10">
            <RevenueTable rows={currentProjection} totals={currentTotals} />
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 sm:px-10 py-24 text-center">
        <SectionHeading
          align="center"
          eyebrow={language === "fr" ? "Note sur le micro-crédit" : "Note on Micro-Credit"}
          title={language === "fr" ? "Pas de crédit direct en phase 1 et 2." : "No direct credit in phase 1 and 2."}
          text={
            language === "fr"
              ? "Décision volontaire : elle évite l'agrément BCEAO lourd, préserve la trésorerie, et élimine le risque de défaut avant que le scoring soit suffisamment fiable. En phase 3+, une licence de microfinance pourra être envisagée."
              : "Voluntary decision: it avoids heavy BCEAO licensing, preserves cash flow, and eliminates default risk before scoring is sufficiently reliable. In phase 3+, a microfinance license may be considered."
          }
        />
      </section>

      <CTASection />
    </>
  );
};

export default ModeleEconomique;
