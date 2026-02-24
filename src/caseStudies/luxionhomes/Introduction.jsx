import React, { useEffect, useRef } from "react";
import "../../styles/casestudy.css";

export default function Introduction() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const elements = sectionRef.current.querySelectorAll(".cs-reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0px)";
            entry.target.style.transitionDelay = `${index * 0.12}s`;
          }
        });
      },
      { threshold: 0.15 },
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="cs-section cs-intro-section" ref={sectionRef}>
      {/* animated infrastructure grid */}
      <div className="cs-grid-bg"></div>

      {/* floating particles */}
      <div className="cs-particles">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className="cs-container">
        {/* HEADER */}
        <div className="cs-section-header">
          <div className="cs-section-eyebrow cs-reveal">Introduction</div>

          <h2 className="cs-section-title cs-reveal">
            Transforming fragmented internal operations into a scalable,
            automated operational infrastructure
          </h2>
        </div>

        {/* BODY */}
        <div className="cs-intro-body">
          {/* vertical infrastructure line */}
          <div className="cs-intro-spine"></div>

          <div className="cs-intro-content">
            <p className="cs-reveal">
              As the agency expanded its property portfolio and tenant base, the
              volume and complexity of its internal operations increased
              significantly.
            </p>

            <p className="cs-reveal">
              Tenants were submitting maintenance requests, complaints, and
              general inquiries through Jotform, while new property inquiries
              were arriving through online forms and email. Each request
              required action, coordination, and accurate tracking.
            </p>

            <p className="cs-reveal">
              The agency was already using Salesforce to manage client records
              and Jotform to collect incoming requests. The necessary tools were
              in place. But the tools themselves were not the limitation.
            </p>

            <p className="cs-reveal">
              The limitation was how those tools were connected — or more
              precisely, how they were not.
            </p>

            <p className="cs-reveal">
              Every request depended on manual handling. Agents had to monitor
              incoming form submissions, access Salesforce, locate or create the
              appropriate records, update information, respond to tenants, and
              route tasks internally. Each step required time, attention, and
              human intervention.
            </p>

            <p className="cs-reveal">
              As request volume increased, this process introduced operational
              friction. Response times slowed. Internal coordination became
              inconsistent. Administrative workload increased. Tasks risked
              being delayed, mishandled, or overlooked entirely.
            </p>

            {/* highlight infrastructure card */}
            <div className="cs-intro-highlight cs-reveal">
              <div className="cs-highlight-glow"></div>

              <p>The system was functional, but it was not scalable.</p>

              <p className="cs-highlight-strong">
                To support continued growth, we designed and implemented a fully
                automated operational infrastructure — built to capture requests
                instantly, update Salesforce in real time, route tasks
                automatically, and ensure every tenant and client request was
                handled without delay or dependency on manual coordination.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
