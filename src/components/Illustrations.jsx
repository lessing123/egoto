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
      <linearGradient id="greenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#2d5f4d" />
        <stop offset="100%" stopColor="#173325" />
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
        <text x="138" y="134" fill="#173325" fontSize="8" fontWeight="bold" fontFamily="sans-serif">Woezon va Egoto dzi</text>
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
      <rect x="121" y="295" width="34" height="14" rx="7" fill="rgba(7, 94, 84, 0.15)" />
      <text x="138" y="305" textAnchor="middle" fill="#075E54" fontSize="7" fontWeight="bold" fontFamily="sans-serif">EWE</text>
      
      <rect x="160" y="295" width="30" height="14" rx="7" fill="rgba(7, 94, 84, 0.15)" />
      <text x="175" y="305" textAnchor="middle" fill="#075E54" fontSize="7" fontWeight="bold" fontFamily="sans-serif">FR</text>
      
      <rect x="195" y="295" width="30" height="14" rx="7" fill="rgba(7, 94, 84, 0.15)" />
      <text x="210" y="305" textAnchor="middle" fill="#075E54" fontSize="7" fontWeight="bold" fontFamily="sans-serif">EN</text>
      
      <rect x="230" y="295" width="42" height="14" rx="7" fill="rgba(7, 94, 84, 0.15)" />
      <text x="251" y="305" textAnchor="middle" fill="#075E54" fontSize="7" fontWeight="bold" fontFamily="sans-serif">KABYÈ</text>
    </g>
  </svg>
);

