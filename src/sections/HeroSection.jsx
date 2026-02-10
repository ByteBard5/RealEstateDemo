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
    <section className="hero">
      {/* TITLE */}
      <div className="hero-title">REAL ESTATE</div>

      {/* GLASS CARD */}
      <div className="hero-glass">
        <div className="hero-content">
          {/* LEFT */}
          <div className="hero-left">
            <h1>
              Slow responses
              <br />
              quietly cost you deals
            </h1>

            <p>
              Stay responsive across website, messaging, and calls — without
              being available 24/7.
            </p>

            <button className="primary-btn" onClick={scrollToCTA}>
              Try the Live Demo
            </button>
          </div>

          {/* RIGHT */}
          <div className="hero-right">
            <AnimatedHouseSlider />
          </div>
        </div>
      </div>
    </section>
  );
}
