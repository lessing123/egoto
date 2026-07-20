export const stats = [
  { value: "+3M", label: "participants aux tontines informelles au Togo" },
  { value: "70%", label: "de la population togolaise hors du système bancaire" },
  { value: "9/10", label: "demandes de crédit refusées faute d'historique reconnu" },
  { value: "35K", label: "utilisateurs actifs visés à 18 mois" },
];

export const problems = [
  {
    tag: "01",
    title: "Vulnérabilité de l'épargne informelle",
    text: "Les tontines traditionnelles fonctionnent à la main : collecte en espèces, registre papier, aucune traçabilité. Les fonds sont vulnérables aux pertes, aux vols et aux abus de confiance. En cas de litige, il n'existe aucune preuve formelle.",
  },
  {
    tag: "02",
    title: "Discipline financière invisible",
    text: "Des millions de Togolais·es ont une discipline d'épargne réelle et prouvée. Mais elle ne laisse aucune trace numérique. Face à une banque ou une IMF, impossible de prouver sa fiabilité : refus systématique, ou taux usuriers de 30 à 60%/an dans l'informel.",
  },
  {
    tag: "03",
    title: "Fragmentation des outils",
    text: "Une commerçante de marché jongle entre T-Money pour payer, une enveloppe pour son épargne, un carnet pour sa tontine - sans aucun lien entre eux. Pas de vision globale, pas de progression visible, pas de récompense pour la régularité.",
  },
];

export const marketRealities = [
  { title: "Non-bancarisation", text: "70% de la population active n'a pas accès aux services bancaires formels. Pas de compte, pas de carte, pas d'historique de crédit." },
  { title: "Tontines informelles", text: "3 millions+ de personnes pratiquent l'épargne collective. Cette discipline financière existe déjà - elle est juste invisible du système." },
  { title: "Mobile Money adopté", text: "Mixx by Yas et Moov Money sont déjà largement utilisés. L'infrastructure de paiement mobile existe et fonctionne." },
  { title: "Crédit inaccessible", text: "9 demandes de crédit sur 10 sont refusées faute d'historique bancaire reconnu. Les IMF cherchent des alternatives." },
  { title: "Jeunesse connectée", text: "Plus de 60% de la population a moins de 25 ans. La pénétration mobile dépasse 70% en zone urbaine." },
];

export const modules = [
  {
    number: "01",
    id: "tontines",
    title: "Tontines digitales",
    subtitle: "Cercles Egoto",
    summary: "Créez ou rejoignez un cercle en moins de deux minutes. Collecte, rappels et versements automatisés.",
    points: [
      "Nom du cercle, montant, fréquence (hebdo, bimensuel, mensuel) et ordre de rotation définis en 2 minutes",
      "Collecte automatique via Mixx by Yas ou Moov Money",
      "Rappels SMS automatiques aux retardataires",
      "Versement automatique au bénéficiaire du tour",
      "Historique complet visible par tous les membres - transparence totale",
    ],
  },
  {
    number: "02",
    id: "epargne",
    title: "Épargne & projets personnels",
    subtitle: "Bols d'épargne individuels",
    summary: "Vous cotisez vous-même, à votre rythme, pour votre propre objectif - bloqué ou libre, c'est vous qui choisissez.",
    highlight: true,
    points: [
      "Cotisation soi-même : vous seul alimentez votre bol, quand et combien vous voulez",
      "Épargne 100% individuelle : scolarité, stock de marchandise, projet immobilier, saison agricole",
      "Vous fixez le budget : montant cible et durée de l'objectif",
      "Deux modes de cotisation : calendrier fixe (montant et fréquence programmés) ou libre (vous cotisez quand vous le souhaitez)",
      "Compte bloqué ou non, à votre choix : verrouillez les fonds jusqu'à l'objectif, ou gardez un accès libre",
      "Barre de progression visuelle en temps réel vers votre objectif",
      "Option caisse commune de groupe avec vote pour chaque retrait collectif",
    ],
  },
  {
    number: "03",
    id: "score",
    title: "Score Egoto",
    subtitle: "Le passeport financier",
    summary: "Chaque cotisation payée à temps construit un score de 0 à 1000, recalculé en temps réel.",
    points: [
      "Chaque cotisation à temps, cycle de tontine complété ou objectif atteint génère des points",
      "Score de 0 à 1 000, recalculé en temps réel après chaque événement",
      "Détermine l'accès à la carte Visa et aux partenaires financiers",
      "Partageable avec des IMF partenaires, avec le consentement de l'utilisateur",
    ],
  },
  {
    number: "04",
    id: "carte",
    title: "Carte Visa Egoto",
    subtitle: "De l'épargne au paiement",
    summary: "Une carte Visa adossée au portefeuille Egoto, virtuelle puis physique, distribuée dans les marchés.",
    points: [
      "Émise en partenariat avec un programme manager certifié (Union54, Nymcard ou équivalent)",
      "D'abord virtuelle, puis physique via les agents Egoto dans les marchés",
      "Paiement partout : en ligne, en boutique, à l'étranger",
      "Carte Gold (score ≥ 600) : cashback de 1% sur les achats",
    ],
  },
  {
    number: "05",
    id: "whatsapp",
    title: "Bot WhatsApp multilingue",
    subtitle: "Le canal principal",
    summary: "Menus numérotés + compréhension du texte libre, en français, anglais puis langues locales.",
    points: [
      "Français et anglais dès le lancement, puis Mina, Ewé, Kotokoli et Kabyè",
      "Menus numérotés simples + NLP pour le texte libre",
      "Canal USSD complémentaire pour les zones sans smartphone",
      "Touche aussi bien les urbains éduqués que les commerçants du Nord-Togo",
    ],
  },
];

