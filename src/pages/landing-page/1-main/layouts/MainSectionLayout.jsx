import HeroContent from "../components/HeroContent";

function MainSectionLayout() {
  return (
    <section className="w-full h-full relative overflow-hidden bg-[#00010d]">
      <div className="relative w-full h-full flex items-center justify-center z-20">
        <HeroContent />
      </div>
    </section>
  );
}

export default MainSectionLayout;
