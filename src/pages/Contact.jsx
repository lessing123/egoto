import React, { useState } from "react";
import { PageHero, SectionHeading } from "../components/ui";
import { MailIcon, LocationIcon, HandshakeIcon } from "../components/Icons";
import { ContactIllustration } from "../components/Illustrations";

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
      _captcha: "false",
      _cc: "obeddegboevi@gmail.com"
    };

    try {
      const response = await fetch("https://formsubmit.co/ajax/contact@egoto.xyz", {
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
      window.location.href = `mailto:contact@egoto.xyz,obeddegboevi@gmail.com?subject=${subject}&body=${body}`;
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
            <a href="mailto:contact@egoto.xyz" className="flex items-center gap-3 group">
              <span className="w-10 h-10 rounded-full bg-terracotta/10 border border-terracotta/20 flex items-center justify-center shrink-0">
                <MailIcon className="text-terracotta w-5 h-5" />
              </span>
              <div>
                <span className="text-paper font-semibold group-hover:text-terracotta transition-colors">contact@egoto.xyz</span>
                <span className="block text-paper-dim text-xs">Questions générales & liste d'attente</span>
              </div>
            </a>
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-palm/5 border border-palm/10 flex items-center justify-center shrink-0">
                <LocationIcon className="text-palm-light w-5 h-5" />
              </span>
              <div>
                <span className="text-paper font-semibold">Lomé, Togo</span>
                <span className="block text-paper-dim text-xs">Siège de l'équipe fondatrice</span>
              </div>
            </div>
          </div>

          {/* Partnership Section */}
          <div className="mt-10 card-surface rounded-2xl p-6 border-l-4 border-terracotta/40">
            <div className="flex items-start gap-3">
              <span className="w-10 h-10 rounded-full bg-terracotta/10 border border-terracotta/20 flex items-center justify-center shrink-0 mt-0.5">
                <HandshakeIcon className="text-terracotta w-5 h-5" />
              </span>
              <div>
                <h4 className="font-display font-semibold text-paper text-base">Collaborations & Partenariats</h4>
                <p className="font-body text-paper-dim text-sm mt-1.5 leading-relaxed">
                  Pour toute proposition de collaboration, de partenariat stratégique ou d'investissement, adressez-vous directement à notre équipe dirigeante.
                </p>
                <a href="mailto:prisille.gogoyi@egoto.xyz" className="inline-flex items-center gap-2 mt-3 font-body font-bold text-sm text-terracotta hover:text-paper transition-colors">
                  <MailIcon className="w-4 h-4" />
                  prisille.gogoyi@egoto.xyz
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 flex justify-center md:justify-start items-center select-none shrink-0">
            <ContactIllustration />
          </div>
        </div>

        <div className="card-surface rounded-3xl p-8 sm:p-10">
          {sent ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-10">
              <HandshakeIcon className="text-terracotta w-12 h-12" />
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
                  className="w-full mt-2 bg-ink-soft border border-ink-line rounded-xl px-4 py-3 font-body text-paper outline-none focus:border-terracotta transition-colors"
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
                  className="w-full mt-2 bg-ink-soft border border-ink-line rounded-xl px-4 py-3 font-body text-paper outline-none focus:border-terracotta transition-colors"
                  placeholder="vous@exemple.com"
                />
              </div>
              <div>
                <label className="font-body text-xs uppercase tracking-wide text-paper-dim">Votre profil</label>
                <select
                  value={profile}
                  onChange={(e) => setProfile(e.target.value)}
                  className="w-full mt-2 bg-ink-soft border border-ink-line rounded-xl px-4 py-3 font-body text-paper outline-none focus:border-terracotta transition-colors"
                >
                  <option>Utilisateur intéressé</option>
                  <option>Ambassadeur / leader de cercle</option>
                  <option>Partenaire communautaire</option>
                  <option>Collaborateur / Investisseur</option>
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
                  className="w-full mt-2 bg-ink-soft border border-ink-line rounded-xl px-4 py-3 font-body text-paper outline-none focus:border-terracotta transition-colors resize-none"
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
