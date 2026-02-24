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
          Case Study — Real Estate Automation System
        </div>

        {/* Headline */}
        <h1 className="cs-hero-headline">
          How We Built a Fully Automated Real Estate System That Captures,
          Qualifies, and Nurtures Every Lead —{" "}
          <span className="cs-hero-gradient-text">
            Across WhatsApp, Facebook, Instagram, and Email
          </span>
        </h1>

        {/* Subheadline */}
        <p className="cs-hero-subheadline">
          A growing real estate agency was losing valuable opportunities simply
          because their team couldn’t respond fast enough across multiple
          platforms. We engineered a fully integrated automation system that
          responds instantly, presents relevant properties, notifies agents in
          real time, captures leads from social media and email, and converts
          engagement into a self-sustaining growth engine — ensuring every
          inquiry is captured, qualified, and acted on automatically.
        </p>

        {/* Supporting paragraph */}
        <p className="cs-hero-supporting">
          What was once a fragmented, manual, and inconsistent process became a
          seamless automated pipeline. Every lead now receives immediate
          attention, every interaction moves prospects closer to conversion, and
          agents receive pre-qualified opportunities — without increasing their
          workload or operational complexity.
        </p>

        {/* Stats Row */}
        <div className="cs-hero-stats">
          <div className="cs-hero-stat-card">
            <div className="cs-hero-stat-value shimmer">Instant</div>
            <div className="cs-hero-stat-label">Lead Response Time</div>
          </div>

          <div className="cs-hero-stat-card">
            <div className="cs-hero-stat-value shimmer">24/7</div>
            <div className="cs-hero-stat-label">Automated Lead Capture</div>
          </div>

          <div className="cs-hero-stat-card">
            <div className="cs-hero-stat-value shimmer">Fully</div>
            <div className="cs-hero-stat-label">Automated Qualification</div>
          </div>

          <div className="cs-hero-stat-card">
            <div className="cs-hero-stat-value shimmer">Zero</div>
            <div className="cs-hero-stat-label">Missed Opportunities</div>
          </div>
        </div>
      </div>
    </section>
  );
}
