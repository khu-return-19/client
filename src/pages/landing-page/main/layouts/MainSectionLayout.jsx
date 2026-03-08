import HeroContent from "../components/HeroContent";

function MainSectionLayout() {
  return (
    <section
      className="flex items-center justify-center"
      style={{ width: "100%", backgroundColor: "#000000", minHeight: "calc(100vh - 60px)" }}
    >
      <HeroContent />
    </section>
  );
}

export default MainSectionLayout;
