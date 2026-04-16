import { motion } from "framer-motion";
import bg from "assets/imgs/landing.png";

export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 w-full h-full bg-[#000610] overflow-hidden">
      <motion.img
        src={bg}
        alt=""
        className="absolute left-0 w-full"
        style={{ top: "calc(100vh - 43vw)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 4, ease: "easeInOut" }}
      />
    </div>
  );
}
