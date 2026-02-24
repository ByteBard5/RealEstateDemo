import React, { useEffect, useState, useRef } from "react";
import "../../styles/casestudy.css";

export default function Results() {
  const sectionRef = useRef(null);

  /* ============================
     BASE METRICS (useRef fixes warning)
  ============================ */

  const baseMetrics = useRef({
    response: 92,
    capture: 100,
    efficiency: 78,
    conversion: 64,
  }).current;

  /* ============================
     CONTENT (moved above useEffect to fix error)
  ============================ */

  const paragraphs = [
    "The implementation of the automation system fundamentally changed how the agency captured, managed, and converted inbound demand.",

    "Every lead, regardless of origin, was automatically captured and routed into a structured workflow. Whether inquiries came from WhatsApp, Facebook, Instagram, or external property platforms via email, each opportunity entered the system instantly — eliminating the risk of missed or delayed follow-up.",

    "Response time was reduced from hours to immediate engagement. Leads were qualified and guided in real time, ensuring prospects received relevant information at peak intent.",

    "Agents now receive complete lead context instantly, allowing them to focus entirely on high-value conversations and conversions.",

    "Property matching became fully automated, dramatically reducing manual workload while improving response consistency.",

    "External marketplace inquiries are now automatically extracted, structured, and centralized.",

    "Persistent engagement ensures leads remain connected and conversion windows remain extended.",

    "Operational capacity increased significantly without increasing team size.",

    "The business now operates on scalable infrastructure capable of handling significantly higher demand.",
  ];

  /* ============================
     LIVE METRICS STATE
  ============================ */

  const [metrics, setMetrics] = useState({
    response: 0,
    capture: 0,
    efficiency: 0,
    conversion: 0,
  });

  /* ============================
     PARAGRAPH VISIBILITY STATE
  ============================ */

  const [visibleParagraphs, setVisibleParagraphs] = useState([]);

  /* ============================
     SAFE FLUCTUATION
  ============================ */

  function fluctuate(base) {
    const variance = 2;
    const value = base + (Math.random() * variance * 2 - variance);
    return Math.max(0, Math.min(100, Math.round(value)));
  }

  /* ============================
     INITIAL COUNT UP
  ============================ */

  useEffect(() => {
    let progress = 0;

    const interval = setInterval(() => {
      progress += 2;

      if (progress >= 100) {
        clearInterval(interval);
        setMetrics(baseMetrics);
        return;
      }

      setMetrics({
        response: Math.min(baseMetrics.response, progress),
        capture: Math.min(baseMetrics.capture, progress),
        efficiency: Math.min(baseMetrics.efficiency, progress),
        conversion: Math.min(baseMetrics.conversion, progress),
      });
    }, 20);

    return () => clearInterval(interval);
  }, [baseMetrics]);

  /* ============================
     CONTINUOUS LIVE FLUCTUATION
  ============================ */

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        response: fluctuate(baseMetrics.response),
        capture: fluctuate(baseMetrics.capture),
        efficiency: fluctuate(baseMetrics.efficiency),
        conversion: fluctuate(baseMetrics.conversion),
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [baseMetrics]);

  /* ============================
     PARAGRAPH REVEAL OBSERVER
  ============================ */

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        paragraphs.forEach((_, index) => {
          setTimeout(() => {
            setVisibleParagraphs((prev) => {
              if (prev.includes(index)) return prev;
              return [...prev, index];
            });
          }, index * 160);
        });
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, [paragraphs]);

  /* ============================
     CHART DATA
  ============================ */

  const chartData = [
    { label: "Response Speed", before: 18, after: metrics.response },
    { label: "Lead Capture", before: 42, after: metrics.capture },
    { label: "Agent Efficiency", before: 35, after: metrics.efficiency },
    { label: "Conversion Readiness", before: 28, after: metrics.conversion },
  ];

  /* ============================
     COMPONENT
  ============================ */

  return (
    <section ref={sectionRef} className="cs-section cs-results-section">
      <div className="cs-grid-bg"></div>

      <div className="cs-container">
        {/* HEADER */}

        <div className="cs-section-header">
          <div className="cs-section-eyebrow">Results and Business Impact</div>

          <h2 className="cs-section-title">
            Operational Performance and Growth Intelligence
          </h2>
        </div>

        {/* KPI STRIP */}

        <div className="cs-kpi-strip">
          <Metric value={metrics.response} label="Response Speed Improvement" />

          <Metric value={metrics.capture} label="Lead Capture Coverage" />

          <Metric
            value={metrics.efficiency}
            label="Agent Efficiency Increase"
          />

          <Metric
            value={metrics.conversion}
            label="Conversion Readiness Increase"
          />
        </div>

        {/* PREMIUM CHART */}

        <div className="cs-chart-card">
          <div className="cs-chart-header">
            Live Operational Performance Comparison
          </div>

          <div className="cs-chart-body">
            {chartData.map((item, index) => (
              <ChartRow
                key={index}
                label={item.label}
                before={item.before}
                after={item.after}
                delay={index * 150}
              />
            ))}
          </div>

          <div className="cs-chart-legend">
            <div>
              <span className="legend-before"></span>
              Before Automation
            </div>

            <div>
              <span className="legend-after"></span>
              Live System Performance
            </div>
          </div>
        </div>

        {/* PREMIUM PARAGRAPHS */}

        <div className="cs-results-content">
          {paragraphs.map((text, index) => (
            <p
              key={index}
              className={`cs-paragraph premium-paragraph ${
                visibleParagraphs.includes(index) ? "visible" : ""
              }`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              {text}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================
   KPI COMPONENT
============================ */

function Metric({ value, label }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = display;

    const interval = setInterval(() => {
      start += 1;

      if (start >= value) {
        start = value;
        clearInterval(interval);
      }

      setDisplay(start);
    }, 10);

    return () => clearInterval(interval);
  }, [value]);

  return (
    <div className="cs-kpi">
      <span>{display}%</span>

      <label>{label}</label>
    </div>
  );
}

/* ============================
   PREMIUM CHART ROW
============================ */

function ChartRow({ label, before, after, delay }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(true);
    }, delay);

    return () => clearTimeout(timeout);
  }, [delay]);

  return (
    <div className={`cs-chart-row ${visible ? "visible" : ""}`}>
      <div className="cs-chart-label">{label}</div>

      <div className="cs-chart-bars">
        <div
          className="cs-bar cs-bar-before"
          style={{ width: visible ? `${before}%` : "0%" }}
        >
          <span>{before}%</span>
        </div>

        <div
          className="cs-bar cs-bar-after premium-bar"
          style={{ width: visible ? `${after}%` : "0%" }}
        >
          <span>{after}%</span>
        </div>
      </div>
    </div>
  );
}
