import { Link } from "react-router-dom";
import { motion } from "framer-motion";

/* ==========================================================================================
   BLOG GATEWAY SECTION
========================================================================================== */

export default function BlogGatewaySection() {
  return (
    <section className="blog-gateway-section">
      {/* BACKGROUND ORBS */}
      <div
        className="blog-gateway-orb blog-gateway-orb--tl"
        aria-hidden="true"
      />
      <div
        className="blog-gateway-orb blog-gateway-orb--br"
        aria-hidden="true"
      />

      {/* INNER WRAPPER */}
      <div className="blog-gateway-inner">
        {/* EYEBROW LABEL */}
        <motion.div
          className="blog-gateway-eyebrow"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          INTELLIGENCE HUB
        </motion.div>

        {/* INTRO */}
        <motion.div
          className="blog-gateway-intro"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2>
            Strategies That
            <br />
            <span className="blog-gateway-accent">Compound Your Edge</span>
          </h2>

          <p>
            Every insight here is a lever. Discover the exact systems
            high-performing real estate teams use to accelerate pipeline
            velocity, eliminate dead leads, and turn automation into a
            sustainable competitive moat — week after week.
          </p>
        </motion.div>

        {/* DIVIDER LINE */}
        <motion.div
          className="blog-gateway-divider"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        />

        {/* CTA */}
        <motion.div
          className="blog-gateway-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Link to="/blog" className="blog-gateway-button">
            <span>Explore Insights</span>
            <svg
              className="blog-gateway-button-arrow"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M3.75 9H14.25M14.25 9L9.75 4.5M14.25 9L9.75 13.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>

          <div className="blog-gateway-footnote">
            Updated weekly &nbsp;·&nbsp; Real systems &nbsp;·&nbsp; Zero fluff
          </div>
        </motion.div>
      </div>
      {/* END INNER WRAPPER */}
    </section>
  );
}

/* ==========================================================================================
   BLOG GATEWAY SECTION END
========================================================================================== */
