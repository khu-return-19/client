import landingVideo from "assets/videos/video_test.mp4";

function Landing2Layout() {
  return (
    <section className="flex items-center justify-center w-screen h-full px-[100px]">
      <video
        src={landingVideo}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      />
    </section>
  );
}

export default Landing2Layout;
