import React from "react";
import { Eyebrow, PrimaryButton, GhostButton } from "./ui";
import { ChatBubbleIcon, MobileAppIcon, UssdIcon, CheckIcon, ChartIcon, SparkleIcon } from "./Icons";

const MoneyChip = ({ className = "", children, tone = "gold", style }) => {
  const tones = {
    gold: "border-gold/25 bg-ink-soft/90 text-paper",
    palm: "border-palm/25 bg-ink-soft/90 text-paper",
    terracotta: "border-terracotta/25 bg-ink-soft/90 text-paper",
  };
  
  const bulletColors = {
    gold: "bg-gold shadow-[0_0_18px_rgba(201,170,79,0.8)]",
    palm: "bg-palm shadow-[0_0_18px_rgba(46,125,50,0.8)]",
    terracotta: "bg-terracotta shadow-[0_0_18px_rgba(216,67,21,0.8)]"
  };

  return (
    <div
      className={`z-20 whitespace-nowrap rounded-full border px-4 py-2 shadow-2xl backdrop-blur-md ${tones[tone]} ${className}`}
      style={style}
    >
      <div className="flex items-center gap-2">
        <span className={`h-2.5 w-2.5 rounded-full ${bulletColors[tone]}`} />
        <span className="font-body text-[11px] font-semibold tracking-wide uppercase">{children}</span>
      </div>
    </div>
  );
};

const OrbitingChip = ({ children, tone = "gold", radiusClass, duration = "24s", delay = "0s", direction = "cw" }) => {
  const animClass = direction === "cw" ? "animate-orbit-cw" : "animate-orbit-ccw";
  return (
    <div
      className={`absolute left-1/2 top-1/2 z-20 ${radiusClass} ${animClass}`}
      style={{
        animationDelay: delay,
        "--orbit-duration": duration,
      }}
    >
      <MoneyChip tone={tone}>{children}</MoneyChip>
    </div>
  );
};

const DigitalMoneyFlow = () => (
  <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
    <div className="absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-gold/10 via-transparent to-palm/10 blur-3xl" />
    <div className="absolute inset-x-14 top-14 h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent" />
    <div className="absolute inset-x-24 bottom-20 h-px bg-gradient-to-r from-transparent via-palm/35 to-transparent" />

    {/* Orbiting Money Chips - Inner Ring (cw) */}
    <OrbitingChip tone="gold" radiusClass="orbit-inner" direction="cw" delay="0s" duration="24s">
      Bot WhatsApp
    </OrbitingChip>
    <OrbitingChip tone="palm" radiusClass="orbit-inner" direction="cw" delay="-6s" duration="24s">
      Code USSD
    </OrbitingChip>
    <OrbitingChip tone="terracotta" radiusClass="orbit-inner" direction="cw" delay="-12s" duration="24s">
      iOS & Android
    </OrbitingChip>
    <OrbitingChip tone="gold" radiusClass="orbit-inner" direction="cw" delay="-18s" duration="24s">
      Sécurisé
    </OrbitingChip>

    {/* Orbiting Money Chips - Outer Ring (ccw) */}
    <OrbitingChip tone="palm" radiusClass="orbit-outer" direction="ccw" delay="0s" duration="30s">
      Tontine
    </OrbitingChip>
    <OrbitingChip tone="terracotta" radiusClass="orbit-outer" direction="ccw" delay="-6s" duration="30s">
      Automatique
    </OrbitingChip>
    <OrbitingChip tone="gold" radiusClass="orbit-outer" direction="ccw" delay="-12s" duration="30s">
      IA
    </OrbitingChip>
    <OrbitingChip tone="palm" radiusClass="orbit-outer" direction="ccw" delay="-18s" duration="30s">
      Facilité
    </OrbitingChip>
    <OrbitingChip tone="terracotta" radiusClass="orbit-outer" direction="ccw" delay="-24s" duration="30s">
      Épargne
    </OrbitingChip>

    {/* Background moving dot */}
    <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2">
      <div className="relative h-3">
        <span className="absolute left-0 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-gold shadow-[0_0_20px_rgba(201,170,79,0.9)] animate-money-flow" />
      </div>
    </div>

    {/* Background circles centered - aligned with orbit paths */}
    <div className="absolute left-1/2 top-1/2 w-[360px] h-[360px] md:w-[460px] md:h-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-gold/15 pointer-events-none" />
    <div className="absolute left-1/2 top-1/2 w-[500px] h-[500px] md:w-[620px] md:h-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-palm/15 pointer-events-none" />
    <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-gold/18 to-terracotta/10 blur-2xl pointer-events-none" />
  </div>
);

