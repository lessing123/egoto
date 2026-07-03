import React from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import { StatBand, ProblemCard, JourneySteps, CTASection } from "../components/blocks";
import { SectionHeading, Pill } from "../components/ui";
import { stats, problems, modules, journeySteps } from "../content/egoto";

const Home = () => {
  return (
    <>
      <Hero />
      <StatBand stats={stats} />

      <section className="max-w-[1400px] mx-auto px-6 sm:px-10 py-24">
        <SectionHeading
          eyebrow="Le problème"
            title="Une discipline financière forte - trop souvent invisible."
            text="Les tontines fonctionnent. Elles sont fiables et humaines, mais leur organisation reste souvent opaque et peu reconnue par les services financiers formels."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {problems.map((p) => (
            <ProblemCard key={p.tag} {...p} />
          ))}
        </div>
        <Link
          to="/probleme"
          className="inline-flex items-center gap-2 mt-8 font-body font-semibold text-gold hover:gap-3 transition-all"
        >
          Voir l'analyse complète du marché <span aria-hidden>→</span>
        </Link>
      </section>

      <section className="relative py-24 bg-ink-soft/60 border-y border-ink-line">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
          <SectionHeading
            eyebrow="La solution"
              title="Cinq outils simples, un portefeuille commun."
              text="Egoto respecte les pratiques existantes et leur apporte mémoire, transparence et options financières adaptées au mobile."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {modules.map((m) => (
              <Link
                key={m.id}
                to={`/solution#${m.id}`}
                className={`card-surface rounded-2xl p-7 hover:border-gold/50 transition-colors group ${
                  m.highlight ? "ring-1 ring-gold/40" : ""
                }`}
              >
                <div className="flex justify-between items-start">
                  <span className="font-display italic text-gold/60 text-3xl">{m.number}</span>
                  {m.highlight && <Pill tone="gold">Clé</Pill>}
                </div>
                <h3 className="font-display font-semibold text-lg text-paper mt-3 group-hover:text-gold transition-colors">
                  {m.title}
                </h3>
                <p className="font-body text-paper-dim text-sm mt-2 leading-relaxed">{m.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-6 sm:px-10 py-24">
        <SectionHeading
          eyebrow="Comment ça marche"
          title="De la tontine au crédit - expliqué en quatre étapes."
          align="center"
        />
        <div className="mt-14">
          <JourneySteps steps={journeySteps} />
        </div>
      </section>

      <CTASection />
    </>
  );
};

export default Home;
