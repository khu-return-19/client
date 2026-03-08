import Header from "components/Header/Header";
import MainSectionLayout from "./1-main/layouts/MainSectionLayout";
import Landing2Layout from "./2-video/layouts/Landing2Layout";
import Landing3Layout from "./3-matrix/layouts/Landing3Layout";
import Landing4Layout from "./4-improve/layouts/Landing4Layout";
import Landing5Layout from "./5-review/layouts/Landing5Layout";

function LandingPage() {
  return (
    // 배경 일단 검정으로 설정, 영역별 그라데이션 설정 나중에
    <div className="bg-black">
      <Header theme="dark" />
      <MainSectionLayout />
      <Landing2Layout />
      <Landing3Layout />
      <Landing4Layout />
      <Landing5Layout />
    </div>
  );
}

export default LandingPage;
