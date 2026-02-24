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
          Case Study — Lead Conversion Infrastructure
        </div>

        {/* Headline */}
        <h1 className="cs-hero-headline">
          How We Increased Lead-to-Appointment Conversion by 78% and Eliminated
          Lead Leakage with a{" "}
          <span className="cs-hero-gradient-text">
            Fully Automated Conversion Infrastructure
          </span>
        </h1>

        {/* Subheadline */}
        <p className="cs-hero-subheadline">
          A high-growth real estate agency was generating between 40 and 120
          inbound inquiries daily across WhatsApp, Instagram, Facebook, website
          forms, landing pages, and email. Demand was strong, but delayed
          responses and manual follow-ups created conversion gaps. We designed
          and deployed a fully automated conversion system that captured every
          lead instantly, qualified them in real time, and routed them to the
          right agents without delay.
        </p>

        {/* Supporting paragraph */}
        <p className="cs-hero-supporting">
          Within 90 days, the agency increased lead-to-appointment conversion
          rates by 78%, reduced response time from hours to under five seconds,
          and eliminated lead leakage across all channels. The business
          transitioned from manual lead handling to a scalable conversion
          infrastructure capable of processing high lead volume consistently and
          reliably.
        </p>

        {/* Stats Row */}
        <div className="cs-hero-stats">
          <div className="cs-hero-stat-card">
            <div className="cs-hero-stat-value shimmer">78%</div>
            <div className="cs-hero-stat-label">
              Increase in Conversion Rate
            </div>
          </div>

          <div className="cs-hero-stat-card">
            <div className="cs-hero-stat-value shimmer">&lt;5s</div>
            <div className="cs-hero-stat-label">Lead Response Time</div>
          </div>

          <div className="cs-hero-stat-card">
            <div className="cs-hero-stat-value shimmer">40–120</div>
            <div className="cs-hero-stat-label">Daily Leads Processed</div>
          </div>

          <div className="cs-hero-stat-card">
            <div className="cs-hero-stat-value shimmer">100%</div>
            <div className="cs-hero-stat-label">Lead Capture Coverage</div>
          </div>
        </div>
      </div>
    </section>
  );
}
