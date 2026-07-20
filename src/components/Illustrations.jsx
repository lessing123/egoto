import React from "react";

// 1. Savings & Individual Projects Illustration
export const SavingsIllustration = () => (
  <svg
    viewBox="0 0 400 400"
    width="100%"
    height="100%"
    className="max-w-[340px] mx-auto overflow-visible"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <style>
      {`
        @keyframes float-coin {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes float-soft {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(2deg); }
        }
        @keyframes pulse-light {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.85; }
        }
        .anim-coin { animation: float-coin 5s ease-in-out infinite; }
        .anim-coin-delayed { animation: float-coin 5.5s ease-in-out infinite; animation-delay: 1.5s; }
        .anim-phone { animation: float-soft 7s ease-in-out infinite; }
        .anim-pulse { animation: pulse-light 4s ease-in-out infinite; }
      `}
    </style>

    <defs>
      <radialGradient id="glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#173325" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#173325" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FBBF24" />
        <stop offset="50%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
      <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="#173325" floodOpacity="0.12" />
      </filter>
      <filter id="goldShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#F59E0B" floodOpacity="0.3" />
      </filter>
    </defs>

    {/* Background Glow */}
    <circle cx="200" cy="200" r="160" fill="url(#glow)" className="anim-pulse" />

    {/* Phone Mockup Frame */}
    <g className="anim-phone" filter="url(#shadow)">
      {/* Outer Case */}
      <rect x="110" y="60" width="180" height="280" rx="28" fill="#173325" stroke="rgba(23, 51, 37, 0.15)" strokeWidth="3" />
      {/* Inner Screen */}
      <rect x="118" y="68" width="164" height="264" rx="20" fill="#F9F9F9" />
      
      {/* Screen UI - Header */}
      <path d="M118 68h164v42c0 8-8 16-16 16h-132c-8 0-16-8-16-16V68z" fill="#173325" />
      <circle cx="200" cy="78" r="4" fill="#000" opacity="0.3" /> {/* Notch */}

      {/* Screen UI - Content card */}
      <rect x="132" y="140" width="136" height="64" rx="10" fill="#FFFFFF" filter="url(#shadow)" />
      <rect x="144" y="152" width="60" height="8" rx="4" fill="#173325" opacity="0.15" />
      <rect x="144" y="166" width="112" height="12" rx="4" fill="#173325" />
      <rect x="144" y="184" width="85" height="8" rx="4" fill="#FBBF24" />

      {/* Growing Plant inside screen */}
      <path d="M200 332v-80c0-10 10-18 20-12m-20 20c-15-5-22-20-15-30" stroke="#2d5f4d" strokeWidth="3" strokeLinecap="round" />
      <path d="M220 240c10-2 15-12 12-20s-12-10-20-4 4 20 8 24z" fill="#2d5f4d" opacity="0.8" />
      <path d="M172 260c-10 2-15 12-12 20s12 10 20 4-4-20-8-24z" fill="#2d5f4d" opacity="0.9" />
    </g>

    {/* Golden Coins entering the phone */}
    <g className="anim-coin" filter="url(#goldShadow)">
      {/* Central Coin */}
      <circle cx="200" cy="120" r="32" fill="url(#goldGrad)" />
      <circle cx="200" cy="120" r="24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="4 2" opacity="0.5" />
      <path d="M195 110h10v20h-10z" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
      <circle cx="200" cy="120" r="10" fill="none" stroke="#FFFFFF" strokeWidth="3" />
    </g>

    {/* Sparkles and smaller coins */}
    <g className="anim-coin-delayed" filter="url(#goldShadow)">
      {/* Side Coin 1 */}
      <circle cx="90" cy="150" r="16" fill="url(#goldGrad)" />
      {/* Side Coin 2 */}
      <circle cx="310" cy="220" r="20" fill="url(#goldGrad)" />
    </g>

    {/* Sparkle Icons */}
    <path d="M300 90l3 6 6 3-6 3-3 6-3-6-6-3 6-3 3-6z" fill="#FBBF24" className="anim-pulse" />
    <path d="M90 260l2 4 4 2-4 2-2 4-2-4-4-2 4-2 2-4z" fill="#FBBF24" className="anim-pulse" style={{ animationDelay: "1s" }} />
  </svg>
);

