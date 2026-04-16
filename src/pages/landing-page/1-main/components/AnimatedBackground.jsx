import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function AnimatedBackground() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setStage(1), 1);
    const timer2 = setTimeout(() => setStage(2), 1002);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden" style={{ backgroundColor: "#000610" }}>
      {/* Left gradient cone */}
      <motion.div
        className="absolute top-0 left-[-4%] w-[42%] h-[130%] mix-blend-color-dodge"
        style={{
          background: "conic-gradient(from 90deg at 100% 50%, #f8f8f8, #000 0.01%, #0b0b0b 1.875%, #151515 3.75%, #2b2b2b 7.5%, #404040 11.25%, #555 15%, #808080 22.5%, #aaa 30%, #d1d1d1 65%, #f8f8f8 100%)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: stage === 0 ? 0 : stage === 1 ? 0.5 : 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />

      {/* Right gradient cone (flipped) */}
      <motion.div
        className="absolute top-0 left-[37%] w-[42%] h-[130%] mix-blend-color-dodge"
        style={{
          background: "conic-gradient(from 270deg at 0% 50%, #f8f8f8, #000 0.01%, #0b0b0b 1.875%, #151515 3.75%, #2b2b2b 7.5%, #404040 11.25%, #555 15%, #808080 22.5%, #aaa 30%, #d1d1d1 65%, #f8f8f8 100%)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: stage === 0 ? 0 : stage === 1 ? 0.5 : 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />

      {/* Center gradient overlay */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[83%] h-[83%]"
        style={{
          background: "linear-gradient(to bottom, #08081b 0%, rgba(8,8,27,0) 77.766%, #08081b 100%)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: stage === 0 ? 0 : stage === 1 ? 0.7 : 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />

      {/* Bottom glow */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[62%] h-[28%]"
        style={{
          background: "radial-gradient(ellipse at center, rgba(40, 118, 241, 0.15) 0%, transparent 70%)",
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: stage === 0 ? 0 : stage === 1 ? 0.6 : 1,
          scale: stage === 0 ? 0.8 : stage === 1 ? 0.95 : 1,
        }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </div>
  );
}