export const scoreTiers = [
  { range: "0 – 199", pct: 20, label: "Accès tontines et épargne uniquement" },
  { range: "200 – 499", pct: 45, label: "Carte Visa Standard virtuelle" },
  { range: "500 – 599", pct: 58, label: "Carte Visa Standard physique + mise en relation IMF" },
  { range: "600 – 799", pct: 75, label: "Carte Gold + partenaires prioritaires" },
  { range: "800 – 1000", pct: 100, label: "Carte Business Élite" },
];

export const journeySteps = [
  { step: "1", title: "Créer un cercle", text: "Montant, fréquence et ordre de rotation définis en 2 minutes." },
  { step: "2", title: "Cotiser", text: "Collecte automatique via Mixx by Yas, Moov Money, rappels SMS." },
  { step: "3", title: "Bâtir un score", text: "Chaque paiement à temps améliore le Score Egoto." },
  { step: "4", title: "Accéder au crédit", text: "Mise en relation IMF ou carte Visa Egoto selon le score atteint." },
];

export const segments = [
  { title: "Cœur de cible", desc: "Femmes commerçantes 25–50 ans, déjà dans des tontines, marchés urbains de Lomé", size: "~400 000" },
  { title: "Cible élargie", desc: "Tous participants aux tontines au Togo (hommes + femmes, urbain + rural)", size: "~3 000 000" },
  { title: "Marché potentiel", desc: "Non-bancarisés avec Mobile Money au Togo", size: "~4 500 000" },
  { title: "Expansion CEDEAO", desc: "Bénin, Burkina Faso, Côte d'Ivoire", size: "~30 000 000" },
];

export const persona = {
  name: "Da Adjo",
  age: 34,
  role: "Vendeuse de pagnes, marché d'Adawlato, Lomé",
  facts: [
    "Participe à deux tontines depuis 8 ans",
    "Gère ses cotisations sur un carnet, relance ses collègues par téléphone",
    "A un Mixx by Yas actif, s'est vu refuser un compte bancaire deux fois",
    "Fait confiance à la technologie mobile, méfiante des applications qu'elle ne comprend pas",
    "Parle Mina et français",
  ],
  quote: "Egoto ne lui demande pas de changer ses habitudes. Elle fait exactement ce qu'elle fait déjà, mais avec automatisation, traçabilité et une récompense visible pour sa régularité.",
};

