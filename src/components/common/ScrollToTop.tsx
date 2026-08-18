import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToTop() {
  const { pathname, search, hash } = useLocation();

  useLayoutEffect(() => {
    // If navigating to an anchor hash (e.g. #collections), scroll smoothly to that element
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        if (window.__lenis) {
          window.__lenis.scrollTo(element as HTMLElement, { immediate: false, offset: -80 });
        } else {
          element.scrollIntoView({ behavior: "smooth" });
        }
        return;
      }
    }

    // Immediately reset Lenis smooth scroll offset
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    }

    // Reset standard window and document viewport scroll
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname, search, hash]);

  return null;
}
