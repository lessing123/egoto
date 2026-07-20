export const stats = {
  fr: [
    { value: "+3M", label: "participants aux tontines informelles au Togo" },
    { value: "70%", label: "de la population togolaise hors du système bancaire" },
    { value: "9/10", label: "demandes de crédit refusées faute d'historique reconnu" },
    { value: "35K", label: "utilisateurs actifs visés à 18 mois" },
  ],
  en: [
    { value: "+3M", label: "participants in informal tontines in Togo" },
    { value: "70%", label: "of the Togolese population outside the banking system" },
    { value: "9/10", label: "credit requests rejected due to lack of recognized history" },
    { value: "35K", label: "active users targeted within 18 months" },
  ]
};

export const problems = {
  fr: [
    {
      tag: "01",
      title: "Vulnérabilité de l'épargne informelle",
      text: "Les tontines traditionnelles fonctionnent à la main : collecte en espèces, registre papier, aucune traçabilité. Les fonds sont vulnérables aux pertes, aux vols et aux abus de confiance. En cas de litige, il n'existe aucune preuve formelle.",
    },
    {
      tag: "02",
      title: "Discipline financière invisible",
      text: "Des millions de Togolais·es ont une discipline d'épargne réelle et pouvée. Mais elle ne laisse aucune trace numérique. Face à une banque ou une IMF, impossible de prouver sa fiabilité : refus systématique, ou taux usuriers de 30 à 60%/an dans l'informel.",
    },
    {
      tag: "03",
      title: "Fragmentation des outils",
      text: "Une commerçante de marché jongle entre T-Money pour payer, une enveloppe pour son épargne, un carnet pour sa tontine - sans aucun lien entre eux. Pas de vision globale, pas de progression visible, pas de récompense pour la régularité.",
    },
  ],
  en: [
    {
      tag: "01",
      title: "Vulnerability of informal savings",
      text: "Traditional tontines operate manually: cash collection, paper registers, no traceability. Funds are vulnerable to loss, theft, and breach of trust. In case of dispute, there is no formal proof.",
    },
    {
      tag: "02",
      title: "Invisible financial discipline",
      text: "Millions of Togolese have a real and proven savings discipline. But it leaves no digital trace. When facing a bank or an MFI, it is impossible to prove one's reliability: systematic refusal, or usurious rates of 30 to 60%/year in the informal sector.",
    },
    {
      tag: "03",
      title: "Fragmentation of tools",
      text: "A market trader juggles between T-Money for paying, an envelope for her savings, a logbook for her tontine - without any link between them. No global vision, no visible progress, no reward for consistency.",
    },
  ]
};

export const marketRealities = {
  fr: [
    { title: "Non-bancarisation", text: "70% de la population active n'a pas accès aux services bancaires formels. Pas de compte, pas de carte, pas d'historique de crédit." },
    { title: "Tontines informelles", text: "3 millions+ de personnes pratiquent l'épargne collective. Cette discipline financière existe déjà - elle est juste invisible du système." },
    { title: "Mobile Money adopté", text: "T-Money et Moov Money sont déjà largement utilisés. L'infrastructure de paiement mobile existe et fonctionne." },
    { title: "Crédit inaccessible", text: "9 demandes de crédit sur 10 sont refusées faute d'historique bancaire reconnu. Les IMF cherchent des alternatives." },
    { title: "Jeunesse connectée", text: "Plus de 60% de la population a moins de 25 ans. La pénétration mobile dépasse 70% en zone urbaine." },
  ],
  en: [
    { title: "Unbanked Population", text: "70% of the active population does not have access to formal banking services. No account, no card, no credit history." },
    { title: "Informal Tontines", text: "3 million+ people practice collective savings. This financial discipline already exists - it is just invisible to the system." },
    { title: "Mobile Money Adopted", text: "T-Money and Moov Money are already widely used. The mobile payment infrastructure exists and works." },
    { title: "Inaccessible Credit", text: "9 out of 10 credit requests are rejected due to lack of a recognized banking history. MFIs are looking for alternatives." },
    { title: "Connected Youth", text: "Over 60% of the population is under 25 years old. Mobile penetration exceeds 70% in urban areas." },
  ]
};

