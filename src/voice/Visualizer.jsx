import { useEffect, useRef } from "react";

export default function Visualizer({ isActive }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationId;
    let time = 0;

    const render = () => {
      time += 0.04;

      const width = (canvas.width = canvas.offsetWidth);
      const height = (canvas.height = canvas.offsetHeight);
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);

      const lines = 5;
      const baseAmplitude = isActive ? 28 : 6;

      for (let i = 0; i < lines; i++) {
        ctx.beginPath();
        ctx.lineWidth = 2;

        // Premium green gradient glow
        const opacity = isActive ? 0.35 + i * 0.12 : 0.15;
        ctx.strokeStyle = `rgba(120, 255, 180, ${opacity})`;

        for (let x = 0; x < width; x += 5) {
          const frequency = 0.008 + i * 0.003;
          const wave =
            Math.sin(x * frequency + time + i * 0.6) *
            baseAmplitude *
            Math.sin(time * 0.7 + i);

          const falloff = 1 - Math.abs(x - width / 2) / (width / 2);

          const y = centerY + wave * falloff;

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
