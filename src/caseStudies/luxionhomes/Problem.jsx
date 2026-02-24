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
            Mission-critical operational workflows depended entirely on manual
            coordination
          </h2>
        </div>

        {/* TIMELINE BODY */}
        <div className="cs-problem-timeline">
          <div className="cs-problem-line"></div>

          {/* BLOCK 1 */}
          <div className="cs-problem-item cs-problem-reveal">
            <div className="cs-problem-node"></div>

            <div className="cs-problem-content">
              Before automation, every tenant request and property inquiry
              initiated a sequence of manual actions across multiple systems,
              requiring human involvement at each stage of the workflow.
            </div>
          </div>

          {/* BLOCK 2 */}
          <div className="cs-problem-item cs-problem-reveal">
            <div className="cs-problem-node"></div>

            <div className="cs-problem-content">
              When tenants submitted requests through Jotform, agents had to
              manually access Salesforce, locate the correct client record,
              review submissions, contact tenants, resolve issues, and update
              records — introducing delays and operational dependency on manual
              handling.
            </div>
          </div>

          {/* BLOCK 3 */}
          <div className="cs-problem-item cs-problem-reveal">
            <div className="cs-problem-node"></div>

            <div className="cs-problem-content">
              Agents could not continuously monitor incoming requests in real
              time. Submissions waited in queues until someone became available,
              making response speed dependent on human availability rather than
              system reliability.
            </div>
          </div>

          {/* BLOCK 4 */}
          <div className="cs-problem-item cs-problem-reveal">
            <div className="cs-problem-node"></div>

            <div className="cs-problem-content">
              Property inquiries arriving through email required manual review,
              data extraction, Salesforce record creation or updates, and
              internal assignment — creating multiple points where delays,
              incomplete data entry, or missed opportunities could occur.
            </div>
          </div>

          {/* BLOCK 5 */}
          <div className="cs-problem-item cs-problem-reveal">
            <div className="cs-problem-node"></div>

            <div className="cs-problem-content">
              As operational volume increased, tenant issues risked delayed
              resolution and lead inquiries could be missed or inconsistently
              tracked, reducing both operational efficiency and conversion
              reliability.
            </div>
          </div>

          {/* BLOCK 6 */}
          <div className="cs-problem-item cs-problem-reveal">
            <div className="cs-problem-node"></div>

            <div className="cs-problem-content">
              Agents spent significant time performing administrative data entry
              and coordination tasks instead of focusing on tenant support and
              revenue-generating activities.
            </div>
          </div>

          {/* BLOCK 7 */}
          <div className="cs-problem-item cs-problem-reveal">
            <div className="cs-problem-node"></div>

            <div className="cs-problem-content">
              Internal coordination lacked structured workflow logic. Task
              routing, request handling, and status tracking depended entirely
              on manual oversight rather than automated operational processes.
            </div>
          </div>

          {/* BLOCK 8 */}
          <div className="cs-problem-item cs-problem-reveal">
            <div className="cs-problem-node"></div>

            <div className="cs-problem-content">
              Even financial workflows such as invoice submission and approval
              required manual communication and tracking, further increasing
              operational friction and administrative overhead.
            </div>
          </div>

          {/* BLOCK 9 */}
          <div className="cs-problem-item cs-problem-reveal">
            <div className="cs-problem-node"></div>

            <div className="cs-problem-content">
              Salesforce functioned primarily as a passive database — storing
              information but not actively managing or driving operational
              workflows.
            </div>
          </div>

          {/* BLOCK 10 */}
          <div className="cs-problem-item cs-problem-reveal">
            <div className="cs-problem-node"></div>

            <div className="cs-problem-content">
              The agency needed Salesforce to operate as an active operational
              system — capable of capturing requests automatically, triggering
              workflows instantly, routing tasks intelligently, and ensuring no
              tenant issue or inquiry depended on manual intervention.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
