import React, { useEffect, useRef } from "react";
import "../../styles/casestudy.css";

export default function CTA() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          el.classList.add("active");
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="cs-section cs-cta-section" ref={sectionRef}>
      <div className="cs-grid-bg"></div>

      <div className="cs-container">
        {/* Headline */}

        <div className="cs-cta-header">
          <div className="cs-section-eyebrow">Next Step</div>

          <h2 className="cs-section-title">
            Deploy an Automated Lead Infrastructure That Never Misses Demand
          </h2>

          <p className="cs-cta-subtext">
            Your acquisition system should operate continuously — capturing
            inquiries, qualifying opportunities, and routing prospects instantly
            without relying on manual coordination. By implementing the right
            infrastructure, you eliminate response delays, improve conversion
            efficiency, and create a predictable, scalable growth engine. The
            next step is to identify where automation can replace operational
            friction in your current process.
          </p>
        </div>

        {/* Buttons */}

        <div className="cs-cta-actions">
          {/* Primary */}

          <a
            href="https://calendly.com/seyreon/client-acquisition-system-call"
            target="_blank"
            rel="noopener noreferrer"
            className="cs-cta-btn cs-cta-primary"
          >
            <span className="cs-btn-glow"></span>
            Book Infrastructure Strategy Call
          </a>

          {/* Secondary */}

          <a
            href="https://docs.google.com/document/d/1m1Bpt8zYxbCASpY-lmwBhU5FkkSM4R-DM5th1b-BSJ0/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="cs-cta-btn cs-cta-secondary"
          >
            <span className="cs-btn-glow"></span>
            Read Full Detailed Case Study
          </a>
        </div>

        {/* Ambient system indicator */}

        <div className="cs-cta-status">
          <div className="cs-status-dot"></div>
          Infrastructure Available for Deployment
        </div>
      </div>
    </section>
  );
}
