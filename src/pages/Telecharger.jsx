import React from "react";
import { PageHero, SectionHeading, PrimaryButton, GhostButton } from "../components/ui";
import { DownloadIllustration } from "../components/Illustrations";
import { useLanguage } from "../context/LanguageContext";

const Telecharger = () => {
  const { t } = useLanguage();

  return (
    <>
      <PageHero
        eyebrow={t("download.hero.eyebrow")}
        title={t("download.hero.title")}
        text={t("download.hero.text")}
      />

      <section className="max-w-5xl mx-auto px-6 sm:px-10 py-24">
        <div className="grid md:grid-cols-[1fr_340px] gap-12 items-center">
          <div>
            <SectionHeading
              title={t("download.soon.title")}
              text={t("download.soon.text")}
            />

            <div className="mt-10 grid gap-6 sm:grid-cols-2 text-center">
              <div className="card-surface rounded-3xl p-8">
                <div className="flex justify-center items-center gap-3">
                  <svg className="w-6 h-6 fill-[#3DDC84]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.5 12c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-11 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm11.59-4.8l1.72-2.98a.5.5 0 00-.18-.68.5.5 0 00-.68.18L15.2 6.77c-1-.45-2.1-.77-3.2-.77s-2.2.32-3.2.77L7.05 3.72a.5.5 0 00-.68-.18.5.5 0 00-.18.68l1.72 2.98C5.2 8.7 3.32 11.5 3 14.8h18c-.32-3.3-2.2-6.1-4.91-7.6z"/>
                  </svg>
                  <h3 className="font-display font-semibold text-xl text-paper">Android</h3>
                </div>
                <p className="font-body text-paper-dim text-sm mt-3 leading-relaxed">
                  {t("download.android.desc")}
                </p>
                <div className="mt-8">
                  <button className="w-full bg-ink border border-ink-line text-paper font-bold px-6 py-3 rounded-full" disabled>
                    {t("download.soon.btn")}
                  </button>
                </div>
              </div>

              <div className="card-surface rounded-3xl p-8">
                <div className="flex justify-center items-center gap-3">
                  <svg className="w-6 h-6 fill-paper" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.05-1 .04-2.2.67-2.92 1.51-.62.73-1.16 1.87-1.02 2.98 1.1.09 2.22-.57 2.95-1.44z"/>
                  </svg>
                  <h3 className="font-display font-semibold text-xl text-paper">iOS</h3>
                </div>
                <p className="font-body text-paper-dim text-sm mt-3 leading-relaxed">
                  {t("download.ios.desc")}
                </p>
                <div className="mt-8">
                  <button className="w-full bg-ink border border-ink-line text-paper font-bold px-6 py-3 rounded-full" disabled>
                    {t("download.soon.btn")}
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-10 text-paper-dim text-sm leading-relaxed text-center">
              <p>{t("download.footer.text")}</p>
              <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
                <PrimaryButton to="/contact">{t("btn.beInformed")}</PrimaryButton>
                <GhostButton to="/solution">{t("btn.seeSolution")}</GhostButton>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center select-none shrink-0">
            <DownloadIllustration />
          </div>
        </div>
      </section>
    </>
  );
};

export default Telecharger;
