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
      +5 000 FCFA
    </OrbitingChip>
    <OrbitingChip tone="palm" radiusClass="orbit-inner" direction="cw" delay="-12s" duration="24s">
      Transfert
    </OrbitingChip>
    <OrbitingChip tone="terracotta" radiusClass="orbit-outer" direction="ccw" delay="0s" duration="32s">
      Wallet
    </OrbitingChip>
    <OrbitingChip tone="gold" radiusClass="orbit-outer" direction="ccw" delay="-16s" duration="32s">
      Mobile Money
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
        <div className="w-9 h-9 rounded-full bg-terracotta flex items-center justify-center font-display font-bold text-ink text-sm">
          Eg
        </div>
        <div>
          <p className="font-body font-bold text-ink text-sm">Cercle Egoto - Adawlato</p>
          <p className="font-body text-ink/70 text-[11px]">12 membres · en ligne</p>
        </div>
      </div>
      <div className="p-4 flex flex-col gap-3 min-h-[360px] bg-ink">
        <div className="self-start bg-ink-soft text-paper text-xs font-body rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[80%] flex items-center gap-2">
          <CheckIcon className="text-gold" />
          Bonjour ! Votre cotisation de 5 000 FCFA a bien été collectée.
        </div>
        <div className="self-start bg-ink-soft text-paper text-xs font-body rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[80%]">
          Tour n°4 : c'est au tour de <strong className="text-paper">Da Adjo</strong> de recevoir la cagnotte.
        </div>
        <div className="self-end bg-gradient-to-br from-gold-deep to-gold/80 text-ink text-xs font-body font-semibold rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[70%] flex items-center gap-2 shadow-2xl ring-2 ring-gold-deep/40 filter saturate-110 bubble-text-shadow">
          <ChartIcon className="text-ink" />
          Merci ! Mon Score Egoto a augmenté ?
        </div>
        <div className="self-start bg-ink-soft text-paper text-xs font-body rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[80%] flex items-center gap-2">
          <SparkleIcon className="text-gold" />
          Oui : <strong className="text-terracotta">612 pts</strong> - vous débloquez la Carte Gold.
        </div>

        <div className="mt-auto card-surface rounded-2xl p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-body text-[11px] text-paper-dim uppercase tracking-wide">Score Egoto</span>
            <span className="font-display font-bold text-gold text-sm">612 / 1000</span>
          </div>
          <div className="h-2 rounded-full bg-ink-line overflow-hidden">
            <div className="h-full score-fill bg-gradient-to-r from-terracotta to-gold" style={{ width: "61%" }} />
          </div>
        </div>
      </div>
    </div>

    <div className="absolute -bottom-8 -left-10 w-52 rounded-2xl bg-gradient-to-br from-palm to-palm-deep p-4 shadow-2xl border border-palm-light/30 rotate-[-6deg] hidden xs:block">
      <p className="font-body text-[10px] text-ink/70 uppercase tracking-wider">Carte Egoto Gold</p>
      <p className="font-display text-ink text-lg mt-3 tracking-widest">•••• 4471</p>
      <div className="flex justify-between items-end mt-4">
        <span className="font-body text-ink/70 text-[10px]">Da Adjo</span>
        <span className="font-display italic text-gold font-semibold text-sm">VISA</span>
      </div>
    </div>
  </div>
);

const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-14 pb-24 sm:pt-20">
      <div className="absolute inset-0 wax-dots opacity-30" />
      <div className="absolute -top-32 -left-20 w-96 h-96 bg-terracotta/20 rounded-full blur-[120px]" />
      <div className="absolute top-40 right-0 w-[28rem] h-[28rem] bg-palm/20 rounded-full blur-[130px]" />

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
              <ChatBubbleIcon className="text-gold" />
              <span>Bot WhatsApp FR/EN</span>
            </div>
            <div className="flex items-center gap-2">
              <MobileAppIcon className="text-gold" />
              <span>App Android & iOS</span>
            </div>
            <div className="flex items-center gap-2">
              <UssdIcon className="text-gold" />
              <span>USSD sans smartphone</span>
            </div>
          </div>
        </div>

        <div className="relative min-h-[620px] sm:min-h-[680px] md:min-h-[720px] flex items-end justify-center pb-8">
          <div className="absolute inset-x-0 top-0 h-[500px] sm:h-[560px]">
            <DigitalMoneyFlow />
          </div>
          <div className="relative z-10 w-full">
            <PhoneMock />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
