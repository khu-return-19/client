import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TEXTS = [
  "AI 역량분석을 통한\n진로설계의 첫 단계",
  "지원 직무에 맞춘\n자기소개서 역량평가",
  "합격 가능성 향상을 위한\n자기소개서 진단",
];

const textStyle = {
  textShadow: "0px 4px 4px rgba(0,0,0,0.25)",
};

const easeInOutBack = [0.68, -0.55, 0.265, 1.55];

function SlideText({ text, direction }) {
  const enterY = direction === "up" ? 32 : -32;
  const exitY = direction === "up" ? -32 : 32;

  return (
    <motion.p
      className={[
        "absolute w-full whitespace-pre-line text-center",
        "font-bold leading-[120%] tracking-[0px] md:tracking-[2.56px] text-[clamp(28px,calc(3.06vw+16.5px),40px)] md:text-[clamp(58px,calc(1.25vw+46px),64px)]",
        "bg-[linear-gradient(91deg,#FFFCE5_26.49%,#FFF_47.51%,#D6D2B0_73.51%)]",
        "bg-clip-text text-transparent",
      ].join(" ")}
      style={textStyle}
      initial={{ opacity: 0, y: enterY }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: exitY }}
      transition={{ duration: 0.8, ease: easeInOutBack }}
    >
      {text}
    </motion.p>
  );
}

function HeroTextCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState("up");

  useEffect(() => {
    const cycle = setInterval(() => {
      setIndex(prev => {
        const next = (prev + 1) % TEXTS.length;
        setDirection(next === 0 ? "down" : "up");
        return next;
      });
    }, 1400 + 600);

    return () => clearInterval(cycle);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <AnimatePresence mode="wait">
        <SlideText key={index} text={TEXTS[index]} direction={direction} />
      </AnimatePresence>
    </div>
  );
}

export default HeroTextCarousel;
