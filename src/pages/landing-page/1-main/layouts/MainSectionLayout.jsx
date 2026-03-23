import HeroContent from "../components/HeroContent";

function MainSectionLayout() {
  return (
    <section className="w-full h-full relative bg-[#00010d] overflow-hidden">
      <div className="absolute bottom-[-31.25vw] left-[-40vw] w-[61.5vw] h-[51.1vw] rounded-full bg-[#C1D9FF]" style={{ filter: "blur(13.9vw)" }} />
      <div className="absolute bottom-[-5vw] left-[-28vw] w-[33.8vw] h-[31.1vw] rounded-full" style={{ background: "radial-gradient(circle, #002983, #266CDA)", filter: "blur(6.9vw)" }} />
      <div className="absolute top-[-20.25vw] right-[-20vw] w-[96.6vw] h-[20.97vw] rounded-full bg-[#0351CC]" style={{ filter: "blur(10.4vw)" }} />
      <div className="absolute top-[-25vw] right-[0vw] w-[46.6vw] h-[28.7vw] rounded-full" style={{ background: "radial-gradient(circle, #002983, #C1D9FF)", filter: "blur(5.6vw)" }} />
      <div className="absolute bottom-[-8.75vw] right-[-20vw] w-[45.5vw] h-[15.8vw] rounded-full bg-[#428BFF]" style={{ filter: "blur(10.4vw)" }} />

      <div className="relative w-full h-full flex items-center justify-center">
        <HeroContent />
      </div>
    </section>
  );
}

export default MainSectionLayout;
