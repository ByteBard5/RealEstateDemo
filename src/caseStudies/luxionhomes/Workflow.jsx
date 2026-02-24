import React, { useEffect, useRef } from "react";
import "../../styles/casestudy.css";

export default function Workflow() {
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
      title: "Instant Request Capture",
      text: `The workflow begins the moment a tenant submits a request through Jotform or a client sends a property inquiry via email or form. The system captures the submission instantly and initiates processing in real time, ensuring no delay between request submission and operational action.`,
    },

    {
      title: "Automatic Client Identification and Record Management",
      text: `The system verifies whether the individual already exists in Salesforce. Existing records are updated automatically, while new client profiles and household relationships are created when needed. This ensures Salesforce remains continuously organized and accurate without manual data entry.`,
    },

    {
      title: "Automatic Data Structuring and Document Attachment",
      text: `All submitted data, documents, and supporting files are automatically structured and attached to the correct Salesforce records. This preserves complete operational context and eliminates the need for manual file handling or administrative processing.`,
    },

    {
      title: "Intelligent Agent Assignment and Real-Time Notification",
      text: `The system identifies the appropriate agent using predefined assignment logic and delivers instant notifications via email and WhatsApp. Each agent receives full request context, enabling immediate response without manually checking Salesforce.`,
    },

    {
      title: "Automated Client Communication and Lifecycle Follow-Up",
      text: `Confirmation messages are sent automatically upon submission, followed by automated follow-ups, status tracking, and feedback collection. Every request progresses through a structured lifecycle from submission to resolution without being lost or overlooked.`,
    },

    {
      title: "Automated Invoice Submission and Approval Routing",
      text: `Invoice submission and financial workflows are integrated directly into the automation pipeline. Requests are automatically routed to appropriate internal stakeholders, ensuring approvals and financial coordination occur without delays.`,
    },

    {
      title: "Automated Lead Capture and Salesforce Synchronization",
      text: `Property inquiries received through email or forms are captured instantly, structured automatically, and entered into Salesforce. Leads are assigned to agents immediately, ensuring every inquiry becomes actionable without manual intervention.`,
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
          <div className="cs-section-eyebrow">Workflow</div>

          <h2 className="cs-section-title">
            How the Automation System Operates Across Capture, Routing, and
            Resolution
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