const PhoneMock = () => (
  <div className="relative w-full max-w-[340px] mx-auto animate-float-slow">
    <div className="absolute -inset-6 bg-gold/10 rounded-[3rem] blur-3xl -z-10" />
    <div className="rounded-[2.5rem] border-2 border-ink-line bg-ink shadow-2xl overflow-hidden">
      <div className="bg-palm px-5 py-4 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-terracotta flex items-center justify-center font-display font-bold text-paper text-sm">
          Eg
        </div>
        <div>
          <p className="font-body font-bold text-paper text-sm">Cercle Egoto - Adawlato</p>
          <p className="font-body text-paper/70 text-[11px]">12 membres · en ligne</p>
        </div>
      </div>
      <div className="p-4 flex flex-col gap-3 min-h-[360px] bg-ink">
        <div className="self-start bg-ink-soft text-paper text-xs font-body rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[80%] flex items-center gap-2">
          <CheckIcon className="text-terracotta" />
          Bonjour ! Votre cotisation de 5 000 FCFA a bien été collectée.
        </div>
        <div className="self-start bg-ink-soft text-paper text-xs font-body rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[80%]">
          Tour n°4 : c'est au tour de <strong className="text-paper">Da Adjo</strong> de recevoir la cagnotte.
        </div>
        <div className="self-end bg-gradient-to-br from-terracotta to-terracotta/80 text-ink text-xs font-body font-semibold rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[70%] flex items-center gap-2 shadow-2xl ring-2 ring-terracotta/40 filter saturate-110 bubble-text-shadow">
          <ChartIcon className="text-ink" />
          Merci ! Mon Score Egoto a augmenté ?
        </div>
        <div className="self-start bg-ink-soft text-paper text-xs font-body rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[80%] flex items-center gap-2">
          <SparkleIcon className="text-terracotta" />
          Oui : <strong className="text-terracotta">612 pts</strong> - vous débloquez la Carte Gold.
        </div>

        <div className="mt-auto card-surface rounded-2xl p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-body text-[11px] text-paper-dim uppercase tracking-wide">Score Egoto</span>
            <span className="font-display font-bold text-terracotta text-sm">612 / 1000</span>
          </div>
          <div className="h-2 rounded-full bg-ink-line overflow-hidden">
            <div className="h-full score-fill bg-gradient-to-r from-terracotta to-palm" style={{ width: "61%" }} />
          </div>
        </div>
      </div>
    </div>

    <div className="absolute -bottom-8 -left-10 w-52 rounded-2xl bg-gradient-to-br from-palm to-palm-deep p-4 shadow-2xl border border-palm-light/30 rotate-[-6deg] hidden xs:block">
      <p className="font-body text-[10px] text-ink/70 uppercase tracking-wider">Carte Egoto Gold</p>
      <p className="font-display text-ink text-lg mt-3 tracking-widest">•••• 4471</p>
      <div className="flex justify-between items-end mt-4">
        <span className="font-body text-ink/70 text-[10px]">Da Adjo</span>
        <span className="font-display italic text-terracotta font-semibold text-sm">VISA</span>
      </div>
    </div>
  </div>
);

