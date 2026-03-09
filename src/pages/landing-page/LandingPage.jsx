import Header from "components/Header/Header";
import MainSectionLayout from "./1-main/layouts/MainSectionLayout";
import Landing2Layout from "./2-video/layouts/Landing2Layout";
import Matrix from "./3-matrix/Matrix";
import Improve from "./4-improve/Improve";
import Review from "./5-review/Review";

function LandingPage() {
  return (
    // 배경 일단 검정으로 설정, 영역별 그라데이션 설정 나중에
    <div className="bg-black">
      <Header theme="dark" />
      <MainSectionLayout />
      <Landing2Layout />
      <Matrix />
      <Improve />
      <Review />
    </div>
  );
}

export default LandingPage;
