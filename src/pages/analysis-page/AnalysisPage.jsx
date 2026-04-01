import { useState } from "react";
import Header from "components/Header/Header";
import SectionCard from "./components/SectionCard";
import AnalysisNavBar from "./components/AnalysisNavBar";

const SECTION_IDS = ["분석 요약", "역량 진단", "개선 전략", "적용 · 재평가"];

const labelStyle = "text-[16px] font-medium leading-[150%] text-[#717171] font-['Pretendard'] shrink-0";

function Row({ label, children }) {
  return (
    <div className="flex gap-[24px]">
      <span className={labelStyle}>{label}</span>
      <span className="text-[16px] font-normal leading-[150%] text-[#111] font-['Pretendard']">{children}</span>
    </div>
  );
}

function AnalysisPage() {
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
            <button className="w-[160px] h-[44px] bg-[#09469F] text-white text-[16px] font-medium rounded-[6px]">
              메일로 전송
            </button>
          </div>

          {/* 네비게이션 바 */}
          <AnalysisNavBar active={activeNav} onChange={handleNavChange} />

          {/* 각 컨테이너 간 설정 */}
          <div className="py-[32px] flex flex-col gap-[32px]">

            {/* 경쟁력/평가 전체 */}
            <div className="grid grid-cols-2 gap-[40px]">
              <SectionCard title="경쟁력" />
              <SectionCard title="평가 전체">
                <div className="flex flex-col gap-[15px]">
                  <Row label="지원 회사" />
                  <Row label="직무" />
                  <Row label="직무 특성 요약" />
                </div>
              </SectionCard>
            </div>
        
            <div className="border-t border-[#AEB4BC]" />

            {/* 3D 평가 결과 */}
            <SectionCard title="3D 평가 결과">
              <div className="grid grid-cols-2 gap-[40px]">
                <div />
                <div className="flex flex-col">
                  {/* 세로열 */}
                  <div className="grid grid-cols-[0.5fr_auto_60px] mb-[15px]">
                    <span />
                    <div className="flex items-center gap-[60px]">
                      <div className="flex items-center gap-[6px]">
                        <div className="w-[15px] h-[15px] rounded-[2px] shrink-0 bg-[rgba(40,118,241,0.5)] border border-[#024FCB]" />
                        <span className="text-[14px] font-medium text-[#717171] font-['Pretendard']">내 점수</span>
                      </div>
                      <div className="flex items-center gap-[6px]">
                        <div className="w-[15px] h-[15px] rounded-[2px] shrink-0 bg-[rgba(193,217,255,0.3)] border border-[#AEB4BC]" />
                        <span className="text-[14px] font-medium text-[#717171] font-['Pretendard']">합격자 점수</span>
                      </div>
                    </div>
                    <span />
                  </div>
                  {/* 가로행 */}
                  {[
                    { label: "X 학습수준", my: null, pass: null, mark: false },
                    { label: "Y 직무적합수준", my: null, pass: null, mark: false },
                    { label: "Z 수행역량수준", my: null, pass: null, mark: false },
                    { label: "평균", my: null, pass: null, mark: true },
                  ].map((row) => (
                    <div key={row.label} className="grid grid-cols-[0.5fr_1fr_1fr_60px] py-[12px]">
                      <span className={labelStyle}>{row.label}</span>
                      <span className="text-[16px] font-bold text-[#111] font-['Pretendard'] text-center">{row.my}</span>
                      <span className="text-[16px] font-bold text-[#111] font-['Pretendard'] text-center">{row.pass}</span>
                      {row.mark
                        ? <span className="text-[12px] text-[#717171] font-['Pretendard'] self-center">*5.0만점</span>
                        : <span />
                      }
                    </div>
                  ))}
                </div>
              </div>
            </SectionCard>

            <div className="border-t border-[#AEB4BC]" />

            {/* 총평 */}
            <SectionCard title="총평" />

            {/* 다음 버튼 */}
            <div className="flex justify-center pb-[60px]">
              <button className="w-[160px] h-[44px] bg-white rounded-[6px] text-[16px] font-medium text-[#717171] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.12)]">
                다음
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default AnalysisPage;
