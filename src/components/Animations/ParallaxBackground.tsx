"use client";

import { motion, useScroll, useTransform } from "framer-motion";

const ParallaxBackground = () => {
  // scrollYProgress is relative to the entire page
  const { scrollYProgress } = useScroll(); 

  // Animate vertical position and opacity as the page scrolls
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-[-1]"
      style={{ y, opacity }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-purple-500/10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-purple-500/5" />
      <div className="absolute inset-0 bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
    </motion.div>
  );
};

export default ParallaxBackground;
