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
    <div className="h-screen overflow-hidden">
      <Header theme={activeIndex <= 1 ? "dark" : "light"} />

      <div className="hidden min-[894px]:block fixed right-5 top-1/2 -translate-y-1/2 z-20">
        <SectionProgressBar index={activeIndex} total={5} />
      </div>

      <div className="overflow-x-hidden snap-y snap-mandatory overflow-y-scroll scrollbar-hide h-screen">
        <section ref={mainRef} className="h-full snap-start overflow-hidden">
          <MainSectionLayout />
        </section>

        <section ref={videoRef} className="h-full snap-start">
          <Landing2Layout />
        </section>

        <section ref={matrixRef} className="h-screen snap-start">
          <Matrix />
        </section>

        <section ref={improveRef} className="h-screen snap-start">
          <Improve />
        </section>

        <section ref={reviewRef} className="h-screen snap-start">
          <Review />
        </section>
      </div>
    </div>
  );
}

export default LandingPage;