// 2. Collective Tontines (Circle) Illustration
export const CircleIllustration = () => (
  <svg
    viewBox="0 0 400 400"
    width="100%"
    height="100%"
    className="max-w-[340px] mx-auto overflow-visible"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <style>
      {`
        @keyframes spin-clockwise {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes hover-avatars {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .anim-spin-wheel { animation: spin-clockwise 25s linear infinite; transform-origin: 200px 200px; }
        .anim-avatar-pulse { animation: hover-avatars 4s ease-in-out infinite; transform-origin: center; }
      `}
    </style>

    <defs>
      <radialGradient id="glowInner" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#173325" stopOpacity="0.12" />
        <stop offset="100%" stopColor="#173325" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="goldGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FBBF24" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
      <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#173325" floodOpacity="0.1" />
      </filter>
    </defs>

    {/* Background Radial */}
    <circle cx="200" cy="200" r="170" fill="url(#glowInner)" />

    {/* Tontine Circle Track */}
    <circle cx="200" cy="200" r="100" stroke="rgba(23, 51, 37, 0.15)" strokeWidth="3" strokeDasharray="8 8" />

    {/* Central Shield/Key Icon */}
    <g filter="url(#cardShadow)">
      <circle cx="200" cy="200" r="48" fill="#173325" />
      {/* Handshake/Trust Icon */}
      <path d="M185 195s5-5 15 0 15 5 15 5M185 205s5-5 15 0 15 5 15 5" stroke="#FBBF24" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="200" cy="200" r="32" fill="none" stroke="rgba(251, 191, 36, 0.2)" strokeWidth="2" />
    </g>

    {/* Rotating Coins on Circle */}
    <g className="anim-spin-wheel">
      <circle cx="200" cy="100" r="12" fill="url(#goldGrad2)" />
      <circle cx="200" cy="300" r="12" fill="url(#goldGrad2)" />
      <circle cx="100" cy="200" r="12" fill="url(#goldGrad2)" />
      <circle cx="300" cy="200" r="12" fill="url(#goldGrad2)" />
    </g>

    {/* Members Avatars (Static positions but pulsing) */}
    <g className="anim-avatar-pulse">
      {/* Member 1 - Top Left */}
      <g filter="url(#cardShadow)" transform="translate(110, 110)">
        <circle cx="20" cy="20" r="24" fill="#FFFFFF" stroke="#173325" strokeWidth="2" />
        <circle cx="20" cy="20" r="20" fill="#2d5f4d" opacity="0.15" />
        <text x="20" y="25" textAnchor="middle" fill="#173325" fontSize="13" fontWeight="bold" fontFamily="sans-serif">AB</text>
      </g>

      {/* Member 2 - Top Right */}
      <g filter="url(#cardShadow)" transform="translate(250, 110)">
        <circle cx="20" cy="20" r="24" fill="#FFFFFF" stroke="#173325" strokeWidth="2" />
        <circle cx="20" cy="20" r="20" fill="#FBBF24" opacity="0.2" />
        <text x="20" y="25" textAnchor="middle" fill="#173325" fontSize="13" fontWeight="bold" fontFamily="sans-serif">DA</text>
      </g>

      {/* Member 3 - Bottom Right */}
      <g filter="url(#cardShadow)" transform="translate(250, 250)">
        <circle cx="20" cy="20" r="24" fill="#FFFFFF" stroke="#173325" strokeWidth="2" />
        <circle cx="20" cy="20" r="20" fill="#2d5f4d" opacity="0.15" />
        <text x="20" y="25" textAnchor="middle" fill="#173325" fontSize="13" fontWeight="bold" fontFamily="sans-serif">GP</text>
      </g>

      {/* Member 4 - Bottom Left */}
      <g filter="url(#cardShadow)" transform="translate(110, 250)">
        <circle cx="20" cy="20" r="24" fill="#FFFFFF" stroke="#173325" strokeWidth="2" />
        <circle cx="20" cy="20" r="20" fill="#FBBF24" opacity="0.2" />
        <text x="20" y="25" textAnchor="middle" fill="#173325" fontSize="13" fontWeight="bold" fontFamily="sans-serif">TA</text>
      </g>
    </g>
  </svg>
);

