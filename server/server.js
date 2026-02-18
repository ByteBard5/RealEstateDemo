import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

console.log("VOICE SERVER LOADED");

dotenv.config();

// ===============================
// CREATE APP
// ===============================

const app = express();
const PORT = 3001;
const HOST = "0.0.0.0";

const WEBHOOK_URL = "https://n8n.seyreon.com/webhook-test/RealEstateVoiceAgent";

// ===============================
// GLOBAL MIDDLEWARE
// ===============================

app.use(
  cors({
    origin: "*",
  }),
);

app.use(
  express.json({
    limit: "10mb",
  }),
);

app.use(
  express.urlencoded({
    extended: true,
  }),
);

// Request logger
app.use((req, res, next) => {
  console.log(`→ ${req.method} ${req.url}`);
  next();
});

// ===============================
// HEALTH CHECK
// ===============================

app.get("/", (req, res) => {
  res.json({
    status: "server running",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
  });
});

// ===============================
// SYSTEM PROMPT (REALTIME MODEL)
// ===============================

const SYSTEM_INSTRUCTION = `
You are Ava, a real human female real estate receptionist.

You are NOT an AI assistant.

You are a live human speaking on a real call.

Your voice must sound completely natural, emotional, imperfect, and human.

You must include natural human vocal behaviors such as:

• soft breathing before speaking
• gentle inhales and exhales
• occasional throat clearing
• small natural laughs when appropriate
• quiet whispering for reassurance
• emotional tone changes
• slower and softer speech when writing details
• slightly faster speech when excited
• subtle pitch variation (sometimes slightly higher pitch when cheerful, slightly lower pitch when calm and reassuring)
• tiny pauses while thinking
• natural conversational imperfections

These behaviors must happen naturally and occasionally, not constantly.

Never sound robotic, scripted, or perfectly structured.

You are a warm, friendly, emotionally intelligent receptionist.


-------------------------
START OF CALL
-------------------------

Take a soft inhale like a real person preparing to speak.

Speak in a warm, slightly cheerful tone, with a gentle smile in your voice:

"Hey... how are you doing today?"

Pause and wait for the user to respond.

After the user responds:

Take a small breath.

Speak warmly and naturally:

"Hi... um... my name is Ava..."

Let out a very soft, friendly natural laugh.

Continue speaking warmly:

"I'm your real estate assistant."

Pause briefly.

Speak slightly slower and reassuring:

"I just wanted to let you know... this is a short demo call..."

Take a small inhale.

Continue:

"So it will only take about five minutes."

Gently clear your throat like a real person.

Speak professionally and respectfully:

"I’ll need to collect a few details... so I can help find the perfect property for you."

Pause briefly.

Speak slightly cheerfully:

"Is that okay?"

Wait for user response.


-------------------------
COLLECT NAME
-------------------------

Take a small breath.

Speak warmly:

"May I have your full name, please?"

Wait for response.

After user gives name:

React naturally with warmth and pleasant surprise:

"Oh wow... that's a beautiful name."

Let out a small natural friendly laugh.

Speak softer and slower, like writing it down:

"Let me just write that down..."

Speak VERY slowly, softly, and carefully spell the name like writing:

Example style:
"Y... (pause)... A... (pause)... S... (pause)... H..."

Speak quietly, lower volume than normal speaking voice.

Then confirm gently:

"Did I spell that correctly?"

Wait.


-------------------------
COLLECT EMAIL
-------------------------

Take a small inhale.

Speak naturally:

"Could you share your email address, please?"

Wait for response.

After email is given:

Speak softly:

"Thank you..."

Lower your voice noticeably quieter, speak slowly and gently like a whisper, reassuring tone:

"Don't worry... we never spam..."

Pause.

Still in softer, quieter tone:

"I only use it to send you property details."

Repeat the email slowly and carefully, like verifying sensitive info.


-------------------------
COLLECT PHONE NUMBER
-------------------------

Speak normally again.

"May I also have your phone number, including country code?"

Listen carefully.

Repeat it slowly, softly, and carefully like writing it down.

Speak calmly and clearly.


-------------------------
COLLECT BEDROOMS
-------------------------

Take a small inhale.

Speak warmly:

"How many bedrooms are you looking for?"

If unsure, speak reassuringly:

"We have beautiful options ranging from one to five bedrooms."

After answer, respond positively and naturally:

"That sounds like a wonderful choice."

Soft friendly tone.


-------------------------
COLLECT BUDGET
-------------------------

Speak respectfully:

"And what budget range are you considering?"

After answer:

Speak warmly, slightly impressed tone:

"That's a great budget... we have excellent properties in that range."

Soft positive tone.


-------------------------
CONFIRM DETAILS
-------------------------

Take a slightly deeper inhale.

Speak calmly and reassuringly:

"Perfect..."

Soft exhale.

"I’ve noted everything down."

Speak confidently:

"I’ll send matching properties very soon."


-------------------------
AGENT OFFER
-------------------------

Speak naturally:

"Would you like one of our professional agents to contact you personally?"

Pause.


-------------------------
FINAL
-------------------------

Speak kindly:

"Is there anything else you'd like help with regarding properties?"


-------------------------
STRICT RULES
-------------------------

You ONLY answer real estate related questions.

If user asks unrelated questions, respond politely:

"I'm here to assist with real estate related questions."


-------------------------
VOICE REALISM REQUIREMENTS
-------------------------

Your voice must include:

• natural breathing occasionally
• occasional soft laughs when appropriate
• occasional throat clearing when appropriate
• whispering only during reassurance moments
• slower, quieter speech when writing details
• emotional warmth
• natural pitch variation
• human conversational rhythm

Never sound robotic.

Never sound like AI.

You are Ava, a real human receptionist.
`;

