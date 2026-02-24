import React, { useEffect, useRef } from "react";
import "../../styles/casestudy.css";

export default function Problem() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const elements = sectionRef.current.querySelectorAll(".cs-problem-reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            entry.target.style.transitionDelay = `${index * 0.08}s`;
          }
        });
      },
      { threshold: 0.15 },
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="cs-section cs-problem-section" ref={sectionRef}>
      {/* animated system flow background */}
      <div className="cs-problem-bg-flow"></div>

      <div className="cs-container">
        {/* HEADER */}

        <div className="cs-section-header">
          <div className="cs-section-eyebrow cs-problem-reveal">
            The Problem
          </div>

          <h2 className="cs-section-title cs-problem-reveal">
            Operational Bottlenecks Limiting Conversion and Scale
          </h2>
        </div>

        {/* TIMELINE BODY */}

        <div className="cs-problem-timeline">
          <div className="cs-problem-line"></div>

          {/* BLOCKS */}

          <div className="cs-problem-item cs-problem-reveal">
            <div className="cs-problem-node"></div>

            <div className="cs-problem-content">
              Despite strong inbound demand, the agency’s operational
              infrastructure was not designed to capture and convert leads
              efficiently at scale. Critical processes were fragmented, manual,
              and heavily dependent on human intervention.
            </div>
          </div>

          <div className="cs-problem-item cs-problem-reveal">
            <div className="cs-problem-node"></div>

            <div className="cs-problem-content">
              Leads were arriving continuously from WhatsApp, Facebook,
              Instagram, and property listing platforms. But without a unified
              system, conversations were scattered across channels, making it
              difficult to respond quickly, maintain consistency, or ensure
              every inquiry was handled properly.
            </div>
          </div>

          <div className="cs-problem-item cs-problem-reveal">
            <div className="cs-problem-node"></div>

            <div className="cs-problem-content">
              There was no structured mechanism to qualify leads automatically.
              Every inquiry required manual back-and-forth to determine intent,
              introducing friction at the most sensitive stage of the conversion
              process.
            </div>
          </div>

          <div className="cs-problem-item cs-problem-reveal">
            <div className="cs-problem-node"></div>

            <div className="cs-problem-content">
              Property recommendations were handled manually. Agents had to
              search listings, identify matches, and send them individually,
              limiting scalability and operational capacity.
            </div>
          </div>

          <div className="cs-problem-item cs-problem-reveal">
            <div className="cs-problem-node"></div>

            <div className="cs-problem-content">
              Marketplace leads delivered via email were not integrated into any
              centralized workflow, resulting in delays, inconsistencies, and
              missed opportunities.
            </div>
          </div>

          <div className="cs-problem-item cs-problem-reveal">
            <div className="cs-problem-node"></div>

            <div className="cs-problem-content">
              There was no automated system to notify agents instantly when
              qualified leads emerged, reducing engagement speed and conversion
              likelihood.
            </div>
          </div>

          <div className="cs-problem-item cs-problem-reveal">
            <div className="cs-problem-node"></div>

            <div className="cs-problem-content">
              The agency had no infrastructure to nurture leads over time or
              re-engage prospects when relevant opportunities emerged.
            </div>
          </div>

          <div className="cs-problem-item cs-problem-reveal">
            <div className="cs-problem-node"></div>

            <div className="cs-problem-content">
              Most importantly, there was no centralized visibility into lead
              sources, handling, or conversion pathways — causing significant
              revenue loss within operational friction.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
