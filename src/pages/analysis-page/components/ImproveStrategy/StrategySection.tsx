import { useAnalysisStore } from "stores/analysisStore";
import BulletList from "../shared/BulletList";

const h3Style =
  "text-[clamp(17px,1.39vw,20px)] font-semibold text-[#111] font-['Pretendard']";
const bodyTextStyle =
  "text-[clamp(14px,1.1vw,16px)] font-normal text-[#111] font-['Pretendard'] leading-[170%]";

export default function StrategySection() {
  const { evaluationResult } = useAnalysisStore();

  return (
    <section className="flex flex-col gap-[clamp(24px,2.8vw,40px)]">
      <h2 className="text-[clamp(18px,1.67vw,24px)] font-semibold text-[#09469F] font-['Pretendard']">
        개선점 및 전략 제안
      </h2>

      {/* 개선 방안 */}
      <div className="flex flex-col gap-[clamp(10px,1.1vw,16px)]">
        <h3 className={h3Style}>개선 방안</h3>
        <p className={bodyTextStyle}>개선 방안 텍스트</p>
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
              <BulletList
                items={strategy.actionItems}
                emptyText="실행 전략 정보가 없습니다."
              />
            </div>
          ))}
        </div>
      </div>

      {/* 기대 효과 */}
      <div className="flex flex-col gap-[clamp(10px,1.1vw,16px)]">
        <h3 className={h3Style}>기대효과</h3>
        <p className={bodyTextStyle}>기대효과 텍스트</p>
      </div>
    </section>
  );
}
