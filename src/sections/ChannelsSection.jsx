import { motion, useMotionValue, useTransform } from "framer-motion";

// ICONS
import WebsiteIcon from "../assets/Icons/Website.png";
import WhatsAppIcon from "../assets/Icons/WhatsApp.png";
import InstagramIcon from "../assets/Icons/Instagram.png";
import FacebookIcon from "../assets/Icons/Facebook.png";
import PhoneIcon from "../assets/Icons/Phone.png";

const channels = [
  {
    title: "Website",
    description:
      "Responds instantly to enquiries on your website, even when your team is offline.",
    icon: WebsiteIcon,
  },
  {
    title: "WhatsApp",
    description:
      "Engages leads where conversations actually happen — without delays or missed messages.",
    icon: WhatsAppIcon,
  },
  {
    title: "Instagram",
    description:
      "Handles DMs and story replies automatically, keeping interest warm.",
    icon: InstagramIcon,
  },
  {
    title: "Facebook",
    description:
      "Manages page messages while your agents stay focused on closing.",
    icon: FacebookIcon,
  },
  {
    title: "Phone",
    description:
      "Calls every lead instantly with an AI call assistant — no delays, no missed opportunities.",
    icon: PhoneIcon,
  },
];

function ChannelCard({ channel, index }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-50, 50], [8, -8]);
  const rotateY = useTransform(x, [-50, 50], [-8, 8]);

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const posX = e.clientX - rect.left - rect.width / 2;
    const posY = e.clientY - rect.top - rect.height / 2;
    x.set(posX);
    y.set(posY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      className="channel-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      viewport={{ once: true }}
      style={{ rotateX, rotateY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.03 }}
    >
      <div className="channel-icon">
        <img src={channel.icon} alt={channel.title} />
      </div>
      <h3>{channel.title}</h3>
      <p>{channel.description}</p>
    </motion.div>
  );
}

export default function ChannelsSection() {
  return (
    <section className="channels-section">
      {/* INTRO */}
      <div className="channels-intro">
        <h2>Every lead. Every channel. Handled.</h2>
        <p>
          This system is designed to be built around{" "}
          <strong>your business</strong>, shaped by <strong>your data</strong>,
          and aligned with <strong>your tone</strong>.
          <br />
          <br />
          When a lead comes from your website or social platforms, it responds
          instantly, keeps the conversation warm, and notifies the right agent
          with full context.
          <br />
          <br />
          You never need to wonder if a follow-up happened.
          <br />
          <strong>No lead slips away.</strong>
        </p>
      </div>

      {/* GRID */}
      <div className="channels-grid">
        {channels.map((channel, index) => (
          <ChannelCard key={index} channel={channel} index={index} />
        ))}
      </div>

      {/* FOOTNOTE */}
      <motion.div
        className="channels-footnote"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <p>
          Automation handles speed and consistency.
          <br />
          Humans stay in control of relationships and closing.
        </p>
      </motion.div>
    </section>
  );
}
