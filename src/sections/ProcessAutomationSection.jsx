import { motion } from "framer-motion";

/* ==========================================================================================
   PROCESS AUTOMATION SECTION — PREMIUM TIMELINE DESIGN
   Fonts: Playfair Display (headings) + DM Sans (body/UI)
   Colors: #78ffb4 accent, radial dark green background
========================================================================================== */

const steps = [
  {
    number: "01",
    title: "Every Inquiry Captured Instantly",
    description:
      "The moment someone fills out a form, sends a message, or requests information, the system captures everything automatically. Your pipeline stays complete, organized, and compounding — even outside business hours. Zero leakage. Zero missed velocity.",
  },
  {
    number: "02",
    title: "Data Routed, Structured & Ready",
    description:
      "Leads are tagged, organized, and delivered to the right place without a single manual step. Your CRM updates itself. Your team sees exactly what matters. Clean data means faster decisions — and faster decisions mean more closed deals.",
  },
  {
    number: "03",
    title: "Follow-Ups Fire Without Any Trigger",
    description:
      "Confirmations, team alerts, reminders, and task creation all execute instantly. Nothing depends on memory. Nothing falls through the cracks. Every touchpoint compounds your reputation — and your pipeline — on autopilot.",
  },
];

export default function ProcessAutomationSection() {
  return (
    <section className="process-section">
      {/* === BACKGROUND ORBS === */}
      <div className="process-orb process-orb--tl" aria-hidden="true" />
      <div className="process-orb process-orb--br" aria-hidden="true" />

      {/* === HEADER === */}
      <motion.div
        className="process-header"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        {/* Eyebrow label */}
        <div className="process-eyebrow">System Architecture</div>

        <h2 className="process-heading">
          The Engine Running
          <br />
          <span className="process-heading--accent">Behind Every Deal</span>
        </h2>

        <p className="process-subtext">
          When your internal processes run on infrastructure — not effort — your
          business scales without friction. Leads are captured, information is
          routed, and actions fire instantly. Every step is a compounding return
          on the system you build once.
        </p>
      </motion.div>

      {/* === TIMELINE === */}
      <div className="process-timeline">
        {/* Vertical center line */}
        <div className="process-line" aria-hidden="true" />

        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="process-step"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: index * 0.13 }}
            viewport={{ once: true }}
          >
            {/* DOT */}
            <div className="process-dot" aria-label={`Step ${step.number}`}>
              <span>{step.number}</span>
            </div>

            {/* CARD */}
            <div className="process-card">
              {/* Top gradient shimmer line */}
              <div className="process-card__topline" aria-hidden="true" />
              <h3 className="process-card__title">{step.title}</h3>
              <p className="process-card__body">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* === RESULT CALLOUT === */}
      <motion.div
        className="process-result"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        viewport={{ once: true }}
      >
        <span className="process-result__icon" aria-hidden="true">
          ⟡
        </span>
        Your team focuses on closing deals. The system handles everything else.
      </motion.div>
    </section>
  );
}
