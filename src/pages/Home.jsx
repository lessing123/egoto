import React from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import { StatBand, ProblemCard, JourneySteps, CTASection } from "../components/blocks";
import { SectionHeading, Pill } from "../components/ui";
import { stats, problems, modules, journeySteps } from "../content/egoto";
import { useLanguage } from "../context/LanguageContext";

const Home = () => {
  const { language, t } = useLanguage();
  const currentStats = stats[language];
  const currentProblems = problems[language];
  const currentModules = modules[language];
  const currentJourney = journeySteps[language];

  return (
    <>
      <Hero />
      <StatBand stats={currentStats} />

      <section className="max-w-[1400px] mx-auto px-6 sm:px-10 py-24">
        <SectionHeading
          eyebrow={t("home.prob.eyebrow")}
          title={t("home.prob.title")}
          text={t("home.prob.text")}
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {currentProblems.map((p) => (
            <ProblemCard key={p.tag} {...p} />
          ))}
        </div>
        <Link
          to="/probleme"
          className="inline-flex items-center gap-2 mt-8 font-body font-semibold text-gold hover:gap-3 transition-all"
        >
          {t("home.prob.link")} <span aria-hidden>→</span>
        </Link>
      </section>

      <section className="relative py-24 bg-ink-soft/60 border-y border-ink-line">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
          <SectionHeading
            eyebrow={t("home.sol.eyebrow")}
            title={t("home.sol.title")}
            text={t("home.sol.text")}
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {currentModules.map((m) => (
              <Link
                key={m.id}
                to={`/solution#${m.id}`}
                className={`card-surface rounded-2xl p-7 hover:border-gold/50 transition-colors group ${
                  m.highlight ? "ring-1 ring-gold/40" : ""
                }`}
              >
                <div className="flex justify-between items-start">
                  <span className="font-display italic text-gold/60 text-3xl">{m.number}</span>
                  {m.highlight && <Pill tone="gold">{language === "fr" ? "Clé" : "Key"}</Pill>}
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
          eyebrow={t("home.how.eyebrow")}
          title={t("home.how.title")}
          align="center"
        />
        <div className="mt-14">
          <JourneySteps steps={currentJourney} />
        </div>
      </section>

      <CTASection />
    </>
  );
};

export default Home;
