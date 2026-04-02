import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* =========================================================
   CHAT SECTION — AI ASSISTANT DEMO
   Functionalities preserved 100%. UI updated per design system.
========================================================= */

const CHAT_URL =
  "https://n8n.seyreon.com/webhook/60cdaf57-c25c-44d2-afa1-2e9983e3ba21/chat";

const INITIAL_MESSAGE = {
  role: "bot",
  content:
    "Hello 👋 I'm your AI assistant. I can instantly answer questions about properties, availability, pricing, or help you schedule the next step. How can I assist you today?",
};

export default function ChatSection() {
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesRef = useRef(null);
  const isUserAtBottomRef = useRef(true);

  const sessionIdRef = useRef(
    localStorage.getItem("n8n-chat-session") || crypto.randomUUID(),
  );

  useEffect(() => {
    localStorage.setItem("n8n-chat-session", sessionIdRef.current);
  }, []);

  const handleScroll = () => {
    const el = messagesRef.current;
    if (!el) return;
    const threshold = 40;
    isUserAtBottomRef.current =
      el.scrollHeight - el.scrollTop - el.clientHeight < threshold;
  };

  useEffect(() => {
    const el = messagesRef.current;
    if (!el || !isUserAtBottomRef.current) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, loading]);

  const extractBotReply = (responseData) => {
    try {
      if (responseData?.data?.[0]?.output) return responseData.data[0].output;
      if (responseData?.output) return responseData.output;
      if (responseData?.message) return responseData.message;
      if (responseData?.text) return responseData.text;
      if (typeof responseData === "string") return responseData;
      return JSON.stringify(responseData);
    } catch {
      return "⚠️ Error reading response.";
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userText = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userText }]);
    setLoading(true);
    try {
      const res = await fetch(CHAT_URL, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "sendMessage",
          sessionId: sessionIdRef.current,
          chatInput: userText,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const botReply = extractBotReply(data);
      setMessages((prev) => [...prev, { role: "bot", content: botReply }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "⚠️ Connection issue. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const resetChat = () => {
    const newSession = crypto.randomUUID();
    sessionIdRef.current = newSession;
    localStorage.setItem("n8n-chat-session", newSession);
    setMessages([INITIAL_MESSAGE]);
    setInput("");
    setLoading(false);
    requestAnimationFrame(() => {
      if (messagesRef.current) messagesRef.current.scrollTop = 0;
    });
  };

  /* ================= RENDER ================= */
  return (
    <section className="chat-section">
      {/* === BACKGROUND ORBS === */}
      <div className="chat-orb chat-orb--tl" aria-hidden="true" />
      <div className="chat-orb chat-orb--br" aria-hidden="true" />

      {/* === SECTION INTRO === */}
      <motion.div
        className="chat-intro"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        {/* Eyebrow label */}
        <div className="chat-eyebrow">Live Intelligence</div>

        <h2 className="chat-heading">
          Every lead deserves an
          <br />
          <span className="chat-heading--accent">instant response</span>
        </h2>

        <p className="chat-body">
          Pipeline velocity is determined in the first 60 seconds. This AI
          assistant activates the moment a prospect reaches out — fielding
          property questions, qualifying intent, and routing high-value leads
          forward automatically. No missed windows. No dead conversations. Pure
          conversion infrastructure, running 24/7.
        </p>
      </motion.div>

      {/* === CHAT CARD === */}
      <motion.div
        className="chat-card"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        viewport={{ once: true }}
      >
        {/* Top gradient line accent */}
        <div className="chat-card__top-line" aria-hidden="true" />

        {/* HEADER */}
        <div className="chat-header">
          <div className="chat-header-left">
            <div className="chat-avatar" />
            <div className="chat-header-info">
              <div className="chat-title">Real Estate AI Assistant (demo)</div>
              <div className="chat-status">
                <span className="status-dot" />
                Online · Responds instantly
              </div>
            </div>
          </div>
          <button
            className="chat-reset"
            onClick={resetChat}
            aria-label="Reset conversation"
            title="Start a new conversation"
          >
            ↻
          </button>
        </div>

        {/* MESSAGES */}
        <div
          className="chat-messages"
          ref={messagesRef}
          onScroll={handleScroll}
        >
          <AnimatePresence initial={false}>
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className={`chat-row ${msg.role}`}
              >
                {msg.role === "bot" && (
                  <div className="chat-avatar small" aria-hidden="true" />
                )}
                <div
                  className={`chat-bubble ${msg.role}`}
                  style={{ whiteSpace: "pre-line" }}
                >
                  {msg.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          {loading && (
            <motion.div
              className="chat-row bot"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="chat-avatar small" aria-hidden="true" />
              <div className="chat-bubble bot typing">
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
              </div>
            </motion.div>
          )}
        </div>

        {/* INPUT */}
        <div className="chat-input">
          <input
            placeholder="Ask about properties, availability, pricing..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            aria-label="Chat input"
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            aria-label="Send message"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path d="M14 8L2 2L5 8L2 14L14 8Z" fill="currentColor" />
            </svg>
            <span>Send</span>
          </button>
        </div>
      </motion.div>
    </section>
  );
}
