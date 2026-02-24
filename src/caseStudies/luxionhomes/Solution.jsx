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
            A Fully Automated Operational Layer Integrated Directly with
            Salesforce
          </h2>
        </div>

        {/* ARCHITECTURE GRID */}
        <div className="cs-solution-architecture">
          {/* CARD 01 */}
          <div className="cs-solution-arch-card">
            <div className="cs-arch-icon">01</div>

            <div className="cs-arch-content">
              <h3>Instant Request Capture and Workflow Initiation</h3>

              <p>
                Every tenant request and property inquiry submitted through
                Jotform, email, or internal systems is captured instantly. The
                automation layer immediately initiates the appropriate workflow,
                eliminating delays and removing dependency on manual monitoring.
              </p>
            </div>

            <div className="cs-arch-glow"></div>
          </div>

          {/* CARD 02 */}
          <div className="cs-solution-arch-card">
            <div className="cs-arch-icon">02</div>

            <div className="cs-arch-content">
              <h3>Automated Salesforce Record Creation and Updates</h3>

              <p>
                The system automatically verifies whether the individual exists
                in Salesforce. Existing records are updated and new records are
                created when necessary, ensuring Salesforce remains continuously
                accurate without manual data entry.
              </p>
            </div>

            <div className="cs-arch-glow"></div>
          </div>

          {/* CARD 03 */}
          <div className="cs-solution-arch-card">
            <div className="cs-arch-icon">03</div>

            <div className="cs-arch-content">
              <h3>Automated Household and Relationship Structuring</h3>

              <p>
                Household records and relationships between tenants, properties,
                and accounts are automatically created and linked, ensuring
                accurate data structure and complete operational visibility.
              </p>
            </div>

            <div className="cs-arch-glow"></div>
          </div>

          {/* CARD 04 */}
          <div className="cs-solution-arch-card">
            <div className="cs-arch-icon">04</div>

            <div className="cs-arch-content">
              <h3>Automatic File and Submission Attachment</h3>

              <p>
                Form submissions, documents, and supporting files are
                automatically attached to the correct Salesforce records,
                preserving full operational context without manual intervention.
              </p>
            </div>

            <div className="cs-arch-glow"></div>
          </div>

          {/* CARD 05 */}
          <div className="cs-solution-arch-card">
            <div className="cs-arch-icon">05</div>

            <div className="cs-arch-content">
              <h3>Real-Time Agent Notification and Task Delivery</h3>

              <p>
                Agents receive instant notifications through email and WhatsApp
                with full request context. This ensures immediate visibility and
                enables faster response without requiring manual system checks.
              </p>
            </div>

            <div className="cs-arch-glow"></div>
          </div>

          {/* CARD 06 */}
          <div className="cs-solution-arch-card">
            <div className="cs-arch-icon">06</div>

            <div className="cs-arch-content">
              <h3>Automated Tenant Communication and Follow-Ups</h3>

              <p>
                Confirmation messages, status updates, and follow-ups are
                delivered automatically, ensuring consistent tenant engagement
                while reducing manual communication workload.
              </p>
            </div>

            <div className="cs-arch-glow"></div>
          </div>

          {/* CARD 07 */}
          <div className="cs-solution-arch-card">
            <div className="cs-arch-icon">07</div>

            <div className="cs-arch-content">
              <h3>Integrated Financial Workflow Automation</h3>

              <p>
                Invoice submission, approval, and related financial workflows
                are integrated directly into the automation pipeline, ensuring
                operational continuity without manual coordination.
              </p>
            </div>

            <div className="cs-arch-glow"></div>
          </div>

          {/* CARD 08 */}
          <div className="cs-solution-arch-card">
            <div className="cs-arch-icon">08</div>

            <div className="cs-arch-content">
              <h3>Automated Lead Capture and Routing from Email</h3>

              <p>
                Property inquiries received via email are automatically
                captured, structured, and entered into Salesforce. Leads are
                instantly assigned to the appropriate agents, eliminating
                routing delays.
              </p>
            </div>

            <div className="cs-arch-glow"></div>
          </div>

          {/* CARD 09 */}
          <div className="cs-solution-arch-card">
            <div className="cs-arch-icon">09</div>

            <div className="cs-arch-content">
              <h3>
                Salesforce Transformation into an Active Operational Engine
              </h3>

              <p>
                Salesforce evolved from a passive record system into an active
                operational infrastructure capable of managing requests,
                maintaining accurate data, and coordinating workflows
                automatically in real time.
              </p>
            </div>

            <div className="cs-arch-glow"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
