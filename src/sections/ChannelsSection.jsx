import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";

// ICONS
import WebsiteIcon from "../assets/Icons/Website.png";
import WhatsAppIcon from "../assets/Icons/WhatsApp.png";
import InstagramIcon from "../assets/Icons/Instagram.png";
import FacebookIcon from "../assets/Icons/Facebook.png";
import PhoneIcon from "../assets/Icons/Phone.png";

/*
====================================================
ACTIVITY DATA
====================================================
*/

const ALL_ACTIVITIES = [
  {
    text: "New property inquiry captured from website listing",
    icon: WebsiteIcon,
    channel: "Website",
  },
  {
    text: "WhatsApp buyer qualified — serious intent confirmed",
    icon: WhatsAppIcon,
    channel: "WhatsApp",
  },
  {
    text: "Instagram inquiry converted into scheduled viewing",
    icon: InstagramIcon,
    channel: "Instagram",
  },
  {
    text: "Facebook seller requested property valuation",
    icon: FacebookIcon,
    channel: "Facebook",
  },
  {
    text: "Inbound call answered and buyer qualified instantly",
    icon: PhoneIcon,
    channel: "Phone",
  },
  {
    text: "Viewing automatically booked into agent calendar",
    icon: WebsiteIcon,
    channel: "Website",
  },
  {
    text: "High-value investor transferred to agent",
    icon: PhoneIcon,
    channel: "Phone",
  },
  {
    text: "Seller lead captured and added to listings pipeline",
    icon: WebsiteIcon,
    channel: "Website",
  },
];

const MAX_VISIBLE = 5;

/*
====================================================
LIVE GRAPH COMPONENT
====================================================
*/

function LiveGraph() {
  const [points, setPoints] = useState([30, 35, 42, 38, 47, 52, 58]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPoints((prev) => {
        const next = [...prev.slice(1)];
        const last = next[next.length - 1];
        const variation = Math.floor(Math.random() * 10) - 4;
        next.push(Math.max(10, Math.min(58, last + variation)));
        return next;
      });
    }, 1100);
    return () => clearInterval(interval);
  }, []);

  const W = 100;
  const H = 46;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const stepX = W / (points.length - 1);

  const coords = points.map((p, i) => ({
    x: parseFloat((i * stepX).toFixed(2)),
    y: parseFloat((H - ((p - min) / range) * (H - 8) - 4).toFixed(2)),
  }));

  const linePath = coords
    .map((c, i) => `${i === 0 ? "M" : "L"} ${c.x} ${c.y}`)
    .join(" ");
  const areaPath = `${linePath} L ${coords[coords.length - 1].x} ${H} L 0 ${H} Z`;
  const last = coords[coords.length - 1];

  return (
    <div className="metric-graph">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        width="100%"
        height="100%"
      >
        <defs>
          <linearGradient id="gFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#78ffb4" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#78ffb4" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#gFill)" />
        <path
          d={linePath}
          fill="none"
          stroke="#78ffb4"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ filter: "drop-shadow(0 0 3px rgba(120,255,180,0.6))" }}
        />
        <circle cx={last.x} cy={last.y} r="2.5" fill="#78ffb4">
          <animate
            attributeName="r"
            values="2.5;4;2.5"
            dur="1.4s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="1;0.5;1"
            dur="1.4s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  );
}

/*
====================================================
LIVE COUNTER HOOK
====================================================
*/

function useLiveCounter(base, variance, speed) {
  const [value, setValue] = useState(base);
  useEffect(() => {
    const interval = setInterval(() => {
      setValue(base + Math.floor(Math.random() * variance));
    }, speed);
    return () => clearInterval(interval);
  }, [base, variance, speed]);
  return value;
}

/*
====================================================
MAIN COMPONENT
====================================================
*/

export default function ChannelsSection() {
  const nextIndexRef = useRef(MAX_VISIBLE);
  const uidRef = useRef(MAX_VISIBLE);

  // Initialise with exactly MAX_VISIBLE items — never changes length
  const [feed, setFeed] = useState(() =>
    ALL_ACTIVITIES.slice(0, MAX_VISIBLE).map((a, i) => ({ ...a, uid: i })),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const incoming =
        ALL_ACTIVITIES[nextIndexRef.current % ALL_ACTIVITIES.length];
      nextIndexRef.current += 1;
      uidRef.current += 1;
      const newItem = { ...incoming, uid: uidRef.current };

      // Always keep exactly MAX_VISIBLE — drop oldest, push newest
      setFeed((prev) => [...prev.slice(-(MAX_VISIBLE - 1)), newItem]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const activeLeads = useLiveCounter(18, 6, 2200);
  const qualifiedToday = useLiveCounter(42, 8, 2600);
  const responseTime = useLiveCounter(2, 2, 3000);

  const metrics = [
    { value: activeLeads, suffix: "", label: "Active buyer conversations" },
    { value: qualifiedToday, suffix: "", label: "Leads qualified today" },
    { value: responseTime, suffix: "s", label: "Avg. response time" },
  ];

  return (
    <section className="channels-section">
      {/* BACKGROUND ORBS */}
      <div className="ch-bg-orb ch-orb-1" />
      <div className="ch-bg-orb ch-orb-2" />

      {/* INTRO */}
      <motion.div
        className="channels-intro"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div className="channels-eyebrow">Live System Intelligence</div>
        <h2>
          Your Pipeline Never
          <br />
          <span className="channels-headline-accent">Sleeps.</span>
        </h2>
        <p>
          While your competitors miss calls and lose leads overnight, your
          system captures, qualifies, and advances every buyer and seller
          inquiry — <em>automatically, around the clock.</em>
        </p>
      </motion.div>

      {/* GRID */}
      <div className="channels-grid">
        {/* LEFT — ACTIVITY FEED */}
        <motion.div
          className="activity-feed-container"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="activity-header">
            <div className="live-dot" />
            <span>Live Pipeline Activity</span>
            <span className="activity-count-badge">{MAX_VISIBLE} active</span>
          </div>

          <div className="activity-feed">
            <AnimatePresence initial={false} mode="popLayout">
              {feed.map((activity) => (
                <motion.div
                  key={activity.uid}
                  className="activity-item"
                  layout
                  initial={{ opacity: 0, y: -24, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{
                    opacity: 0,
                    x: -20,
                    scale: 0.96,
                    transition: { duration: 0.2 },
                  }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                >
                  <div className="activity-icon">
                    <img src={activity.icon} alt={activity.channel} />
                  </div>
                  <div className="activity-text">
                    <span className="activity-status">● Live&nbsp;</span>
                    {activity.text}
                  </div>
                  <div className="activity-channel-tag">{activity.channel}</div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* RIGHT — METRIC CARDS */}
        <div className="live-metrics">
          {metrics.map((metric, i) => (
            <motion.div
              key={i}
              className="metric-card"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <div className="metric-card-top-line" />
              <div className="metric-info">
                <div className="metric-value">
                  {metric.value}
                  {metric.suffix}
                </div>
                <div className="metric-label">{metric.label}</div>
              </div>
              <LiveGraph />
            </motion.div>
          ))}
        </div>
      </div>

      {/* BOTTOM RESULT */}
      <motion.div
        className="channels-result"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <span className="channels-result-icon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" stroke="#78ffb4" strokeWidth="1.2" />
            <path
              d="M5 8.5L7 10.5L11 6"
              stroke="#78ffb4"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        Your agents focus only on closing — while the system continuously
        captures, qualifies, and advances new buyer and seller opportunities
        around the clock.
      </motion.div>
    </section>
  );
}
