import React, { useEffect, useRef, useState } from "react";
import "../../styles/casestudy.css";

export default function Conclusion() {
  const sectionRef = useRef(null);
  const [scanActive, setScanActive] = useState(false);

  /* =========================================
     POINT DATA (PAIRED ROWS)
  ========================================= */

  const beforePoints = [
    "Lead handling depended entirely on human availability.",
    "Response time varied, causing delays and lost opportunities.",
    "Agents spent time filtering and coordinating manually.",
    "Operational capacity was limited by workload.",
  ];

  const afterPoints = [
    "Every inquiry is captured and processed automatically.",
    "Qualification, routing, and engagement operate instantly.",
    "Agents receive qualified prospects with full context.",
    "Infrastructure now supports scalable and consistent growth.",
  ];

  const finalStatement =
    "Automation now functions as core operational infrastructure — aligning the business with its demand, removing operational friction, and ensuring no opportunity is lost between inquiry and conversion.";

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
            Infrastructure Established. Operations Aligned. Growth Unlocked.
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
            System Active — Operating Continuously
          </span>
        </div>
      </div>
    </section>
  );
}
