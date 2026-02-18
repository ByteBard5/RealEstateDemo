import { motion } from "framer-motion";

const platforms = [
  {
    name: "Facebook",
    image: "/social_media-images/fb_image.png",
    result: "Never miss an inquiry from your property listings again.",
    stat: "Responds instantly to messages and comments.",
  },
  {
    name: "Instagram",
    image: "/social_media-images/ig_image.png",
    result: "Turns profile visitors and DMs into qualified conversations.",
    stat: "Keeps leads engaged automatically, even outside business hours.",
  },
  {
    name: "LinkedIn",
    image: "/social_media-images/li_image.png",
    result: "Captures and nurtures high-intent professional inquiries.",
    stat: "Ensures every opportunity is acknowledged and followed up.",
  },
];

export default function SocialMediaSection() {
  return (
    <section className="social-section">
      {/* LEFT SIDE */}
      <motion.div
        className="social-left"
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <h2>Social media stays active. Even when you’re not.</h2>

        <p>
          Every message, comment, and inquiry is handled instantly — without
          your team needing to monitor platforms all day.
          <br />
          <br />
          When someone asks about a property, availability, or pricing, they
          receive a natural response immediately. Conversations stay warm, leads
          stay engaged, and your agents step in only when it matters.
          <br />
          <br />
          The result is simple: faster responses, stronger relationships, and
          more qualified opportunities ready for your team.
        </p>

        <div className="social-highlight">
          No missed conversations. No delayed responses. No lost opportunities.
        </div>
      </motion.div>

      {/* RIGHT SIDE */}
      <div className="social-right">
        {platforms.map((platform, index) => (
          <motion.div
            key={index}
            className="social-card"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.04 }}
          >
            <div className="social-card-image">
              <img src={platform.image} alt={platform.name} />
            </div>

            <div className="social-card-content">
              <h3>{platform.name}</h3>

              <p className="social-result">{platform.result}</p>

              <p className="social-stat">{platform.stat}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
