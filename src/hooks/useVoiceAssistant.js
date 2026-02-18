// import { useState, useRef, useCallback, useEffect } from "react";
// import { GoogleGenAI } from "@google/genai";
// import {
//   base64ToUint8Array,
//   createPcmBlob,
//   decodeAudioData,
// } from "../utils/audioUtils";
// import {
//   SYSTEM_INSTRUCTION,
//   TOOLS,
//   GOOGLE_SCRIPT_URL,
//   WEBHOOK_URL,
// } from "../utils/voiceConstants";

// export function useVoiceAssistant() {
//   const [status, setStatus] = useState("disconnected");
//   const [error, setError] = useState(null);
//   const [isAiSpeaking, setIsAiSpeaking] = useState(false);

//   const sessionRef = useRef(null);
//   const inputContextRef = useRef(null);
//   const outputContextRef = useRef(null);
//   const processorRef = useRef(null);
//   const sourcesRef = useRef(new Set());
//   const nextStartTimeRef = useRef(0);
//   const keepAliveRef = useRef(null);

//   const isSessionActiveRef = useRef(false);
//   const webhookSentRef = useRef(false);

//   // FULL lead state tracking
//   const leadDataRef = useRef({
//     name: null,
//     email: null,
//     phone: null,
//     bedrooms: null,
//     maxPrice: null,
//     summary: null,
//   });

//   // ============================
//   // SAFE WEBHOOK SENDER
//   // ============================

//   const sendWebhookSafely = async () => {
//     if (webhookSentRef.current) return;

//     const lead = leadDataRef.current;

//     // Don't send completely empty lead
//     if (!lead.name && !lead.email && !lead.phone) return;

//     try {
//       webhookSentRef.current = true;

//       await fetch(WEBHOOK_URL, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           ...lead,
//           status: "completed",
//           timestamp: new Date().toISOString(),
//         }),
//       });

//       console.log("Webhook sent safely:", lead);
//     } catch (err) {
//       console.error("Webhook failed:", err);
//       webhookSentRef.current = false;
//     }
//   };

//   // ============================
//   // AUTO SEND ON TAB CLOSE
//   // ============================

//   useEffect(() => {
//     const handleUnload = () => {
//       sendWebhookSafely();
//     };

//     window.addEventListener("beforeunload", handleUnload);

//     return () => {
//       window.removeEventListener("beforeunload", handleUnload);
//     };
//   }, []);

//   const pauseMic = () => {
//     processorRef.current?.disconnect();
//   };

//   const resumeMic = () => {
//     if (processorRef.current && inputContextRef.current?.destination) {
//       processorRef.current.connect(inputContextRef.current.destination);
//     }
//   };

//   // ============================
//   // CONNECT
//   // ============================

//   const connect = useCallback(async () => {
//     if (status !== "disconnected") return;

//     setStatus("connecting");
//     setError(null);
//     webhookSentRef.current = false;

//     leadDataRef.current = {
//       name: null,
//       email: null,
//       phone: null,
//       bedrooms: null,
//       maxPrice: null,
//       summary: null,
//     };

//     try {
//       const ai = new GoogleGenAI({
//         apiKey: import.meta.env.VITE_GEMINI_API_KEY,
//       });

//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

//       const inputCtx = new AudioContext({ sampleRate: 16000 });
//       const outputCtx = new AudioContext({ sampleRate: 24000 });

//       await inputCtx.resume();
//       await outputCtx.resume();

//       inputContextRef.current = inputCtx;
//       outputContextRef.current = outputCtx;

//       // Prevent suspension
//       keepAliveRef.current = setInterval(async () => {
//         if (inputCtx.state === "suspended") await inputCtx.resume();
//         if (outputCtx.state === "suspended") await outputCtx.resume();
//       }, 2000);

