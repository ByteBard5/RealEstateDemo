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
      "Lead handling depended entirely on human availability.",
      "Response time varied, causing delays and lost opportunities.",
      "Agents spent time filtering and coordinating manually.",
      "Operational capacity was limited by workload.",
    ],
    [],
  );

  const afterPoints = useMemo(
    () => [
      "Every inquiry is captured and processed automatically.",
      "Qualification, routing, and engagement operate instantly.",
      "Agents receive qualified prospects with full context.",
      "Infrastructure now supports scalable and consistent growth.",
    ],
    [],
  );

  const finalStatement =
    "Automation now functions as core operational infrastructure — aligning the business with its demand, removing operational friction, and ensuring no opportunity is lost between inquiry and conversion.";

  /* =========================================
     DISPLAY STATE
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

    const letterIndexes = [];

    for (let i = 0; i < chars.length; i++) {
      if (chars[i] !== " ") {
        letterIndexes.push(i);
      }
    }

    const result = [...chars];

    const swaps = Math.floor(letterIndexes.length * 0.35);

    for (let i = 0; i < swaps; i++) {
      const indexA =
        letterIndexes[Math.floor(Math.random() * letterIndexes.length)];

      const indexB =
        letterIndexes[Math.floor(Math.random() * letterIndexes.length)];

      const temp = result[indexA];
      result[indexA] = result[indexB];
      result[indexB] = temp;
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

    const originalText = beforePoints[manualHoverIndex];

    scrambleIntervalRef.current = setInterval(() => {
      setDisplayManual((prev) => {
        const updated = [...prev];
        updated[manualHoverIndex] = scramblePositions(originalText);
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

      const randomSeed = (i * 37) % 100;

      const shouldBeRed = isHovering && randomSeed % 7 === 0;

      return (
        <span
          key={i}
          className={`manual-letter ${shouldBeRed ? "loss-letter" : ""}`}
          style={{
            "--seed": randomSeed,
          }}
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
            Infrastructure Established. Operations Aligned. Growth Unlocked.
          </h2>
        </div>

        {/* ROW GRID */}

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

        {/* FINAL STATEMENT */}

        <div className="cs-conclusion-final-statement cs-conclusion-reveal">
          {finalStatement}
        </div>

        {/* STATUS */}

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
