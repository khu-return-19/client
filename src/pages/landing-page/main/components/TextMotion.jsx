import { useState, useEffect } from "react";

const TEXTS = [
  "AI 역량분석을 통한\n진로설계의 첫 단계",
  "지원 직무에 맞춘\n자기소개서 역량평가",
  "합격 가능성 향상을 위한\n자기소개서 진단",
];

const textStyle = {
  textShadow: "0px 4px 4px rgba(0,0,0,0.25)",
};

function SlideText({ text, direction }) {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const initial = direction === "up" ? "opacity-0 translate-y-8" : "opacity-0 -translate-y-8";

  return (
    <p
      className={[
        "absolute w-full whitespace-pre-line text-center",
        "text-[64px] font-bold leading-[120%] tracking-[2.56px]",
        "bg-[linear-gradient(91deg,#FFFCE5_26.49%,#FFF_47.51%,#D6D2B0_73.51%)]",
        "bg-clip-text text-transparent",
        "transition-[opacity,transform] duration-[800ms] [transition-timing-function:cubic-bezier(0.68,-0.6,0.32,1.6)]",
        entered ? "opacity-100 translate-y-0" : initial,
      ].join(" ")}
      style={textStyle}
    >
      {text}
    </p>
  );
}

function HeroTextCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState("up");

  useEffect(() => {
    const cycle = setInterval(() => {
      setIndex(prev => {
        const next = (prev + 1) % TEXTS.length;
        // 효과 모르겠음... 나중에 다시 구현 예정
        setDirection(next === 0 ? "down" : "up");
        return next;
      });
    }, 1000 + 800);

    return () => clearInterval(cycle);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <SlideText key={index} text={TEXTS[index]} direction={direction} />
    </div>
  );
}

export default HeroTextCarousel;
