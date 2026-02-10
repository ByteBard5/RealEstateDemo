import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import img1 from "../assets/HeroSectionImages/1.png";
import img2 from "../assets/HeroSectionImages/2.png";
import img3 from "../assets/HeroSectionImages/3.png";
import img4 from "../assets/HeroSectionImages/4.png";
import img5 from "../assets/HeroSectionImages/5.png";
import img6 from "../assets/HeroSectionImages/6.png";
import img7 from "../assets/HeroSectionImages/7.png";
import img8 from "../assets/HeroSectionImages/8.png";
import img9 from "../assets/HeroSectionImages/9.png";
import img10 from "../assets/HeroSectionImages/10.png";
import img11 from "../assets/HeroSectionImages/11.png";
import img12 from "../assets/HeroSectionImages/12.png";

const images = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img12,
];

export default function AnimatedHouseSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="house-slider">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt="Luxury Property"
          className="house-image"
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.96 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        />
      </AnimatePresence>
    </div>
  );
}
