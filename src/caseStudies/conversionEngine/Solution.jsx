import React, { useEffect, useRef } from "react";
import "../../styles/casestudy.css";

export default function Solution() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const cards = sectionRef.current.querySelectorAll(".cs-solution-arch-card");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0px) scale(1)";
          }
        });
      },
      { threshold: 0.15 },
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="cs-section cs-solution-section" ref={sectionRef}>
      {/* KEEP EXISTING BACKGROUND */}
      <div className="cs-grid-bg"></div>

      <div className="cs-container">
        {/* HEADER */}
        <div className="cs-section-header">
          <div className="cs-section-eyebrow">Solution</div>

          <h2 className="cs-section-title">
            A Centralized Conversion Engine Built to Capture, Qualify, and Route
            Every Lead Instantly
          </h2>
        </div>

        {/* ARCHITECTURE GRID */}
        <div className="cs-solution-architecture">
          {/* CARD 01 */}
          <div className="cs-solution-arch-card">
            <div className="cs-arch-icon">01</div>

            <div className="cs-arch-content">
              <h3>Unified Multi-Channel Lead Capture Infrastructure</h3>

              <p>
                The conversion engine integrated directly with WhatsApp,
                Instagram, Facebook Messenger, website forms, landing pages, and
                email inquiries. Every inbound inquiry was captured
                automatically, eliminating fragmented workflows and ensuring no
                lead was lost between platforms.
              </p>
            </div>

            <div className="cs-arch-glow"></div>
          </div>

          {/* CARD 02 */}
          <div className="cs-solution-arch-card">
            <div className="cs-arch-icon">02</div>

            <div className="cs-arch-content">
              <h3>Instant Automated Lead Engagement Layer</h3>

              <p>
                The system engaged leads immediately upon inquiry, reducing
                response time from hours to seconds. This ensured high-intent
                prospects received immediate attention, preserving engagement
                momentum and significantly increasing conversion probability.
              </p>
            </div>

            <div className="cs-arch-glow"></div>
          </div>

          {/* CARD 03 */}
          <div className="cs-solution-arch-card">
            <div className="cs-arch-icon">03</div>

            <div className="cs-arch-content">
              <h3>Structured Lead Qualification Engine</h3>

              <p>
                Leads were guided through intelligent qualification sequences
                designed to capture critical decision variables, including buyer
                or seller intent, budget range, preferred location, timeline,
                and financing readiness. Every inquiry was converted into
                structured, actionable lead data automatically.
              </p>
            </div>

            <div className="cs-arch-glow"></div>
          </div>

          {/* CARD 04 */}
          <div className="cs-solution-arch-card">
            <div className="cs-arch-icon">04</div>

            <div className="cs-arch-content">
              <h3>Automated CRM Synchronization and Lead Structuring</h3>

              <p>
                All lead data was recorded, organized, and synchronized within
                the CRM and operational dashboard automatically. Leads were
                categorized dynamically using tags and segmentation logic,
                creating a reliable and structured pipeline without manual data
                entry.
              </p>
            </div>

            <div className="cs-arch-glow"></div>
          </div>

          {/* CARD 05 */}
          <div className="cs-solution-arch-card">
            <div className="cs-arch-icon">05</div>

            <div className="cs-arch-content">
              <h3>Intelligent Lead Routing and Assignment System</h3>

              <p>
                Once qualified, leads were routed instantly to the appropriate
                agent using predefined assignment logic. Agents received full
                lead context, enabling immediate engagement without spending
                time on intake, qualification, or information gathering.
              </p>
            </div>

            <div className="cs-arch-glow"></div>
          </div>

          {/* CARD 06 */}
          <div className="cs-solution-arch-card">
            <div className="cs-arch-icon">06</div>

            <div className="cs-arch-content">
              <h3>Automated Follow-Up and Re-Engagement Infrastructure</h3>

              <p>
                Automated follow-up workflows ensured that leads who did not
                respond initially were re-engaged automatically. This removed
                reliance on manual follow-ups and ensured consistent engagement
                across the entire lead pipeline.
              </p>
            </div>

            <div className="cs-arch-glow"></div>
          </div>

          {/* CARD 07 */}
          <div className="cs-solution-arch-card">
            <div className="cs-arch-icon">07</div>

            <div className="cs-arch-content">
              <h3>Operational Dashboard and Pipeline Visibility Layer</h3>

              <p>
                The system provided centralized visibility into all inbound
                leads, qualification status, and assignment progression. This
                enabled the agency to monitor pipeline health, track conversion
                flow, and operate with complete clarity and control.
              </p>
            </div>

            <div className="cs-arch-glow"></div>
          </div>

          {/* CARD 08 */}
          <div className="cs-solution-arch-card">
            <div className="cs-arch-icon">08</div>

            <div className="cs-arch-content">
              <h3>Fully Automated Conversion Infrastructure</h3>

              <p>
                By automating capture, qualification, routing, and follow-up,
                the system eliminated operational bottlenecks and removed
                dependency on human availability. Every lead was captured,
                qualified, and routed automatically — transforming conversion
                into a predictable, infrastructure-driven process.
              </p>
            </div>

            <div className="cs-arch-glow"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
