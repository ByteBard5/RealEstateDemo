import { Link } from "react-router-dom";
import { motion } from "framer-motion";

/*
====================================================
CASE STUDY DATA (REAL DATA READY)
====================================================
*/

const caseStudies = [
  {
    title: "Cape Town Real Estate",
    subtitle: "Lead Capture & Conversion Automation",
    description:
      "Implemented a fully automated lead capture and qualification system that ensures every website, WhatsApp, and inbound inquiry is responded to instantly and routed correctly — eliminating response delays and improving overall lead conversion efficiency.",
    results: [
      { label: "Response time", value: "↓ 92%" },
      { label: "Qualified leads", value: "↑ 3.1x" },
      { label: "Missed inquiries", value: "0 lost" },
    ],
    link: "/case-study/capetown-real-estate",
  },

  {
    title: "New York Real Estate",
    subtitle: "Sales & Operations Workflow Automation",
    description:
      "Automated internal workflows including lead routing, CRM updates, follow-ups, and pipeline tracking. This enabled the sales team to operate with complete visibility and focus entirely on closing opportunities instead of managing repetitive tasks.",
    results: [
      { label: "Manual workload", value: "↓ 78%" },
      { label: "Pipeline visibility", value: "100%" },
      { label: "Operational speed", value: "↑ 2.4x" },
    ],
    link: "/case-study/newyork-salesforce-automation",
  },

  {
    title: "Real Estate Conversion Engine",
    subtitle: "End-to-End Client Acquisition System",
    description:
      "Built a complete acquisition system that captures, qualifies, nurtures, and advances buyer and seller leads automatically — ensuring continuous pipeline growth while allowing agents to focus exclusively on closing.",
    results: [
      { label: "Lead qualification", value: "Fully automated" },
      { label: "Agent efficiency", value: "↑ 3x" },
      { label: "Pipeline continuity", value: "24/7 active" },
    ],
    link: "/case-study/real-estate-conversion-engine",
  },
];

/*
====================================================
COMPONENT
====================================================
*/

export default function CaseStudySection() {
  return (
    <section id="case-study" className="case-study-section">
      {/* INTRO */}

      <motion.div
        className="case-study-intro"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2>Case Studies</h2>

        <p>
          Explore real systems developed for real estate companies. Each case
          study demonstrates measurable operational improvements, faster
          response times, and more efficient client acquisition through
          intelligent automation.
        </p>
      </motion.div>

      {/* GRID */}

      <div className="case-study-grid">
        {caseStudies.map((study, index) => (
          <Link key={index} to={study.link} className="case-study-card-link">
            <motion.div
              className="case-study-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <div className="case-study-label">Case Study</div>

              <h3 className="case-study-title">{study.title}</h3>

              <div className="case-study-subtitle">{study.subtitle}</div>

              <p className="case-study-description">{study.description}</p>

              <div className="case-study-results">
                {study.results.map((result, i) => (
                  <div key={i} className="case-study-result-item">
                    <div className="case-study-result-value">
                      {result.value}
                    </div>

                    <div className="case-study-result-label">
                      {result.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="case-study-view">View full case study →</div>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
}
