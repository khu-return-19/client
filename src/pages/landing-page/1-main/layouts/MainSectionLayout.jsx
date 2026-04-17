import HeroContent from "../components/HeroContent";
import { AnimatedBackground } from "../components/AnimatedBackground";

function MainSectionLayout() {
  return (
    <section className="w-full h-full relative overflow-hidden bg-[#000610]">
      <AnimatedBackground />
      <div className="relative w-full h-full flex items-center justify-center z-20">
        <HeroContent />
      </div>
    </section>
  );
}

export default MainSectionLayout;
