// ==========================================================================================
// VIDEO SECTION – LANDSCAPE ONLY
// ==========================================================================================

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

// ==========================================================================================
// CARD ANIMATION VARIANTS
// ==========================================================================================
const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.07, ease: "easeOut" },
  }),
};

const introVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

// ==========================================================================================
// MAIN COMPONENT
// ==========================================================================================
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
      {/* BACKGROUND ORBS */}
      <div className="video-orb video-orb--tl" aria-hidden="true" />
      <div className="video-orb video-orb--br" aria-hidden="true" />

      {/* ==== INTRO ==== */}
      <motion.div
        className="video-intro"
        variants={introVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Eyebrow label */}
        <div className="video-eyebrow">Visual Impact</div>

        <h2 className="video-heading">
          Listings That Command{" "}
          <span className="video-heading__accent">Attention & Offers</span>
        </h2>

        <p className="video-body">
          High-motion property presentations are your highest-leverage listing
          asset — compressing decision cycles, holding buyer attention longer,
          and accelerating deal velocity before a single showing is booked.
        </p>
      </motion.div>

      {/* ==== VIDEO GRID ==== */}
      <div className={`video-grid ${activeSrc ? "blurred" : ""}`}>
        {landscapeVideos.map((src, index) => (
          <motion.div
            key={src}
            className="video-card landscape"
            onClick={() => openVideo(src, index)}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            whileHover={{ y: -5, transition: { duration: 0.25 } }}
          >
            {/* Top gradient line */}
            <div className="video-card__line" aria-hidden="true" />

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

            {/* Hover play hint */}
            <div className="video-card__overlay" aria-hidden="true">
              <div className="video-card__play-icon" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* ==== POPUP / LIGHTBOX ==== */}
      <AnimatePresence>
        {activeSrc && (
          <motion.div
            className="video-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeVideo}
          >
            {/* Close button */}
            <button
              className="video-overlay__close"
              onClick={closeVideo}
              aria-label="Close video"
            >
              ✕
            </button>

            <motion.video
              src={activeSrc}
              autoPlay
              loop
              muted={false}
              controls
              playsInline
              className="video-overlay__player"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ==========================================================================================
// VIDEO SECTION END
// ==========================================================================================
