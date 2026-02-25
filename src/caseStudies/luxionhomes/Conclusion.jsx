import React, { useEffect, useRef, useState, useMemo } from "react";
import "../../styles/casestudy.css";

export default function Conclusion() {
  const sectionRef = useRef(null);

  const [scanActive, setScanActive] = useState(false);

  /* =========================================
     DATA
  ========================================= */

  const beforePoints = useMemo(
    () => [
      "Requests required manual monitoring and handling inside Salesforce.",
      "Agents performed manual data entry, routing, and coordination.",
      "Response speed depended entirely on human availability.",
      "Operational growth was limited by administrative workload.",
    ],
    [],
  );

  const afterPoints = useMemo(
    () => [
      "Every request is captured and processed automatically in real time.",
      "Salesforce records are created, updated, and structured automatically.",
      "Agents receive instant notifications with full operational context.",
      "Infrastructure now supports scalable growth without operational friction.",
    ],
    [],
  );

  const finalStatement =
    "Salesforce has evolved from a passive database into an active operational engine — automatically capturing requests, coordinating workflows, and enabling the agency to scale efficiently without increasing operational complexity.";

  /* =========================================
     STATE
  ========================================= */

  const [displayManual, setDisplayManual] = useState(beforePoints);

  const [manualHoverIndex, setManualHoverIndex] = useState(null);
  const [autoHoverIndex, setAutoHoverIndex] = useState(null);

  const scrambleIntervalRef = useRef(null);

  /* =========================================
     SCRAMBLE FUNCTION
  ========================================= */

  function scramblePositions(text) {
    const chars = text.split("");

    const indexes = [];

    for (let i = 0; i < chars.length; i++) {
      if (chars[i] !== " ") indexes.push(i);
    }

    const result = [...chars];

    const swaps = Math.floor(indexes.length * 0.35);

    for (let i = 0; i < swaps; i++) {
      const a = indexes[Math.floor(Math.random() * indexes.length)];
      const b = indexes[Math.floor(Math.random() * indexes.length)];

      const temp = result[a];
      result[a] = result[b];
      result[b] = temp;
    }

    return result.join("");
  }

  /* =========================================
     SCRAMBLE CONTROLLER
  ========================================= */

  useEffect(() => {
    if (manualHoverIndex === null) {
      clearInterval(scrambleIntervalRef.current);
      scrambleIntervalRef.current = null;
      setDisplayManual(beforePoints);
      return;
    }

    const original = beforePoints[manualHoverIndex];

    scrambleIntervalRef.current = setInterval(() => {
      setDisplayManual((prev) => {
        const updated = [...prev];
        updated[manualHoverIndex] = scramblePositions(original);
        return updated;
      });
    }, 140);

    return () => clearInterval(scrambleIntervalRef.current);
  }, [manualHoverIndex, beforePoints]);

  /* =========================================
     REVEAL + SCAN
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

        setTimeout(() => setScanActive(true), 500);
      },
      { threshold: 0.3 },
    );

    reveals.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  /* =========================================
     LETTER RENDERER
  ========================================= */

  function renderManualText(text, isHovering) {
    const letters = text.split("");

    return letters.map((char, i) => {
      if (char === " ")
        return (
          <span key={i} className="manual-letter space">
            &nbsp;
          </span>
        );

      const seed = (i * 37) % 100;

      const isLoss = isHovering && seed % 7 === 0;

      return (
        <span
          key={i}
          className={`manual-letter ${isLoss ? "loss-letter" : ""}`}
          style={{ "--seed": seed }}
        >
          {char}
        </span>
      );
    });
  }

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

        {/* GRID */}

        <div className="cs-conclusion-rows">
          {/* LABEL ROW */}

          <div className="cs-conclusion-label-row cs-conclusion-reveal">
            <div className="cs-conclusion-label before">Manual Workflow</div>

            <div></div>

            <div className="cs-conclusion-label after">
              Automated Infrastructure
            </div>
          </div>

          {/* ROWS */}

          {beforePoints.map((beforeText, index) => {
            const manualFear = autoHoverIndex === index;
            const manualChaos = manualHoverIndex === index;
            const autoActive = autoHoverIndex === index;

            return (
              <div
                key={index}
                className="cs-conclusion-row cs-conclusion-reveal"
              >
                {/* MANUAL */}

                <div
                  className={`
                    cs-conclusion-cell before
                    ${manualFear ? "manual-fear" : ""}
                    ${manualChaos ? "manual-chaos" : ""}
                  `}
                  onMouseEnter={() => setManualHoverIndex(index)}
                  onMouseLeave={() => setManualHoverIndex(null)}
                >
                  <span className="cs-point-text manual-text-inner">
                    {renderManualText(displayManual[index], manualChaos)}
                  </span>

                  <span className="cs-point-line"></span>
                </div>

                {/* CENTER DOT */}

                <div className="cs-conclusion-center-dot"></div>

                {/* AUTOMATED */}

                <div
                  className={`
                    cs-conclusion-cell after
                    ${autoActive ? "auto-active bold-active" : ""}
                  `}
                  onMouseEnter={() => setAutoHoverIndex(index)}
                  onMouseLeave={() => setAutoHoverIndex(null)}
                >
                  <span className="cs-point-text">{afterPoints[index]}</span>
                </div>
              </div>
            );
          })}

          {/* SCAN LINE */}

          <div className="cs-scan-line"></div>
        </div>

        {/* FINAL */}

        <div className="cs-conclusion-final-statement cs-conclusion-reveal">
          {finalStatement}
        </div>

        {/* STATUS */}

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
