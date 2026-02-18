import { useRef, useState, useEffect } from "react";

export function useRealtimeVoice() {
  const pcRef = useRef(null);
  const dcRef = useRef(null);

  const transcriptRef = useRef("");
  const tokensRef = useRef({
    input: 0,
    output: 0,
    total: 0,
  });

  const startTimeRef = useRef(null);
  const webhookSentRef = useRef(false);

  const [status, setStatus] = useState("disconnected");

  // ============================
  // SEND WEBHOOK
  // ============================

  const sendWebhook = async (call_status = "completed") => {
    if (webhookSentRef.current) return;

    webhookSentRef.current = true;

    try {
      const duration = Math.floor((Date.now() - startTimeRef.current) / 1000);

      console.log("Sending webhook...");

      await fetch("http://localhost:3001/summary", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          transcript: transcriptRef.current,

          tokens: tokensRef.current,

          duration,

          call_status,
        }),
      });

      console.log("Webhook sent");
    } catch (e) {
      console.error("Webhook failed", e);
    }
  };

  // ============================
  // CONNECT
  // ============================

  const connect = async () => {
    try {
      webhookSentRef.current = false;

      transcriptRef.current = "";

      tokensRef.current = { input: 0, output: 0, total: 0 };

      startTimeRef.current = Date.now();

      setStatus("connecting");

      // GET SESSION FROM BACKEND (prompt comes from server)
      const tokenResponse = await fetch("http://localhost:3001/session");

      const session = await tokenResponse.json();

      const pc = new RTCPeerConnection();

      pcRef.current = pc;

      // listen for disconnect
      pc.onconnectionstatechange = () => {
        if (
          pc.connectionState === "disconnected" ||
          pc.connectionState === "failed" ||
          pc.connectionState === "closed"
        ) {
          sendWebhook(pc.connectionState);
        }
      };

      // play assistant audio
      const audio = new Audio();

      audio.autoplay = true;

      pc.ontrack = (e) => {
        audio.srcObject = e.streams[0];
      };

      // capture mic
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      stream.getTracks().forEach((track) => pc.addTrack(track, stream));

      // data channel
      const dc = pc.createDataChannel("oai-events");

      dcRef.current = dc;

      dc.onopen = () => {
        console.log("Data channel ready");

        // ONLY trigger assistant response
        dc.send(
          JSON.stringify({
            type: "response.create",
            response: {
              modalities: ["audio", "text"],
            },
          }),
        );
      };

      dc.onmessage = (event) => {
        const msg = JSON.parse(event.data);

        // transcript capture
        if (msg.type === "response.audio_transcript.delta") {
          transcriptRef.current += msg.delta;
        }

        // usage capture (may not always exist)
        if (msg.type === "response.completed") {
          const usage = msg.response?.usage;

          if (usage) {
            tokensRef.current = {
              input: usage.input_tokens || 0,
              output: usage.output_tokens || 0,
              total: usage.total_tokens || 0,
            };

            console.log("Realtime tokens:", tokensRef.current);
          }
        }
      };

      // WebRTC handshake
      const offer = await pc.createOffer();

      await pc.setLocalDescription(offer);

      const sdpResponse = await fetch(
        "https://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview",
        {
          method: "POST",

          body: offer.sdp,

          headers: {
            Authorization: `Bearer ${session.client_secret.value}`,
            "Content-Type": "application/sdp",
          },
        },
      );

      await pc.setRemoteDescription({
        type: "answer",
        sdp: await sdpResponse.text(),
      });

      setStatus("connected");
    } catch (e) {
      console.error(e);

      sendWebhook("error");

      setStatus("disconnected");
    }
  };

  // ============================
  // DISCONNECT
  // ============================

  const disconnect = async () => {
    pcRef.current?.close();

    await sendWebhook("user_disconnected");

    setStatus("disconnected");
  };

  // ============================
  // TAB CLOSE SAFETY
  // ============================

  useEffect(() => {
    const handleUnload = () => sendWebhook("tab_closed");

    window.addEventListener("beforeunload", handleUnload);

    return () => window.removeEventListener("beforeunload", handleUnload);
  }, []);

  return {
    status,
    connect,
    disconnect,
  };
}
