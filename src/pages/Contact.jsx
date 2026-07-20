import React, { useState, useEffect } from "react";
import { PageHero, SectionHeading } from "../components/ui";
import { MailIcon, LocationIcon, HandshakeIcon } from "../components/Icons";
import { ContactIllustration } from "../components/Illustrations";
import { useLanguage } from "../context/LanguageContext";

const Contact = () => {
  const { t, language } = useLanguage();
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState("");
  const [message, setMessage] = useState("");

  const options = language === "fr" ? [
    "Utilisateur intéressé",
    "Ambassadeur / leader de cercle",
    "Partenaire communautaire",
    "Collaborateur / Investisseur",
    "Journaliste / média",
    "Autre"
  ] : [
    "Interested User",
    "Ambassador / Circle Leader",
    "Community Partner",
    "Collaborator / Investor",
    "Journalist / Media",
    "Other"
  ];

  useEffect(() => {
    setProfile(options[0]);
  }, [language]);

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
        eyebrow={t("contact.hero.eyebrow")}
        title={t("contact.hero.title")}
        text={t("contact.hero.text")} 
      />

      <section className="max-w-[900px] mx-auto px-6 sm:px-10 pb-16 text-center">
        <div className="card-surface rounded-3xl p-10">
          <h3 className="font-display font-semibold text-2xl text-paper">{t("contact.why.title")}</h3>
          <p className="font-body text-paper-dim text-base mt-4 leading-relaxed">
            {t("contact.why.desc")}
          </p>
        </div>
      </section>

      <section className="max-w-[1100px] mx-auto px-6 sm:px-10 pb-24">
        <div className="grid md:grid-cols-[380px_1fr] gap-12 items-start">
          <div className="flex flex-col gap-6">
            <div className="card-surface rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <span className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0 mt-0.5">
                  <MailIcon className="text-gold w-5 h-5" />
                </span>
                <div>
                  <h4 className="font-display font-semibold text-paper text-base">Email</h4>
                  <p className="font-body text-paper-dim text-[13px] mt-1.5 leading-relaxed">
                    {language === "fr" ? "Questions générales & liste d'attente" : "General questions & waiting list"}
                  </p>
                  <a href="mailto:contact@egoto.xyz" className="inline-flex items-center gap-2 mt-3 font-body font-bold text-sm text-gold hover:text-paper transition-colors">
                    contact@egoto.xyz
                  </a>
                </div>
              </div>
            </div>

            <div className="card-surface rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <span className="w-10 h-10 rounded-full bg-palm/10 border border-palm/20 flex items-center justify-center shrink-0 mt-0.5">
                  <LocationIcon className="text-palm w-5 h-5" />
                </span>
                <div>
                  <h4 className="font-display font-semibold text-paper text-base">{language === "fr" ? "Bureaux" : "Office"}</h4>
                  <p className="font-body text-paper-dim text-sm mt-1.5 leading-relaxed">
                    Lomé, Togo
                  </p>
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
                  <h4 className="font-display font-semibold text-paper text-base">{t("contact.collab.title")}</h4>
                  <p className="font-body text-paper-dim text-sm mt-1.5 leading-relaxed">
                    {t("contact.collab.desc")}
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
                <h3 className="font-display font-semibold text-xl text-paper mt-5">{t("contact.success.title")}</h3>
                <p className="font-body text-paper-dim text-sm mt-2">
                  {t("contact.success.desc")}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label className="font-body text-xs uppercase tracking-wide text-paper-dim">{t("contact.form.name")}</label>
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    className="w-full mt-2 bg-ink-soft border border-ink-line rounded-xl px-4 py-3 font-body text-paper outline-none focus:border-terracotta transition-colors"
                    placeholder={t("contact.form.name.placeholder")}
                  />
                </div>
                <div>
                  <label className="font-body text-xs uppercase tracking-wide text-paper-dim">{t("contact.form.email")}</label>
                  <input
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="w-full mt-2 bg-ink-soft border border-ink-line rounded-xl px-4 py-3 font-body text-paper outline-none focus:border-terracotta transition-colors"
                    placeholder={t("contact.form.email.placeholder")}
                  />
                </div>
                <div>
                  <label className="font-body text-xs uppercase tracking-wide text-paper-dim">{t("contact.form.profile")}</label>
                  <select
                    value={profile}
                    onChange={(e) => setProfile(e.target.value)}
                    className="w-full mt-2 bg-ink-soft border border-ink-line rounded-xl px-4 py-3 font-body text-paper outline-none focus:border-terracotta transition-colors"
                  >
                    {options.map((opt) => (
                      <option key={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-body text-xs uppercase tracking-wide text-paper-dim">{t("contact.form.message")}</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full mt-2 bg-ink-soft border border-ink-line rounded-xl px-4 py-3 font-body text-paper outline-none focus:border-terracotta transition-colors resize-none"
                    placeholder={language === "fr" ? "Parlez-nous de votre intérêt pour Egoto..." : "Tell us about your interest in Egoto..."}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 bg-gold hover:bg-gold-deep text-ink font-body font-bold px-7 py-3.5 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? t("btn.sending") : t("btn.send")}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
