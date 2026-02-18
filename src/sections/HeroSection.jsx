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
              Speed is what determines who wins the deal — this system responds
              instantly, qualifies prospects, and secures opportunities while
              intent is highest.
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
