import React from "react";
import "../../styles/casestudy.css";

export default function Hero() {
  return (
    <section className="cs-hero">
      {/* Background glow layers */}
      <div className="cs-hero-bg-glow cs-hero-glow-1"></div>
      <div className="cs-hero-bg-glow cs-hero-glow-2"></div>

      <div className="cs-hero-container">
        {/* Eyebrow */}
        <div className="cs-hero-eyebrow">
          <span className="cs-hero-eyebrow-dot"></span>
          Case Study — Real Estate Operations Automation
        </div>

        {/* Headline */}
        <h1 className="cs-hero-headline">
          How We Automated a New York Real Estate Agency’s Internal Operations
          and{" "}
          <span className="cs-hero-gradient-text">
            Eliminated Manual Salesforce Updates, Lead Routing, and Request
            Handling
          </span>
        </h1>

        {/* Subheadline */}
        <p className="cs-hero-subheadline">
          A growing real estate agency in New York was managing tenant requests,
          property inquiries, and internal workflows manually inside Salesforce
          — creating delays, inconsistencies, and operational bottlenecks. We
          designed and implemented a fully automated system that captures
          requests instantly, updates Salesforce in real time, routes tasks to
          the right agents automatically, and ensures every request is handled
          without delay.
        </p>

        {/* Supporting paragraph */}
        <p className="cs-hero-supporting">
          What was previously dependent on manual data entry, internal
          coordination, and constant oversight became a structured, automated
          operational layer. The system eliminated administrative friction,
          reduced response delays, and gave the agency the infrastructure needed
          to scale its operations without increasing internal workload.
        </p>

        {/* Stats Row */}
        <div className="cs-hero-stats">
          <div className="cs-hero-stat-card">
            <div className="cs-hero-stat-value shimmer">Instant</div>
            <div className="cs-hero-stat-label">Salesforce Request Capture</div>
          </div>

          <div className="cs-hero-stat-card">
            <div className="cs-hero-stat-value shimmer">Real-Time</div>
            <div className="cs-hero-stat-label">
              Automated Salesforce Updates
            </div>
          </div>

          <div className="cs-hero-stat-card">
            <div className="cs-hero-stat-value shimmer">Automated</div>
            <div className="cs-hero-stat-label">Lead Routing & Assignment</div>
          </div>

          <div className="cs-hero-stat-card">
            <div className="cs-hero-stat-value shimmer">Zero</div>
            <div className="cs-hero-stat-label">Manual Administrative Work</div>
          </div>
        </div>
      </div>
    </section>
  );
}
