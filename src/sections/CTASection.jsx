import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export default function CTASection() {
  const [highlightIndex, setHighlightIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(80);
  const [floatingTexts, setFloatingTexts] = useState([]);
  const sliderAreaRef = useRef(null);
  const floatUidRef = useRef(0);

  const highlights = [
    "who responds first",
    "It's a system problem.",
    "infrastructure, not effort.",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setHighlightIndex((prev) => (prev + 1) % highlights.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const positiveTexts = [
    "Lead responded instantly",
    "Inquiry progressing",
    "Buyer engaged",
    "Viewing confirmed",
    "Conversation active",
    "Opportunity secured",
    "Showing scheduled",
    "Lead qualified",
    "Follow-up delivered",
    "Client engaged",
  ];

  const negativeTexts = [
    "Lead stopped responding",
    "Inquiry fading",
    "Opportunity missed",
    "No follow-up sent",
    "Buyer disengaged",
    "Response delayed",
    "Interest declining",
    "Conversation lost",
    "Lead dropped off",
    "Momentum lost",
  ];

  const handleSlider = (e) => {
    setSliderPosition(Number(e.target.value));
  };

  // Floating text spawner — capped at 6 visible at once
  useEffect(() => {
    const spawnText = () => {
      setFloatingTexts((prev) => {
        if (prev.length >= 6) return prev;
        const isPositive = sliderPosition >= 50;
        const sourceArray = isPositive ? positiveTexts : negativeTexts;
        const text =
          sourceArray[Math.floor(Math.random() * sourceArray.length)];
        floatUidRef.current += 1;
        return [
          ...prev,
          {
            id: floatUidRef.current,
            text,
            xPercent: 5 + Math.random() * 70,
            duration: 3 + Math.random() * 2,
            type: isPositive ? "positive" : "negative",
          },
        ];
      });
    };

    const intensity = Math.abs(sliderPosition - 50) / 50;
    const intervalTime = 1400 - intensity * 600;
    const interval = setInterval(spawnText, intervalTime);
    return () => clearInterval(interval);
  }, [sliderPosition]);

  const removeFloat = (id) => {
    setFloatingTexts((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <section className="cta-section" id="cta-section">
      <div className="cta-bg" />

      {/* BACKGROUND ORBS */}
      <div className="cta-orb cta-orb-1" />
      <div className="cta-orb cta-orb-2" />

      <div className="cta-wrapper">
        {/* ── LEFT ── */}
        <motion.div
          className="cta-left"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="cta-eyebrow">Real Estate Infrastructure</div>

          <h2 className="cta-heading">
            The agents closing consistently
            <br />
            aren't working more.{" "}
            <span className="cta-heading-accent">
              They removed
              <br />
              the delay.
            </span>
          </h2>

          <p className="cta-paragraph">
            When someone enquires about a property, they're not comparing
            prices. They're comparing{" "}
            <span
              className={`cta-glow${highlightIndex === 0 ? " active" : ""}`}
            >
              who responds first
            </span>
            .
          </p>

          <p className="cta-paragraph">
            The first conversation usually becomes the only conversation.
            Attention moves fast — and once it's gone, it rarely comes back.
          </p>

          <p className="cta-paragraph">
            If that reply doesn't come immediately, interest fades. Quietly.
            Automatically. No notification. No second chance.
          </p>

          <p className="cta-paragraph emphasis">
            <span
              className={`cta-glow${highlightIndex === 1 ? " active" : ""}`}
            >
              It's a system problem.
            </span>
          </p>

          <p className="cta-paragraph">
            The difference between high-volume agencies and everyone else is no
            longer hustle. It's{" "}
            <span
              className={`cta-glow${highlightIndex === 2 ? " active" : ""}`}
            >
              infrastructure, not effort.
            </span>
          </p>

          {/* ── REACH OUT BLOCK ── */}
          <div className="cta-reachout-block">
            <div className="cta-reachout-label">
              Ready to install this in your agency?
            </div>
            <p className="cta-reachout-sub">
              Reach out directly — we respond within minutes, not days.
            </p>

            <div className="cta-buttons">
              <a
                href="https://wa.me/916398800516"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-btn cta-btn-whatsapp"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Message on WhatsApp
              </a>

              <a
                href="https://www.linkedin.com/in/yash-maheshwari5"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-btn cta-btn-linkedin"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                Connect on LinkedIn
              </a>

              {/* ── WEBSITE LINK ── */}
              <a
                href="https://www.seyreon.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-btn cta-btn-website"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                Visit seyreon.com
              </a>
            </div>

            <div className="cta-trust">
              <span className="cta-trust-dot" />
              Respond instantly. Qualify automatically. Capture every serious
              buyer.
            </div>
          </div>
        </motion.div>

        {/* ── RIGHT ── */}
        <motion.div
          className="cta-right"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="cta-simulation-card">
            <div className="sim-header">
              <span className="sim-live-dot" />
              Live System Activity
            </div>

            <div className="sim-feed">
              {[
                "New Inquiry Detected",
                "Responded Instantly",
                "Buyer Qualified",
                "Viewing Scheduled",
                "CRM Updated",
              ].map((item, i) => (
                <div
                  key={i}
                  className="sim-item"
                  style={{ animationDelay: `${i * 0.2 + 0.2}s` }}
                >
                  <span className="sim-item-dot">●</span>
                  {item}
                </div>
              ))}
            </div>

            {/* ==========================================================================================
                COMPARISON SLIDER — fixed layout order:
                1. floating-text-layer (texts float UP into this open space)
                2. comparison-labels
                3. comparison-track (the colored bar)
                4. comparison-slider (the input range, directly below track)
                5. comparison-hint
            ========================================================================================== */}
            <div className="comparison-container" ref={sliderAreaRef}>
              {/* 1. Floating text zone — sits ABOVE the labels so texts float up freely */}
              <div className="floating-text-layer">
                <AnimatePresence>
                  {floatingTexts.map((item) => (
                    <motion.span
                      key={item.id}
                      className={`floating-text ${item.type}`}
                      style={{ left: `${item.xPercent}%` }}
                      initial={{ opacity: 0, y: 0 }}
                      animate={{ opacity: [0, 1, 1, 0], y: -64 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: item.duration, ease: "easeOut" }}
                      onAnimationComplete={() => removeFloat(item.id)}
                    >
                      {item.text}
                    </motion.span>
                  ))}
                </AnimatePresence>
              </div>

              {/* 2. Labels */}
              <div className="comparison-labels">
                <span>Delayed Response</span>
                <span>Instant Response</span>
              </div>

              {/* 3. Track */}
              <div className="comparison-track">
                <div
                  className="comparison-manual"
                  style={{ width: `${sliderPosition}%` }}
                >
                  {sliderPosition > 20 ? "Slower" : ""}
                </div>
                <div
                  className="comparison-auto"
                  style={{ width: `${100 - sliderPosition}%` }}
                >
                  {100 - sliderPosition > 20 ? "Faster" : ""}
                </div>
              </div>

              {/* 4. Slider input — directly beneath the track */}
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={handleSlider}
                className="comparison-slider"
              />

              {/* 5. Hint */}
              <div className="comparison-hint">
                ← Drag to see the impact of response speed →
              </div>
            </div>

            {/* MINI REACH-OUT inside card */}
            <div className="sim-cta-nudge">
              <span>Want this system in your agency?</span>
              <a
                href="https://wa.me/916398800516"
                target="_blank"
                rel="noopener noreferrer"
                className="sim-cta-link"
              >
                Let's talk →
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