// 6. Problem / Risk & Vulnerability Illustration
export const ProblemIllustration = () => (
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
        @keyframes warning-pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.96); }
          50% { opacity: 0.85; transform: scale(1.04); }
        }
        @keyframes float-books {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        @keyframes key-rotate {
          0% { transform: rotate(0deg); }
          25% { transform: rotate(-15deg); }
          75% { transform: rotate(15deg); }
          100% { transform: rotate(0deg); }
        }
        .anim-warn { animation: warning-pulse 3s ease-in-out infinite; transform-origin: 200px 200px; }
        .anim-books { animation: float-books 5.5s ease-in-out infinite; transform-origin: 200px 240px; }
        .anim-key { animation: key-rotate 3.5s ease-in-out infinite; transform-origin: 260px 140px; }
      `}
    </style>
    <defs>
      <radialGradient id="problemGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#EF4444" stopOpacity="0.08" />
        <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
      </radialGradient>
      <filter id="shadow-book" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#173325" floodOpacity="0.15" />
      </filter>
    </defs>

    {/* Background Glow */}
    <circle cx="200" cy="200" r="160" fill="url(#problemGlow)" className="anim-warn" />

    {/* Shield in background */}
    <path
      d="M200 90 L270 120 V190 C270 240 230 280 200 300 C170 280 130 240 130 190 V120 Z"
      stroke="rgba(239, 68, 68, 0.15)"
      strokeWidth="3"
      strokeDasharray="6 4"
    />

    {/* Traditional Books/Registers (Informal paper bookkeeping) */}
    <g className="anim-books" filter="url(#shadow-book)">
      {/* Bottom ledger book */}
      <rect x="110" y="200" width="160" height="45" rx="8" fill="#173325" />
      <rect x="118" y="200" width="144" height="6" fill="#FBBF24" opacity="0.8" />
      <line x1="130" y1="225" x2="250" y2="225" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="10 4" opacity="0.3" />

      {/* Top ledger book (slanted) */}
      <g transform="translate(20, -25) rotate(-10 200 200)">
        <rect x="110" y="170" width="160" height="40" rx="8" fill="#FFFFFF" stroke="#173325" strokeWidth="2" />
        <rect x="110" y="170" width="20" height="40" rx="2" fill="#2d5f4d" />
        {/* Lined pages */}
        <line x1="140" y1="185" x2="250" y2="185" stroke="rgba(23, 51, 37, 0.2)" strokeWidth="1.5" />
        <line x1="140" y1="195" x2="220" y2="195" stroke="rgba(23, 51, 37, 0.2)" strokeWidth="1.5" />
      </g>
    </g>

    {/* Hanging open padlock */}
    <g className="anim-key" filter="url(#shadow-book)">
      {/* Padlock Body */}
      <rect x="235" y="130" width="50" height="40" rx="6" fill="#EF4444" />
      {/* Shackle (Open) */}
      <path d="M245 130V115c0-10 7-15 15-15s15 5 15 15v5" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" fill="none" />
      <circle cx="260" cy="150" r="4" fill="#FFFFFF" />
      <line x1="260" y1="154" x2="260" y2="164" stroke="#FFFFFF" strokeWidth="2.5" />
    </g>

    {/* Floating warning icons */}
    <g className="anim-warn">
      <circle cx="90" cy="120" r="14" fill="#EF4444" opacity="0.8" />
      <text x="90" y="125" textAnchor="middle" fill="#FFFFFF" fontSize="14" fontWeight="bold" fontFamily="sans-serif">!</text>
      
      <circle cx="310" cy="270" r="12" fill="#EF4444" opacity="0.8" />
      <text x="310" y="274" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="bold" fontFamily="sans-serif">?</text>
    </g>
  </svg>
);

// 7. Team & Collaboration Illustration
export const TeamIllustration = () => (
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
        @keyframes gear-rotate-cw {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes gear-rotate-ccw {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes pulse-dot {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.2); opacity: 1; }
        }
        .anim-gear-cw { animation: gear-rotate-cw 12s linear infinite; transform-origin: 200px 200px; }
        .anim-gear-ccw { animation: gear-rotate-ccw 8s linear infinite; transform-origin: 258px 150px; }
        .anim-pulse-dot { animation: pulse-dot 3s ease-in-out infinite; }
      `}
    </style>
    
    <defs>
      <radialGradient id="teamGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#2d5f4d" stopOpacity="0.1" />
        <stop offset="100%" stopColor="#2d5f4d" stopOpacity="0" />
      </radialGradient>
      <filter id="shadow-team" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#173325" floodOpacity="0.1" />
      </filter>
    </defs>

    {/* Background Glow */}
    <circle cx="200" cy="200" r="160" fill="url(#teamGlow)" />

    {/* Network connecting lines */}
    <path d="M120 150 L200 200 L280 150 L200 280 Z" stroke="rgba(23, 51, 37, 0.15)" strokeWidth="2" strokeDasharray="6 4" />
    
    {/* Large Central Gear (CW) */}
    <g className="anim-gear-cw" stroke="#173325" strokeWidth="4" fill="none">
      <circle cx="200" cy="200" r="45" strokeDasharray="14 12" />
      <circle cx="200" cy="200" r="32" fill="#FFFFFF" strokeWidth="2" />
      {/* Inner spoke lines */}
      <line x1="200" y1="180" x2="200" y2="220" strokeWidth="2.5" />
      <line x1="180" y1="200" x2="220" y2="200" strokeWidth="2.5" />
    </g>

    {/* Smaller interlocking Gear (CCW) */}
    <g className="anim-gear-ccw" stroke="#FBBF24" strokeWidth="3" fill="none">
      <circle cx="258" cy="150" r="28" strokeDasharray="10 8" />
      <circle cx="258" cy="150" r="20" fill="#FFFFFF" strokeWidth="1.5" />
      {/* Inner spoke lines */}
      <line x1="258" y1="138" x2="258" y2="162" strokeWidth="2" />
      <line x1="246" y1="150" x2="270" y2="150" strokeWidth="2" />
    </g>

    {/* Nodes representing the Founders / Collaboration */}
    <g filter="url(#shadow-team)">
      {/* Node 1 - Growth / Priscille */}
      <g transform="translate(100, 130)">
        <circle cx="20" cy="20" r="28" fill="#FFFFFF" stroke="#2d5f4d" strokeWidth="2" />
        <circle cx="20" cy="20" r="24" fill="#2d5f4d" opacity="0.1" />
        <text x="20" y="25" textAnchor="middle" fill="#173325" fontSize="13" fontWeight="bold" fontFamily="sans-serif">GP</text>
        <circle cx="38" cy="8" r="6" fill="#22C55E" className="anim-pulse-dot" /> {/* Online status */}
      </g>

      {/* Node 2 - Product / Obed */}
      <g transform="translate(248, 130)">
        <circle cx="20" cy="20" r="28" fill="#FFFFFF" stroke="#FBBF24" strokeWidth="2" />
        <circle cx="20" cy="20" r="24" fill="#FBBF24" opacity="0.15" />
        <text x="20" y="25" textAnchor="middle" fill="#173325" fontSize="13" fontWeight="bold" fontFamily="sans-serif">DO</text>
        <circle cx="38" cy="8" r="6" fill="#22C55E" className="anim-pulse-dot" />
      </g>

      {/* Node 3 - Engineering / Achiraf */}
      <g transform="translate(174, 252)">
        <circle cx="20" cy="20" r="28" fill="#FFFFFF" stroke="#173325" strokeWidth="2" />
        <circle cx="20" cy="20" r="24" fill="#173325" opacity="0.1" />
        <text x="20" y="25" textAnchor="middle" fill="#173325" fontSize="13" fontWeight="bold" fontFamily="sans-serif">TA</text>
        <circle cx="38" cy="8" r="6" fill="#22C55E" className="anim-pulse-dot" />
      </g>
    </g>

    {/* Sparkle detailing */}
    <path d="M80 230l2 4 4 2-4 2-2 4-2-4-4-2 4-2 2-4z" fill="#FBBF24" />
    <path d="M310 240l3 6 6 3-6 3-3 6-3-6-6-3 6-3 3-6z" fill="#2d5f4d" />
  </svg>
);