//       const session = await ai.live.connect({
//         model: "gemini-2.5-flash-native-audio-preview-12-2025",
//         config: {
//           responseModalities: ["AUDIO"],
//           systemInstruction: SYSTEM_INSTRUCTION,
//           tools: TOOLS,
//         },

//         callbacks: {
//           onopen: () => {
//             isSessionActiveRef.current = true;
//             setStatus("connected");
//           },

//           onmessage: async (msg) => {
//             if (!isSessionActiveRef.current) return;

//             // ================= AUDIO =================

//             const base64Audio =
//               msg.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;

//             if (base64Audio) {
//               setIsAiSpeaking(true);

//               const ctx = outputContextRef.current;

//               const audioBuffer = await decodeAudioData(
//                 base64ToUint8Array(base64Audio),
//                 ctx,
//                 24000,
//               );

//               const source = ctx.createBufferSource();

//               source.buffer = audioBuffer;
//               source.connect(ctx.destination);

//               source.onended = () => {
//                 sourcesRef.current.delete(source);
//                 if (sourcesRef.current.size === 0) {
//                   setIsAiSpeaking(false);
//                 }
//               };

//               nextStartTimeRef.current = Math.max(
//                 nextStartTimeRef.current,
//                 ctx.currentTime,
//               );

//               source.start(nextStartTimeRef.current);

//               nextStartTimeRef.current += audioBuffer.duration;

//               sourcesRef.current.add(source);
//             }

//             // ================= TOOL CALL =================

//             if (msg.toolCall?.functionCalls?.length) {
//               pauseMic();

//               for (const fc of msg.toolCall.functionCalls) {
//                 let result = {};

//                 try {
//                   if (fc.name === "searchProperties") {
//                     const { bedrooms, maxPrice } = fc.args;

//                     // STORE DATA
//                     leadDataRef.current.bedrooms = bedrooms;
//                     leadDataRef.current.maxPrice = maxPrice;

//                     const response = await fetch(
//                       `${GOOGLE_SCRIPT_URL}?bedrooms=${bedrooms}&maxPrice=${maxPrice}`,
//                     );

//                     result = await response.json();
//                   }

//                   if (fc.name === "submitLead") {
//                     leadDataRef.current = {
//                       ...leadDataRef.current,
//                       ...fc.args,
//                     };

//                     await sendWebhookSafely();

//                     result = { success: true };
//                   }
//                 } catch (err) {
//                   result = { error: err.message };
//                 }

//                 await session.sendToolResponse({
//                   functionResponses: [
//                     {
//                       id: fc.id,
//                       name: fc.name,
//                       response: result,
//                     },
//                   ],
//                 });
//               }

//               resumeMic();
//             }
//           },

//           onerror: () => {
//             isSessionActiveRef.current = false;
//             sendWebhookSafely();
//             setStatus("error");
//           },

//           onclose: () => {
//             isSessionActiveRef.current = false;
//             sendWebhookSafely();
//             setStatus("disconnected");
//           },
//         },
//       });

//       sessionRef.current = session;

//       const source = inputCtx.createMediaStreamSource(stream);

//       const processor = inputCtx.createScriptProcessor(4096, 1, 1);

//       processorRef.current = processor;

//       processor.onaudioprocess = (e) => {
//         if (!isSessionActiveRef.current) return;

//         const input = e.inputBuffer.getChannelData(0);

//         // ignore silence
//         let silent = true;
//         for (let i = 0; i < input.length; i++) {
//           if (Math.abs(input[i]) > 0.001) {
//             silent = false;
//             break;
//           }
//         }

//         if (silent) return;

//         const blob = createPcmBlob(input);

//         session.sendRealtimeInput({ media: blob });
//       };

//       source.connect(processor);
//       processor.connect(inputCtx.destination);
//     } catch (err) {
//       console.error(err);

//       sendWebhookSafely();

//       setError("Failed to connect");

//       setStatus("error");
//     }
//   }, [status]);

