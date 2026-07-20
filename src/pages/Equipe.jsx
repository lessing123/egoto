import React from "react";
import { PageHero } from "../components/ui";
import { TeamIllustration } from "../components/Illustrations";

const Equipe = () => {
  const members = [
    {
      name: "Gogoyi Priscille",
      title: "Growth & Conformité",
      phone: "+22870927990",
      label: "+228 70 92 79 90",
    },
    {
      name: "Degboevi Obed",
      title: "Lead Produit & Tech",
      phone: "+22892693362",
      label: "+228 92 69 33 62",
    },
    {
      name: "Tairou Achiraf",
      title: "Lead Engineering & Intégrations",
      phone: "+22893871963",
      label: "+228 93 87 19 63",
    },
  ];

  return (
    <>
      <PageHero eyebrow="Équipe" title="Les personnes derrière Egoto" />

      <section className="max-w-5xl mx-auto px-6 sm:px-10 py-24">
        <div className="grid md:grid-cols-[1fr_340px] gap-12 items-center">
          <div className="grid gap-6">
            {members.map((m) => (
              <div key={m.name} className="card-surface rounded-2xl p-6">
                <div className="flex flex-col gap-4">
                  <div>
                    <h3 className="font-display font-semibold text-lg text-paper">{m.name}</h3>
                    <p className="font-body text-paper-dim text-sm mt-2">{m.title}</p>
                  </div>
                  <a
                    href={`https://wa.me/${m.phone.replace("+", "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-ink-line bg-white/80 px-4 py-2 text-sm font-body text-paper-dim transition-colors hover:border-gold hover:text-gold"
                  >
                    <img src="/whatsapp.svg" alt="WhatsApp" className="w-4 h-4" />
                    <span>{m.label}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center select-none shrink-0">
            <TeamIllustration />
          </div>
        </div>
      </section>
    </>
  );
};

export default Equipe;
