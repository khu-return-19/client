import Header from "components/Header/Header";
import MainSectionLayout from "./main/layouts/MainSectionLayout";

function LandingPage() {
  return (
    // 배경 일단 검정으로 설정, 영역별 그라데이션 설정 나중에  
    <div className="bg-black">
      <Header theme="dark" />
      <MainSectionLayout />
    </div>
  );
}

export default LandingPage;