//   // ============================
//   // DISCONNECT
//   // ============================

//   const disconnect = useCallback(() => {
//     isSessionActiveRef.current = false;

//     sendWebhookSafely();

//     sessionRef.current?.close();

//     inputContextRef.current?.close();

//     outputContextRef.current?.close();

//     clearInterval(keepAliveRef.current);

//     sourcesRef.current.forEach((s) => s.stop());

//     sourcesRef.current.clear();

//     nextStartTimeRef.current = 0;

//     setStatus("disconnected");

//     setIsAiSpeaking(false);
//   }, []);

//   return {
//     status,
//     error,
//     isAiSpeaking,
//     connect,
//     disconnect,
//   };
// }

//the code above can fetch the Properties from the google sheet but it was not working perfectly everytime. Sometimes it was cutting the audio automatically after getting the property requirements like number of bedrooms and max budget. So for now removing this. Other files are : "voiceConstants.js",

// ----------------------------------------------------------------------------
// import { useState, useRef, useCallback, useEffect } from "react";
// import OpenAI from "openai";
// import { SYSTEM_INSTRUCTION, WEBHOOK_URL } from "../utils/voiceConstants";

// export function useVoiceAssistant() {
//   const [status, setStatus] = useState("disconnected");
//   const [error, setError] = useState(null);
//   const [isAiSpeaking, setIsAiSpeaking] = useState(false);

//   const openaiRef = useRef(null);
//   const recognitionRef = useRef(null);
//   const audioRef = useRef(null);

//   const transcriptRef = useRef([]);
//   const webhookSentRef = useRef(false);

//   const isListeningRef = useRef(false);
//   const isStoppingRef = useRef(false);

//   // =========================
//   // INIT OPENAI
//   // =========================

//   useEffect(() => {
//     openaiRef.current = new OpenAI({
//       apiKey: import.meta.env.VITE_OPENAI_API_KEY,
//       dangerouslyAllowBrowser: true,
//     });
//   }, []);

//   // =========================
//   // WEBHOOK
//   // =========================

//   const sendWebhook = async (callStatus = "completed") => {
//     if (webhookSentRef.current) return;

//     webhookSentRef.current = true;

//     try {
//       const transcript = transcriptRef.current
//         .map((m) => `${m.role}: ${m.content}`)
//         .join("\n");

//       if (!transcript) return;

//       const res = await openaiRef.current.chat.completions.create({
//         model: "gpt-4o-mini",

//         messages: [
//           { role: "system", content: "Summarize this real estate call." },
//           { role: "user", content: transcript },
//         ],
//       });

//       const summary = res.choices?.[0]?.message?.content || "";

//       await fetch(WEBHOOK_URL, {
//         method: "POST",
//         mode: "no-cors",
//         headers: { "Content-Type": "application/json" },

//         body: JSON.stringify({
//           summary,
//           callStatus,
//           timestamp: new Date().toISOString(),
//         }),
//       });

//       console.log("SUMMARY SENT");
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   // =========================
//   // STOP AUDIO
//   // =========================

//   const stopAudio = () => {
//     if (audioRef.current) {
//       audioRef.current.pause();
//       audioRef.current.src = "";
//       audioRef.current = null;
//     }

//     setIsAiSpeaking(false);
//   };

//   // =========================
//   // STOP LISTENING
//   // =========================

//   const stopListening = () => {
//     if (recognitionRef.current && isListeningRef.current) {
//       isStoppingRef.current = true;

//       recognitionRef.current.stop();

//       isListeningRef.current = false;
//     }
//   };

//   // =========================
//   // START LISTENING
//   // =========================

//   const startListening = () => {
//     if (isListeningRef.current) return;

//     const SpeechRecognition =
//       window.SpeechRecognition || window.webkitSpeechRecognition;

//     if (!SpeechRecognition) {
//       setError("Speech recognition not supported");
//       return;
//     }

