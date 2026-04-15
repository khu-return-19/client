import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TEXTS = [
  "AI 역량분석을 통한\n진로설계의 첫 단계",
  "지원 직무에 맞춘\n자기소개서 역량평가",
  "합격 가능성 향상을 위한\n자기소개서 진단",
];

function SlideText({ text }) {
  return (
    <motion.p
      className={[
        "absolute w-full whitespace-pre-line text-center",
        "font-bold leading-[120%] tracking-[0px] md:tracking-[2.56px] text-[clamp(28px,calc(3.06vw+16.5px),40px)] md:text-[calc(1.25vw+46px)]",
        "bg-[linear-gradient(91deg,#FFFCE5_26.49%,#FFF_47.51%,#D6D2B0_73.51%)]",
        "bg-clip-text text-transparent",
      ].join(" ")}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "linear" }}
    >
      {text}
    </motion.p>
  );
}

function HeroTextCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const cycle = setInterval(() => {
      setIndex((prev) => (prev + 1) % TEXTS.length);
    }, 1500 + 500);

    return () => clearInterval(cycle);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <AnimatePresence mode="wait">
        <SlideText key={index} text={TEXTS[index]} />
      </AnimatePresence>
    </div>
  );
}

export default HeroTextCarousel;
