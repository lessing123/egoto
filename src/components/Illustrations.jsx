import React from "react";

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

export const ScoreIllustration = () => (
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
        @keyframes float-card {
          0%, 100% { transform: translateY(0) rotate(-6deg); }
          50% { transform: translateY(-12px) rotate(-3deg); }
        }
        @keyframes gauge-fill {
          0% { stroke-dasharray: 0 1000; }
          100% { stroke-dasharray: 310 1000; }
        }
        @keyframes needle-wiggle {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(3deg); }
        }
        .anim-card { animation: float-card 6s ease-in-out infinite; transform-origin: 200px 240px; }
        .anim-gauge { animation: gauge-fill 2s cubic-bezier(0.1, 1, 0.1, 1) forwards; }
        .anim-needle { animation: needle-wiggle 3s ease-in-out infinite; transform-origin: 200px 200px; }
      `}
    </style>

    <defs>
      <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#173325" />
        <stop offset="100%" stopColor="#0f1d1a" />
      </linearGradient>
      <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#EF4444" />
        <stop offset="50%" stopColor="#FBBF24" />
        <stop offset="100%" stopColor="#22C55E" />
      </linearGradient>
      <filter id="heavyShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="18" stdDeviation="24" floodColor="#173325" floodOpacity="0.2" />
      </filter>
    </defs>

    {/* Background Score Gauge (Semicircle) */}
    <g transform="translate(0, 20)">
      {/* Gauge Background track */}
      <path
        d="M90 200 A110 110 0 0 1 310 200"
        stroke="rgba(23, 51, 37, 0.08)"
        strokeWidth="16"
        strokeLinecap="round"
        fill="none"
      />
      {/* Gauge color progression */}
      <path
        d="M90 200 A110 110 0 0 1 310 200"
        stroke="url(#gaugeGrad)"
        strokeWidth="16"
        strokeLinecap="round"
        fill="none"
        strokeDasharray="310"
        className="anim-gauge"
      />

      {/* Needle pointing to Gold zone */}
      <g className="anim-needle">
        <line x1="200" y1="200" x2="280" y2="140" stroke="#173325" strokeWidth="4" strokeLinecap="round" />
        <circle cx="200" cy="200" r="8" fill="#173325" />
      </g>

      {/* Score Text */}
      <text x="200" y="240" textAnchor="middle" fill="#173325" fontSize="32" fontWeight="bold" fontFamily="Fraunces, serif">612</text>
      <text x="200" y="258" textAnchor="middle" fill="rgba(23, 51, 37, 0.6)" fontSize="11" fontWeight="bold" letterSpacing="1" fontFamily="sans-serif">SCORE EGOTO</text>
    </g>

    {/* Floating VISA Card */}
    <g className="anim-card" filter="url(#heavyShadow)">
      {/* Card Base */}
      <rect x="70" y="220" width="260" height="150" rx="16" fill="url(#cardGrad)" stroke="rgba(251, 191, 36, 0.25)" strokeWidth="1.5" />
      
      {/* Card Details */}
      <text x="94" y="252" fill="rgba(255, 255, 255, 0.4)" fontSize="9" fontWeight="bold" letterSpacing="1" fontFamily="sans-serif">CARTE EGOTO GOLD</text>
      <text x="94" y="294" fill="#FFFFFF" fontSize="20" letterSpacing="3" fontFamily="monospace">•••• 4471</text>
      
      {/* Card Chip */}
      <rect x="94" y="262" width="28" height="20" rx="4" fill="#FBBF24" opacity="0.9" />
      
      {/* Card Owner Name */}
      <text x="94" y="342" fill="#FFFFFF" fontSize="12" fontWeight="bold" fontFamily="sans-serif">Da Adjo</text>
      
      {/* VISA Logo */}
      <text x="270" y="344" fill="#FBBF24" fontSize="18" fontWeight="900" fontStyle="italic" fontFamily="sans-serif">VISA</text>
    </g>
  </svg>
);
