import { useState, useEffect } from "react";
import Header from "components/Header/Header";
import AnalysisNavBar from "./components/AnalysisNavBar";
import { useDownloadPDF } from "hooks/useDownloadPDF";

// 탭 컴포넌트
import AnalsisSummary from "./components/AnalsisSummary";
import AnalysisDiagnosis from "./components/AnalysisDiagnosis";
import ImproveStrategy from "./components/ImproveStrategy";
import Apply from "./components/Apply";

export const ANALYSIS_REPORT_KEY = "analysisReport";

function AnalysisPage() {
  const SECTION_IDS = ["분석 요약", "역량 진단", "개선 전략", "적용 · 재평가"];
  const SECTION_COMPONENTS = {
    "분석 요약": AnalsisSummary,
    "역량 진단": AnalysisDiagnosis,
    "개선 전략": ImproveStrategy,
    "적용 · 재평가": Apply,
  };

  const [activeNav, setActiveNav] = useState(SECTION_IDS[0]);
  const { containerRef, isGenerating, download } = useDownloadPDF();

  useEffect(() => {
    sessionStorage.setItem(ANALYSIS_REPORT_KEY, "true");
  }, []);

  const handleNavChange = (item) => setActiveNav(item);

  const handleNext = () => {
    const idx = SECTION_IDS.indexOf(activeNav);
    if (idx < SECTION_IDS.length - 1) {
      setActiveNav(SECTION_IDS[idx + 1]);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    const idx = SECTION_IDS.indexOf(activeNav);
    if (idx > 0) {
      setActiveNav(SECTION_IDS[idx - 1]);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="pt-[clamp(52px,calc(2.5vw+28px),64px)] min-h-screen bg-[#F9FAFB]">
      <Header />
      <div className="px-[20px] min-[894px]:px-[40px]">
        <div className="w-full max-w-[1200px] mx-auto">
          <div className="flex items-center justify-between mt-[80px]">
            <h2 className="text-[24px] font-medium leading-[120%] text-[#111] font-['Pretendard']">
              자기소개서 역량 평가 리포트
            </h2>
            <button
              onClick={download}
              disabled={isGenerating}
              className="w-[160px] h-[44px] bg-[#09469F] text-white text-[16px] font-medium rounded-[6px] hover:bg-[#0D326F] active:bg-[#0D326F] transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  생성 중...
                </>
              ) : (
                "리포트 다운로드"
              )}
            </button>
          </div>
          <div className="bg-white px-[15px]">
            {/* 탭 바 */}
            <AnalysisNavBar active={activeNav} onChange={handleNavChange} />
            {/* 섹션 내용 */}
            <div className="mt-[72px] px-[40px]">
              {(() => {
                const C = SECTION_COMPONENTS[activeNav];
                return <C onNext={handleNext} onPrev={handlePrev} />;
              })()}
            </div>
          </div>
        </div>
      </div>

      <div
        ref={containerRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-9999px",
          top: 0,
          width: "910px",
        }}
      >
        {SECTION_IDS.map((id) => {
          const C = SECTION_COMPONENTS[id];
          return (
            <div key={id} data-pdf-section className="bg-white p-[40px]">
              <C />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AnalysisPage;
