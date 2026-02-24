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
      title: "Instant Multi-Channel Lead Capture",
      text: `Every inquiry from WhatsApp, Facebook, and Instagram is captured immediately. The system activates automatically, ensuring no lead is missed — regardless of timing, volume, or staff availability.`,
    },

    {
      title: "Persistent Lead Identity Creation",
      text: `Each lead is securely registered with name, phone number, and email. Returning users are recognized instantly, allowing conversations to continue intelligently without repeating steps.`,
    },

    {
      title: "Automated Intent Qualification",
      text: `The system dynamically determines whether the lead wants to buy, rent, sell, request valuation, or apply for pre-approval. Each pathway adapts automatically to capture only relevant information.`,
    },

    {
      title: "Intelligent Property Matching",
      text: `Based on budget and location, the system scans the live database and identifies the most relevant properties. Input normalization ensures accurate matching even with inconsistent formatting.`,
    },

    {
      title: "Real-Time Agent Assignment",
      text: `Qualified leads are instantly routed to the correct agent with complete context, enabling immediate, informed follow-up and dramatically increasing conversion efficiency.`,
    },

    {
      title: "Automated Lead Nurturing and Re-Engagement",
      text: `When new properties become available, the system automatically reconnects with matching leads — transforming missed opportunities into future conversions.`,
    },

    {
      title: "Unified Lead Management Across All Sources",
      text: `Leads from external platforms, email parsing, and listing marketplaces are automatically captured and integrated into a single structured system.`,
    },

    {
      title: "Complete Operational Visibility and Control",
      text: `Every interaction and conversion event is tracked, giving the business full visibility and enabling predictable scaling without increasing operational workload.`,
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
          <div className="cs-section-eyebrow">System Breakdown</div>

          <h2 className="cs-section-title">
            Infrastructure Designed for Speed, Accuracy, and Scale
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
