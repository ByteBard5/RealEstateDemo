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
            Transforming inbound demand into a structured and scalable
            conversion infrastructure
          </h2>
        </div>

        {/* BODY */}
        <div className="cs-intro-body">
          {/* vertical infrastructure line */}
          <div className="cs-intro-spine"></div>

          <div className="cs-intro-content">
            <p className="cs-reveal">
              This real estate agency was generating substantial inbound demand
              across multiple channels, including WhatsApp, Instagram, Facebook
              Messenger, website forms, landing pages, email inquiries, and
              property listing portals.
            </p>

            <p className="cs-reveal">
              Lead flow was consistent and significant, averaging between 40 and
              120 new inquiries per day. From an external perspective, the
              business appeared to be operating at a high level of performance,
              with strong market interest and continuous growth.
            </p>

            <p className="cs-reveal">
              But beneath that demand, a critical operational limitation
              existed.
            </p>

            <p className="cs-reveal">
              Despite the volume of inbound inquiries, a large percentage of
              leads were not converting into appointments or revenue.
              Opportunities entered the pipeline, but many never progressed
              beyond the initial inquiry.
            </p>

            <p className="cs-reveal">
              The problem was not a lack of demand. The problem was a lack of
              infrastructure.
            </p>

            <p className="cs-reveal">
              Leads were scattered across multiple platforms without a
              centralized capture system. Response times varied depending on
              agent availability. Follow-ups were inconsistent and difficult to
              manage across fragmented communication channels. Agents were
              forced to manually monitor conversations, qualify prospects, and
              coordinate responses — creating delays at the most important stage
              of the conversion process.
            </p>

            <p className="cs-reveal">
              This introduced a hidden but significant revenue leak. High-intent
              prospects lost momentum before engagement occurred, and potential
              transactions were lost due to operational friction rather than
              market conditions.
            </p>

            {/* highlight infrastructure card */}
            <div className="cs-intro-highlight cs-reveal">
              <div className="cs-highlight-glow"></div>

              <p>
                The agency had demand, visibility, and opportunity — but lacked
                the infrastructure required to convert that demand efficiently
                and consistently.
              </p>

              <p className="cs-highlight-strong">
                To solve this, we designed and deployed a fully automated lead
                conversion infrastructure capable of capturing, qualifying, and
                routing every inbound lead instantly — ensuring no opportunity
                was lost and enabling the business to convert demand into
                measurable revenue at scale.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
