import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import PhoneIcon from "../assets/Icons/Phone.png";

const OPENAI_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const N8N_WEBHOOK = import.meta.env.VITE_N8N_VOICE_WEBHOOK;

export default function VoiceSection() {
  const [active, setActive] = useState(false);
  const recognitionRef = useRef(null);

  /* ---------- HARD STOP EVERYTHING ---------- */
  const stopAllAudio = () => {
    try {
      recognitionRef.current?.stop();
    } catch {}
    window.speechSynthesis.cancel(); // 🔑 THIS IS THE KEY FIX
  };

  /* ---------- SPEAK (FEMALE VOICE) ---------- */
  const speak = (text) => {
    // Always cancel before speaking new text
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice =
      voices.find((v) => /female|woman|zira|samantha|victoria/i.test(v.name)) ||
      voices[0];

    utterance.voice = femaleVoice;
    utterance.rate = 1;
    utterance.pitch = 1.1;
    utterance.lang = "en-US";

    window.speechSynthesis.speak(utterance);
  };

  /* ---------- SEND TO N8N ---------- */
  const sendToN8N = async (payload) => {
    try {
      await fetch(N8N_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {}
  };

  /* ---------- OPENAI ---------- */
  const askAI = async (text) => {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are Lucy, a professional AI voice assistant for a real estate agency. Be calm, concise, and helpful.",
          },
          { role: "user", content: text },
        ],
      }),
    });

    const data = await res.json();
    return data.choices[0].message.content;
  };

  /* ---------- TOGGLE VOICE ---------- */
  const toggleVoice = () => {
    // TURN OFF
    if (active) {
      stopAllAudio();
      setActive(false);
      return;
    }

    // TURN ON
    if (!("webkitSpeechRecognition" in window)) {
      alert("Voice recognition not supported in this browser.");
      return;
    }

    setActive(true);
    speak("Hey, I’m Lucy. How can I help you today?");

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onresult = async (event) => {
      if (!active) return;

      const userText = event.results[event.results.length - 1][0].transcript;

      await sendToN8N({
        role: "user",
        message: userText,
        channel: "voice-demo",
      });

      const reply = await askAI(userText);

      await sendToN8N({
        role: "assistant",
        message: reply,
        channel: "voice-demo",
      });

      if (active) speak(reply);
    };

    recognition.onerror = () => {
      stopAllAudio();
      setActive(false);
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  /* ---------- CLEANUP ---------- */
  useEffect(() => {
    return () => stopAllAudio();
  }, []);

  return (
    <section className="voice-section">
      <div className="voice-intro">
        <h2>Let your system speak for you</h2>
        <p>
          Click once to start the assistant.
          <br />
          Click again to stop — instantly.
        </p>
      </div>

      <motion.div
        className={`voice-glass ${active ? "active" : ""}`}
        onClick={toggleVoice}
        whileHover={{ scale: 1.04 }}
      >
        <img src={PhoneIcon} alt="Phone" className="voice-phone-icon" />

        {active && (
          <div className="voice-waves">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
        )}

        <div className="voice-status">
          {active ? "Listening…" : "Tap to Speak"}
        </div>
      </motion.div>
    </section>
  );
}
