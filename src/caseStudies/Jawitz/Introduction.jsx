import React, { useEffect, useRef } from "react";
import "../../styles/casestudy.css";

export default function Introduction() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const elements = sectionRef.current.querySelectorAll(".cs-reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0px)";
            entry.target.style.transitionDelay = `${index * 0.12}s`;
          }
        });
      },
      { threshold: 0.15 },
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="cs-section cs-intro-section" ref={sectionRef}>
      {/* animated infrastructure grid */}
      <div className="cs-grid-bg"></div>

      {/* floating particles */}
      <div className="cs-particles">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className="cs-container">
        {/* HEADER */}
        <div className="cs-section-header">
          <div className="cs-section-eyebrow cs-reveal">Introduction</div>

          <h2 className="cs-section-title cs-reveal">
            Building the infrastructure required to capture and convert real
            estate demand at scale
          </h2>
        </div>

        {/* BODY */}
        <div className="cs-intro-body">
          {/* vertical infrastructure line */}
          <div className="cs-intro-spine"></div>

          <div className="cs-intro-content">
            <p className="cs-reveal">
              In real estate, speed is not an advantage — it is a requirement.
              Every inquiry represents intent, and the ability to capture,
              qualify, and respond to that intent immediately determines whether
              it converts into revenue or disappears.
            </p>

            <p className="cs-reveal">
              This Cape Town–based real estate agency was generating consistent
              inbound interest across multiple channels, including WhatsApp,
              Facebook, Instagram, and property listing platforms. Demand
              existed. Attention existed. But their internal infrastructure was
              not designed to handle it efficiently at scale.
            </p>

            <p className="cs-reveal">
              Their process relied heavily on manual intervention. Each new
              inquiry required a team member to respond, collect the lead’s
              information, understand their requirements, search for relevant
              properties, and then connect them with an agent.
            </p>

            <p className="cs-reveal">
              As lead volume increased, operational friction increased with it.
              Response times became inconsistent. Property recommendations
              varied depending on who handled the inquiry. Agents often received
              incomplete or delayed information.
            </p>

            <p className="cs-reveal">
              More critically, there was no structured system in place to
              nurture leads over time. Once an initial conversation ended, there
              was no reliable way to re-engage prospects or maintain engagement
              as their intent evolved.
            </p>

            {/* highlight infrastructure card */}
            <div className="cs-intro-highlight cs-reveal">
              <div className="cs-highlight-glow"></div>

              <p>
                The agency was not lacking demand. They were lacking
                infrastructure.
              </p>

              <p className="cs-highlight-strong">
                To solve this, we designed and implemented a fully automated
                real estate automation system — built to capture every inquiry,
                qualify every lead, instantly match them with relevant
                properties, and ensure agents could engage at the right moment,
                without delay.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
