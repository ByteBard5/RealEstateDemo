import React, { useEffect, useState, useRef } from "react";
import "../../styles/casestudy.css";

export default function Results() {
  const sectionRef = useRef(null);

  /* ============================
     BASE METRICS
  ============================ */

  const baseMetrics = useRef({
    response: 96,
    capture: 100,
    efficiency: 88,
    reliability: 94,
  }).current;

  /* ============================
     CONTENT
  ============================ */

  const paragraphs = [
    "Following implementation, the agency’s internal operations shifted from manual coordination to automated execution.",

    "Every tenant request and property inquiry was captured instantly and routed into Salesforce without requiring manual oversight. Records were created, updated, and structured automatically, ensuring Salesforce remained continuously accurate and operational.",

    "Agents no longer needed to monitor systems or perform manual data entry. Instead, they received real-time notifications with complete request context, allowing them to respond faster and focus entirely on resolution rather than administrative handling.",

    "Response speed improved significantly. Requests that previously waited for manual processing were now acknowledged and routed immediately, reducing delays and improving overall service reliability.",

    "Administrative workload decreased substantially. Tasks such as record creation, data entry, file attachment, and internal routing were handled automatically, freeing agents and administrative staff from repetitive operational overhead.",

    "Invoice submission and approval workflows became faster and more predictable. Automated routing ensured invoices reached the appropriate stakeholders without requiring manual coordination, reducing internal friction and approval delays.",

    "Internal alignment between agents and administrative teams improved as every request followed a structured, trackable workflow. There was no longer ambiguity around task ownership, status, or responsibility.",

    "Most importantly, the risk of missed inquiries or untracked tenant requests was eliminated. Every submission was captured, processed, and made actionable automatically.",

    "The agency gained the ability to support increasing client and tenant volume without increasing operational complexity or staffing requirements.",

    "What was previously constrained by manual handling became a scalable operational system — capable of supporting growth while maintaining speed, accuracy, and reliability.",
  ];

  /* ============================
     LIVE METRICS STATE
  ============================ */

  const [metrics, setMetrics] = useState({
    response: 0,
    capture: 0,
    efficiency: 0,
    reliability: 0,
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
        reliability: Math.min(baseMetrics.reliability, progress),
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
        reliability: fluctuate(baseMetrics.reliability),
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
    { label: "Response Speed", before: 22, after: metrics.response },
    {
      label: "Request Capture Reliability",
      before: 48,
      after: metrics.capture,
    },
    { label: "Operational Efficiency", before: 38, after: metrics.efficiency },
    {
      label: "Workflow Execution Reliability",
      before: 41,
      after: metrics.reliability,
    },
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
          <div className="cs-section-eyebrow">
            Results and Operational Impact
          </div>

          <h2 className="cs-section-title">
            Increased Operational Efficiency, Faster Response Times, and Fully
            Automated Workflow Execution
          </h2>
        </div>

        {/* KPI STRIP */}

        <div className="cs-kpi-strip">
          <Metric value={metrics.response} label="Response Speed Improvement" />

          <Metric value={metrics.capture} label="Request Capture Reliability" />

          <Metric
            value={metrics.efficiency}
            label="Operational Efficiency Increase"
          />

          <Metric
            value={metrics.reliability}
            label="Workflow Execution Reliability"
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
              Automated System Performance
            </div>
          </div>
        </div>

        {/* PARAGRAPHS */}

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

/* KPI COMPONENT */

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

/* CHART ROW */

function ChartRow({ label, before, after, delay }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), delay);
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