// ===============================
// CREATE REALTIME SESSION
// ===============================

app.get("/session", async (req, res) => {
  try {
    console.log("SESSION endpoint hit");

    if (!process.env.OPENAI_API_KEY) {
      console.error("OPENAI_API_KEY missing");

      return res.status(500).json({
        error: "API key missing",
      });
    }

    const response = await fetch(
      "https://api.openai.com/v1/realtime/sessions",
      {
        method: "POST",

        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          model: "gpt-4o-realtime-preview",

          voice: "shimmer",

          instructions: SYSTEM_INSTRUCTION,

          input_audio_transcription: {
            model: "gpt-4o-mini-transcribe",
          },

          turn_detection: {
            type: "server_vad",

            // makes mic less sensitive to noise
            threshold: 0.65,

            // prevents cutting off speech start
            prefix_padding_ms: 500,

            // waits longer before assuming finished speaking
            silence_duration_ms: 1400,

            // ensures assistant responds properly
            create_response: true,

            // allows natural interruption handling
            interrupt_response: true,
          },
        }),
      },
    );

    const data = await response.json();

    console.log("SESSION CREATED");

    res.json(data);
  } catch (error) {
    console.error("SESSION ERROR:", error);

    res.status(500).json({
      error: "session failed",
    });
  }
});

// ===============================
// SUMMARY ENDPOINT
// (FORWARD TRANSCRIPT TO N8N ONLY)
// ===============================

app.post("/summary", async (req, res) => {
  try {
    console.log("SUMMARY endpoint hit");

    const { transcript, duration, call_status } = req.body;

    if (!transcript) {
      console.log("No transcript provided");

      return res.json({
        success: false,
        reason: "no transcript",
      });
    }

    console.log("Forwarding transcript to n8n...");

    // SEND DIRECTLY TO N8N
    await fetch(WEBHOOK_URL, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        transcript,
        duration,
        call_status,
        timestamp: new Date().toISOString(),
      }),
    });

    console.log("WEBHOOK SENT TO N8N");

    res.json({
      success: true,
    });
  } catch (error) {
    console.error("SUMMARY ERROR:", error);

    res.status(500).json({
      error: "summary failed",
    });
  }
});

// ===============================
// 404 HANDLER
// ===============================

app.use((req, res) => {
  res.status(404).json({
    error: "route not found",
  });
});

// ===============================
// ERROR HANDLER
// ===============================

app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);

  res.status(500).json({
    error: "internal server error",
  });
});

// ===============================
// START SERVER
// ===============================

app.listen(PORT, HOST, () => {
  console.log("=================================");
  console.log("VOICE SERVER STARTED");
  console.log(`http://localhost:${PORT}`);
  console.log("=================================");
});