// 3. Score Egoto (Credit Score Gauge) Illustration
export const ScoreGaugeIllustration = () => (
  <svg
    viewBox="0 0 400 400"
    width="100%"
    height="100%"
    className="max-w-[340px] mx-auto overflow-visible"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <style>
      {`
        @keyframes gauge-anim {
          0% { stroke-dasharray: 0 1000; }
          100% { stroke-dasharray: 310 1000; }
        }
        @keyframes needle-wiggle {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(4deg); }
        }
        @keyframes badge-float {
          0%, 100% { transform: translateY(0); opacity: 0.8; }
          50% { transform: translateY(-8px); opacity: 1; }
        }
        .anim-gauge { animation: gauge-anim 2s cubic-bezier(0.1, 1, 0.1, 1) forwards; }
        .anim-needle { animation: needle-wiggle 3s ease-in-out infinite; transform-origin: 200px 200px; }
        .anim-badge-1 { animation: badge-float 4s ease-in-out infinite; }
        .anim-badge-2 { animation: badge-float 4.5s ease-in-out infinite; animation-delay: 1.5s; }
      `}
    </style>
    <defs>
      <radialGradient id="scoreGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FBBF24" stopOpacity="0.12" />
        <stop offset="100%" stopColor="#FBBF24" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#EF4444" />
        <stop offset="50%" stopColor="#FBBF24" />
        <stop offset="100%" stopColor="#22C55E" />
      </linearGradient>
      <filter id="shadow-badge" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#173325" floodOpacity="0.08" />
      </filter>
    </defs>
    
    <circle cx="200" cy="200" r="150" fill="url(#scoreGlow)" />
    
    {/* Gauge background track */}
    <path
      d="M90 200 A110 110 0 0 1 310 200"
      stroke="rgba(23, 51, 37, 0.08)"
      strokeWidth="16"
      strokeLinecap="round"
    />
    
    {/* Colored gauge */}
    <path
      d="M90 200 A110 110 0 0 1 310 200"
      stroke="url(#gaugeGrad)"
      strokeWidth="16"
      strokeLinecap="round"
      strokeDasharray="310"
      className="anim-gauge"
    />

    {/* Gauge Needle */}
    <g className="anim-needle">
      <line x1="200" y1="200" x2="280" y2="140" stroke="#173325" strokeWidth="4" strokeLinecap="round" />
      <circle cx="200" cy="200" r="8" fill="#173325" />
    </g>

    {/* Center Text */}
    <text x="200" y="240" textAnchor="middle" fill="#173325" fontSize="32" fontWeight="bold" fontFamily="Fraunces, serif">612</text>
    <text x="200" y="258" textAnchor="middle" fill="rgba(23, 51, 37, 0.6)" fontSize="11" fontWeight="bold" letterSpacing="1" fontFamily="sans-serif">SCORE EGOTO</text>

    {/* Floating Badges */}
    <g className="anim-badge-1" filter="url(#shadow-badge)" transform="translate(60, 230)">
      <rect width="90" height="30" rx="15" fill="#FFFFFF" stroke="#22C55E" strokeWidth="1.5" />
      <circle cx="20" cy="15" r="5" fill="#22C55E" />
      <text x="52" y="19" fill="#173325" fontSize="10" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">FIABLE</text>
    </g>

    <g className="anim-badge-2" filter="url(#shadow-badge)" transform="translate(250, 230)">
      <rect width="90" height="30" rx="15" fill="#FFFFFF" stroke="#FBBF24" strokeWidth="1.5" />
      <circle cx="20" cy="15" r="5" fill="#FBBF24" />
      <text x="52" y="19" fill="#173325" fontSize="10" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">CRÉDIT</text>
    </g>
  </svg>
);