//     const recognition = new SpeechRecognition();

//     recognition.continuous = true;
//     recognition.interimResults = false;
//     recognition.lang = "en-US";

//     recognition.onstart = () => {
//       isListeningRef.current = true;
//     };

//     recognition.onresult = async (event) => {
//       const result = event.results[event.results.length - 1];

//       if (!result.isFinal) return;

//       const text = result[0].transcript.trim();

//       console.log("USER:", text);

//       stopListening();

//       await processUserText(text);
//     };

//     recognition.onerror = (event) => {
//       if (event.error === "aborted") return;

//       console.log("Mic error:", event.error);
//     };

//     recognition.onend = () => {
//       isListeningRef.current = false;

//       if (!isStoppingRef.current && status === "connected") {
//         setTimeout(() => {
//           startListening();
//         }, 300);
//       }

//       isStoppingRef.current = false;
//     };

//     recognition.start();

//     recognitionRef.current = recognition;
//   };

//   // =========================
//   // SPEAK
//   // =========================

//   const speak = async (text) => {
//     if (!text || status !== "connected") return;

//     try {
//       stopListening();

//       stopAudio();

//       setIsAiSpeaking(true);

//       console.log("AI:", text);

//       const res = await openaiRef.current.audio.speech.create({
//         model: "gpt-4o-mini-tts",
//         voice: "shimmer",
//         input: text,
//       });

//       const blob = new Blob([await res.arrayBuffer()], { type: "audio/mp3" });

//       const audio = new Audio(URL.createObjectURL(blob));

//       audioRef.current = audio;

//       audio.onended = () => {
//         setIsAiSpeaking(false);

//         if (status === "connected") {
//           setTimeout(() => {
//             startListening();
//           }, 200);
//         }
//       };

//       await audio.play();
//     } catch (e) {
//       console.log("Speak error:", e);

//       setIsAiSpeaking(false);
//     }
//   };

//   // =========================
//   // AI RESPONSE
//   // =========================

//   const processUserText = async (userText) => {
//     if (!userText) return;

//     transcriptRef.current.push({
//       role: "user",
//       content: userText,
//     });

//     try {
//       const res = await openaiRef.current.chat.completions.create({
//         model: "gpt-4o",

//         messages: [
//           { role: "system", content: SYSTEM_INSTRUCTION },
//           ...transcriptRef.current,
//         ],
//       });

//       const aiText = res.choices?.[0]?.message?.content;

//       if (!aiText) return;

//       transcriptRef.current.push({
//         role: "assistant",
//         content: aiText,
//       });

//       await speak(aiText);
//     } catch (e) {
//       console.log("AI error:", e);
//     }
//   };

//   // =========================
//   // CONNECT
//   // =========================

//   const connect = useCallback(async () => {
//     if (status === "connected") return;

//     console.log("CONNECTING");

//     transcriptRef.current = [];
//     webhookSentRef.current = false;

//     setStatus("connected");

//     const greeting =
//       "Hi! I'm Ava, your personal real estate assistant. Let's get started. What is your full name?";

//     transcriptRef.current.push({
//       role: "assistant",
//       content: greeting,
//     });

//     await speak(greeting);
//   }, [status]);

//   // =========================
//   // DISCONNECT
//   // =========================

//   const disconnect = useCallback(() => {
//     console.log("DISCONNECT");

//     stopListening();

//     stopAudio();

//     sendWebhook("user_disconnected");

//     setStatus("disconnected");
//   }, []);

//   // =========================
//   // TAB CLOSE
//   // =========================

//   useEffect(() => {
//     const unload = () => {
//       sendWebhook("user_closed_tab");
//     };

//     window.addEventListener("beforeunload", unload);

//     return () => window.removeEventListener("beforeunload", unload);
//   }, []);

//   return {
//     status,
//     error,
//     isAiSpeaking,
//     connect,
//     disconnect,
//   };
// }
