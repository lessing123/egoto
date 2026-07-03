import React, { useState } from "react";
import { PageHero, SectionHeading } from "../components/ui";
import { MailIcon, LocationIcon, HandshakeIcon } from "../components/Icons";

const Contact = () => {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState("Utilisateur intéressé");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name,
      email,
      profile,
      message,
      _subject: `Message Egoto de ${name}`,
      _captcha: "false"
    };

    try {
      const response = await fetch("https://formsubmit.co/ajax/obeddegboevi@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setSent(true);
      } else {
        throw new Error("Erreur de soumission");
      }
    } catch (err) {
      console.error("Erreur lors de l'envoi :", err);
      // Fallback sur mailto
      const subject = encodeURIComponent(`Message Egoto de ${name}`);
      const body = encodeURIComponent(
        `Nom: ${name}\nEmail: ${email}\nProfil: ${profile}\n\nMessage:\n${message}`
      );
      window.location.href = `mailto:obeddegboevi@gmail.com?subject=${subject}&body=${body}`;
      setSent(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
          title="Reste informé(e) - on t'envoie une alerte au lancement."
          text="Tu veux essayer Egoto en avant-première ou être prévenu(e) dès le lancement ? Écris-nous, on te tient au courant." 
      />

      <section className="max-w-[900px] mx-auto px-6 sm:px-10 pb-16 text-center">
        <div className="card-surface rounded-3xl p-10">
          <h3 className="font-display font-semibold text-2xl text-paper">Pourquoi nous contacter ?</h3>
          <p className="font-body text-paper-dim text-base mt-4 leading-relaxed">
            Rejoins la liste d'attente, demande une démo, ou reçois une alerte quand l'app sera disponible.
          </p>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-6 sm:px-10 py-16 grid md:grid-cols-2 gap-14">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="Parlons de votre intérêt pour Egoto."
            text="Utilisateur·rice, leader de cercle ou simplement curieux·se : écris-nous pour être notifié·e du lancement." 
          />
          <div className="mt-8 flex flex-col gap-4 font-body text-sm">
            <div className="flex items-center gap-3">
              <MailIcon className="text-gold w-5 h-5" />
              <span className="text-paper-dim">contact@egoto.tg</span>
            </div>
            <div className="flex items-center gap-3">
              <LocationIcon className="text-gold w-5 h-5" />
              <span className="text-paper-dim">Lomé, Togo</span>
            </div>
          </div>
        </div>

        <div className="card-surface rounded-3xl p-8 sm:p-10">
          {sent ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-10">
              <HandshakeIcon className="text-gold w-12 h-12" />
              <h3 className="font-display font-semibold text-xl text-paper mt-5">Merci !</h3>
              <p className="font-body text-paper-dim text-sm mt-2">
                On a bien reçu ton message - on revient vers vous bientôt.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label className="font-body text-xs uppercase tracking-wide text-paper-dim">Nom</label>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  className="w-full mt-2 bg-ink-soft border border-ink-line rounded-xl px-4 py-3 font-body text-paper outline-none focus:border-gold transition-colors"
                  placeholder="Votre nom"
                />
              </div>
              <div>
                <label className="font-body text-xs uppercase tracking-wide text-paper-dim">Email</label>
                <input
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="w-full mt-2 bg-ink-soft border border-ink-line rounded-xl px-4 py-3 font-body text-paper outline-none focus:border-gold transition-colors"
                  placeholder="vous@exemple.com"
                />
              </div>
              <div>
                <label className="font-body text-xs uppercase tracking-wide text-paper-dim">Votre profil</label>
                <select
                  value={profile}
                  onChange={(e) => setProfile(e.target.value)}
                  className="w-full mt-2 bg-ink-soft border border-ink-line rounded-xl px-4 py-3 font-body text-paper outline-none focus:border-gold transition-colors"
                >
                  <option>Utilisateur intéressé</option>
                  <option>Ambassadeur / leader de cercle</option>
                  <option>Partenaire communautaire</option>
                  <option>Journaliste / média</option>
                  <option>Autre</option>
                </select>
              </div>
              <div>
                <label className="font-body text-xs uppercase tracking-wide text-paper-dim">Message</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full mt-2 bg-ink-soft border border-ink-line rounded-xl px-4 py-3 font-body text-paper outline-none focus:border-gold transition-colors resize-none"
                  placeholder="Parlez-nous de votre intérêt pour Egoto..."
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="mt-2 bg-gold hover:bg-gold-deep text-ink font-body font-bold px-7 py-3.5 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Envoi en cours..." : "Envoyer le message"}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
};

export default Contact;