// 4. Visa Card (De l'épargne au paiement) Illustration
export const VisaCardIllustration = () => (
  <svg
    viewBox="0 0 400 400"
    width="100%"
    height="100%"
    className="max-w-[340px] mx-auto overflow-visible"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <style>
      {`
        @keyframes float-card-only {
          0%, 100% { transform: translateY(0) rotate(-4deg); }
          50% { transform: translateY(-15px) rotate(2deg); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.95); opacity: 0.8; }
          50% { transform: scale(1.05); opacity: 0.3; }
          100% { transform: scale(0.95); opacity: 0.8; }
        }
        @keyframes float-icons {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .anim-card-only { animation: float-card-only 6s ease-in-out infinite; transform-origin: 200px 200px; }
        .anim-ring { animation: pulse-ring 4s ease-in-out infinite; transform-origin: 200px 200px; }
        .anim-icon-float-1 { animation: float-icons 4s ease-in-out infinite; }
        .anim-icon-float-2 { animation: float-icons 4.5s ease-in-out infinite; animation-delay: 1.5s; }
      `}
    </style>
    <defs>
      <linearGradient id="cardGradOnly" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#173325" />
        <stop offset="100%" stopColor="#0f1d1a" />
      </linearGradient>
      <filter id="heavyCardShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="18" stdDeviation="24" floodColor="#173325" floodOpacity="0.2" />
      </filter>
    </defs>

    {/* Background rings */}
    <circle cx="200" cy="200" r="120" stroke="rgba(23, 51, 37, 0.06)" strokeWidth="2" className="anim-ring" />
    <circle cx="200" cy="200" r="150" stroke="rgba(23, 51, 37, 0.03)" strokeWidth="1.5" />

    {/* Floating Visa Card */}
    <g className="anim-card-only" filter="url(#heavyCardShadow)">
      <rect x="70" y="125" width="260" height="150" rx="16" fill="url(#cardGradOnly)" stroke="rgba(251, 191, 36, 0.3)" strokeWidth="2" />
      
      {/* Gold foil lines on card */}
      <path d="M70 180 Q150 140 250 200 T330 160" stroke="rgba(251, 191, 36, 0.08)" strokeWidth="3" fill="none" />
      <path d="M70 210 Q140 180 230 240 T330 200" stroke="rgba(251, 191, 36, 0.05)" strokeWidth="2" fill="none" />

      {/* Card Details */}
      <text x="94" y="156" fill="rgba(255, 255, 255, 0.4)" fontSize="9" fontWeight="bold" letterSpacing="1" fontFamily="sans-serif">CARTE EGOTO GOLD</text>
      <text x="94" y="198" fill="#FFFFFF" fontSize="20" letterSpacing="3" fontFamily="monospace">•••• 4471</text>
      
      {/* Card Chip */}
      <rect x="94" y="166" width="28" height="20" rx="4" fill="#FBBF24" opacity="0.95" />
      
      {/* Card Owner Name */}
      <text x="94" y="246" fill="#FFFFFF" fontSize="12" fontWeight="bold" fontFamily="sans-serif">Da Adjo</text>
      
      {/* VISA Logo */}
      <text x="270" y="248" fill="#FBBF24" fontSize="18" fontWeight="900" fontStyle="italic" fontFamily="sans-serif">VISA</text>
    </g>

    {/* Floating shopping / payment icons */}
    <g className="anim-icon-float-1" transform="translate(70, 70)">
      <circle cx="15" cy="15" r="18" fill="#FFFFFF" stroke="#FBBF24" strokeWidth="1.5" filter="url(#heavyCardShadow)" />
      {/* Shopping bag icon */}
      <path d="M11 12.5h8m-8 0L12 21h6l1-8.5m-6-3v2m2-2v2" stroke="#173325" strokeWidth="1.5" strokeLinecap="round" />
    </g>
    
    <g className="anim-icon-float-2" transform="translate(290, 80)">
      <circle cx="15" cy="15" r="18" fill="#FFFFFF" stroke="#2d5f4d" strokeWidth="1.5" filter="url(#heavyCardShadow)" />
      {/* Airplane/Travel icon */}
      <path d="M9 15h12M15 9l4 6-4 6" stroke="#173325" strokeWidth="1.5" strokeLinecap="round" />
    </g>
  </svg>
);