export const modules = {
  fr: [
    {
      number: "01",
      id: "tontines",
      title: "Tontines digitales",
      subtitle: "Cercles Egoto",
      summary: "Créez ou rejoignez un cercle en moins de deux minutes. Collecte, rappels et versements automatisés.",
      points: [
        "Nom du cercle, montant, fréquence (hebdo, bimensuel, mensuel) et ordre de rotation définis en 2 minutes",
        "Collecte automatique via T-Money ou Moov Money",
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
  ],
  en: [
    {
      number: "01",
      id: "tontines",
      title: "Digital Tontines",
      subtitle: "Egoto Circles",
      summary: "Create or join a circle in less than two minutes. Automated collection, reminders and payouts.",
      points: [
        "Circle name, amount, frequency (weekly, bi-weekly, monthly) and rotation order defined in 2 minutes",
        "Automated collection via T-Money or Moov Money",
        "Automated SMS reminders to late payers",
        "Automated payout to the beneficiary of the turn",
        "Complete history visible to all members - total transparency",
      ],
    },
    {
      number: "02",
      id: "epargne",
      title: "Savings & Personal Projects",
      subtitle: "Individual Savings Bowls",
      summary: "Save at your own pace for your own objective - locked or flexible, you choose.",
      highlight: true,
      points: [
        "Self-contribution: only you fund your bowl, when and how much you want",
        "100% individual savings: school fees, stock of goods, real estate project, agricultural season",
        "You set the budget: target amount and duration of the objective",
        "Two contribution modes: fixed schedule (programmed amount and frequency) or free (save whenever you want)",
        "Locked or flexible account, your choice: lock funds until the objective is reached, or keep flexible access",
        "Real-time visual progress bar towards your goal",
        "Option for group joint savings with voting for each collective withdrawal",
      ],
    },
    {
      number: "03",
      id: "score",
      title: "Egoto Score",
      subtitle: "The Financial Passport",
      summary: "Each contribution paid on time builds a score from 0 to 1000, recalculated in real time.",
      points: [
        "Each on-time contribution, tontine cycle completed or goal reached generates points",
        "Score from 0 to 1,000, recalculated in real time after each event",
        "Determines access to the Visa card and financial partners",
        "Shareable with partner MFIs, with the user's consent",
      ],
    },
    {
      number: "04",
      id: "carte",
      title: "Egoto Visa Card",
      subtitle: "From Savings to Payment",
      summary: "A Visa card linked to the Egoto wallet, virtual first, then physical, distributed in markets.",
      points: [
        "Issued in partnership with a certified program manager (Union54, Nymcard or equivalent)",
        "First virtual, then physical via Egoto agents in markets",
        "Pay anywhere: online, in-store, abroad",
        "Gold Card (score ≥ 600): 1% cashback on purchases",
      ],
    },
    {
      number: "05",
      id: "whatsapp",
      title: "Multilingual WhatsApp Bot",
      subtitle: "The Main Channel",
      summary: "Numbered menus + text understanding in French, English, and then local languages.",
      points: [
        "French and English at launch, followed by Mina, Ewé, Kotokoli, and Kabyè",
        "Simple numbered menus + NLP for free text",
        "Complementary USSD channel for zones without smartphones",
        "Reaches both educated urban users and traders in North Togo",
      ],
    },
  ]
};

export const scoreTiers = {
  fr: [
    { range: "0 – 199", pct: 20, label: "Accès tontines et épargne uniquement" },
    { range: "200 – 499", pct: 45, label: "Carte Visa Standard virtuelle" },
    { range: "500 – 599", pct: 58, label: "Carte Visa Standard physique + mise en relation IMF" },
    { range: "600 – 799", pct: 75, label: "Carte Gold + partenaires prioritaires" },
    { range: "800 – 1000", pct: 100, label: "Carte Business Élite" },
  ],
  en: [
    { range: "0 – 199", pct: 20, label: "Access to tontines and savings only" },
    { range: "200 – 499", pct: 45, label: "Virtual Standard Visa Card" },
    { range: "500 – 599", pct: 58, label: "Physical Standard Visa Card + MFI introduction" },
    { range: "600 – 799", pct: 75, label: "Gold Card + priority partners" },
    { range: "800 – 1000", pct: 100, label: "Business Elite Card" },
  ]
};

export const journeySteps = {
  fr: [
    { step: "1", title: "Créer un cercle", text: "Montant, fréquence et ordre de rotation définis en 2 minutes." },
    { step: "2", title: "Cotiser", text: "Collecte automatique via T-Money, Moov Money, rappels SMS." },
    { step: "3", title: "Bâtir un score", text: "Chaque paiement à temps améliore le Score Egoto." },
    { step: "4", title: "Accéder au crédit", text: "Mise en relation IMF ou carte Visa Egoto selon le score atteint." },
  ],
  en: [
    { step: "1", title: "Create a circle", text: "Amount, frequency and rotation order defined in 2 minutes." },
    { step: "2", title: "Contribute", text: "Automated collection via T-Money, Moov Money, SMS reminders." },
    { step: "3", title: "Build a score", text: "Each on-time payment improves the Egoto Score." },
    { step: "4", title: "Access credit", text: "MFI introduction or Egoto Visa card according to score reached." },
  ]
};

export const segments = {
  fr: [
    { title: "Cœur de cible", desc: "Femmes commerçantes 25–50 ans, déjà dans des tontines, marchés urbains de Lomé", size: "~400 000" },
    { title: "Cible élargie", desc: "Tous participants aux tontines au Togo (hommes + femmes, urbain + rural)", size: "~3 000 000" },
    { title: "Marché potentiel", desc: "Non-bancarisés avec Mobile Money au Togo", size: "~4 500 000" },
    { title: "Expansion CEDEAO", desc: "Bénin, Burkina Faso, Côte d'Ivoire", size: "~30 000 000" },
  ],
  en: [
    { title: "Core Target", desc: "Women traders aged 25–50, already in tontines, urban markets of Lomé", size: "~400,000" },
    { title: "Broad Target", desc: "All tontine participants in Togo (men + women, urban + rural)", size: "~3,000,000" },
    { title: "Potential Market", desc: "Unbanked people with Mobile Money in Togo", size: "~4,500,000" },
    { title: "ECOWAS Expansion", desc: "Benin, Burkina Faso, Ivory Coast", size: "~30,000,000" },
  ]
};

export const persona = {
  fr: {
    name: "Da Adjo",
    age: 34,
    role: "Vendeuse de pagnes, marché d'Adawlato, Lomé",
    facts: [
      "Participe à deux tontines depuis 8 ans",
      "Gère ses cotisations sur un carnet, relance ses collègues par téléphone",
      "A un T-Money actif, s'est vu refuser un compte bancaire deux fois",
      "Fait confiance à la technologie mobile, méfiante des applications qu'elle ne comprend pas",
      "Parle Mina et français",
    ],
    quote: "Egoto ne lui demande pas de changer ses habitudes. Elle fait exactement ce qu'elle fait déjà, mais avec automatisation, traçabilité et une récompense visible pour sa régularité.",
  },
  en: {
    name: "Da Adjo",
    age: 34,
    role: "Cloth seller, Adawlato market, Lomé",
    facts: [
      "Has participated in two tontines for 8 years",
      "Manages contributions in a notebook, calls colleagues by phone",
      "Has an active T-Money account, has been refused a bank account twice",
      "Trusts mobile technology, suspicious of apps she doesn't understand",
      "Speaks Mina and French",
    ],
    quote: "Egoto doesn't ask her to change her habits. She does exactly what she already does, but with automation, traceability, and a visible reward for her consistency.",
  }
};

export const positioning = {
  fr: [
    { label: "Inscription", egoto: "2 minutes, sans agence", banque: "Dossier, garanties", momo: "Simple mais limité" },
    { label: "Tontine", egoto: "Intégrée, automatisée", banque: "Non proposée", momo: "Non proposée" },
    { label: "Score crédit", egoto: "Comportemental", banque: "Bancaire classique", momo: "Absent" },
    { label: "Carte Visa", egoto: "Oui, liée au score", banque: "Oui (si accepté)", momo: "Non" },
    { label: "Langues locales", egoto: "6 langues (à venir)", banque: "Français uniquement", momo: "Français uniquement" },
    { label: "USSD", egoto: "Oui", banque: "Non", momo: "Oui" },
  ],
  en: [
    { label: "Registration", egoto: "2 minutes, no branch", banque: "Dossier, guarantees", momo: "Simple but limited" },
    { label: "Tontine", egoto: "Integrated, automated", banque: "Not offered", momo: "Not offered" },
    { label: "Credit Score", egoto: "Behavioral", banque: "Classic banking", momo: "Absent" },
    { label: "Visa Card", egoto: "Yes, linked to score", banque: "Yes (if accepted)", momo: "No" },
    { label: "Local Languages", egoto: "6 languages (coming)", banque: "French only", momo: "French only" },
    { label: "USSD", egoto: "Yes", banque: "No", momo: "Yes" },
  ]
};

export const revenueSources = {
  fr: [
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
  ],
  en: [
    {
      title: "Transaction Commission",
      rate: "0.5 – 1%",
      text: "On each managed financial flow: collections, payouts, transfers between members. Free for the user, included in existing operator fees. Immediate revenue from the first active user.",
    },
    {
      title: "MFI Introduction",
      rate: "Commission",
      text: "As soon as a user reaches a score ≥ 500, Egoto connects them with an IMF approved by BCEAO and earns a commission. The MFI carries the credit risk, not Egoto.",
    },
    {
      title: "Egoto Visa Card",
      rate: "Subscription + interchange",
      text: "Issuance fees (1,500–3,000 FCFA), ~1.5% interchange split with the program manager, Gold subscription (2,000 FCFA/month) and Business (5,000 FCFA/month).",
    },
    {
      title: "Group Freemium",
      rate: "500 – 1,000 FCFA/month",
      text: "Free for circles with fewer than 10 members. Beyond that, subscription for advanced features: group wallet with voting, history export, dedicated notifications.",
    },
  ]
};

export const revenueProjection = {
  fr: [
    { source: "Commissions transactions", m6: "490 000", m12: "1 470 000", m18: "3 430 000" },
    { source: "Mise en relation IMF", m6: "0", m12: "400 000", m18: "1 200 000" },
    { source: "Carte Visa (abonn. + interchange)", m6: "200 000", m12: "1 100 000", m18: "4 500 000" },
    { source: "Freemium groupes", m6: "150 000", m12: "450 000", m18: "1 050 000" },
  ],
  en: [
    { source: "Transaction Commissions", m6: "490,000", m12: "1,470,000", m18: "3,430,000" },
    { source: "MFI Introductions", m6: "0", m12: "400,000", m18: "1,200,000" },
    { source: "Visa Card (sub + interchange)", m6: "200,000", m12: "1,100,000", m18: "4,500,000" },
    { source: "Group Freemium", m6: "150,000", m12: "450,000", m18: "1,050,000" },
  ]
};

export const revenueTotals = {
  fr: { m6: "840 000", m12: "3 420 000", m18: "10 180 000" },
  en: { m6: "840,000", m12: "3,420,000", m18: "10,180,000" }
};

export const phases = {
  fr: [
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
  ],
  en: [
    {
      tag: "Phase 1",
      period: "Months 1 – 6",
      title: "MVP Lomé",
      goal: "5,000 users",
      points: [
        "20 founding ambassadors in 3 markets: Adawlato, Adidogomé, Hédzranawoé",
        "One-on-one field support for 30 days per ambassador",
        "Referral: 5,000 FCFA offered per sponsored circle leader",
        "Physical Egoto agent present on market days",
        "No paid advertising - focus on quality for the first 100 circles",
      ],
    },
    {
      tag: "Phase 2",
      period: "Months 7 – 12",
      title: "Regional Growth",
      goal: "15,000 users",
      points: [
        "Extension to Kpalimé, Atakpamé and Sokodé with local agents",
        "Partnerships with 3 to 5 women's cooperatives (200 to 1,000 members each)",
        "Partnership with religious associations practicing tontine",
        "Launch of the Egoto Standard Visa card",
        "Campaign on local social networks (TikTok Togo, Facebook)",
      ],
    },
    {
      tag: "Phase 3",
      period: "Months 13 – 18",
      title: "Card & Scale",
      goal: "35,000 users",
      points: [
        "Launch of Gold card and formalized MFI partnerships",
        "Opening to companies: corporate tontines, group salaries",
        "Preparation for ECOWAS expansion: Benin, Burkina Faso as priorities",
        "Entry into regional accelerator programs (AfricArena, Seedstars Africa)",
      ],
    },
  ]
};

export const roadmap = {
  fr: [
    { period: "Mois 1–3", milestone: "MVP bot WhatsApp + tontine + épargne, 20 ambassadrices, 3 marchés Lomé", users: "500", revenue: "En cours de validation" },
    { period: "Mois 4–6", milestone: "Score Egoto actif, carte Visa virtuelle, intégration T-Money/Flooz complète", users: "5 000", revenue: "840 000 FCFA/mois" },
    { period: "Mois 7–9", milestone: "Extension régionale, partenariats coopératives, carte physique", users: "10 000", revenue: "2 000 000 FCFA/mois" },
    { period: "Mois 10–12", milestone: "Score partagé IMF, carte Gold lancée, partenariat Yas & Moov", users: "15 000", revenue: "3 420 000 FCFA/mois" },
    { period: "Mois 13–15", milestone: "Carte Business, premiers partenariats IMF formalisés, série A préparée", users: "25 000", revenue: "6 000 000 FCFA/mois" },
    { period: "Mois 16–18", milestone: "Seuil de rentabilité atteint, préparation expansion CEDEAO", users: "35 000", revenue: "10 180 000 FCFA/mois" },
  ],
  en: [
    { period: "Months 1–3", milestone: "MVP WhatsApp bot + tontine + savings, 20 ambassadors, 3 Lomé markets", users: "500", revenue: "Under validation" },
    { period: "Months 4–6", milestone: "Active Egoto Score, virtual Visa card, full T-Money/Flooz integration", users: "5,000", revenue: "840,000 FCFA/month" },
    { period: "Months 7–9", milestone: "Regional extension, cooperative partnerships, physical card", users: "10,000", revenue: "2,000,000 FCFA/month" },
    { period: "Months 10–12", milestone: "Shared MFI score, Gold card launched, Yas & Moov partnership", users: "15,000", revenue: "3,420,000 FCFA/month" },
    { period: "Months 13–15", milestone: "Business Card, first formalized MFI partnerships, Series A prepared", users: "25,000", revenue: "6,000,000 FCFA/month" },
    { period: "Months 16–18", milestone: "Break-even point reached, preparing ECOWAS expansion", users: "35,000", revenue: "10,180,000 FCFA/month" },
  ]
};

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

export const risks = {
  fr: [
    { title: "Réglementation BCEAO", level: "Moyen", desc: "Accès à la collecte de fonds soumis à agrément", mitigation: "Partenariat avec un EME agréé (ex : Togocom) plutôt que licence propre" },
    { title: "Adoption technologique", level: "Moyen", desc: "Résistance des non-digitaux aux outils mobiles", mitigation: "USSD obligatoire + agents terrain pour la première utilisation" },
    { title: "Confiance utilisateurs", level: "Élevé", desc: "Appli financière = argent = méfiance naturelle", mitigation: "Ambassadrices fondatrices, transparence de l'historique, garantie partenaire bancaire" },
    { title: "Fraude carte", level: "Moyen", desc: "Risque de fraude sur la carte Visa Egoto", mitigation: "Plafonds bas en phase 1, 3D Secure, blocage instantané" },
    { title: "Concurrence", level: "Faible", desc: "Copies par opérateurs télécom ou fintechs externes", mitigation: "Ancrage culturel, agents, communauté, donnée de scoring accumulée" },
    { title: "Qualité du service", level: "Élevé", desc: "Bug ou retard = perte de confiance immédiate", mitigation: "0 bug toléré sur les 100 premiers cercles, support téléphonique dédié" },
  ],
  en: [
    { title: "BCEAO Regulation", level: "Medium", desc: "Access to fund collection subject to licensing", mitigation: "Partnership with an approved EMI (e.g. Togocom) rather than own license" },
    { title: "Tech Adoption", level: "Medium", desc: "Resistance of non-digital users to mobile tools", mitigation: "USSD mandatory + field agents for the first use" },
    { title: "User Trust", level: "High", desc: "Financial app = money = natural mistrust", mitigation: "Founding ambassadors, history transparency, bank partner guarantee" },
    { title: "Card Fraud", level: "Medium", desc: "Risk of fraud on the Egoto Visa card", mitigation: "Low limits in Phase 1, 3D Secure, instant blocking" },
    { title: "Competition", level: "Low", desc: "Copies by telecom operators or external fintechs", mitigation: "Cultural anchoring, agents, community, accumulated scoring data" },
    { title: "Service Quality", level: "High", desc: "Bug or delay = immediate loss of trust", mitigation: "0 bugs tolerated on first 100 circles, dedicated phone support" },
  ]
};

export const funding = {
  fr: [
    { source: "Apport fondateurs", amount: "10 000 000 FCFA", desc: "Mise de fonds propres, signal de sérieux (skin in the game)" },
    { source: "Grants non-dilutifs", amount: "20 000 000 FCFA", desc: "AFD, UNCDF, GIZ - financement sur le volet inclusion financière" },
    { source: "Seed round investisseurs", amount: "50 000 000 FCFA", desc: "Impact investors africains (Partech Africa, Orange Ventures)" },
    { source: "Partenariat T-Money & Moov", amount: "En nature", desc: "Accès USSD, réseau agents, distribution pré-installée" },
  ],
  en: [
    { source: "Founders Contribution", amount: "10,000,000 FCFA", desc: "Own funds invested, signal of commitment (skin in the game)" },
    { source: "Non-dilutive Grants", amount: "20,000,000 FCFA", desc: "AFD, UNCDF, GIZ - funding for financial inclusion" },
    { source: "Seed Round Investors", amount: "50,000,000 FCFA", desc: "African impact investors (Partech Africa, Orange Ventures)" },
    { source: "T-Money & Moov Partnership", amount: "In kind", desc: "USSD access, agent network, pre-installed distribution" },
  ]
};

export const asks = {
  fr: [
    { title: "Structurer l'idée", text: "Affiner le modèle économique et la conformité réglementaire BCEAO" },
    { title: "Construire le MVP", text: "Accompagnement technique pour le prototype USSD / Mobile Money" },
    { title: "Premiers clients", text: "Mise en relation avec un réseau pilote à Lomé" },
    { title: "Partenaires clés", text: "Introduction à un EME agréé BCEAO et à des IMF locales" },
  ],
  en: [
    { title: "Structure the Idea", text: "Refine the economic model and BCEAO regulatory compliance" },
    { title: "Build the MVP", text: "Technical support for the USSD / Mobile Money prototype" },
    { title: "First Customers", text: "Connection with a pilot network in Lomé" },
    { title: "Key Partners", text: "Introduction to a BCEAO-approved EMI and local MFIs" },
  ]
};