export const positioning = [
  { label: "Inscription", egoto: "2 minutes, sans agence", banque: "Dossier, garanties", momo: "Simple mais limité" },
  { label: "Tontine", egoto: "Intégrée, automatisée", banque: "Non proposée", momo: "Non proposée" },
  { label: "Score crédit", egoto: "Comportemental", banque: "Bancaire classique", momo: "Absent" },
  { label: "Carte Visa", egoto: "Oui, liée au score", banque: "Oui (si accepté)", momo: "Non" },
  { label: "Langues locales", egoto: "6 langues (à venir)", banque: "Français uniquement", momo: "Français uniquement" },
  { label: "USSD", egoto: "Oui", banque: "Non", momo: "Oui" },
];

export const revenueSources = [
  {
    title: "Commission sur les transactions",
    rate: "0,5 – 1%",
    text: "Sur chaque flux financier géré : collectes, versements, transferts entre membres. Invisible pour l'utilisateur, incluse dans les frais opérateurs existants. Revenu immédiat dès le premier utilisateur actif.",
  },
  {
    title: "Mise en relation avec les IMF",
    rate: "Commission",
    text: "Dès qu'un utilisateur atteint un score ≥ 500, Egoto le met en relation avec une IMF agréée BCEAO et perçoit une commission. C'est l'IMF qui porte le risque de crédit, pas Egoto.",
  },
  {
    title: "Carte Visa Egoto",
    rate: "Abonnement + interchange",
    text: "Frais d'émission (1 500–3 000 FCFA), interchange ~1,5% partagé avec le programme manager, abonnement Gold (2 000 FCFA/mois) et Business (5 000 FCFA/mois).",
  },
  {
    title: "Freemium groupes",
    rate: "500 – 1 000 FCFA/mois",
    text: "Gratuit pour les cercles de moins de 10 membres. Au-delà, abonnement pour les fonctionnalités avancées : caisse commune avec vote, export d'historiques, notifications dédiées.",
  },
];

export const revenueProjection = [
  { source: "Commissions transactions", m6: "490 000", m12: "1 470 000", m18: "3 430 000" },
  { source: "Mise en relation IMF", m6: "0", m12: "400 000", m18: "1 200 000" },
  { source: "Carte Visa (abonn. + interchange)", m6: "200 000", m12: "1 100 000", m18: "4 500 000" },
  { source: "Freemium groupes", m6: "150 000", m12: "450 000", m18: "1 050 000" },
];

export const revenueTotals = { m6: "840 000", m12: "3 420 000", m18: "10 180 000" };

export const phases = [
  {
    tag: "Phase 1",
    period: "Mois 1 – 6",
    title: "MVP Lomé",
    goal: "5 000 utilisateurs",
    points: [
      "20 ambassadrices fondatrices dans 3 marchés : Adawlato, Adidogomé, Hédzranawoé",
      "Accompagnement terrain individuel pendant 30 jours par ambassadrice",
      "Parrainage : 5 000 FCFA offerts par chef de cercle parrainé",
      "Agent Egoto physique présent les jours de marché",
      "Aucune publicité payante - priorité à la qualité sur les 100 premiers cercles",
    ],
  },
  {
    tag: "Phase 2",
    period: "Mois 7 – 12",
    title: "Croissance régionale",
    goal: "15 000 utilisateurs",
    points: [
      "Extension à Kpalimé, Atakpamé et Sokodé avec agents locaux",
      "Partenariats avec 3 à 5 coopératives de femmes (200 à 1 000 membres chacune)",
      "Partenariat avec des associations religieuses pratiquant la tontine",
      "Lancement de la carte Visa Egoto Standard",
      "Campagne sur réseaux sociaux locaux (TikTok Togo, Facebook)",
    ],
  },
  {
    tag: "Phase 3",
    period: "Mois 13 – 18",
    title: "Carte & échelle",
    goal: "35 000 utilisateurs",
    points: [
      "Lancement de la carte Gold et partenariats IMF formalisés",
      "Ouverture aux entreprises : tontines d'entreprise, salaires collectifs",
      "Préparation de l'expansion CEDEAO : Bénin, Burkina Faso en priorité",
      "Entrée dans des programmes d'accélération régionaux (AfricArena, Seedstars Africa)",
    ],
  },
];

