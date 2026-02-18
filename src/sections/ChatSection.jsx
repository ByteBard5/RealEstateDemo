// import { useEffect, useRef, useState } from "react";
// import { motion } from "framer-motion";

// const CHAT_URL =
//   "https://n8n.seyreon.com/webhook/60cdaf57-c25c-44d2-afa1-2e9983e3ba21/chat";

// const INITIAL_MESSAGE = {
//   role: "bot",
//   content:
//     "Hi 👋 I’m your virtual assistant. Ask me anything about properties, pricing, or availability.",
// };

// export default function ChatSection() {
//   const [messages, setMessages] = useState([INITIAL_MESSAGE]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);

//   const messagesRef = useRef(null);
//   const isUserAtBottomRef = useRef(true);

//   // Store persistent sessionId
//   const sessionIdRef = useRef(
//     localStorage.getItem("n8n-chat-session") || crypto.randomUUID(),
//   );

//   useEffect(() => {
//     localStorage.setItem("n8n-chat-session", sessionIdRef.current);
//   }, []);

//   const handleScroll = () => {
//     const el = messagesRef.current;
//     if (!el) return;

//     const threshold = 40;
//     isUserAtBottomRef.current =
//       el.scrollHeight - el.scrollTop - el.clientHeight < threshold;
//   };

//   useEffect(() => {
//     const el = messagesRef.current;
//     if (!el || !isUserAtBottomRef.current) return;
//     el.scrollTop = el.scrollHeight;
//   }, [messages, loading]);

//   const extractBotReply = (responseData) => {
//     try {
//       // n8n embedded chat response format
//       if (responseData?.data?.[0]?.output) return responseData.data[0].output;

//       if (responseData?.output) return responseData.output;

//       if (responseData?.message) return responseData.message;

//       if (responseData?.text) return responseData.text;

//       if (typeof responseData === "string") return responseData;

//       return JSON.stringify(responseData);
//     } catch {
//       return "⚠️ Error reading response.";
//     }
//   };

//   const sendMessage = async () => {
//     if (!input.trim() || loading) return;

//     const userText = input.trim();

//     setInput("");
//     setMessages((prev) => [...prev, { role: "user", content: userText }]);

//     setLoading(true);

//     try {
//       const res = await fetch(CHAT_URL, {
//         method: "POST",
//         mode: "cors",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           action: "sendMessage",
//           sessionId: sessionIdRef.current,
//           chatInput: userText,
//         }),
//       });

//       if (!res.ok) throw new Error(`HTTP ${res.status}`);

//       const data = await res.json();

//       const botReply = extractBotReply(data);

//       setMessages((prev) => [...prev, { role: "bot", content: botReply }]);
//     } catch (error) {
//       console.error("Chat error:", error);

//       setMessages((prev) => [
//         ...prev,
//         {
//           role: "bot",
//           content: "⚠️ Connection error. Please try again.",
//         },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetChat = () => {
//     const newSession = crypto.randomUUID();

//     sessionIdRef.current = newSession;
//     localStorage.setItem("n8n-chat-session", newSession);

//     setMessages([INITIAL_MESSAGE]);
//     setInput("");
//     setLoading(false);

//     requestAnimationFrame(() => {
//       if (messagesRef.current) {
//         messagesRef.current.scrollTop = 0;
//       }
//     });
//   };

//   return (
//     <section className="chat-section">
//       <div className="chat-intro">
//         <h2>A missed reply costs more than one deal</h2>
//         <p>
//           You don’t just lose a single enquiry.
//           <br />
//           You lose the long-term relationship, repeat business, and referrals
//           that follow when buyers feel taken care of.
//         </p>
//       </div>

//       <motion.div
//         className="chat-card"
//         initial={{ opacity: 0, y: 40 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7 }}
//         viewport={{ once: true }}
//       >
//         <button className="chat-reset" onClick={resetChat}>
//           ↻
//         </button>

//         <div
//           className="chat-messages"
//           ref={messagesRef}
//           onScroll={handleScroll}
//         >
//           {messages.map((msg, index) => (
//             <div
//               key={index}
//               className={`chat-bubble ${msg.role === "user" ? "user" : "bot"}`}
//             >
//               {msg.content}
//             </div>
//           ))}

//           {loading && <div className="chat-bubble bot typing">Typing…</div>}
//         </div>

//         <div className="chat-input">
//           <input
//             placeholder="Type your message…"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//           />

//           <button onClick={sendMessage}>Send</button>
//         </div>
//       </motion.div>
//     </section>
//   );
// }
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const CHAT_URL =
  "https://n8n.seyreon.com/webhook/60cdaf57-c25c-44d2-afa1-2e9983e3ba21/chat";

const INITIAL_MESSAGE = {
  role: "bot",
  content:
    "Hello 👋 I’m your AI assistant. I can instantly answer questions about properties, availability, pricing, or help you schedule the next step. How can I assist you today?",
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

        headers: {
          "Content-Type": "application/json",
        },

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
        {
          role: "bot",
          content: "⚠️ Connection issue. Please try again.",
        },
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

  return (
    <section className="chat-section">
      <div className="chat-intro">
        <h2>Every inquiry deserves an immediate response</h2>

        <p>
          When prospects reach out, speed determines whether the opportunity
          moves forward or disappears. This AI assistant responds instantly,
          answers questions, and guides buyers toward the next step — ensuring
          every conversation stays alive and every opportunity is captured.
        </p>
      </div>

      <motion.div
        className="chat-card"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        {/* HEADER */}
        <div className="chat-header">
          <div className="chat-header-left">
            <div className="chat-avatar" />

            <div className="chat-header-info">
              <div className="chat-title">Real Estate AI Assistant</div>

              <div className="chat-status">
                <span className="status-dot" />
                Online • Responds instantly
              </div>
            </div>
          </div>

          <button className="chat-reset" onClick={resetChat}>
            ↻
          </button>
        </div>

        {/* MESSAGES */}
        <div
          className="chat-messages"
          ref={messagesRef}
          onScroll={handleScroll}
        >
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className={`chat-row ${msg.role}`}
            >
              {msg.role === "bot" && <div className="chat-avatar small" />}

              <div className={`chat-bubble ${msg.role}`}>{msg.content}</div>
            </motion.div>
          ))}

          {loading && (
            <div className="chat-row bot">
              <div className="chat-avatar small" />

              <div className="chat-bubble bot typing">Thinking…</div>
            </div>
          )}
        </div>

        {/* INPUT */}
        <div className="chat-input">
          <input
            placeholder="Ask about properties, availability, pricing..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />

          <button onClick={sendMessage}>Send</button>
        </div>
      </motion.div>
    </section>
  );
}
