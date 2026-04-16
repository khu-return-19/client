import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import bg from "assets/imgs/단계3.svg";

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
    <div className="absolute inset-0 w-full h-full bg-[#000610] overflow-hidden">
      <motion.img
        src={bg}
        alt=""
        className="absolute w-full left-0"
        style={{ bottom: "-40%" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: stage === 0 ? 0 : stage === 1 ? 0.5 : 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />
    </div>
  );
}
