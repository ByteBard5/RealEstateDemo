import React, { useEffect, useState, useRef } from "react";
import "../../styles/casestudy.css";

export default function Results() {
  const sectionRef = useRef(null);

  /* ============================
     BASE METRICS (UPDATED)
  ============================ */

  const baseMetrics = useRef({
    response: 99,
    capture: 100,
    efficiency: 83,
    conversion: 78,
  }).current;

  /* ============================
     UPDATED CONTENT
  ============================ */

  const paragraphs = [
    "Within 90 days of deploying the automated conversion engine, the agency experienced significant and measurable improvements across every critical performance metric.",

    "Response time, which previously ranged between two and six hours, was reduced to under five seconds. Every inquiry was captured and engaged instantly, ensuring leads were addressed at the peak of their intent.",

    "Lead-to-appointment conversion rate increased by 78%, driven by immediate engagement, consistent qualification, and structured routing. Opportunities that would have previously been lost due to response delays were now entering the pipeline reliably.",

    "Lead capture reached full operational coverage. One hundred percent of inbound inquiries across WhatsApp, Instagram, Facebook Messenger, website forms, landing pages, and email were automatically captured, structured, and routed.",

    "Lead leakage caused by missed messages or delayed follow-ups was eliminated entirely, ensuring every opportunity entered the conversion pipeline.",

    "Administrative workload decreased by 83%, as manual intake, qualification, and routing tasks were replaced by automated workflows.",

    "Agents shifted their focus entirely to high-value activities — engaging qualified prospects, building relationships, and closing transactions — improving productivity and overall conversion efficiency.",

    "The system removed operational capacity constraints, allowing lead volume to increase without requiring additional staffing or introducing bottlenecks.",

    "What was previously a fragile, manual process became a scalable conversion infrastructure capable of handling sustained growth while maintaining speed, consistency, and operational control.",
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
     UPDATED CHART DATA
  ============================ */

  const chartData = [
    { label: "Response Speed", before: 22, after: metrics.response },
    { label: "Lead Capture Coverage", before: 63, after: metrics.capture },
    { label: "Operational Efficiency", before: 38, after: metrics.efficiency },
    { label: "Lead Conversion Rate", before: 44, after: metrics.conversion },
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
            78% Increase in Conversion and Complete Elimination of Lead Leakage
          </h2>
        </div>

        {/* KPI STRIP */}

        <div className="cs-kpi-strip">
          <Metric value={metrics.response} label="Response Speed Improvement" />

          <Metric value={metrics.capture} label="Lead Capture Coverage" />

          <Metric
            value={metrics.efficiency}
            label="Administrative Workload Reduction"
          />

          <Metric value={metrics.conversion} label="Conversion Rate Increase" />
        </div>

        {/* PREMIUM CHART */}

        <div className="cs-chart-card">
          <div className="cs-chart-header">
            Live Conversion Infrastructure Performance Comparison
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
