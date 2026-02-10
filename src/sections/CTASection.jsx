import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section className="cta-section" id="cta-section">
      {/* Animated Background */}
      <div className="cta-bg" />

      <motion.div
        className="cta-container"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <motion.h2
          className="cta-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Let me explain what’s really happening.
        </motion.h2>

        <div className="cta-text">
          <p>
            When someone enquires about a property, they’re not comparing
            prices. They’re comparing <strong>who responds first</strong>.
          </p>

          <p>
            If that reply doesn’t come immediately — not in hours, not later —
            attention moves on. Quietly. Automatically.
          </p>

          <p className="cta-emphasis">
            That’s not a mindset problem.
            <br />
            It’s a system problem.
          </p>

          <p>
            The businesses that win today aren’t working harder. They’ve simply
            removed the delay between interest and response.
          </p>

          <p>
            What you’ve seen on this site is what happens when availability is
            no longer a bottleneck. When follow-ups don’t depend on memory. When
            opportunities don’t wait for office hours.
          </p>

          <p className="cta-soft">
            You don’t need to change anything right now.
            <br />
            Just understand this — every manual gap has a cost. Most businesses
            just never calculate it.
          </p>
        </div>

        <div className="cta-divider" />

        <div className="cta-links">
          <a
            href="https://wa.me/916398800516"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-link primary"
          >
            WhatsApp
          </a>

          <a
            href="https://www.linkedin.com/in/yash-maheshwari5"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-link"
          >
            LinkedIn
          </a>

          <a
            href="https://www.seyreon.com"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-link"
          >
            Website
          </a>
        </div>
      </motion.div>
    </section>
  );
}
