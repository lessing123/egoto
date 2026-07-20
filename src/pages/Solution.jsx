import React from "react";
import { PageHero, SectionHeading, Pill } from "../components/ui";
import { ModuleCard, ScoreLadder, CTASection } from "../components/blocks";
import { modules, scoreTiers } from "../content/egoto";
import { SavingsIllustration } from "../components/Illustrations";
import { useLanguage } from "../context/LanguageContext";

const Solution = () => {
  const { language } = useLanguage();
  const currentModules = modules[language];
  const currentScoreTiers = scoreTiers[language];

  return (
    <>
      <PageHero
        eyebrow={language === "fr" ? "La solution Egoto" : "The Egoto Solution"}
        title={
          language === "fr"
            ? "Une couche financière communautaire, posée sur Mobile Money."
            : "A community financial layer, built on top of Mobile Money."
        }
        text={
          language === "fr"
            ? "Egoto ne change pas vos habitudes - elle les rend plus simples et plus claires. Utilisez-la via bot WhatsApp, application mobile ou USSD."
            : "Egoto doesn't change your habits - it makes them simpler and clearer. Use it via WhatsApp bot, mobile app, or USSD."
        }
      />

      <section className="max-w-5xl mx-auto px-6 sm:px-10 pb-8">
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-terracotta/15 via-ink-soft to-palm/10 border border-gold/30 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-gold/20 rounded-full blur-[100px]" />
          <div className="relative grid md:grid-cols-[1fr_260px] gap-8 items-center">
            <div>
              <Pill tone="gold">
                {language === "fr" ? "Fonctionnalité mise en avant" : "Featured Feature"}
              </Pill>
              <h2 className="font-display font-semibold text-2xl sm:text-3xl text-paper mt-4">
                {language === "fr"
                  ? "Épargne solo - mettez de côté à votre rythme."
                  : "Solo savings - put money aside at your own pace."}
              </h2>
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4 mt-6">
                {(language === "fr"
                  ? [
                      ["Cotisez seul·e si vous préférez", "Pas d'obligation de groupe - c'est votre épargne, vos règles."],
                      ["Objectif personnel", "Pour la scolarité, les achats saisonniers ou un projet précis."],
                      ["Vous décidez du montant", "Changez le montant ou la durée quand vous le souhaitez."],
                      ["Compte verrouillable ou libre", "Choisissez de bloquer les fonds jusqu'à l'objectif, ou d'y accéder librement."],
                    ]
                  : [
                      ["Contribute alone if you prefer", "No group obligation - it's your savings, your rules."],
                      ["Personal goal", "For tuition, seasonal purchases, or a specific project."],
                      ["You decide the amount", "Change the amount or duration whenever you want."],
                      ["Lockable or flexible account", "Choose to lock funds until the goal is reached, or access them freely."],
                    ]
                ).map(([t, d]) => (
                  <div key={t} className="flex gap-3">
                    <span className="text-gold font-display text-xl">✓</span>
                    <div>
                      <p className="font-body font-bold text-paper text-sm">{t}</p>
                      <p className="font-body text-paper-dim text-sm mt-1 leading-relaxed">{d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center items-center select-none shrink-0 md:max-w-[260px]">
              <SavingsIllustration />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 sm:px-10 py-16 flex flex-col gap-8">
        {currentModules.map((m) => (
          <ModuleCard key={m.id} mod={m} />
        ))}
      </section>

      <section className="bg-ink-soft/60 border-y border-ink-line py-24">
        <div className="max-w-4xl mx-auto px-6 sm:px-10">
          <SectionHeading
            eyebrow={language === "fr" ? "Score Egoto" : "Egoto Score"}
            title={
              language === "fr"
                ? "Le passeport financier, palier par palier."
                : "The financial passport, tier by tier."
            }
            text={
              language === "fr"
                ? "Le score varie de 0 à 1 000 et se recalcule en temps réel après chaque cotisation, cycle complété ou objectif atteint."
                : "The score ranges from 0 to 1,000 and is recalculated in real time after each contribution, completed cycle, or goal achieved."
            }
          />
          <div className="mt-12">
            <ScoreLadder tiers={currentScoreTiers} />
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
};

export default Solution;
