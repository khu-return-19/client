import { useState } from "react";
import Header from "components/Header/Header";
import AnalysisNavBar from "./components/AnalysisNavBar";

// 탭 컴포넌트
import AnalsisSummary from "./components/AnalsisSummary";
import AnalysisDiagnosis from "./components/AnalysisDiagnosis";
import ImproveStrategy from "./components/ImproveStrategy";
import Apply from "./components/Apply";

function AnalysisPage() {
  const SECTION_IDS = ["분석 요약", "역량 진단", "개선 전략", "적용 · 재평가"];
  const SECTION_COMPONENTS = {
    "분석 요약": AnalsisSummary,
    "역량 진단": AnalysisDiagnosis,
    "개선 전략": ImproveStrategy,
    "적용 · 재평가": Apply,
  };

  const [activeNav, setActiveNav] = useState(SECTION_IDS[0]);

  const handleNavChange = (item) => setActiveNav(item);

  return (
    <div className="pt-[clamp(52px,calc(2.5vw+28px),64px)] min-h-screen bg-[#F9FAFB]">
      <Header />
      <div className="px-[20px] min-[894px]:px-[40px]">
        <div className="w-full max-w-[1200px] mx-auto">
          <div className="flex items-center justify-between mt-[80px]">
            <h2 className="text-[24px] font-medium leading-[120%] text-[#111] font-['Pretendard']">
              자기소개서 역량 평가 리포트
            </h2>
            <button className="w-[160px] h-[44px] bg-[#09469F] text-white text-[16px] font-medium rounded-[6px] hover:bg-[#0D326F] active:bg-[#0D326F] transition-colors">
              메일로 전송
            </button>
          </div>
          <div className="bg-white px-[15px]">
            {/* 탭 바 */}
            <AnalysisNavBar active={activeNav} onChange={handleNavChange} />
            {/* 섹션 내용 */}
            <div className="mt-[72px] px-[40px]">
              {SECTION_COMPONENTS[activeNav]()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalysisPage;
