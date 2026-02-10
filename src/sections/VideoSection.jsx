import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const landscapeVideos = [
  "/AIVideos/Landscape/Video1L.mp4",
  "/AIVideos/Landscape/Video2L.mp4",
  "/AIVideos/Landscape/Video3L.mp4",
  "/AIVideos/Landscape/Video7L.mp4",
  "/AIVideos/Landscape/Video8L.mp4",
  "/AIVideos/Landscape/Video9L.mp4",
  "/AIVideos/Landscape/Video10L.mp4",
  "/AIVideos/Landscape/Video11L.mp4",
  "/AIVideos/Landscape/Video15L.mp4",
  "/AIVideos/Landscape/Video16L.mp4",
  "/AIVideos/Landscape/Video17L.mp4",
  "/AIVideos/Landscape/Video18L.mp4",
  "/AIVideos/Landscape/Video19L.mp4",
  "/AIVideos/Landscape/Video20L.mp4",
  "/AIVideos/Landscape/Video21L.mp4",
];

export default function VideoSection() {
  const videoRefs = useRef([]);
  const [activeSrc, setActiveSrc] = useState(null);

  const openVideo = (src, index) => {
    setActiveSrc(src);
    videoRefs.current.forEach((v, i) => {
      if (v) v.muted = i !== index;
    });
  };

  const closeVideo = () => {
    setActiveSrc(null);
    videoRefs.current.forEach((v) => v && (v.muted = true));
  };

  return (
    <section className="video-section">
      {/* INTRO */}
      <div className="video-intro">
        <h2>See What’s Possible With Modern Property Presentation</h2>
        <p>
          These examples show how listings can be presented to create stronger
          first impressions, hold attention longer, and help buyers imagine
          themselves in the space — before they ever book a visit.
        </p>
      </div>

      {/* GRID */}
      <div className={`video-grid ${activeSrc ? "blurred" : ""}`}>
        {landscapeVideos.map((src, index) => (
          <div
            key={src}
            className="video-card landscape"
            onClick={() => openVideo(src, index)}
          >
            <video
              ref={(el) => {
                if (el) {
                  videoRefs.current[index] = el;
                  el.muted = true;
                }
              }}
              src={src}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            />
          </div>
        ))}
      </div>

      {/* POPUP */}
      <AnimatePresence>
        {activeSrc && (
          <motion.div
            className="video-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeVideo}
          >
            <motion.video
              src={activeSrc}
              autoPlay
              loop
              muted={false}
              controls
              playsInline
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