// 8. Download / Install Application Illustration
export const DownloadIllustration = () => (
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
        @keyframes arrow-slide {
          0% { transform: translateY(-20px); opacity: 0; }
          30% { opacity: 1; }
          70% { transform: translateY(15px); opacity: 1; }
          100% { transform: translateY(30px); opacity: 0; }
        }
        @keyframes float-mock {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes scale-ring {
          0% { transform: scale(0.9); opacity: 0.8; }
          100% { transform: scale(1.2); opacity: 0; }
        }
        .anim-arrow { animation: arrow-slide 2.8s linear infinite; }
        .anim-download-phone { animation: float-mock 6s ease-in-out infinite; transform-origin: 200px 200px; }
        .anim-pulse-ring { animation: scale-ring 3s cubic-bezier(0.16, 1, 0.3, 1) infinite; transform-origin: 200px 170px; }
      `}
    </style>

    <defs>
      <radialGradient id="downGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#173325" stopOpacity="0.1" />
        <stop offset="100%" stopColor="#173325" stopOpacity="0" />
      </radialGradient>
      <filter id="shadow-download" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="#173325" floodOpacity="0.12" />
      </filter>
    </defs>

    {/* Background Glow */}
    <circle cx="200" cy="200" r="160" fill="url(#downGlow)" />

    {/* Pulsing radar rings */}
    <circle cx="200" cy="170" r="60" stroke="#FBBF24" strokeWidth="2" className="anim-pulse-ring" />
    <circle cx="200" cy="170" r="85" stroke="#2d5f4d" strokeWidth="1.5" className="anim-pulse-ring" style={{ animationDelay: "1.5s" }} />

    {/* Smartphone mock */}
    <g className="anim-download-phone" filter="url(#shadow-download)">
      <rect x="130" y="80" width="140" height="240" rx="24" fill="#173325" stroke="rgba(23, 51, 37, 0.1)" strokeWidth="2" />
      <rect x="137" y="87" width="126" height="226" rx="18" fill="#F9F9F9" />
      
      {/* Screen layout skeleton */}
      <circle cx="200" cy="120" r="20" fill="rgba(23, 51, 37, 0.05)" />
      <rect x="155" y="150" width="90" height="10" rx="5" fill="#173325" opacity="0.8" />
      <rect x="165" y="168" width="70" height="6" rx="3" fill="#FBBF24" opacity="0.9" />
      
      {/* Centered Download Arrow animation */}
      <g className="anim-arrow" transform="translate(200, 160)">
        <path d="M0-15 V15 M-10 5 L0 15 L10 5" stroke="#173325" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>

      {/* Button outline */}
      <rect x="150" y="240" width="100" height="24" rx="12" fill="none" stroke="#173325" strokeWidth="2" />
      <line x1="170" y1="252" x2="230" y2="252" stroke="#173325" strokeWidth="2" strokeLinecap="round" />
    </g>

    {/* Floating App Store Badges outline */}
    <g transform="translate(60, 240)" className="anim-download-phone">
      <rect width="60" height="32" rx="6" fill="#FFFFFF" stroke="#173325" strokeWidth="1.5" />
      {/* Android Play logo shape */}
      <path d="M15 10 l30 6 -30 6 z" fill="#2d5f4d" opacity="0.3" />
    </g>

    <g transform="translate(280, 110)" className="anim-download-phone" style={{ animationDelay: "1s" }}>
      <rect width="60" height="32" rx="6" fill="#FFFFFF" stroke="#173325" strokeWidth="1.5" />
      {/* Apple App logo shape */}
      <circle cx="30" cy="16" r="8" fill="#FBBF24" opacity="0.4" />
    </g>
  </svg>
);

// 9. Contact / Communication Illustration
export const ContactIllustration = () => (
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
        @keyframes hover-letter {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(2deg); }
        }
        @keyframes scale-wave {
          0% { transform: scale(0.8); opacity: 0; }
          50% { opacity: 0.8; }
          100% { transform: scale(1.3); opacity: 0; }
        }
        @keyframes bubble-pop {
          0%, 100% { transform: scale(0.9); opacity: 0.8; }
          50% { transform: scale(1.05); opacity: 1; }
        }
        .anim-letter { animation: hover-letter 6s ease-in-out infinite; transform-origin: 200px 200px; }
        .anim-wave { animation: scale-wave 3.5s ease-in-out infinite; transform-origin: 200px 200px; }
        .anim-bubble { animation: bubble-pop 4.5s ease-in-out infinite; }
      `}
    </style>
    <defs>
      <radialGradient id="contactGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#173325" stopOpacity="0.1" />
        <stop offset="100%" stopColor="#173325" stopOpacity="0" />
      </radialGradient>
      <filter id="shadow-letter" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="#173325" floodOpacity="0.12" />
      </filter>
    </defs>

    {/* Background Glow */}
    <circle cx="200" cy="200" r="160" fill="url(#contactGlow)" />

    {/* Propagating signal waves */}
    <circle cx="200" cy="200" r="90" stroke="rgba(23, 51, 37, 0.08)" strokeWidth="3" className="anim-wave" />
    <circle cx="200" cy="200" r="130" stroke="rgba(251, 191, 36, 0.1)" strokeWidth="2" className="anim-wave" style={{ animationDelay: "1.8s" }} />

    {/* Hovering Envelope */}
    <g className="anim-letter" filter="url(#shadow-letter)">
      {/* Back of Envelope */}
      <rect x="90" y="120" width="220" height="150" rx="16" fill="#173325" />
      {/* Inserted Paper */}
      <rect x="110" y="90" width="180" height="80" rx="6" fill="#F9F9F9" />
      <line x1="130" y1="115" x2="270" y2="115" stroke="rgba(23, 51, 37, 0.2)" strokeWidth="2" strokeLinecap="round" />
      <line x1="130" y1="130" x2="240" y2="130" stroke="rgba(23, 51, 37, 0.2)" strokeWidth="2" strokeLinecap="round" />
      <line x1="130" y1="145" x2="200" y2="145" stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round" />

      {/* Front flap folds of envelope */}
      <path d="M90 120 l110 80 l110 -80" stroke="#FFFFFF" strokeWidth="3" strokeLinejoin="round" fill="none" opacity="0.15" />
      <path d="M90 270 l85 -70 M310 270 l-85 -70" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.1" />
    </g>

    {/* Speech Bubbles */}
    <g className="anim-bubble" transform="translate(60, 240)" filter="url(#shadow-letter)">
      <rect width="64" height="26" rx="13" fill="#FFFFFF" stroke="#2d5f4d" strokeWidth="1.5" />
      <text x="32" y="16" textAnchor="middle" fill="#173325" fontSize="8" fontWeight="bold" fontFamily="sans-serif">SALUT !</text>
    </g>

    <g className="anim-bubble" transform="translate(260, 80)" filter="url(#shadow-letter)" style={{ animationDelay: "1.5s" }}>
      <rect width="70" height="26" rx="13" fill="#FFFFFF" stroke="#FBBF24" strokeWidth="1.5" />
      <text x="35" y="16" textAnchor="middle" fill="#173325" fontSize="8" fontWeight="bold" fontFamily="sans-serif">DEMO ?</text>
    </g>
  </svg>
);
