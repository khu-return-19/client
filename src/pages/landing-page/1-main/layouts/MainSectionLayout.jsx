import HeroContent from "../components/HeroContent";

function MainSectionLayout() {
  return (
    <section className="w-full h-[736px]">
      <div className="max-w-[1440px] h-full mx-auto flex items-center justify-center">
        <HeroContent />
      </div>
    </section>
  );
}

export default MainSectionLayout;
