import { useEffect, useState } from "react";

type RevealAxis = "x" | "y";

type RevealOptions = {
  axis?: RevealAxis;
  offset?: number;
  mobileOffset?: number;
  delay?: number;
  duration?: number;
  amount?: number;
  mobileAmount?: number;
};

export function useIsCompactViewport(breakpoint = 640) {
  const [isCompact, setIsCompact] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(`(max-width: ${breakpoint}px)`).matches : false,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const handleChange = (event: MediaQueryListEvent) => {
      setIsCompact(event.matches);
    };

    setIsCompact(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [breakpoint]);

  return isCompact;
}

export function getRevealMotion(isCompact: boolean, options: RevealOptions = {}) {
  const {
    axis = "y",
    offset = axis === "x" ? -24 : 24,
    mobileOffset = axis === "x" ? -8 : 8,
    delay = 0,
    duration = 0.45,
    amount = 0.3,
    mobileAmount = 0.08,
  } = options;

  const activeOffset = isCompact ? mobileOffset : offset;
  const initialPosition = axis === "x" ? { x: activeOffset } : { y: activeOffset };
  const settledPosition = axis === "x" ? { x: 0 } : { y: 0 };
  const isExportingPdf =
    typeof document !== "undefined" && document.documentElement.dataset.exportingPdf === "true";

  if (isExportingPdf) {
    return {
      initial: {
        ...settledPosition,
        opacity: 1,
      },
      whileInView: {
        ...settledPosition,
        opacity: 1,
      },
      viewport: {
        once: true,
        amount: 0,
      },
      transition: {
        duration: 0,
        delay: 0,
      },
    };
  }

  return {
    initial: {
      ...initialPosition,
      opacity: isCompact ? 0.6 : 0,
    },
    whileInView: {
      ...settledPosition,
      opacity: 1,
    },
    viewport: {
      once: true,
      amount: isCompact ? mobileAmount : amount,
    },
    transition: {
      duration: isCompact ? 0.18 : duration,
      delay: isCompact ? 0 : delay,
    },
  };
}
