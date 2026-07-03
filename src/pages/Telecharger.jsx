import React from "react";
import { PageHero, SectionHeading, PrimaryButton, GhostButton } from "../components/ui";

const Telecharger = () => (
  <>
    <PageHero
      eyebrow="Télécharger Egoto"
      title="L'application arrive bientôt sur Android et iOS."
      text="Prépare-toi à accéder à tes tontines, ton épargne et ton score financier depuis une seule interface mobile."
    />

    <section className="max-w-4xl mx-auto px-6 sm:px-10 py-24 text-center">
      <SectionHeading
        title="Bientôt disponible"
        text="L'application est en préparation. Reste informé(e) pour le lancement et sois parmi les premiers à tester Egoto."
      />

      <div className="mt-14 grid gap-6 sm:grid-cols-2">
        <div className="card-surface rounded-3xl p-10">
          <h3 className="font-display font-semibold text-xl text-paper">Android</h3>
          <p className="font-body text-paper-dim text-sm mt-3 leading-relaxed">
            Dès que l'APK sera prêt, il sera disponible ici pour un accès anticipé.
          </p>
          <div className="mt-8">
            <button className="w-full bg-ink border border-ink-line text-paper font-bold px-6 py-3 rounded-full" disabled>
              Disponible bientôt
            </button>
          </div>
        </div>

        <div className="card-surface rounded-3xl p-10">
          <h3 className="font-display font-semibold text-xl text-paper">iOS</h3>
          <p className="font-body text-paper-dim text-sm mt-3 leading-relaxed">
            Un lancement sur l'App Store est prévu prochainement. Inscris-toi pour recevoir la notification.
          </p>
          <div className="mt-8">
            <button className="w-full bg-ink border border-ink-line text-paper font-bold px-6 py-3 rounded-full" disabled>
              Disponible bientôt
            </button>
          </div>
        </div>
      </div>

      <div className="mt-14 text-paper-dim text-sm leading-relaxed">
        <p>En attendant, découvre la solution Egoto et inscris-toi sur la page de contact pour recevoir les premières invitations.</p>
        <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
          <PrimaryButton to="/contact">Je veux être informé(e)</PrimaryButton>
          <GhostButton to="/solution">Voir la solution</GhostButton>
        </div>
      </div>
    </section>
  </>
);

export default Telecharger;
