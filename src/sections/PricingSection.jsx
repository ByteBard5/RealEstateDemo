import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const pricingData = [
  {
    id: "foundation",
    label: "Foundation",
    tag: "Foundation",
    title: "Lead Capture Engine",
    description:
      "Every lead, captured and reported — zero slippage across all your channels.",
    price: "$2,449",
    note: "one-time setup",
    delivery: "Delivered in 2 working days",
    features: [
      "Lead capture from your website — active 24/7",
      "Multi-channel lead intake: WhatsApp, Instagram, Facebook",
      "Comment-to-DM automation on Instagram & Facebook",
      "Automated daily lead intelligence reports",
    ],
  },
  {
    id: "growth",
    label: "Pipeline Pro",
    tag: "Growth",
    title: "Deal Acceleration System",
    description:
      "Your entire lead-to-appointment pipeline, fully automated and ready to convert.",
    price: "$4,999",
    note: "one-time setup",
    delivery: "Delivered in 7 working days",
    popular: true,
    features: [
      "Everything in Foundation",
      "Intelligent property showcase — leads browse listings automatically",
      "Self-serve appointment booking — no back-and-forth",
      "Seller intake flow — qualified seller leads handled automatically",
      "Email inbox lead extraction — no lead slips through",
      "Real-time agent alerts at peak lead intent moments",
    ],
  },
  {
    id: "enterprise",
    label: "Full System",
    tag: "Enterprise",
    title: "Full Conversion Intelligence",
    description:
      "A bespoke revenue infrastructure — built around how your business actually operates.",
    price: "Custom",
    note: "Tailored to your system",
    delivery: "Timeline based on scope",
    features: [
      "Everything in Growth",
      "AI voice assistant — handles inbound & outbound calls autonomously",
      "Social media gamification system to drive organic lead flow",
      "Fully custom automation architecture — built to your workflow",
      "Priority delivery & dedicated build support",
    ],
  },
];

export default function PricingSection() {
  const [activePlan, setActivePlan] = useState("growth");

  const currentPlan = pricingData.find((plan) => plan.id === activePlan);

  return (
    <section className="pricing-section">
      {/* BACKGROUND ORBS */}
      <div className="pricing-bg-orb orb-1" />
      <div className="pricing-bg-orb orb-2" />

      {/* INTRO */}
      <motion.div
        className="pricing-intro"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div className="pricing-eyebrow">Pricing & Packages</div>
        <h2>
          Stop Losing Deals.
          <br />
          <span className="pricing-headline-accent">
            Start Building Wealth.
          </span>
        </h2>
        <p>
          Every day without automation is revenue left on the table. These
          systems don't cost money — they <em>make</em> it.
        </p>
      </motion.div>

      {/* TABS */}
      <motion.div
        className="pricing-tabs"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
      >
        {pricingData.map((plan) => (
          <button
            key={plan.id}
            className={`pricing-tab ${activePlan === plan.id ? "active" : ""} ${plan.popular ? "popular" : ""}`}
            onClick={() => setActivePlan(plan.id)}
          >
            {plan.popular && (
              <span className="popular-badge">Most Popular</span>
            )}
            {plan.label}
          </button>
        ))}
      </motion.div>

      {/* PANEL */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activePlan}
          className="pricing-panel"
          initial={{ opacity: 0, y: 24, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -16, scale: 0.99 }}
          transition={{ duration: 0.38, ease: "easeOut" }}
        >
          {/* LEFT */}
          <div className="pricing-panel-left">
            <div className="pricing-tag">{currentPlan.tag}</div>

            <h3 className="pricing-title">{currentPlan.title}</h3>

            <p className="pricing-description">{currentPlan.description}</p>

            <div className="pricing-price-block">
              <div className="pricing-price">{currentPlan.price}</div>
              <div className="pricing-note">{currentPlan.note}</div>
            </div>

            <div className="pricing-delivery">
              <span className="delivery-dot" />
              {currentPlan.delivery}
            </div>
          </div>

          {/* DIVIDER */}
          <div className="pricing-divider" />

          {/* RIGHT */}
          <div className="pricing-panel-right">
            <div className="pricing-includes-header">
              <span className="pricing-includes-line" />
              <span className="pricing-includes-title">What's Included</span>
              <span className="pricing-includes-line" />
            </div>

            <ul className="pricing-features">
              {currentPlan.features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.07, duration: 0.3 }}
                >
                  <span className="feature-check">
                    <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                      <path
                        d="M1 4.5L4 7.5L10 1"
                        stroke="#78ffb4"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  {feature}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* MONTHLY ADD-ON */}
      <motion.div
        className="pricing-addon"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
      >
        <div className="addon-left">
          <div className="addon-icon-wrap">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M7 1V13M1 7H13"
                stroke="#78ffb4"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div>
            <div className="addon-title">
              Monthly System Maintenance — Add-on
            </div>
            <div className="addon-desc">
              We monitor, update, and keep your automation running at peak
              performance every month.
            </div>
          </div>
        </div>

        <div className="addon-price">From $199 / mo</div>
      </motion.div>
    </section>
  );
}