export const roadmap = [
  { period: "Mois 1–3", milestone: "MVP bot WhatsApp + tontine + épargne, 20 ambassadrices, 3 marchés Lomé", users: "500", revenue: "En cours de validation" },
  { period: "Mois 4–6", milestone: "Score Egoto actif, carte Visa virtuelle, intégration T-Money/Flooz complète", users: "5 000", revenue: "840 000 FCFA/mois" },
  { period: "Mois 7–9", milestone: "Extension régionale, partenariats coopératives, carte physique", users: "10 000", revenue: "2 000 000 FCFA/mois" },
  { period: "Mois 10–12", milestone: "Score partagé IMF, carte Gold lancée, partenariat Yas & Moov", users: "15 000", revenue: "3 420 000 FCFA/mois" },
  { period: "Mois 13–15", milestone: "Carte Business, premiers partenariats IMF formalisés, série A préparée", users: "25 000", revenue: "6 000 000 FCFA/mois" },
  { period: "Mois 16–18", milestone: "Seuil de rentabilité atteint, préparation expansion CEDEAO", users: "35 000", revenue: "10 180 000 FCFA/mois" },
];

export const team = [
  {
    name: "Tairou Achiraf",
    role: "Lead Engineering & Intégrations",
    expertise: "Python, React, SQL, fintech, cybersécurité financière, certifications gestion des risques",
    initials: "TA",
  },
  {
    name: "Degboevi Obed",
    role: "Lead Produit & Tech",
    expertise: "IA appliquée, data science, projet FraudDetectAI (détection de fraude paiements mobiles), expérience GVA-Togo",
    initials: "DO",
  },
  {
    name: "Gogoyi Priscille",
    role: "Growth & Conformité",
    expertise: "Gestion de projets et de crises, BI Analyst, expérience OMOA (secteur ATM et fintech)",
    initials: "GP",
  },
];

export const risks = [
  { title: "Réglementation BCEAO", level: "Moyen", desc: "Accès à la collecte de fonds soumis à agrément", mitigation: "Partenariat avec un EME agréé (ex : Togocom) plutôt que licence propre" },
  { title: "Adoption technologique", level: "Moyen", desc: "Résistance des non-digitaux aux outils mobiles", mitigation: "USSD obligatoire + agents terrain pour la première utilisation" },
  { title: "Confiance utilisateurs", level: "Élevé", desc: "Appli financière = argent = méfiance naturelle", mitigation: "Ambassadrices fondatrices, transparence de l'historique, garantie partenaire bancaire" },
  { title: "Fraude carte", level: "Moyen", desc: "Risque de fraude sur la carte Visa Egoto", mitigation: "Plafonds bas en phase 1, 3D Secure, blocage instantané" },
  { title: "Concurrence", level: "Faible", desc: "Copies par opérateurs télécom ou fintechs externes", mitigation: "Ancrage culturel, agents, communauté, donnée de scoring accumulée" },
  { title: "Qualité du service", level: "Élevé", desc: "Bug ou retard = perte de confiance immédiate", mitigation: "0 bug toléré sur les 100 premiers cercles, support téléphonique dédié" },
];

export const funding = [
  { source: "Apport fondateurs", amount: "10 000 000 FCFA", desc: "Mise de fonds propres, signal de sérieux (skin in the game)" },
  { source: "Grants non-dilutifs", amount: "20 000 000 FCFA", desc: "AFD, UNCDF, GIZ - financement sur le volet inclusion financière" },
  { source: "Seed round investisseurs", amount: "50 000 000 FCFA", desc: "Impact investors africains (Partech Africa, Orange Ventures)" },
  { source: "Partenariat Yas & Moov", amount: "En nature", desc: "Accès USSD, réseau agents, distribution pré-installée" },
];

export const asks = [
  { title: "Structurer l'idée", text: "Affiner le modèle économique et la conformité réglementaire BCEAO" },
  { title: "Construire le MVP", text: "Accompagnement technique pour le prototype USSD / Mobile Money" },
  { title: "Premiers clients", text: "Mise en relation avec un réseau pilote à Lomé" },
  { title: "Partenaires clés", text: "Introduction à un EME agréé BCEAO et à des IMF locales" },
];
