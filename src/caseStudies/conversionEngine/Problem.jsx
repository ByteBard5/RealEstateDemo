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
            Lead Leakage, Delayed Response, and Operational Overload
          </h2>
        </div>

        {/* TIMELINE BODY */}

        <div className="cs-problem-timeline">
          <div className="cs-problem-line"></div>

          {/* BLOCKS */}

          <div className="cs-problem-item cs-problem-reveal">
            <div className="cs-problem-node"></div>

            <div className="cs-problem-content">
              Before implementing the conversion system, the agency’s lead
              management process was entirely dependent on manual coordination
              across multiple platforms.
            </div>
          </div>

          <div className="cs-problem-item cs-problem-reveal">
            <div className="cs-problem-node"></div>

            <div className="cs-problem-content">
              Inbound inquiries were arriving continuously through WhatsApp,
              Instagram, Facebook Messenger, website forms, landing pages, and
              email. But there was no centralized infrastructure to capture,
              organize, and manage this demand.
            </div>
          </div>

          <div className="cs-problem-item cs-problem-reveal">
            <div className="cs-problem-node"></div>

            <div className="cs-problem-content">
              Agents were responsible for monitoring each platform individually,
              identifying new inquiries, and responding manually. This created
              immediate operational strain.
            </div>
          </div>

          <div className="cs-problem-item cs-problem-reveal">
            <div className="cs-problem-node"></div>

            <div className="cs-problem-content">
              Response times were inconsistent and often delayed. Some leads
              received replies within a few hours. Others waited until the next
              day. Many never received a response at all.
            </div>
          </div>

          <div className="cs-problem-item cs-problem-reveal">
            <div className="cs-problem-node"></div>

            <div className="cs-problem-content">
              This delay had a direct and measurable impact on conversion.
              Internal performance analysis showed that leads contacted within
              five minutes were 21 times more likely to convert compared to
              leads contacted after thirty minutes. Yet the majority of inbound
              inquiries remained untouched during this critical window, allowing
              high-intent prospects to disengage or move to competing agencies.
            </div>
          </div>

          <div className="cs-problem-item cs-problem-reveal">
            <div className="cs-problem-node"></div>

            <div className="cs-problem-content">
              The issue was not isolated to response speed. The entire intake
              and qualification process lacked structure. Lead capture was
              fragmented across platforms, and information had to be manually
              transferred into spreadsheets or CRM systems.
            </div>
          </div>

          <div className="cs-problem-item cs-problem-reveal">
            <div className="cs-problem-node"></div>

            <div className="cs-problem-content">
              Qualification questions were asked inconsistently, resulting in
              incomplete or unreliable lead data. Follow-ups depended entirely
              on agent memory, workload, and availability, with no defined
              pipeline controlling the progression from inquiry to qualified
              opportunity.
            </div>
          </div>

          <div className="cs-problem-item cs-problem-reveal">
            <div className="cs-problem-node"></div>

            <div className="cs-problem-content">
              Agents were spending between three and five hours per day
              performing repetitive intake tasks — asking qualification
              questions, organizing lead information, and managing early-stage
              conversations — reducing the time available for high-value
              activities such as client engagement and closing.
            </div>
          </div>

          <div className="cs-problem-item cs-problem-reveal">
            <div className="cs-problem-node"></div>

            <div className="cs-problem-content">
              As operational pressure increased, leads began to slip through the
              cracks. An estimated 27% of inbound inquiries were never followed
              up properly, resulting in significant lost revenue despite strong
              inbound demand.
            </div>
          </div>

          <div className="cs-problem-item cs-problem-reveal">
            <div className="cs-problem-node"></div>

            <div className="cs-problem-content">
              The agency was not constrained by market interest. They were
              constrained by operational infrastructure. Without a system
              capable of capturing and qualifying leads instantly, conversion
              outcomes were determined not by demand, but by response speed and
              human capacity.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
