import landingVideo from "assets/videos/Pertineo_1.mp4";

function Landing2Layout() {
  return (
    <section className="flex items-center justify-center w-screen h-full bg-black pt-[clamp(52px,calc(2.5vw+28px),64px)]">
      <video
        src={landingVideo}
        autoPlay
        loop
        muted
        playsInline
        className="w-full lg:w-[clamp(calc(100vw-144px),calc(75vw+216px),100vw)] h-full object-cover"
      />
    </section>
  );
}

export default Landing2Layout;
