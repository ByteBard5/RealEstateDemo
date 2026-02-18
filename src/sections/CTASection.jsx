import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export default function CTASection() {
  const [highlightIndex, setHighlightIndex] = useState(0);

  // Slider starts at 80% (positive side)
  const [sliderPosition, setSliderPosition] = useState(80);

  // Floating texts state
  const [floatingTexts, setFloatingTexts] = useState([]);

  const sliderAreaRef = useRef(null);

  // Highlight rotation (UNCHANGED)
  const highlights = [
    "who responds first",
    "It’s a system problem.",
    "infrastructure, not effort.",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setHighlightIndex((prev) => (prev + 1) % highlights.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // POSITIVE TEXTS
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

  // NEGATIVE TEXTS
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

  // Slider handler
  const handleSlider = (e) => {
    setSliderPosition(Number(e.target.value));
  };

  // Floating text generator
  useEffect(() => {
    const spawnText = () => {
      if (!sliderAreaRef.current) return;

      const rect = sliderAreaRef.current.getBoundingClientRect();

      const isPositive = sliderPosition >= 50;

      const sourceArray = isPositive ? positiveTexts : negativeTexts;

      const text = sourceArray[Math.floor(Math.random() * sourceArray.length)];

      const id = Date.now() + Math.random();

      // Random horizontal spawn inside slider width
      const xPercent = Math.random() * 100;

      // Random float duration
      const duration = 3 + Math.random() * 2;

      const newText = {
        id,
        text,
        xPercent,
        duration,
        type: isPositive ? "positive" : "negative",
      };

      setFloatingTexts((prev) => [...prev, newText]);

      // Remove after animation completes
      setTimeout(() => {
        setFloatingTexts((prev) => prev.filter((item) => item.id !== id));
      }, duration * 1000);
    };

    // Subtle spawn interval based on slider intensity
    const intensity = Math.abs(sliderPosition - 50) / 50;

    const intervalTime = 1400 - intensity * 600;

    const interval = setInterval(spawnText, intervalTime);

    return () => clearInterval(interval);
  }, [sliderPosition]);

  return (
    <section className="cta-section" id="cta-section">
      <div className="cta-bg" />

      {/* REMOVED old static activity background */}

      <div className="cta-wrapper">
        {/* LEFT SIDE */}
        <motion.div
          className="cta-left"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
        >
          <div className="cta-badge">REAL ESTATE INFRASTRUCTURE</div>

          <h2 className="cta-heading">
            The agents closing consistently aren’t working more.
            <br />
            They removed the delay between interest and response.
          </h2>

          <p className="cta-paragraph">
            When someone enquires about a property, they’re not comparing
            prices. They’re comparing{" "}
            <span
              className={highlightIndex === 0 ? "cta-glow active" : "cta-glow"}
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
            If that reply doesn’t come immediately, interest fades. Quietly.
            Automatically. No notification. No second chance.
          </p>

          <p className="cta-paragraph emphasis">
            <span
              className={highlightIndex === 1 ? "cta-glow active" : "cta-glow"}
            >
              It’s a system problem.
            </span>
          </p>

          <p className="cta-paragraph">
            The difference between high-volume agencies and everyone else is no
            longer hustle. It’s{" "}
            <span
              className={highlightIndex === 2 ? "cta-glow active" : "cta-glow"}
            >
              infrastructure, not effort.
            </span>
          </p>

          {/* Buttons */}
          <div className="cta-buttons">
            <a
              href="https://wa.me/916398800516"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn"
            >
              WhatsApp
            </a>

            <a
              href="https://www.linkedin.com/in/yash-maheshwari5"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn"
            >
              LinkedIn
            </a>

            <a
              href="https://www.seyreon.com"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn"
            >
              Website
            </a>
          </div>

          <div className="cta-trust">
            Respond instantly. Qualify automatically. Capture every serious
            buyer.
          </div>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          className="cta-right"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
        >
          <div className="cta-simulation-card">
            <div className="sim-header">Live System Activity</div>

            <div className="sim-feed">
              <div className="sim-item">New Inquiry Detected</div>
              <div className="sim-item">Responded Instantly</div>
              <div className="sim-item">Buyer Qualified</div>
              <div className="sim-item">Viewing Scheduled</div>
              <div className="sim-item">CRM Updated</div>
            </div>

            {/* Comparison */}
            <div className="comparison-container" ref={sliderAreaRef}>
              <div className="comparison-labels">
                <span>Delayed Response</span>
                <span>Instant Response</span>
              </div>

              <div className="comparison-track">
                <div
                  className="comparison-manual"
                  style={{ width: `${sliderPosition}%` }}
                >
                  Slower
                </div>

                <div
                  className="comparison-auto"
                  style={{ width: `${100 - sliderPosition}%` }}
                >
                  Faster
                </div>
              </div>

              {/* Floating texts */}
              <div className="floating-text-layer">
                {floatingTexts.map((item) => (
                  <span
                    key={item.id}
                    className={`floating-text ${item.type}`}
                    style={{
                      left: `${item.xPercent}%`,
                      animationDuration: `${item.duration}s`,
                    }}
                  >
                    {item.text}
                  </span>
                ))}
              </div>

              <input
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={handleSlider}
                className="comparison-slider"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