{/* Official Emblems for Banknotes */}
const BanknoteEmblem = ({ code }) => {
  switch (code) {
    case "FCFA":
      return (
        <g transform="translate(42, 20) scale(0.65)" opacity="0.85">
          {/* Akan Sawfish weight - Official BCEAO emblem */}
          <path d="M5 20 C12 18, 15 15, 20 15 C25 15, 28 18, 40 18 C46 18, 50 14, 55 20 C50 26, 46 22, 40 22 C28 22, 25 25, 20 25 C15 25, 12 22, 5 20 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <path d="M8 18 L8 13 M12 17 L12 12 M16 16 L16 11 M20 16 L20 11 M24 16 L24 11 M28 17 L28 12 M8 22 L8 27 M12 23 L12 28 M16 24 L16 29 M20 24 L20 29 M24 24 L24 29 M28 23 L28 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M38 18 L34 10 L30 18 M38 22 L34 30 L30 22" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="48" cy="20" r="1.5" fill="currentColor" />
        </g>
      );
    case "NAIRA":
      return (
        <g transform="translate(46, 20) scale(0.6)" opacity="0.8">
          {/* Nigerian Coat of Arms Eagle & Shield */}
          <path d="M15 10 L35 10 C35 25, 25 35, 25 35 C25 35, 15 25, 15 10 Z" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M20 10 Q25 20 25 25 L25 35 M30 10 Q25 20 25 25" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M20 8 Q25 2 30 8 L33 5 L30 7 L25 5 L20 7 L17 5 Z" fill="currentColor" />
        </g>
      );
    case "CEDI":
      return (
        <g transform="translate(48, 22) scale(0.75)" opacity="0.85">
          {/* Ghana Black Star & Circular Motif */}
          <circle cx="20" cy="18" r="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
          <path d="M20 2 L24 14 L36 14 L26 22 L30 34 L20 26 L10 34 L14 22 L4 14 L16 14 Z" fill="currentColor" />
        </g>
      );
    case "RAND":
      return (
        <g transform="translate(46, 20) scale(0.68)" opacity="0.8">
          {/* South African Lion Head */}
          <path d="M10 15 Q5 25 12 32 Q15 35 20 35 Q28 35 30 30 Q35 25 32 15 Q30 5 20 5 Q12 5 10 15 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M16 12 Q20 10 24 12 Q25 15 23 18 M18 16 L22 16 M15 22 Q20 25 25 22 M20 25 L20 30" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M12 9 Q10 4 15 6 M28 9 Q30 4 25 6" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </g>
      );
    case "SHILLING":
      return (
        <g transform="translate(48, 22) scale(0.7)" opacity="0.85">
          {/* Kenyan Shield & Crossed Spears */}
          <path d="M5 30 L35 5 M35 30 L5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M13 5 C13 5, 8 18, 20 31 C32 18, 27 5, 27 5 C27 5, 22 8, 20 8 C18 8, 13 5, 13 5 Z" fill="currentColor" stroke="currentColor" strokeWidth="1.5" />
          <line x1="20" y1="8" x2="20" y2="31" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="20" cy="18" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </g>
      );
    case "DIRHAM":
      return (
        <g transform="translate(48, 22) scale(0.72)" opacity="0.85">
          {/* Moroccan Pentagram & Rub el Hizb geometric outline */}
          <path d="M20 2 L25 9 L32 9 L29 16 L34 22 L27 24 L25 31 L20 28 L15 31 L13 24 L6 22 L11 16 L8 9 L15 9 Z" fill="none" stroke="currentColor" strokeWidth="1" />
          <path d="M20 7 L23 15 L31 15 L25 20 L27 28 L20 23 L13 28 L15 20 L9 15 L17 15 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        </g>
      );
    case "POUND":
      return (
        <g transform="translate(46, 20) scale(0.7)" opacity="0.85">
          {/* Egyptian Eye of Horus */}
          <path d="M5 18 C10 12, 25 12, 30 18 C25 22, 10 22, 5 18 Z" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="17.5" cy="17.5" r="3.5" fill="currentColor" />
          <path d="M16 21 L16 27 M19 21 Q24 23 24 27" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M7 11 Q17 7 28 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      );
    default:
      return null;
  }
};

