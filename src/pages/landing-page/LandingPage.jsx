import { useMemo } from "react";
import { useInView } from "react-intersection-observer";

// components
import Header from "components/Header/Header";
import MainSectionLayout from "./1-main/layouts/MainSectionLayout";
import Landing2Layout from "./2-video/layouts/Landing2Layout";
import Matrix from "./3-matrix/Matrix";
import Improve from "./4-improve/Improve";
import Review from "./5-review/Review";
import SectionProgressBar from "./components/SectionProgressBar";

function LandingPage() {
  const [mainRef, mainInView] = useInView({ threshold: 0.4 });
  const [videoRef, videoInView] = useInView({ threshold: 0.4 });
  const [matrixRef, matrixInView] = useInView({ threshold: 0.4 });
  const [improveRef, improveInView] = useInView({ threshold: 0.4 });
  const [reviewRef, reviewInView] = useInView({ threshold: 0.4 });

  const activeIndex = useMemo(() => {
    const states = [
      mainInView,
      videoInView,
      matrixInView,
      improveInView,
      reviewInView,
    ];

    return states.reduce((lastVisibleIndex, isVisible, index) => {
      return isVisible ? index : lastVisibleIndex;
    }, 0);
  }, [mainInView, videoInView, matrixInView, improveInView, reviewInView]);

  return (
    <div className="h-[100dvh] overflow-hidden">
      <Header theme={activeIndex <= 1 ? "dark" : "light"} />

      <div className="opacity-0 lg:opacity-100 fixed right-5 top-1/2 -translate-y-1/2 z-50">
        <SectionProgressBar
          index={activeIndex}
          total={5}
          onIndexClick={(i) => {
            const ids = ["section-main", "section-video", "section-matrix", "section-improve", "section-review"];
            document.getElementById(ids[i])?.scrollIntoView({ behavior: "smooth" });
          }}
        />
      </div>

      <div className="overflow-x-hidden lg:snap-y lg:snap-mandatory overflow-y-scroll scrollbar-hide h-[100dvh]">
        <section
          id="section-main"
          ref={mainRef}
          className="h-[100dvh] snap-start overflow-hidden"
        >
          <MainSectionLayout />
        </section>

        <section id="section-video" ref={videoRef} className="h-[100dvh] snap-start">
          <Landing2Layout />
        </section>

        <section id="section-matrix" ref={matrixRef} className="snap-start">
          <Matrix />
        </section>

        <section id="section-improve" ref={improveRef} className="snap-start">
          <Improve />
        </section>

        <section id="section-review" ref={reviewRef} className="snap-start">
          <Review />
        </section>
      </div>
    </div>
  );
}

export default LandingPage;
