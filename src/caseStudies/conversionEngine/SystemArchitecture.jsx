import React, { useEffect, useRef } from "react";
import "../../styles/casestudy.css";

export default function SystemBreakdown() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const blocks = sectionRef.current.querySelectorAll(".cs-system-block");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.2 },
    );

    blocks.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Mouse reactive glow
  const handleMouseMove = (e) => {
    const cards = sectionRef.current.querySelectorAll(".cs-system-block-inner");

    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  };

  const steps = [
    {
      title: "Instant Lead Capture Across All Channels",
      text: `The process begins the moment a lead submits an inquiry through WhatsApp, Instagram, Facebook Messenger, website forms, landing pages, or email. The system captures every inquiry instantly and brings it into a centralized operational pipeline, ensuring no lead is missed and no inquiry depends on human monitoring.`,
    },

    {
      title: "Immediate Automated Response",
      text: `Once a lead enters the system, the conversion engine responds within seconds. Response time is reduced from hours to under five seconds, ensuring engagement occurs while intent is highest and eliminating the delay window where most conversion opportunities are lost.`,
    },

    {
      title: "Automated Lead Qualification and Intent Capture",
      text: `The system initiates a structured qualification sequence to transform raw inquiries into fully qualified opportunities. It captures critical decision variables including buyer or seller intent, budget range, property preferences, location requirements, timeline, and financing readiness.`,
    },

    {
      title: "Automatic CRM Synchronization and Data Structuring",
      text: `All lead information is automatically recorded, structured, and synchronized within the CRM and operational dashboard. The system organizes lead profiles, applies tags, and categorizes opportunities dynamically, eliminating manual data entry and ensuring pipeline accuracy.`,
    },

    {
      title: "Intelligent Lead Assignment and Agent Routing",
      text: `Once qualification is complete, the system assigns leads instantly to the appropriate agent using predefined routing logic. Agents receive fully qualified opportunities with complete context, allowing them to focus on engagement and conversion rather than intake.`,
    },

    {
      title: "Automated Follow-Up and Continuous Lead Nurturing",
      text: `The conversion engine maintains persistent engagement beyond the initial interaction. Automated follow-up sequences re-engage inactive leads and ensure no opportunity is lost due to missed follow-ups or human oversight.`,
    },

    {
      title: "Real-Time Pipeline Visibility and Operational Control",
      text: `The system provides complete visibility across the entire conversion pipeline. Management can monitor lead volume, qualification status, assignments, follow-ups, and conversion progression in real time, transforming lead handling into a transparent and controllable process.`,
    },
  ];

  return (
    <section
      className="cs-section cs-system-section"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
    >
      <div className="cs-grid-bg"></div>

      <div className="cs-container">
        <div className="cs-section-header">
          <div className="cs-section-eyebrow">System Architecture</div>

          <h2 className="cs-section-title">
            Workflow: How the Conversion Engine Captures, Qualifies, and Routes
            Every Lead Automatically
          </h2>
        </div>

        <div className="cs-system-content">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`cs-system-block ${
                index % 2 === 0 ? "left" : "right"
              }`}
            >
              <div className="cs-system-block-inner">
                <div className="cs-system-progress-line"></div>

                <div className="cs-system-step-number">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <h3 className="cs-system-block-title">{step.title}</h3>

                <p className="cs-system-block-text">{step.text}</p>

                <div className="cs-system-accent-dot"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