const CurrencyNote = ({ symbol, denomination, country, color, accentColor, emblemCode, className = "", style }) => {
  const noteId = `note-${symbol}-${denomination}`.replace(/\s/g, '');
  return (
  <div className={`absolute pointer-events-none select-none ${className}`} style={style}>
    <div className="relative" style={{ filter: "drop-shadow(0 12px 30px rgba(0,0,0,0.18))" }}>
      <svg viewBox="0 0 120 70" width="100%" height="100%" className="overflow-visible">
        <defs>
          <linearGradient id={noteId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} />
            <stop offset="100%" stopColor={accentColor} />
          </linearGradient>
        </defs>
        {/* Banknote background */}
        <rect x="2" y="2" width="116" height="66" rx="8" fill={`url(#${noteId})`} stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        {/* Intricate security borders */}
        <rect x="5" y="5" width="110" height="60" rx="6" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" strokeDasharray="4 2" />
        <rect x="8" y="8" width="104" height="54" rx="4" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
        
        {/* Currency Symbol */}
        <text x="14" y="32" fill="#FFFFFF" fontSize="22" fontWeight="900" fontFamily="'Manrope', sans-serif" className="select-none">{symbol}</text>
        
        {/* Emblem in center */}
        <g className="text-white/40">
          <BanknoteEmblem code={emblemCode} />
        </g>

        {/* Denomination (Large background and small foreground) */}
        <text x="110" y="22" fill="#FFFFFF" fontSize="12" fontWeight="bold" fontFamily="sans-serif" textAnchor="end" className="opacity-95">{denomination}</text>
        
        {/* Country/Authority indicator */}
        <text x="110" y="60" fill="rgba(255,255,255,0.55)" fontSize="6.5" fontWeight="bold" fontFamily="sans-serif" textAnchor="end" letterSpacing="0.8">{country}</text>
        
        {/* Authentic watermarks / Guilloche curves */}
        <path d="M10 60 Q 30 55, 45 62 T 90 55" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        <path d="M15 15 Q 40 22, 60 12 T 105 18" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
      </svg>
    </div>
  </div>
);
};

