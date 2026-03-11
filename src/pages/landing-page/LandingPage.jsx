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
    // 배경 일단 검정으로 설정, 영역별 그라데이션 설정 나중에
    <div className="bg-black overflow-x-hidden relative h-screen snap-y snap-mandatory overflow-y-scroll scrollbar-hide">
      <Header theme={activeIndex <= 1 ? "dark" : "light"} />

      <div className="fixed right-5 top-1/2 -translate-y-1/2 z-20">
        <SectionProgressBar index={activeIndex} total={5} />
      </div>

      <section ref={mainRef} className="h-screen snap-start">
        <MainSectionLayout />
      </section>

      <section ref={videoRef} className="h-screen snap-start">
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
  );
}

export default LandingPage;
