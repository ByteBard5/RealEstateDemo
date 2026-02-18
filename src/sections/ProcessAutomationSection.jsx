import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Every inquiry is captured instantly — without relying on anyone",
    description:
      "The moment someone fills out a form, sends a message, or requests information, the system captures everything automatically. No missed details. No forgotten follow-ups. Your pipeline stays complete, organized, and ready — even outside business hours.",
  },
  {
    number: "02",
    title: "Information is structured and routed exactly where it belongs",
    description:
      "Leads are organized, tagged, and delivered to the right place automatically. Your CRM updates itself. Your team sees exactly what matters. Instead of wasting hours managing data, everything stays clean, accurate, and ready for action.",
  },
  {
    number: "03",
    title: "Follow-ups, reminders, and internal actions happen on their own",
    description:
      "Confirmation messages, team notifications, reminders, and task creation all happen instantly. Nothing depends on memory. Nothing falls through the cracks. Your business moves faster, more reliably, and without constant manual effort.",
  },
];

export default function ProcessAutomationSection() {
  return (
    <section className="process-section">
      {/* HEADER */}
      <motion.div
        className="process-header"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <h2>Automate the Work Behind Every Closed Deal</h2>

        <p>
          When your internal processes run automatically, your business moves
          faster without increasing workload. Leads are captured, information is
          organized, and actions are triggered instantly — eliminating delays,
          reducing manual work, and ensuring every opportunity moves forward
          without friction.
        </p>
      </motion.div>

      {/* TIMELINE */}
      <div className="process-timeline">
        {/* vertical line */}
        <div className="process-line" />

        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="process-step"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            viewport={{ once: true }}
          >
            {/* DOT */}
            <div className="process-dot">
              <span>{step.number}</span>
            </div>

            {/* CARD */}
            <div className="process-card">
              <h3>{step.title}</h3>

              <p>{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* RESULT */}
      <motion.div
        className="process-result"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        viewport={{ once: true }}
      >
        Your team focuses on closing deals. The system handles everything else.
      </motion.div>
    </section>
  );
}
