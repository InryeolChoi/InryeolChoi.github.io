import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

import { projectItems } from "../data/siteContent";
import { getRevealMotion, useIsCompactViewport } from "../hooks/useViewportReveal";
import type { Locale } from "../types";
import { SectionHeading } from "./SectionHeading";

type ProjectsProps = {
  locale: Locale;
};

export function Projects({ locale }: ProjectsProps) {
  const { t } = useTranslation();
  const isCompact = useIsCompactViewport();

  return (
    <section className="contentSection">
      <SectionHeading id="projects" title={t("projectsTitle")} />
      <div className="stackedCards">
        {projectItems.map((item, index) => (
          <motion.article
            key={item.title}
            className="wideCard"
            {...getRevealMotion(isCompact, {
              axis: "y",
              offset: 30,
              mobileOffset: 8,
              duration: 0.45,
              delay: index * 0.08,
              amount: 0.3,
              mobileAmount: 0.08,
            })}
          >
            <div className="wideCardHeader">
              <div>
                <h3>{item.title}</h3>
                <p className="wideCardRole">
                  {t("role")}: {item.role[locale]}
                </p>
              </div>
              <div className="projectLinks">
                {item.liveUrl && (
                  <a href={item.liveUrl} target="_blank" rel="noreferrer">
                    {t("liveSite")}
                  </a>
                )}
                <a href={item.githubUrl} target="_blank" rel="noreferrer">
                  {t("viewGithub")}
                </a>
              </div>
            </div>
            <p>{item.summary[locale]}</p>
            <div className="projectDetailList">
              <div className="metaRow">
                <span className="metaHeading">{t("problem")}</span>
                <p>{item.problem[locale]}</p>
              </div>
              <div className="metaRow">
                <span className="metaHeading">{t("approach")}</span>
                <p>{item.approach[locale]}</p>
              </div>
            </div>
            <ul className="highlightList">
              {item.highlights[locale].map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
