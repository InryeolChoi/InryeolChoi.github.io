import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { Certifications } from "./components/Certifications";
import { Education } from "./components/Education";
import { Experience } from "./components/Experience";
import { Hero } from "./components/Hero";
import { IntroOverlay } from "./components/IntroOverlay";
import { LanguageToggle } from "./components/LanguageToggle";
import { LearningHistory } from "./components/LearningHistory";
import { Other } from "./components/Other";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { ThemeToggle } from "./components/ThemeToggle";
import { getLocale } from "./data/siteContent";
import type { Locale, ResolvedTheme, ThemeMode } from "./types";

const THEME_STORAGE_KEY = "theme_mode_v1";
const prefersDarkQuery = "(prefers-color-scheme: dark)";
const themeColorByTheme: Record<ResolvedTheme, string> = {
  light: "#f8fafc",
  dark: "#0b1220",
};

const getStoredThemeMode = (): ThemeMode => {
  if (typeof window === "undefined") {
    return "system";
  }

  const storedValue = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (storedValue === "light" || storedValue === "dark" || storedValue === "system") {
    return storedValue;
  }

  return "system";
};

const getSystemTheme = (): ResolvedTheme =>
  window.matchMedia(prefersDarkQuery).matches ? "dark" : "light";

function App() {
  const { i18n, t } = useTranslation();
  const [showIntro, setShowIntro] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => getStoredThemeMode());
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(() =>
    typeof window === "undefined" ? "light" : getSystemTheme(),
  );
  const locale: Locale = getLocale(i18n.language);
  const resolvedTheme: ResolvedTheme = themeMode === "system" ? systemTheme : themeMode;
  const cvRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowIntro(false);
    }, 1000);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    const mediaQuery = window.matchMedia(prefersDarkQuery);
    const syncSystemTheme = () => {
      setSystemTheme(mediaQuery.matches ? "dark" : "light");
    };

    syncSystemTheme();
    mediaQuery.addEventListener("change", syncSystemTheme);
    return () => {
      mediaQuery.removeEventListener("change", syncSystemTheme);
    };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = resolvedTheme;
    document.documentElement.dataset.themeMode = themeMode;
    document.documentElement.style.colorScheme = resolvedTheme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", themeColorByTheme[resolvedTheme]);
    window.localStorage.setItem(THEME_STORAGE_KEY, themeMode);
  }, [resolvedTheme, themeMode]);

  const handleDownloadCv = async () => {
    if (!cvRef.current || isExporting) {
      return;
    }

    setIsExporting(true);
    document.documentElement.dataset.exportingPdf = "true";

    try {
      const html2pdf = (await import("html2pdf.js")).default;
      await new Promise((resolve) => window.requestAnimationFrame(() => resolve(undefined)));
      await new Promise((resolve) => window.requestAnimationFrame(() => resolve(undefined)));
      await new Promise((resolve) => window.setTimeout(resolve, 250));
      const exporter = html2pdf() as {
        set: (options: Record<string, unknown>) => {
          from: (element: HTMLElement) => {
            save: () => Promise<void>;
          };
        };
      };
      const exportWidth = Math.ceil(cvRef.current.getBoundingClientRect().width);

      await exporter
        .set({
          filename: "inryeol-choi-cv.pdf",
          margin: [8, 8, 8, 8],
          image: {
            type: "jpeg",
            quality: 0.98,
          },
          pagebreak: {
            mode: ["css", "legacy"],
            avoid: [
              ".photoShell",
              ".personalInfoBlock",
              ".stackSection",
              ".stackLineItem",
              ".wideCard",
              ".timelineItem",
              ".timelineBody",
              ".courseGroupCard",
              ".coursePill",
              ".certificationCard",
              ".metaRow",
            ],
          },
          html2canvas: {
            scale: 1,
            useCORS: true,
            backgroundColor: "#ffffff",
            scrollX: 0,
            scrollY: 0,
            windowWidth: exportWidth,
          },
          jsPDF: {
            unit: "mm",
            format: "a4",
            orientation: "portrait",
          },
        })
        .from(cvRef.current)
        .save();
    } finally {
      delete document.documentElement.dataset.exportingPdf;
      window.setTimeout(() => {
        setIsExporting(false);
      }, 150);
    }
  };

  return (
    <>
      <IntroOverlay show={showIntro} />
      <div className="pageShell">
        <header className="topBar">
          <a className="brand" href="#about">
            {t("brand")}
          </a>
          <div className="topBarActions">
            <ThemeToggle mode={themeMode} resolvedTheme={resolvedTheme} onChange={setThemeMode} />
            <a
              className="topGithubLink"
              href="https://github.com/InryeolChoi"
              target="_blank"
              rel="noreferrer"
              aria-label={t("github")}
            >
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path
                  d="M12 1.5C6.201 1.5 1.5 6.201 1.5 12c0 4.64 3.01 8.577 7.188 9.967.525.098.712-.227.712-.504 0-.248-.009-.905-.014-1.777-2.924.636-3.541-1.409-3.541-1.409-.479-1.216-1.17-1.54-1.17-1.54-.956-.653.073-.64.073-.64 1.057.075 1.613 1.086 1.613 1.086.94 1.61 2.466 1.145 3.067.876.095-.68.368-1.145.67-1.409-2.334-.266-4.788-1.167-4.788-5.193 0-1.147.41-2.086 1.083-2.821-.109-.266-.469-1.337.103-2.788 0 0 .883-.283 2.896 1.078A10.08 10.08 0 0 1 12 6.614c.892.004 1.79.121 2.629.355 2.012-1.361 2.894-1.078 2.894-1.078.573 1.451.213 2.522.104 2.788.675.735 1.082 1.674 1.082 2.821 0 4.036-2.458 4.924-4.798 5.185.378.326.714.971.714 1.957 0 1.413-.013 2.552-.013 2.899 0 .279.186.607.719.503C19.493 20.573 22.5 16.638 22.5 12c0-5.799-4.701-10.5-10.5-10.5Z"
                  fill="currentColor"
                />
              </svg>
              <span>{t("github")}</span>
            </a>
          </div>
        </header>

        <main className={isExporting ? "pageContent exportMode" : "pageContent"} id="content" ref={cvRef}>
          <Hero locale={locale} />
          <Skills locale={locale} />
          <Projects locale={locale} />
          <LearningHistory locale={locale} />
          <Education locale={locale} />
          <Certifications locale={locale} />
          <Experience locale={locale} />
          <Other locale={locale} />
        </main>
        <footer className="pageFooter">
          <button className="cvButton" type="button" onClick={handleDownloadCv} disabled={isExporting}>
            {isExporting ? t("downloadingCv") : t("downloadCv")}
          </button>
        </footer>
        <LanguageToggle locale={locale} hidden={isExporting} />
      </div>
    </>
  );
}

export default App;
