import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    // Special case: Case Study section scroll
    if (location.pathname === "/case-study") {
      const section = document.getElementById("case-study");

      if (section) {
        setTimeout(() => {
          section.scrollIntoView({
            behavior: "instant",
            block: "start",
          });
        }, 50);
      }

      return;
    }

    // Normal pages scroll to top
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [location.pathname]);

  return null;
}
