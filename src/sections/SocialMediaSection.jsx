import { motion } from "framer-motion";

/* ==========================================================================================
   SOCIAL MEDIA SECTION — Platform Cards with Left Copy Panel
========================================================================================== */

const platforms = [
  {
    name: "Facebook",
    image: "/social_media-images/fb_image.png",
    result:
      "Every property inquiry answered the moment it arrives — no lag, no missed leads.",
    stat: "Instant replies to messages and comments, around the clock.",
  },
  {
    name: "Instagram",
    image: "/social_media-images/ig_image.png",
    result:
      "Profile visitors and DMs convert into qualified pipeline automatically.",
    stat: "Leads stay warm and engaged — even at 2am, even on weekends.",
  },
  {
    name: "LinkedIn",
    image: "/social_media-images/li_image.png",
    result:
      "High-intent professional inquiries captured and nurtured without lifting a finger.",
    stat: "Every opportunity acknowledged, tracked, and followed up — guaranteed.",
  },
];

export default function SocialMediaSection() {
  return (
    <section className="social-section">
      {/* --- Background Orbs --- */}
      <div className="social-orb social-orb--tl" aria-hidden="true" />
      <div className="social-orb social-orb--br" aria-hidden="true" />

      {/* === LEFT SIDE === */}
      <motion.div
        className="social-left"
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        {/* Eyebrow Label */}
        <motion.div
          className="social-eyebrow"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Always On
        </motion.div>

        {/* Heading */}
        <h2 className="social-heading">
          Your social pipeline,
          <br />
          <span className="social-heading--accent">never goes silent.</span>
        </h2>

        {/* Body Copy */}
        <p className="social-body">
          Every message, comment, and inquiry is handled the instant it lands —
          no team monitoring required, no opportunity left on the table. When a
          prospect asks about a property, pricing, or availability, they receive
          a natural, on-brand response in seconds.
          <br />
          <br />
          Conversations stay warm. Leads compound. Your agents step in only at
          the moment of highest intent — turning social engagement into a fully
          automated front-end pipeline that works while you sleep.
        </p>

        {/* Highlight Bar */}
        <motion.div
          className="social-highlight"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          viewport={{ once: true }}
        >
          No missed conversations. No delayed responses. No lost revenue.
        </motion.div>
      </motion.div>

      {/* === RIGHT SIDE — Platform Cards === */}
      <div className="social-right">
        {platforms.map((platform, index) => (
          <motion.div
            key={index}
            className="social-card"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.13 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
          >
            {/* Top gradient accent line */}
            <div className="social-card__top-line" aria-hidden="true" />

            {/* Image */}
            <div className="social-card__image">
              <img src={platform.image} alt={platform.name} />
            </div>

            {/* Content */}
            <div className="social-card__content">
              <h3 className="social-card__name">{platform.name}</h3>
              <p className="social-card__result">{platform.result}</p>
              <p className="social-card__stat">{platform.stat}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
/* ==========================================================================================
   SOCIAL MEDIA SECTION END
========================================================================================== */