// 5. WhatsApp Multilingual Bot Illustration
export const WhatsAppBotIllustration = () => (
  <svg
    viewBox="0 0 400 400"
    width="100%"
    height="100%"
    className="max-w-[340px] mx-auto overflow-visible"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <style>
      {`
        @keyframes float-whatsapp {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes msg-pop-1 {
          0%, 10% { transform: scale(0); opacity: 0; }
          20%, 100% { transform: scale(1); opacity: 1; }
        }
        @keyframes msg-pop-2 {
          0%, 35% { transform: scale(0); opacity: 0; }
          45%, 100% { transform: scale(1); opacity: 1; }
        }
        @keyframes msg-pop-3 {
          0%, 65% { transform: scale(0); opacity: 0; }
          75%, 100% { transform: scale(1); opacity: 1; }
        }
        .anim-wa-phone { animation: float-whatsapp 6.5s ease-in-out infinite; }
        .anim-msg-1 { animation: msg-pop-1 8s cubic-bezier(0.16, 1, 0.3, 1) infinite; transform-origin: 130px 145px; }
        .anim-msg-2 { animation: msg-pop-2 8s cubic-bezier(0.16, 1, 0.3, 1) infinite; transform-origin: 270px 195px; }
        .anim-msg-3 { animation: msg-pop-3 8s cubic-bezier(0.16, 1, 0.3, 1) infinite; transform-origin: 130px 245px; }
      `}
    </style>
    <defs>
      <radialGradient id="waGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#25D366" stopOpacity="0.12" />
        <stop offset="100%" stopColor="#25D366" stopOpacity="0" />
      </radialGradient>
      <filter id="shadow-wa" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="#173325" floodOpacity="0.12" />
      </filter>
    </defs>

    {/* Background glow */}
    <circle cx="200" cy="200" r="150" fill="url(#waGlow)" />

    {/* Smartphone */}
    <g className="anim-wa-phone" filter="url(#shadow-wa)">
      <rect x="110" y="60" width="180" height="280" rx="28" fill="#173325" stroke="rgba(23, 51, 37, 0.1)" strokeWidth="2" />
      <rect x="118" y="68" width="164" height="264" rx="20" fill="#E5DDD5" /> {/* WhatsApp chat background grey-brown */}
      
      {/* Header bar */}
      <path d="M118 68h164v35c0 4-4 8-8 8h-148c-4 0-8-4-8-8V68z" fill="#075E54" /> {/* WhatsApp dark green */}
      <circle cx="200" cy="76" r="3" fill="#000" opacity="0.3" />
      
      {/* Bot Name and status */}
      <circle cx="138" cy="91" r="10" fill="#128C7E" />
      <text x="138" y="95" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold" fontFamily="sans-serif">E</text>
      
      <text x="154" y="89" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="sans-serif">Egoto Bot</text>
      <text x="154" y="98" fill="#25D366" fontSize="7" fontWeight="bold" fontFamily="sans-serif">En ligne</text>

      {/* Message 1 (Incoming from Bot) */}
      <g className="anim-msg-1">
        <path d="M130 120h110c6 0 10 4 10 10v20c0 6-4 10-10 10H140c-6 0-10-4-10-10v-30z" fill="#FFFFFF" />
        <path d="M130 120l-4 8h4v-8z" fill="#FFFFFF" />
        <text x="138" y="134" fill="#173325" fontSize="8" fontWeight="bold" fontFamily="sans-serif">Mifia Egoto! (Mina)</text>
        <text x="138" y="145" fill="rgba(23, 51, 37, 0.7)" fontSize="7" fontFamily="sans-serif">Cotisation : 5000 F ?</text>
      </g>

      {/* Message 2 (Outgoing from User) */}
      <g className="anim-msg-2">
        <path d="M150 170h110c6 0 10 4 10 10v20c0 6-4 10-10 10H160c-6 0-10-4-10-10v-30z" fill="#DCF8C6" /> {/* WhatsApp light green msg */}
        <path d="M260 170l4 8h-4v-8z" fill="#DCF8C6" />
        <text x="158" y="184" fill="#173325" fontSize="8" fontWeight="bold" fontFamily="sans-serif">Oui, je valide</text>
        <text x="158" y="195" fill="rgba(23, 51, 37, 0.7)" fontSize="7" fontFamily="sans-serif">Par Moov Money</text>
      </g>

      {/* Message 3 (Incoming response from Bot) */}
      <g className="anim-msg-3">
        <path d="M130 220h110c6 0 10 4 10 10v22c0 6-4 10-10 10H140c-6 0-10-4-10-10v-32z" fill="#FFFFFF" />
        <path d="M130 220l-4 8h4v-8z" fill="#FFFFFF" />
        <text x="138" y="234" fill="#22C55E" fontSize="8" fontWeight="bold" fontFamily="sans-serif">✓ Validé !</text>
        <text x="138" y="245" fill="#173325" fontSize="8" fontFamily="sans-serif">Score: 612 pts (+12)</text>
      </g>
      
      {/* Language badges inside screen */}
      <rect x="132" y="295" width="36" height="14" rx="7" fill="rgba(7, 94, 84, 0.15)" />
      <text x="150" y="305" textAnchor="middle" fill="#075E54" fontSize="7" fontWeight="bold" fontFamily="sans-serif">MINA</text>
      
      <rect x="174" y="295" width="36" height="14" rx="7" fill="rgba(7, 94, 84, 0.15)" />
      <text x="192" y="305" textAnchor="middle" fill="#075E54" fontSize="7" fontWeight="bold" fontFamily="sans-serif">EWÉ</text>
      
      <rect x="216" y="295" width="40" height="14" rx="7" fill="rgba(7, 94, 84, 0.15)" />
      <text x="236" y="305" textAnchor="middle" fill="#075E54" fontSize="7" fontWeight="bold" fontFamily="sans-serif">KABYÈ</text>
    </g>
  </svg>
);
