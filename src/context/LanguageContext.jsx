import React, { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

const translations = {
  fr: {
    // Navbar & Common
    "nav.why": "Pourquoi Egoto",
    "nav.features": "Fonctionnalités",
    "nav.team": "Équipe",
    "nav.download": "Télécharger",
    "nav.contact": "Contact",
    "btn.getApp": "Je veux l'app",
    "btn.joinPilot": "Rejoindre le pilote",
    "btn.beInformed": "Je veux être informé(e)",
    "btn.seeSolution": "Voir la solution",
    "btn.backHome": "Retour à l'accueil",
    "btn.sending": "Envoi en cours...",
    "btn.send": "Envoyer le message",
    
    // Footer
    "footer.desc": "La fintech inclusive qui digitalise l'épargne collective et construit votre historique financier.",
    "footer.title.links": "Liens utiles",
    "footer.title.contact": "Contact",
    "footer.rights": "Tous droits réservés.",
    "footer.partnerships": "Partenariats",
    
    // Contact Page
    "contact.hero.eyebrow": "Contact",
    "contact.hero.title": "Reste informé(e) - on t'envoie une alerte au lancement.",
    "contact.hero.text": "Tu veux essayer Egoto en avant-première ou être prévenu(e) dès le lancement ? Écris-nous, on te tient au courant.",
    "contact.why.title": "Pourquoi nous contacter ?",
    "contact.why.desc": "Rejoins la liste d'attente, demande une démo, ou reçois une alerte quand l'app sera disponible.",
    "contact.form.name": "Nom",
    "contact.form.name.placeholder": "Votre nom",
    "contact.form.email": "Email",
    "contact.form.email.placeholder": "vous@exemple.com",
    "contact.form.profile": "Votre profil",
    "contact.form.message": "Message",
    "contact.form.message.placeholder": "Votre message...",
    "contact.success.title": "Merci !",
    "contact.success.desc": "On a bien reçu ton message - on revient vers vous bientôt.",
    "contact.collab.title": "Collaborations & Partenariats",
    "contact.collab.desc": "Pour toute proposition de collaboration, de partenariat stratégique ou d'investissement, adressez-vous directement à notre équipe dirigeante.",
    
    // Team Page
    "team.hero.eyebrow": "Équipe",
    "team.hero.title": "Les personnes derrière Egoto",
    "team.cta.write": "Écrire sur WhatsApp",
    
    // Download Page
    "download.hero.eyebrow": "Télécharger Egoto",
    "download.hero.title": "L'application arrive bientôt sur Android et iOS.",
    "download.hero.text": "Prépare-toi à accéder à tes tontines, ton épargne et ton score financier depuis une seule interface mobile.",
    "download.soon.title": "Bientôt disponible",
    "download.soon.text": "L'application est en préparation. Reste informé(e) pour le lancement et sois parmi les premiers à tester Egoto.",
    "download.soon.btn": "Disponible bientôt",
    "download.android.desc": "Dès que l'APK sera prêt, il sera disponible ici pour un accès anticipé.",
    "download.ios.desc": "Un lancement sur l'App Store est prévu prochainement. Inscris-toi pour recevoir la notification.",
    "download.footer.text": "En attendant, découvre la solution Egoto et inscris-toi sur la page de contact pour recevoir les premières invitations.",
    "cta.eyebrow": "Prêt à tester",
    "cta.title": "Rejoins la liste d'attente de l'application Egoto.",
    "cta.desc": "Sois informé(e) du lancement, découvre les fonctionnalités en avant-première et préinscris-toi pour la version mobile.",
    
    // Home Page sections
    "home.prob.eyebrow": "Le problème",
    "home.prob.title": "Une discipline financière forte - trop souvent invisible.",
    "home.prob.text": "Les tontines fonctionnent. Elles sont fiables et humaines, mais leur organisation reste souvent opaque et peu reconnue par les services financiers formels.",
    "home.prob.link": "Voir l'analyse complète du marché",
    "home.sol.eyebrow": "La solution",
    "home.sol.title": "Cinq outils simples, un portefeuille commun.",
    "home.sol.text": "Egoto respecte les pratiques existantes et leur apporte mémoire, transparence et options financières adaptées au mobile.",
    "home.how.eyebrow": "Comment ça marche",
    "home.how.title": "De la tontine au crédit - expliqué en quatre étapes.",
    
    // Solutions Page
    "sol.hero.eyebrow": "Fonctionnalités",
    "sol.hero.title": "Une suite d'outils digitaux conçus pour le marché informel.",
    "sol.hero.text": "Découvrez comment Egoto transforme l'épargne traditionnelle en opportunités financières réelles sans changer vos habitudes.",
    "sol.intro.title": "L'écosystème Egoto",
    "sol.intro.text": "Cinq briques interconnectées pour digitaliser, sécuriser et valoriser vos pratiques d'épargne au quotidien.",
    "sol.score.title": "Évolution du Score Egoto",
    "sol.score.text": "Votre comportement d'épargne est votre meilleure garantie. Suivez votre progression à chaque palier de score atteint.",
    
    // Market Page
    "market.hero.eyebrow": "Marché & Cible",
    "market.hero.title": "L'inclusion financière commence par la tontine.",
    "market.hero.text": "Des millions de Togolais·es épargnent déjà de manière organisée. Egoto connecte cette épargne au système formel.",
    "market.target.title": "Taille du marché adressable",
    "market.target.text": "De Lomé aux marchés régionaux, un potentiel d'impact massif.",
    "market.persona.title": "Profil Utilisateur (Persona)",
    "market.persona.text": "Comprendre les besoins de nos membres à travers l'exemple de Da Adjo.",
    "market.comp.title": "Positionnement Concurrentiel",
    "market.comp.text": "Pourquoi Egoto apporte une valeur unique face aux banques et au Mobile Money traditionnel.",
    
    // Business Model Page
    "bm.hero.eyebrow": "Modèle Économique",
    "bm.hero.title": "Une monétisation durable au service de l'impact.",
    "bm.bm.title": "Sources de revenus",
    "bm.bm.text": "Quatre piliers de revenus clairs, axés sur les commissions et les services à valeur ajoutée.",
    "bm.proj.title": "Projections Financières",
    "bm.proj.text": "Estimation des revenus mensuels (en FCFA) selon les phases de croissance.",
    
    // Roadmap Page
    "roadmap.hero.eyebrow": "Feuille de Route & Risques",
    "roadmap.hero.title": "Notre plan d'exécution pour les 18 prochains mois.",
    "roadmap.phases.title": "Phases de déploiement",
    "roadmap.phases.text": "Une approche progressive de Lomé vers les régions et la sous-région.",
    "roadmap.roadmap.title": "Calendrier & Jalons",
    "roadmap.roadmap.text": "Objectifs d'utilisateurs et estimations de revenus par trimestre.",
    "roadmap.risks.title": "Gestion des Risques & Financement",
    "roadmap.risks.text": "Comment nous anticipons les défis réglementaires et finançons notre croissance.",
    "roadmap.risks.col.title": "Analyse des Risques",
    "roadmap.funding.col.title": "Plan de Financement",
    "roadmap.funding.desc": "Ressources mobilisées pour soutenir notre exécution."
  },
  en: {
    // Navbar & Common
    "nav.why": "Why Egoto",
    "nav.features": "Features",
    "nav.team": "Team",
    "nav.download": "Download",
    "nav.contact": "Contact",
    "btn.getApp": "Get the app",
    "btn.joinPilot": "Join the pilot",
    "btn.beInformed": "Keep me informed",
    "btn.seeSolution": "See the solution",
    "btn.backHome": "Back to Home",
    "btn.sending": "Sending...",
    "btn.send": "Send Message",
    
    // Footer
    "footer.desc": "The inclusive fintech that digitalizes collective savings and builds your financial history.",
    "footer.title.links": "Useful Links",
    "footer.title.contact": "Contact",
    "footer.rights": "All rights reserved.",
    "footer.partnerships": "Partnerships",
    
    // Contact Page
    "contact.hero.eyebrow": "Contact",
    "contact.hero.title": "Stay informed - we'll send you an alert at launch.",
    "contact.hero.text": "Want to try Egoto in preview or be notified at launch? Write to us, we will keep you updated.",
    "contact.why.title": "Why contact us?",
    "contact.why.desc": "Join the waiting list, request a demo, or get an alert when the app is available.",
    "contact.form.name": "Name",
    "contact.form.name.placeholder": "Your name",
    "contact.form.email": "Email",
    "contact.form.email.placeholder": "you@example.com",
    "contact.form.profile": "Your profile",
    "contact.form.message": "Message",
    "contact.form.message.placeholder": "Your message...",
    "contact.success.title": "Thank you!",
    "contact.success.desc": "We have received your message - we will get back to you soon.",
    "contact.collab.title": "Collaborations & Partnerships",
    "contact.collab.desc": "For any collaboration, strategic partnership, or investment proposal, please contact our management team directly.",
    
    // Team Page
    "team.hero.eyebrow": "Team",
    "team.hero.title": "The people behind Egoto",
    "team.cta.write": "Write on WhatsApp",
    
    // Download Page
    "download.hero.eyebrow": "Download Egoto",
    "download.hero.title": "The app is coming soon on Android and iOS.",
    "download.hero.text": "Get ready to access your tontines, your savings and your financial score from a single mobile interface.",
    "download.soon.title": "Coming Soon",
    "download.soon.text": "The application is in preparation. Stay informed for the launch and be among the first to test Egoto.",
    "download.soon.btn": "Available soon",
    "download.android.desc": "As soon as the APK is ready, it will be available here for early access.",
    "download.ios.desc": "An App Store launch is planned soon. Sign up to receive the notification.",
    "download.footer.text": "In the meantime, discover the Egoto solution and register on the contact page to receive the first invitations.",
    "cta.eyebrow": "Ready to test",
    "cta.title": "Join the Egoto app waiting list.",
    "cta.desc": "Be notified of the launch, discover the features in preview and pre-register for the mobile version.",
    
    // Home Page sections
    "home.prob.eyebrow": "The problem",
    "home.prob.title": "A strong financial discipline - too often invisible.",
    "home.prob.text": "Tontines work. They are reliable and human, but their organization often remains opaque and unrecognized by formal financial services.",
    "home.prob.link": "See full market analysis",
    "home.sol.eyebrow": "The solution",
    "home.sol.title": "Five simple tools, one common wallet.",
    "home.sol.text": "Egoto respects existing practices and brings them memory, transparency and financial options adapted to mobile.",
    "home.how.eyebrow": "How it works",
    "home.how.title": "From tontine to credit - explained in four steps.",
    
    // Solutions Page
    "sol.hero.eyebrow": "Features",
    "sol.hero.title": "A suite of digital tools designed for the informal market.",
    "sol.hero.text": "Discover how Egoto transforms traditional savings into real financial opportunities without changing your habits.",
    "sol.intro.title": "The Egoto Ecosystem",
    "sol.intro.text": "Five interconnected blocks to digitalize, secure and value your daily savings practices.",
    "sol.score.title": "Evolution of the Egoto Score",
    "sol.score.text": "Your savings behavior is your best guarantee. Track your progress at each score level reached.",
    
    // Market Page
    "market.hero.eyebrow": "Market & Target",
    "market.hero.title": "Financial inclusion starts with the tontine.",
    "market.hero.text": "Millions of Togolese already save in an organized way. Egoto connects these savings to the formal system.",
    "market.target.title": "Addressable Market Size",
    "market.target.text": "From Lomé to regional markets, a massive potential for impact.",
    "market.persona.title": "User Profile (Persona)",
    "market.persona.text": "Understanding the needs of our members through the example of Da Adjo.",
    "market.comp.title": "Competitive Positioning",
    "market.comp.text": "Why Egoto brings unique value compared to banks and traditional Mobile Money.",
    
    // Business Model Page
    "bm.hero.eyebrow": "Business Model",
    "bm.hero.title": "Sustainable monetization serving impact.",
    "bm.bm.title": "Revenue Streams",
    "bm.bm.text": "Four clear revenue pillars, focused on commissions and value-added services.",
    "bm.proj.title": "Financial Projections",
    "bm.proj.text": "Estimated monthly revenues (in FCFA) according to growth phases.",
    
    // Roadmap Page
    "roadmap.hero.eyebrow": "Roadmap & Risks",
    "roadmap.hero.title": "Our execution plan for the next 18 months.",
    "roadmap.phases.title": "Deployment Phases",
    "roadmap.phases.text": "A progressive approach from Lomé to the regions and sub-region.",
    "roadmap.roadmap.title": "Timeline & Milestones",
    "roadmap.roadmap.text": "User goals and revenue estimates by quarter.",
    "roadmap.risks.title": "Risk Management & Funding",
    "roadmap.risks.text": "How we anticipate regulatory challenges and fund our growth.",
    "roadmap.risks.col.title": "Risk Analysis",
    "roadmap.funding.col.title": "Funding Plan",
    "roadmap.funding.desc": "Resources mobilized to support our execution."
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("egoto_lang") || "fr";
  });

  useEffect(() => {
    localStorage.setItem("egoto_lang", language);
  }, [language]);

  const t = (key) => {
    return translations[language][key] || translations["fr"][key] || key;
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "fr" ? "en" : "fr"));
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
