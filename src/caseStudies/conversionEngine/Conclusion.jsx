import React, { useEffect, useRef, useState } from "react";
import "../../styles/casestudy.css";

export default function Conclusion() {
  const sectionRef = useRef(null);
  const [scanActive, setScanActive] = useState(false);

  /* =========================================
     POINT DATA (PAIRED ROWS)
  ========================================= */

  const beforePoints = [
    "Lead conversion depended entirely on manual agent coordination.",
    "Response delays caused high-intent opportunities to disengage.",
    "Lead qualification and routing were inconsistent and fragmented.",
    "Operational capacity was limited by human speed and workload.",
  ];

  const afterPoints = [
    "Every inquiry is captured instantly across all channels.",
    "Lead qualification and routing occur automatically in real time.",
    "Agents receive structured, fully qualified opportunities.",
    "Infrastructure enables scalable and predictable conversion growth.",
  ];

  const finalStatement =
    "The conversion engine became a core operational infrastructure — transforming lead handling from a fragile, manual workflow into a scalable, automated system capable of capturing demand, eliminating operational friction, and converting opportunities consistently at scale.";

  /* =========================================
     REVEAL + SCAN ACTIVATION
  ========================================= */

  useEffect(() => {
    const reveals = sectionRef.current.querySelectorAll(
      ".cs-conclusion-reveal",
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (!entry.isIntersecting) return;

          setTimeout(() => {
            entry.target.classList.add("active");
          }, index * 140);
        });

        /* activate scan line allowing CSS animation */

        setTimeout(() => {
          setScanActive(true);
        }, 500);
      },
      { threshold: 0.3 },
    );

    reveals.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  /* =========================================
     COMPONENT
  ========================================= */

  return (
    <section
      ref={sectionRef}
      className={`cs-section cs-conclusion-section ${
        scanActive ? "scan-active" : ""
      }`}
    >
      <div className="cs-grid-bg"></div>

      <div className="cs-container">
        {/* HEADER */}

        <div className="cs-section-header cs-conclusion-header">
          <div className="cs-section-eyebrow cs-conclusion-reveal">
            Conclusion
          </div>

          <h2 className="cs-section-title cs-conclusion-reveal">
            Conversion Infrastructure Established. Operational Constraints
            Eliminated. Scalable Growth Enabled.
          </h2>
        </div>

        {/* ROW-ALIGNED TRANSFORMATION GRID */}

        <div className="cs-conclusion-rows">
          {/* LABEL ROW */}

          <div className="cs-conclusion-label-row cs-conclusion-reveal">
            {/* LEFT LABEL */}

            <div className="cs-conclusion-label before">Manual Workflow</div>

            {/* CENTER EMPTY */}

            <div></div>

            {/* RIGHT LABEL */}

            <div className="cs-conclusion-label after">
              Automated Infrastructure
            </div>
          </div>

          {/* ROW PAIRS */}

          {beforePoints.map((beforeText, index) => (
            <div key={index} className="cs-conclusion-row cs-conclusion-reveal">
              {/* BEFORE CELL */}

              <div className="cs-conclusion-cell before">
                <span className="cs-point-text">{beforeText}</span>

                <span className="cs-point-line"></span>
              </div>

              {/* CENTER DOT */}

              <div className="cs-conclusion-center-dot"></div>

              {/* AFTER CELL */}

              <div className="cs-conclusion-cell after">
                <span className="cs-point-text">{afterPoints[index]}</span>

                <span className="cs-point-glow"></span>
              </div>
            </div>
          ))}

          {/* SCAN LINE */}

          <div className="cs-scan-line"></div>
        </div>

        {/* FINAL STATEMENT */}

        <div className="cs-conclusion-final-statement cs-conclusion-reveal">
          {finalStatement}
        </div>

        {/* SYSTEM STATUS */}

        <div className="cs-conclusion-status cs-conclusion-reveal">
          <div className="cs-status-dot"></div>

          <span className="cs-status-text">
            Conversion Engine Active — Operating Continuously
          </span>
        </div>
      </div>
    </section>
  );
}
