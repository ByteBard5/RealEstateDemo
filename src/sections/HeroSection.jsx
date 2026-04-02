import { motion } from "framer-motion";
import AnimatedHouseSlider from "../components/AnimatedHouseSlider";

export default function HeroSection() {
  const scrollToCTA = () => {
    const ctaSection = document.getElementById("cta-section");
    if (ctaSection) {
      ctaSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    /* =========================================================
       HERO SECTION
    ========================================================= */
    <section className="hero">
      {/* — Background orbs — */}
      <div className="hero-orb hero-orb--tl" aria-hidden="true" />
      <div className="hero-orb hero-orb--br" aria-hidden="true" />

      {/* — Large background word — */}
      <motion.div
        className="hero-title"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
        aria-hidden="true"
      >
        REAL ESTATE
      </motion.div>

      {/* — Glass card — */}
      <motion.div
        className="hero-glass"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: "easeOut", delay: 0.2 }}
      >
        {/* Top shimmer line */}
        <div className="hero-glass__shimmer" aria-hidden="true" />

        <div className="hero-content">
          {/* ——— LEFT ——— */}
          <div className="hero-left">
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
            >
              Slow responses
              <br />
              quietly cost you <span className="hero-accent">deals</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.48 }}
            >
              Every second of delay bleeds pipeline value. This system responds
              the instant intent peaks — qualifying prospects, booking
              appointments, and locking in opportunities before the competition
              even picks up the phone.
            </motion.p>

            <motion.button
              className="primary-btn"
              onClick={scrollToCTA}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ scale: 1.04, translateY: -3 }}
              whileTap={{ scale: 0.97 }}
            >
              Try the Live Demo
            </motion.button>

            {/* — Trust badges — */}
            <motion.div
              className="hero-badges"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.75 }}
            >
              {[
                "24 / 7 Active",
                "Instant Qualification",
                "Zero Missed Leads",
              ].map((badge, i) => (
                <span className="hero-badge" key={i}>
                  <span className="hero-badge__dot" aria-hidden="true" />
                  {badge}
                </span>
              ))}
            </motion.div>
          </div>

          {/* ——— RIGHT ——— */}
          <motion.div
            className="hero-right"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <AnimatedHouseSlider />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
