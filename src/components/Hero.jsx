import React from "react";
import { Eyebrow, PrimaryButton, GhostButton } from "./ui";
import { ChatBubbleIcon, MobileAppIcon, UssdIcon, CheckIcon, ChartIcon, SparkleIcon } from "./Icons";

const MoneyChip = ({ className = "", children, tone = "gold", style }) => {
  const tones = {
    gold: "border-gold/25 bg-ink-soft/90 text-paper",
    palm: "border-palm/25 bg-ink-soft/90 text-paper",
    terracotta: "border-terracotta/25 bg-ink-soft/90 text-paper",

  };

  return (
    <div
      className={`z-20 whitespace-nowrap rounded-full border px-4 py-2 shadow-2xl backdrop-blur-md ${tones[tone]} ${className}`}
      style={style}
    >
      <div className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-gold shadow-[0_0_18px_rgba(201,170,79,0.8)]" />
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

    {/* Orbiting Money Chips */}
    <OrbitingChip tone="gold" radiusClass="orbit-inner" direction="cw" delay="0s" duration="24s">
      Bot Whatsapp
    </OrbitingChip>
    <OrbitingChip tone="palm" radiusClass="orbit-inner" direction="cw" delay="-12s" duration="24s">
      Code USSD
    </OrbitingChip>

    <OrbitingChip tone="palm" radiusClass="orbit-inner" direction="cw" delay="-12s" duration="24s">
      ios & Android App
    </OrbitingChip>
   

    {/* Background moving dot */}
    <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2">
      <div className="relative h-3">
        <span className="absolute left-0 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-gold shadow-[0_0_20px_rgba(201,170,79,0.9)] animate-money-flow" />
      </div>
    </div>

    {/* Background circles centered */}
    <div className="absolute inset-0 rounded-[3rem] border border-white/5" />
    <div className="absolute left-1/2 top-1/2 w-[220px] h-[220px] sm:w-[330px] sm:h-[330px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/10" style={{ animation: "spin-slow-centered 30s linear infinite" }} />
    <div className="absolute left-1/2 top-1/2 w-[320px] h-[320px] sm:w-[460px] sm:h-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-palm/10" style={{ animation: "spin-reverse-centered 40s linear infinite" }} />
    <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-gold/18 to-terracotta/10 blur-2xl" />
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

const CurrencyNote = ({ symbol, denomination, country, color, accentColor, className = "", style }) => {
  const noteId = `note-${symbol}-${denomination}`.replace(/\s/g, '');
  return (
  <div className={`absolute pointer-events-none select-none ${className}`} style={style}>
    <div className="relative" style={{ filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.12))" }}>
      <svg viewBox="0 0 120 70" width="100%" height="100%" className="overflow-visible">
        <defs>
          <linearGradient id={noteId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} />
            <stop offset="100%" stopColor={accentColor} />
          </linearGradient>
        </defs>
        {/* Banknote shape */}
        <rect x="2" y="2" width="116" height="66" rx="8" fill={`url(#${noteId})`} />
        <rect x="6" y="6" width="108" height="58" rx="5" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="3 2" />
        {/* Currency Symbol */}
        <text x="18" y="35" fill="rgba(255,255,255,0.95)" fontSize="22" fontWeight="bold" fontFamily="'Fraunces', serif">{symbol}</text>
        {/* Denomination */}
        <text x="100" y="22" fill="rgba(255,255,255,0.8)" fontSize="12" fontWeight="bold" fontFamily="sans-serif" textAnchor="end">{denomination}</text>
        {/* Country name */}
        <text x="100" y="56" fill="rgba(255,255,255,0.5)" fontSize="7" fontFamily="sans-serif" textAnchor="end" letterSpacing="1">{country}</text>
        {/* Decorative circle */}
        <circle cx="55" cy="48" r="10" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
        <circle cx="55" cy="48" r="6" fill="rgba(255,255,255,0.08)" />
      </svg>
    </div>
  </div>
);
};

const FloatingCoinsBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
    {/* FCFA 10,000 - West Africa (Togo, Benin, Senegal...) */}
    <CurrencyNote symbol="F" denomination="10 000" country="FCFA · UEMOA" color="#2D5F4D" accentColor="#142B20"
      className="left-[2%] top-[12%] w-[140px] animate-drift-float opacity-[0.28]" />

    {/* Nigerian Naira ₦ 1,000 */}
    <CurrencyNote symbol="₦" denomination="1 000" country="NAIRA · NIGERIA" color="#1A6B3C" accentColor="#0D4A2A"
      className="right-[4%] top-[6%] w-[120px] animate-sway opacity-[0.22]" style={{ animationDelay: "-1.5s" }} />

    {/* Ghanaian Cedi ₵ 200 */}
    <CurrencyNote symbol="₵" denomination="200" country="CEDI · GHANA" color="#8B6914" accentColor="#5C4510"
      className="left-[6%] bottom-[14%] w-[110px] animate-drift-float opacity-[0.3]" style={{ animationDelay: "-2.5s" }} />

    {/* South African Rand R 200 */}
    <CurrencyNote symbol="R" denomination="200" country="RAND · SA" color="#1B4F72" accentColor="#0E3450"
      className="right-[2%] bottom-[8%] w-[150px] animate-sway opacity-[0.16] blur-[2px]" style={{ animationDelay: "-3.5s" }} />

    {/* Kenyan Shilling KSh 1000 */}
    <CurrencyNote symbol="KSh" denomination="1 000" country="SHILLING · KENYA" color="#7B3F00" accentColor="#5A2D00"
      className="left-[40%] top-[5%] w-[100px] animate-drift-float opacity-[0.25]" style={{ animationDelay: "-4s" }} />

    {/* Moroccan Dirham MAD 200 */}
    <CurrencyNote symbol="DH" denomination="200" country="DIRHAM · MAROC" color="#6B2D5B" accentColor="#4A1E40"
      className="right-[35%] top-[18%] w-[95px] animate-sway opacity-[0.32]" style={{ animationDelay: "-1s" }} />

    {/* XOF FCFA 5000 - blurred depth piece */}
    <CurrencyNote symbol="F" denomination="5 000" country="FCFA · BCEAO" color="#2D5F4D" accentColor="#1A3D30"
      className="left-[18%] top-[42%] w-[160px] animate-drift-float opacity-[0.12] blur-[4px]" style={{ animationDelay: "-5s" }} />

    {/* Egyptian Pound E£ 200 - bottom left large */}
    <CurrencyNote symbol="E£" denomination="200" country="POUND · EGYPT" color="#8B4513" accentColor="#654321"
      className="right-[12%] bottom-[28%] w-[130px] animate-sway opacity-[0.18] blur-[2px]" style={{ animationDelay: "-2s" }} />
  </div>
);

const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-14 pb-24 sm:pt-20">
      <div className="absolute inset-0 wax-dots opacity-30" />
      <div className="absolute -top-32 -left-20 w-96 h-96 bg-terracotta/20 rounded-full blur-[120px]" />
      <div className="absolute top-40 right-0 w-[28rem] h-[28rem] bg-palm/20 rounded-full blur-[130px]" />
      <FloatingCoinsBackground />

      <div className="relative max-w-[1400px] mx-auto px-6 sm:px-10 grid md:grid-cols-2 gap-14 items-center">
        <div className="animate-rise">
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

        <div className="relative min-h-[620px] sm:min-h-[680px] md:min-h-[720px] flex items-end justify-center pb-8">
          <div className="absolute inset-x-0 top-0 h-[500px] sm:h-[560px] z-10">
            <DigitalMoneyFlow />
          </div>
          <div className="relative z-20 w-full">
            <PhoneMock />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
