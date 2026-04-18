import { motion } from "framer-motion";
import bg from "assets/imgs/landing.png";
import bgMobile from "assets/imgs/perti_mobile.png";

export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 w-full h-full bg-[#000610] overflow-hidden">
      {/* 데스크탑 배경 */}
      <motion.img
        src={bg}
        alt=""
        className="absolute left-0 w-full hidden min-[768px]:block mobile-bg-pos"
        style={{ top: "calc(100vh - 43vw)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 4, ease: "easeInOut" }}
      />
      {/* 모바일 배경 */}
      <motion.img
        src={bgMobile}
        alt=""
        className="absolute inset-0 w-full h-full object-cover block min-[768px]:hidden"
        style={{ top: 0, objectPosition: "center 70%" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 4, ease: "easeInOut" }}
      />
    </div>
  );
}