const FloatingCoin = ({ src, className = "", style }) => (
  <div className={`absolute pointer-events-none select-none ${className}`} style={style}>
    <div className="relative overflow-visible" style={{ filter: "drop-shadow(0 12px 28px rgba(0,0,0,0.55))" }}>
      <div className="w-full aspect-square rounded-full border border-white/10 overflow-hidden bg-ink/40 backdrop-blur-[1px]">
        <img 
          src={src} 
          alt="Coin" 
          className="w-full h-full object-cover select-none pointer-events-none filter saturate-[1.1] contrast-[1.05]"
          style={{ clipPath: "circle(46% at 50% 50%)" }}
        />
      </div>
      {/* Shine overlay */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/5 to-white/15 pointer-events-none mix-blend-overlay" />
      <div className="absolute inset-0 rounded-full border border-white/20 pointer-events-none" />
    </div>
  </div>
);

const FloatingCoinsBackground = () => {
  const coins = [
    // Left side coins
    { src: "/devises/100cfa.jpg", className: "left-[2%] top-[8%] w-[100px] sm:w-[130px] animate-drift-float opacity-[0.65]" },
    { src: "/devises/25CFA.jpg", className: "left-[14%] top-[22%] w-[80px] sm:w-[100px] animate-sway opacity-[0.55]", delay: "-1.5s" },
    { src: "/devises/CFA.jpg", className: "left-[25%] top-[8%] w-[90px] sm:w-[110px] animate-money-float opacity-[0.5]", delay: "-3s" },
    { src: "/devises/cemac.jpg", className: "left-[8%] top-[45%] w-[85px] sm:w-[110px] animate-sway opacity-[0.5]", delay: "-4.5s" },
    { src: "/devises/we.jpg", className: "left-[4%] bottom-[28%] w-[90px] sm:w-[115px] animate-drift-float opacity-[0.5]", delay: "-5.2s" },
    { src: "/devises/ghc.jpg", className: "left-[18%] bottom-[12%] w-[85px] sm:w-[110px] animate-drift-float opacity-[0.6]", delay: "-2s" },
    { src: "/devises/yen.jpg", className: "left-[28%] bottom-[25%] w-[80px] sm:w-[100px] animate-money-float opacity-[0.45]", delay: "-2.8s" },
    
    // Right side coins
    { src: "/devises/dollars.jpg", className: "right-[3%] top-[6%] w-[110px] sm:w-[140px] animate-drift-float opacity-[0.7]", delay: "-0.5s" },
    { src: "/devises/NAIRA.jpg", className: "right-[15%] top-[12%] w-[95px] sm:w-[120px] animate-drift-float opacity-[0.6]", delay: "-2.5s" },
    { src: "/devises/dirham.jpg", className: "right-[25%] top-[28%] w-[90px] sm:w-[115px] animate-money-float opacity-[0.55]", delay: "-1s" },
    { src: "/devises/euro.jpg", className: "right-[5%] top-[48%] w-[100px] sm:w-[130px] animate-sway opacity-[0.65]", delay: "-3.5s" },
    { src: "/devises/rand.jpg", className: "right-[12%] bottom-[18%] w-[95px] sm:w-[125px] animate-money-float opacity-[0.55]", delay: "-4s" },
    { src: "/devises/yoan.avif", className: "right-[32%] bottom-[22%] w-[85px] sm:w-[105px] animate-drift-float opacity-[0.5]", delay: "-0.8s" },
    { src: "/devises/sterling.png", className: "right-[22%] bottom-[6%] w-[90px] sm:w-[115px] animate-sway opacity-[0.6]", delay: "-1.8s" }
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      {coins.map((coin, idx) => (
        <FloatingCoin 
          key={idx}
          src={coin.src}
          className={coin.className}
          style={{ animationDelay: coin.delay || "0s" }}
        />
      ))}
    </div>
  );
};

const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-14 pb-24 sm:pt-20">
      <div className="absolute inset-0 wax-dots opacity-30" />
      <div className="absolute -top-32 -left-20 w-96 h-96 bg-terracotta/20 rounded-full blur-[120px]" />
      <div className="absolute top-40 right-0 w-[28rem] h-[28rem] bg-palm/20 rounded-full blur-[130px]" />
      <FloatingCoinsBackground />

      <div className="relative max-w-[1400px] mx-auto px-6 sm:px-10 grid md:grid-cols-2 gap-14 items-center">
        <div className="animate-rise bg-ink/40 backdrop-blur-[2px] rounded-3xl p-4 sm:p-0">
          <Eyebrow>Super-app fintech togolaise</Eyebrow>
          <h1 className="font-display font-semibold text-[2.6rem] leading-[1.05] sm:text-6xl text-paper">
            Ton argent,
            <br />
            <span className="text-gradient-gold italic">bien accompagné.</span>
          </h1>
          <p className="font-body text-paper-dim text-lg mt-6 max-w-lg leading-relaxed">
            Egoto transforme la tontine en experience digitale claire, mobile et traçable,
            du WhatsApp au score financier.
          </p>

          <div className="flex flex-wrap gap-4 mt-9">
            <PrimaryButton to="/solution">Découvrir la solution</PrimaryButton>
            <GhostButton to="/telecharger">Télécharger bientôt</GhostButton>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-12 font-body text-sm text-paper-dim">
            <div className="flex items-center gap-2">
              <ChatBubbleIcon className="text-terracotta" />
              <span>Bot WhatsApp FR/EN</span>
            </div>
            <div className="flex items-center gap-2">
              <MobileAppIcon className="text-terracotta" />
              <span>App Android & iOS</span>
            </div>
            <div className="flex items-center gap-2">
              <UssdIcon className="text-terracotta" />
              <span>USSD sans smartphone</span>
            </div>
          </div>
        </div>

        <div className="relative flex items-center justify-center min-h-[580px] sm:min-h-[700px] py-10">
          <div className="relative w-full max-w-[340px] flex items-center justify-center">
            {/* Background Orbits - Centered perfectly around the PhoneMock center */}
            <div className="absolute w-[560px] h-[560px] sm:w-[700px] sm:h-[700px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
              <DigitalMoneyFlow />
            </div>

            {/* Phone mockup */}
            <div className="relative z-20 w-full flex justify-center">
              <PhoneMock />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
