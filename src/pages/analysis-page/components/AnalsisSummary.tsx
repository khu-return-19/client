import SectionCard from "./SectionCard";

export default function AnalsisSummary({ onNext }: { onNext?: () => void }) {
  const labelStyle =
    "text-[14px] min-[894px]:text-[16px] font-medium leading-[150%] text-[#717171] font-['Pretendard'] shrink-0 whitespace-nowrap";

  return (
    <div className="flex flex-col gap-[clamp(32px,3.3vw,48px)]">
      {/* 경쟁력/평가 전제 */}
      <div className="grid grid-cols-2 max-[767px]:grid-cols-1 gap-[clamp(20px,2.8vw,40px)]">
        <SectionCard title="경쟁력">
          <div className="flex flex-col gap-[clamp(20px,2.2vw,32px)]">
            <span className="text-[clamp(28px,2.8vw,40px)] font-normal text-[#2876F1] font-['Pretendard'] leading-[120%]">
              매우 높음
            </span>
            <p className="text-[clamp(14px,1.1vw,16px)] font-normal text-[#111] font-['Pretendard'] leading-[170%]">
              본 분석 결과, 귀하는 신입/주니어 콘텐츠 기획 직무 기준 경쟁력 있는
              중위권 포지션으로 평가됩니다.
            </p>
          </div>
        </SectionCard>
        <SectionCard title="평가 전제">
          <div className="flex flex-col gap-[clamp(10px,1.04vw,15px)]">
            <Row label="지원 회사">네이버</Row>
            <Row label="직무">백엔드 / Tech SW 개발</Row>
            <Row label="직무 특성 요약">
              직무 특성 요약 내용. 최대 3줄까지로 제한하는게 좋을 것 같습니다.
            </Row>
          </div>
        </SectionCard>
      </div>

      <div className="border-t border-[#AEB4BC]" />

      {/* 3D 평가 결과 */}
      <SectionCard title="3D 평가 결과">
        <div className="grid grid-cols-2 max-[767px]:grid-cols-1 gap-[clamp(20px,2.8vw,40px)]">
          <div className="max-[767px]:hidden" />
          <div className="flex flex-col">
            {/* 헤더행 */}
            <div className="grid grid-cols-[clamp(100px,9.7vw,140px)_1fr_1fr_clamp(44px,4.2vw,60px)] mb-[15px]">
              <span />
              <div className="flex items-center justify-center gap-[6px]">
                <div className="w-[clamp(11px,1.04vw,15px)] h-[clamp(11px,1.04vw,15px)] rounded-[2px] shrink-0 bg-[rgba(40,118,241,0.5)] border border-[#024FCB]" />
                <span className="text-[clamp(12px,0.97vw,14px)] font-medium text-[#717171] font-['Pretendard']">내 점수</span>
              </div>
              <div className="flex items-center justify-center gap-[6px]">
                <div className="w-[clamp(11px,1.04vw,15px)] h-[clamp(11px,1.04vw,15px)] rounded-[2px] shrink-0 bg-[rgba(193,217,255,0.3)] border border-[#AEB4BC]" />
                <span className="text-[clamp(12px,0.97vw,14px)] font-medium text-[#717171] font-['Pretendard']">합격자 점수</span>
              </div>
              <span />
            </div>
            {/* 가로행 */}
            {[
              { label: "X 학습수준", my: "4.1", pass: "4.0", mark: false },
              { label: "Y 직무적합수준", my: "4.0", pass: "3.8", mark: false },
              { label: "Z 수행역량수준", my: "4.2", pass: "3.9", mark: false },
              { label: "평균", my: "4.1", pass: "3.9", mark: true },
            ].map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-[clamp(100px,9.7vw,140px)_1fr_1fr_clamp(44px,4.2vw,60px)] py-[clamp(8px,0.83vw,12px)]"
              >
                <span className={labelStyle}>{row.label}</span>
                <span className="text-[clamp(14px,1.1vw,16px)] font-bold text-[#111] font-['Pretendard'] text-center">
                  {row.my}
                </span>
                <span className="text-[clamp(14px,1.1vw,16px)] font-bold text-[#111] font-['Pretendard'] text-center">
                  {row.pass}
                </span>
                {row.mark ? (
                  <span className="text-[clamp(10px,0.83vw,12px)] text-[#717171] font-['Pretendard'] self-center">
                    *5.0만점
                  </span>
                ) : (
                  <span />
                )}
              </div>
            ))}
          </div>
        </div>
      </SectionCard>

      <div className="border-t border-[#AEB4BC]" />

      {/* 총평 */}
      <SectionCard title="총평">
        <p className="text-[clamp(14px,1.1vw,16px)] font-normal leading-[170%] text-[#111] font-['Pretendard']">
          전공 기반의 학습수준과 실무 프로젝트 경험이 고루 갖춰져 있으며, 네이버
          백엔드 직무에 높은 적합성을 보입니다. 특히 서비스 출시 경험과 글로벌
          공모전 수상 이력이 경쟁력을 크게 높이고 있습니다.
        </p>
      </SectionCard>

      {/* 하단 버튼 */}
      <div className="flex justify-center gap-[16px] pt-[clamp(40px,4.2vw,60px)] pb-[clamp(40px,4.2vw,60px)]">
        <button
          onClick={onNext}
          className="w-[160px] h-[44px] bg-white rounded-[6px] text-[16px] font-medium text-[#717171] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.12)] border border-transparent hover:border-[#09469F] hover:text-[#09469F] transition-colors"
        >
          다음
        </button>
      </div>
    </div>
  );
}

interface RowProps {
  label: String;
  children?: React.ReactNode;
}

function Row({ label, children }: RowProps) {
  return (
    <div className="flex gap-[clamp(12px,1.67vw,24px)]">
      <span className="text-[clamp(13px,1.1vw,16px)] font-medium leading-[150%] text-[#717171] font-['Pretendard'] w-[clamp(60px,5.6vw,80px)] shrink-0">
        {label}
      </span>
      <span className="text-[clamp(13px,1.1vw,16px)] font-normal leading-[150%] text-[#111] font-['Pretendard']">
        {children}
      </span>
    </div>
  );
}
