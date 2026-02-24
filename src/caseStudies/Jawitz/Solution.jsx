import React, { useEffect, useRef } from "react";
import "../../styles/casestudy.css";

export default function Solution() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const cards = sectionRef.current.querySelectorAll(".cs-solution-arch-card");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
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
        {/* KEEP EXISTING HEADER */}
        <div className="cs-section-header">
          <div className="cs-section-eyebrow">Solution</div>

          <h2 className="cs-section-title">
            A Unified Automation System Built to Capture, Qualify, and Convert
            Every Lead
          </h2>
        </div>

        {/* NEW ARCHITECTURE GRID */}
        <div className="cs-solution-architecture">
          <div className="cs-solution-arch-card">
            <div className="cs-arch-icon">01</div>

            <div className="cs-arch-content">
              <h3>Instant Multi-Channel Lead Capture</h3>

              <p>
                The system operates across WhatsApp, Facebook, and Instagram,
                instantly engaging every inbound inquiry. Leads are captured
                automatically the moment they initiate contact, eliminating
                response delays and ensuring no opportunity is missed.
              </p>
            </div>

            <div className="cs-arch-glow"></div>
          </div>

          <div className="cs-solution-arch-card">
            <div className="cs-arch-icon">02</div>

            <div className="cs-arch-content">
              <h3>Persistent Lead Profile Creation</h3>

              <p>
                Essential lead data including name, phone number, and email is
                captured and securely stored. Each lead becomes part of a
                structured database, enabling continuous engagement and
                long-term nurturing.
              </p>
            </div>

            <div className="cs-arch-glow"></div>
          </div>

          <div className="cs-solution-arch-card">
            <div className="cs-arch-icon">03</div>

            <div className="cs-arch-content">
              <h3>Automated Intent Qualification Engine</h3>

              <p>
                Leads are guided through structured qualification workflows. The
                system dynamically identifies intent including buying, renting,
                selling, valuation requests, or pre-approval, and routes them
                automatically.
              </p>
            </div>

            <div className="cs-arch-glow"></div>
          </div>

          <div className="cs-solution-arch-card">
            <div className="cs-arch-icon">04</div>

            <div className="cs-arch-content">
              <h3>Automated Property Matching System</h3>

              <p>
                Based on preferences like location and budget, the system
                instantly searches the property database and presents relevant
                listings. Leads receive personalized property matches without
                manual effort.
              </p>
            </div>

            <div className="cs-arch-glow"></div>
          </div>

          <div className="cs-solution-arch-card">
            <div className="cs-arch-icon">05</div>

            <div className="cs-arch-content">
              <h3>Automated Property Submission Routing</h3>

              <p>
                Property owners can submit listing details directly through
                automation workflows. Submissions are structured and instantly
                delivered to agents for review and follow-up.
              </p>
            </div>

            <div className="cs-arch-glow"></div>
          </div>

          <div className="cs-solution-arch-card">
            <div className="cs-arch-icon">06</div>

            <div className="cs-arch-content">
              <h3>Email Inquiry Capture Infrastructure</h3>

              <p>
                The system automatically monitors email inquiries from external
                property platforms. Lead information is extracted, structured,
                and integrated into the system without human intervention.
              </p>
            </div>

            <div className="cs-arch-glow"></div>
          </div>

          <div className="cs-solution-arch-card">
            <div className="cs-arch-icon">07</div>

            <div className="cs-arch-content">
              <h3>Real-Time Agent Notification Layer</h3>

              <p>
                Agents receive instant notifications with full lead context,
                including preferences and intent. This enables faster engagement
                and improves conversion efficiency.
              </p>
            </div>

            <div className="cs-arch-glow"></div>
          </div>

          <div className="cs-solution-arch-card">
            <div className="cs-arch-icon">08</div>

            <div className="cs-arch-content">
              <h3>Long-Term Automated Engagement System</h3>

              <p>
                Automated alerts, follow-ups, and engagement workflows ensure
                continuous interaction. Leads are notified when relevant
                properties become available, maximizing conversion
                opportunities.
              </p>
            </div>

            <div className="cs-arch-glow"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
