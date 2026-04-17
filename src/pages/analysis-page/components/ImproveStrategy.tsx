import { useAnalysisStore } from "stores/analysisStore";
import { useEvaluationScores } from "hooks/useEvaluationScores";

export default function ImproveStrategy({
  onNext,
  onPrev,
}: {
  onNext?: () => void;
  onPrev?: () => void;
}) {
  const liStyle =
    "text-[clamp(14px,1.1vw,16px)] font-normal text-[#111] font-['Pretendard'] leading-[150%]";
  const h3Style =
    "text-[clamp(17px,1.39vw,20px)] font-semibold text-[#111] font-['Pretendard']";
  const ulStyle =
    "flex flex-col gap-[8px] list-disc list-outside pl-[16px] ml-[16px]";

  const { evaluationResult } = useAnalysisStore();
  const { averageScore } = useEvaluationScores();

  return (
    <div className="flex flex-col gap-[clamp(32px,3.9vw,56px)]">
      {/* 결론 섹션 */}
      <section className="flex flex-col gap-[clamp(24px,2.8vw,40px)]">
        <h2 className="text-[clamp(18px,1.67vw,24px)] font-semibold text-[#09469F] font-['Pretendard']">
          결론
        </h2>

        {/* 최종 평가 점수 / 경쟁력 */}
        <div className="flex flex-col gap-[clamp(10px,1.04vw,15px)]">
          <Row
            label="최종 평가 점수 :"
            value={averageScore + "점"}
            sub="기존합격자 대비 +0.7 ↑"
          />
          <Row
            label="경쟁력 :"
            value={evaluationResult?.level || "보통"}
            sub="기존합격자 대비 약 6~10%P ↑"
          />
        </div>

        {/* 강점 / 약점 */}
        <div className="grid grid-cols-2 max-[767px]:grid-cols-1 gap-[clamp(20px,2.8vw,40px)]">
          <div className="flex flex-col gap-[clamp(10px,1.1vw,16px)]">
            <h3 className={h3Style}>강점</h3>
            <ul className={ulStyle}>
              {evaluationResult?.strength.map((strength, index) => (
                <li key={index} className={liStyle}>
                  {strength}
                </li>
              )) || <li className={liStyle}>강점 정보가 없습니다.</li>}
            </ul>
          </div>
          <div className="flex flex-col gap-[clamp(10px,1.1vw,16px)]">
            <h3 className={h3Style}>약점</h3>
            <ul className={ulStyle}>
              {evaluationResult?.weakness.map((weakness, index) => (
                <li key={index} className={liStyle}>
                  {weakness}
                </li>
              )) || <li className={liStyle}>약점 정보가 없습니다.</li>}
            </ul>
          </div>
        </div>

        {/* 최종 조언 */}
        <div className="flex flex-col gap-[clamp(10px,1.1vw,16px)]">
          <h3 className={h3Style}>최종 조언</h3>
          <ul className={ulStyle}>
            {evaluationResult?.advice.map((item, index) => (
              <li key={index} className={liStyle}>
                {item}
              </li>
            )) || <li className={liStyle}>조언 정보가 없습니다.</li>}
          </ul>
        </div>
      </section>

      <div className="border-t border-[#AEB4BC]" />

      {/* 개선점 및 전략 제안 섹션 */}
      <section className="flex flex-col gap-[clamp(24px,2.8vw,40px)]">
        <h2 className="text-[clamp(18px,1.67vw,24px)] font-semibold text-[#09469F] font-['Pretendard']">
          개선점 및 전략 제안
        </h2>

        {/* 개선 방안 */}
        <div className="flex flex-col gap-[clamp(10px,1.1vw,16px)]">
          <h3 className={h3Style}>개선 방안</h3>
          <p className="text-[clamp(14px,1.1vw,16px)] font-normal text-[#111] font-['Pretendard'] leading-[170%]">
            {evaluationResult?.improveOverall.join("\n")}
          </p>
        </div>

        {/* 실행 전략 */}
        <div className="flex flex-col gap-[clamp(10px,1.1vw,16px)]">
          <h3 className={h3Style}>실행전략</h3>
          <div className="flex flex-col gap-[clamp(16px,1.67vw,24px)]">
            {evaluationResult?.improveStrategy.map((strategy, index) => (
              <div
                key={strategy.strategyName}
                className="flex flex-col gap-[clamp(8px,0.83vw,12px)]"
              >
                <p className="text-[clamp(14px,1.1vw,16px)] font-normal text-[#111] font-['Pretendard']">
                  ({index + 1}) {strategy.strategyName}
                </p>
                <ul className={ulStyle}>
                  {strategy.actionItems.map((val, key) => (
                    <li key={key} className={liStyle}>
                      {val}
                    </li>
                  )) || <li className={liStyle}>실행 전략 정보가 없습니다.</li>}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* 기대 효과 */}
        <div className="flex flex-col gap-[clamp(10px,1.1vw,16px)]">
          <h3 className={h3Style}>기대효과</h3>
          <p className="text-[clamp(14px,1.1vw,16px)] font-normal text-[#111] font-['Pretendard'] leading-[170%]">
            {evaluationResult?.improveExpectation.join("\n")}
          </p>
        </div>
      </section>

      {/* 하단 버튼 */}
      <div className="flex justify-center gap-[16px] pt-[clamp(40px,4.2vw,60px)] pb-[clamp(40px,4.2vw,60px)]">
        <button
          onClick={onPrev}
          className="w-[160px] h-[44px] bg-white rounded-[6px] text-[16px] font-medium text-[#717171] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.12)] border border-transparent hover:border-[#09469F] hover:text-[#09469F] transition-colors"
        >
          이전
        </button>
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
  label: string;
  value: string;
  sub?: string;
}

function Row({ label, value, sub }: RowProps) {
  return (
    <div className="flex items-center gap-[clamp(12px,1.39vw,20px)] flex-wrap">
      <div className="flex items-center gap-[4px] shrink-0">
        <span className="text-[clamp(14px,1.1vw,16px)] font-normal text-[#111] font-['Pretendard']">
          {label}
        </span>
        <span className="text-[clamp(14px,1.1vw,16px)] font-bold text-[#111] font-['Pretendard']">
          {value}
        </span>
      </div>
      {sub && (
        <span className="text-[clamp(13px,1.04vw,16px)] font-normal text-[#111] font-['Pretendard']">
          {sub}
        </span>
      )}
    </div>
  );
}
