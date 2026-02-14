import { useState, useRef, useCallback } from "react";
import { GoogleGenAI } from "@google/genai";
import {
  base64ToUint8Array,
  createPcmBlob,
  decodeAudioData,
} from "../utils/audioUtils";
import {
  SYSTEM_INSTRUCTION,
  TOOLS,
  GOOGLE_SCRIPT_URL,
  WEBHOOK_URL,
} from "../utils/voiceConstants";

export function useVoiceAssistant() {
  const [status, setStatus] = useState("disconnected");
  const [error, setError] = useState(null);
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);

  const sessionRef = useRef(null);
  const inputContextRef = useRef(null);
  const outputContextRef = useRef(null);
  const processorRef = useRef(null);
  const sourcesRef = useRef(new Set());
  const nextStartTimeRef = useRef(0);

  const leadDataRef = useRef(null);
  const webhookSentRef = useRef(false);
  const isSessionActiveRef = useRef(false);

  const pauseMic = () => {
    if (processorRef.current) {
      processorRef.current.disconnect();
    }
  };

  const resumeMic = () => {
    if (
      processorRef.current &&
      inputContextRef.current &&
      inputContextRef.current.destination
    ) {
      processorRef.current.connect(inputContextRef.current.destination);
    }
  };

  const connect = useCallback(async () => {
    if (status !== "disconnected") return;

    setStatus("connecting");
    setError(null);
    webhookSentRef.current = false;

    try {
      const ai = new GoogleGenAI({
        apiKey: import.meta.env.VITE_GEMINI_API_KEY,
      });

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const inputCtx = new AudioContext({ sampleRate: 16000 });
      const outputCtx = new AudioContext({ sampleRate: 24000 });

      inputContextRef.current = inputCtx;
      outputContextRef.current = outputCtx;

      const outputGain = outputCtx.createGain();
      outputGain.connect(outputCtx.destination);

      const session = await ai.live.connect({
        model: "gemini-2.5-flash-native-audio-preview-12-2025",
        config: {
          responseModalities: ["AUDIO"],
          systemInstruction: SYSTEM_INSTRUCTION,
          tools: TOOLS,
          toolConfig: {
            functionCallingConfig: {
              mode: "AUTO",
            },
          },
        },
        callbacks: {
          onopen: () => {
            isSessionActiveRef.current = true;
            setStatus("connected");
          },

          onmessage: async (msg) => {
            if (!isSessionActiveRef.current) return;

            // ======================
            // AUDIO HANDLING
            // ======================

            const base64Audio =
              msg.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;

            if (base64Audio) {
              setIsAiSpeaking(true);

              const ctx = outputContextRef.current;
              if (!ctx) return;

              const audioBuffer = await decodeAudioData(
                base64ToUint8Array(base64Audio),
                ctx,
                24000,
              );

              const sourceNode = ctx.createBufferSource();
              sourceNode.buffer = audioBuffer;
              sourceNode.connect(ctx.destination);

              sourceNode.onended = () => {
                sourcesRef.current.delete(sourceNode);
                if (sourcesRef.current.size === 0) {
                  setIsAiSpeaking(false);
                }
              };

              nextStartTimeRef.current = Math.max(
                nextStartTimeRef.current,
                ctx.currentTime,
              );

              sourceNode.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;

              sourcesRef.current.add(sourceNode);
            }

            // ======================
            // TOOL CALL HANDLING
            // ======================

            if (msg.toolCall?.functionCalls?.length) {
              pauseMic(); // 🔥 prevent streaming during tool call

              for (const fc of msg.toolCall.functionCalls) {
                let result = { error: "Unknown tool" };

                try {
                  if (fc.name === "searchProperties") {
                    const { bedrooms, maxPrice } = fc.args;

                    const response = await fetch(
                      `${GOOGLE_SCRIPT_URL}?bedrooms=${bedrooms}&maxPrice=${maxPrice}`,
                    );

                    if (!response.ok) throw new Error("Apps Script error");

                    result = await response.json();
                  }

                  if (fc.name === "submitLead") {
                    leadDataRef.current = fc.args;

                    const response = await fetch(WEBHOOK_URL, {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(fc.args),
                    });

                    if (!response.ok) throw new Error("Webhook error");

                    result = await response.json();
                    webhookSentRef.current = true;
                  }
                } catch (err) {
                  result = { error: err.message };
                }

                if (!isSessionActiveRef.current) return;

                await session.sendToolResponse({
                  functionResponses: [
                    {
                      id: fc.id,
                      name: fc.name,
                      response: result,
                    },
                  ],
                });
              }

              resumeMic(); // 🔥 resume mic after tool completes
            }
          },

          onerror: () => {
            isSessionActiveRef.current = false;
            setStatus("error");
          },

          onclose: () => {
            isSessionActiveRef.current = false;
            setStatus("disconnected");
          },
        },
      });

      sessionRef.current = session;

      const source = inputCtx.createMediaStreamSource(stream);
      const processor = inputCtx.createScriptProcessor(4096, 1, 1);
      processorRef.current = processor;

      processor.onaudioprocess = (e) => {
        if (!isSessionActiveRef.current) return;

        const inputData = e.inputBuffer.getChannelData(0);
        const pcmBlob = createPcmBlob(inputData);

        try {
          session.sendRealtimeInput({ media: pcmBlob });
        } catch (err) {
          console.error("Realtime input error:", err);
        }
      };

      source.connect(processor);
      processor.connect(inputCtx.destination);
    } catch (err) {
      setError("Failed to connect");
      setStatus("error");
    }
  }, [status]);

  const disconnect = useCallback(() => {
    isSessionActiveRef.current = false;

    if (sessionRef.current?.close) {
      sessionRef.current.close();
    }

    inputContextRef.current?.close();
    outputContextRef.current?.close();

    sourcesRef.current.forEach((s) => s.stop());
    sourcesRef.current.clear();

    nextStartTimeRef.current = 0;

    setStatus("disconnected");
    setIsAiSpeaking(false);
  }, []);

  return {
    status,
    error,
    isAiSpeaking,
    connect,
    disconnect,
  };
}
