import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

import { achievementItems } from "../data/siteContent";
import { getRevealMotion, useIsCompactViewport } from "../hooks/useViewportReveal";
import type { Locale } from "../types";
import { SectionHeading } from "./SectionHeading";

type AchievementsProps = {
  locale: Locale;
};

export function Achievements({ locale }: AchievementsProps) {
  const { t } = useTranslation();
  const isCompact = useIsCompactViewport();

  return (
    <section className="contentSection">
      <SectionHeading id="achievements" title={t("achievementsTitle")} />
      <div className="stackedCards">
        {achievementItems.map((item) => (
          <motion.article
            key={item.event}
            className="wideCard achievementCard"
            {...getRevealMotion(isCompact, {
              axis: "y",
              offset: 30,
              mobileOffset: 8,
              duration: 0.45,
              amount: 0.3,
              mobileAmount: 0.08,
            })}
          >
            <div className="wideCardHeader">
              <div>
                <h3>{item.event}</h3>
                <p className="wideCardRole">{item.date[locale]} · {item.organizer}</p>
              </div>
              <div className="projectLinks">
                <a href="#agenttrap">{item.project}</a>
              </div>
            </div>
            <p className="achievementResult">
              <strong>{item.placement[locale]}</strong>
              <span>{item.awardType[locale]}</span>
            </p>
            <p>{item.context[locale]}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
