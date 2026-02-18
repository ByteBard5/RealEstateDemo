import { motion } from "framer-motion";
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

const activities = [
  {
    text: "New property inquiry captured from website listing",
    icon: WebsiteIcon,
  },
  {
    text: "WhatsApp buyer qualified — serious intent confirmed",
    icon: WhatsAppIcon,
  },
  {
    text: "Instagram inquiry converted into scheduled viewing",
    icon: InstagramIcon,
  },
  {
    text: "Facebook seller requested property valuation",
    icon: FacebookIcon,
  },
  {
    text: "Inbound call answered and buyer qualified instantly",
    icon: PhoneIcon,
  },
  {
    text: "Viewing automatically booked into agent calendar",
    icon: WebsiteIcon,
  },
  {
    text: "High-value investor transferred to agent",
    icon: PhoneIcon,
  },
  {
    text: "Seller lead captured and added to listings pipeline",
    icon: WebsiteIcon,
  },
];

/*
====================================================
ACTIVITY ITEM
====================================================
*/

function ActivityItem({ activity }) {
  return (
    <motion.div
      className="activity-item"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="activity-icon">
        <img src={activity.icon} alt="" />
      </div>

      <div className="activity-text">
        <span className="activity-status">● Live</span>
        {activity.text}
      </div>
    </motion.div>
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
LIVE GRAPH COMPONENT
====================================================
*/

function LiveGraph() {
  const [points, setPoints] = useState([30, 35, 40, 38, 45, 50, 55]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPoints((prev) => {
        const next = [...prev.slice(1)];

        const last = next[next.length - 1];

        const variation = Math.floor(Math.random() * 10) - 4;

        next.push(Math.max(10, last + variation));

        return next;
      });
    }, 900);

    return () => clearInterval(interval);
  }, []);

  const width = 120;
  const height = 60;

  const max = Math.max(...points);
  const min = Math.min(...points);

  const range = max - min || 1;

  const stepX = width / (points.length - 1);

  const path = points
    .map((p, i) => {
      const x = i * stepX;

      const y = height - ((p - min) / range) * height;

      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  return (
    <div className="metric-graph">
      <svg viewBox="0 0 120 60">
        <path className="graph-glow" d={path} />

        <path className="graph-line" d={path} />
      </svg>
    </div>
  );
}

/*
====================================================
MAIN COMPONENT
====================================================
*/

export default function ChannelsSection() {
  const [visibleActivities, setVisibleActivities] = useState([]);

  const activeLeads = useLiveCounter(18, 6, 2200);

  const qualifiedToday = useLiveCounter(42, 8, 2600);

  const responseTime = useLiveCounter(2, 2, 3000);

  /*
  ACTIVITY FEED LOOP
  */

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      setVisibleActivities((prev) => {
        const next = [...prev, activities[index]];

        if (next.length > 6) next.shift();

        return next;
      });

      index++;

      if (index >= activities.length) index = 0;
    }, 650);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="channels-section">
      {/* INTRO */}

      <div className="channels-intro">
        <h2>
          Your real estate pipeline is active 24/7 — capturing buyers and
          sellers automatically.
        </h2>

        <p>
          Every inquiry is captured, qualified, and advanced instantly. Your
          brokerage operates continuously — ensuring no buyer or seller
          opportunity is ever lost due to delayed response.
        </p>
      </div>

      {/* GRID */}

      <div className="channels-grid">
        {/* LEFT */}

        <div className="activity-feed-container">
          <div className="activity-header">
            <div className="live-dot" />
            Live Pipeline Activity
          </div>

          <div className="activity-feed">
            {visibleActivities.map((activity, index) => (
              <ActivityItem key={index} activity={activity} />
            ))}
          </div>
        </div>

        {/* RIGHT METRICS */}

        <div className="live-metrics">
          {/* CARD 1 */}

          <div className="metric-card">
            <div className="metric-info">
              <div className="metric-value">{activeLeads}</div>

              <div className="metric-label">Active buyer conversations</div>
            </div>

            <LiveGraph />
          </div>

          {/* CARD 2 */}

          <div className="metric-card">
            <div className="metric-info">
              <div className="metric-value">{qualifiedToday}</div>

              <div className="metric-label">Leads qualified today</div>
            </div>

            <LiveGraph />
          </div>

          {/* CARD 3 */}

          <div className="metric-card">
            <div className="metric-info">
              <div className="metric-value">{responseTime}s</div>

              <div className="metric-label">Average response time</div>
            </div>

            <LiveGraph />
          </div>
        </div>
      </div>

      {/* RESULT */}

      <motion.div
        className="channels-result"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
      >
        Your agents focus only on closing — while the system continuously
        captures, qualifies, and advances new buyer and seller opportunities
        automatically.
      </motion.div>
    </section>
  );
}
