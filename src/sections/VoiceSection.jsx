import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useVoiceAssistant } from "../hooks/useVoiceAssistant";

/* =========================
   VISUALIZER COMPONENT
========================= */
function Visualizer({ isActive }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animationId;
    let time = 0;

    const render = () => {
      time += 0.05;

      const width = (canvas.width = canvas.offsetWidth);
      const height = (canvas.height = canvas.offsetHeight);
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);

      const lines = 4;
      const amplitude = isActive ? 22 : 4;

      for (let i = 0; i < lines; i++) {
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = `rgba(120, 255, 180, ${0.3 + i * 0.15})`;

        for (let x = 0; x < width; x += 6) {
          const frequency = 0.01 + i * 0.004;
          const y =
            centerY +
            Math.sin(x * frequency + time + i) *
              amplitude *
              (1 - Math.abs(x - width / 2) / (width / 2));

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.stroke();
      }

      animationId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationId);
  }, [isActive]);

  return (
    <div className="voice-visualizer">
      <canvas ref={canvasRef} />
    </div>
  );
}

/* =========================
   MAIN VOICE SECTION
========================= */
export default function VoiceSection() {
  const { status, error, connect, disconnect } = useVoiceAssistant();

  const isActive = status === "connected";
  const isConnecting = status === "connecting";

  const [timeLeft, setTimeLeft] = useState(300);
  const timerRef = useRef(null);
  const disconnectRef = useRef(disconnect);

  // keep stable reference
  useEffect(() => {
    disconnectRef.current = disconnect;
  }, [disconnect]);

  /* =========================
     CLEAN COUNTDOWN LOGIC
  ========================= */
  useEffect(() => {
    if (!isActive) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setTimeLeft(300);
      return;
    }

    if (timerRef.current) return; // prevent multiple intervals

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          timerRef.current = null;
          disconnectRef.current(); // stable disconnect
          return 300;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isActive]);

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  const handleToggle = () => {
    if (isActive) {
      disconnect();
    } else if (!isConnecting) {
      connect();
    }
  };

  return (
    <section className="voice-section">
      <motion.h2
        className="voice-title"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        AI Voice Assistant
      </motion.h2>

      <motion.div
        className="voice-glass"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="voice-content">
          <div className="voice-left">
            <h2>Instant AI Calls. Zero Delays.</h2>
            <p>
              The AI voice assistant instantly calls every new lead, qualifies
              them, answers questions, and sends structured data directly into
              your CRM.
            </p>

            <div className={`voice-timer ${timeLeft <= 30 ? "warning" : ""}`}>
              {isActive && <span className="live-dot" />}
              DEMO MODE • {minutes}:{seconds}
            </div>

            {error && (
              <div style={{ color: "#ff4d4d", marginBottom: "12px" }}>
                {error}
              </div>
            )}

            <button
              className={`primary-btn ${isActive ? "danger" : ""}`}
              onClick={handleToggle}
              disabled={isConnecting}
            >
              {isConnecting
                ? "Connecting..."
                : isActive
                  ? "End Call"
                  : "Start Call"}
            </button>
          </div>

          <div className="voice-right">
            <Visualizer isActive={isActive} />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
