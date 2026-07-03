import React from "react";
import { PageHero, SectionHeading, Pill } from "../components/ui";
import { ModuleCard, ScoreLadder, CTASection } from "../components/blocks";
import { modules, scoreTiers } from "../content/egoto";

const Solution = () => {
  const epargne = modules.find((m) => m.id === "epargne");

  return (
    <>
      <PageHero
        eyebrow="La solution Egoto"
          title="Une couche financière communautaire, posée sur Mobile Money."
          text="Egoto ne change pas vos habitudes - elle les rend plus simples et plus claires. Utilisez-la via bot WhatsApp, application mobile ou USSD."
      />

      <section className="max-w-5xl mx-auto px-6 sm:px-10 pb-8">
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-terracotta/15 via-ink-soft to-palm/10 border border-gold/30 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-gold/20 rounded-full blur-[100px]" />
          <div className="relative">
            <Pill tone="gold">Fonctionnalité mise en avant</Pill>
            <h2 className="font-display font-semibold text-2xl sm:text-3xl text-paper mt-4">
              Épargne solo - mettez de côté à votre rythme.
            </h2>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4 mt-6">
                {[
                ["Cotisez seul·e si vous préférez", "Pas d'obligation de groupe - c'est votre épargne, vos règles."],
                ["Objectif personnel", "Pour la scolarité, les achats saisonniers ou un projet précis."],
                ["Vous décidez du montant", "Changez le montant ou la durée quand vous le souhaitez."],
                ["Compte verrouillable ou libre", "Choisissez de bloquer les fonds jusqu'à l'objectif, ou d'y accéder librement."],
              ].map(([t, d]) => (
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
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 sm:px-10 py-16 flex flex-col gap-8">
        {modules.map((m) => (
          <ModuleCard key={m.id} mod={m} />
        ))}
      </section>

      <section className="bg-ink-soft/60 border-y border-ink-line py-24">
        <div className="max-w-4xl mx-auto px-6 sm:px-10">
          <SectionHeading
            eyebrow="Score Egoto"
            title="Le passeport financier, palier par palier."
            text="Le score varie de 0 à 1 000 et se recalcule en temps réel après chaque cotisation, cycle complété ou objectif atteint."
          />
          <div className="mt-12">
            <ScoreLadder tiers={scoreTiers} />
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
};

export default Solution;
