import React, { useEffect, useRef, useState } from "react";
import "../../styles/casestudy.css";

export default function Conclusion() {
  const sectionRef = useRef(null);
  const [scanActive, setScanActive] = useState(false);

  /* =========================================
     POINT DATA (PAIRED ROWS)
  ========================================= */

  const beforePoints = [
    "Requests required manual monitoring and handling inside Salesforce.",
    "Agents performed manual data entry, routing, and coordination.",
    "Response speed depended entirely on human availability.",
    "Operational growth was limited by administrative workload.",
  ];

  const afterPoints = [
    "Every request is captured and processed automatically in real time.",
    "Salesforce records are created, updated, and structured automatically.",
    "Agents receive instant notifications with full operational context.",
    "Infrastructure now supports scalable growth without operational friction.",
  ];

  const finalStatement =
    "Salesforce has evolved from a passive database into an active operational engine — automatically capturing requests, coordinating workflows, and enabling the agency to scale efficiently without increasing operational complexity.";

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
            Manual Coordination Eliminated. Operational Automation Achieved.
            Scalable Infrastructure Established.
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
            Automation Active — Operational Infrastructure Running Continuously
          </span>
        </div>
      </div>
    </section>
  );
}
