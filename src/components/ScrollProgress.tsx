import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[60] pointer-events-none"
      style={{
        scaleX,
        background: "linear-gradient(90deg, #bd93f9, #ff79c6, #8be9fd)",
        boxShadow: "0 0 12px rgba(189,147,249,0.6)",
      }}
    />
  );
}
