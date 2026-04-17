import { useAnalysisStore } from "stores/analysisStore";
import { useEvaluationScores } from "hooks/useEvaluationScores";
import BulletList from "../shared/BulletList";

const h3Style =
  "text-[clamp(17px,1.39vw,20px)] font-semibold text-[#111] font-['Pretendard']";

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

export default function ConclusionSection() {
  const { evaluationResult } = useAnalysisStore();
  const { averageScore } = useEvaluationScores();

  return (
    <section className="flex flex-col gap-[clamp(24px,2.8vw,40px)]">
      <h2 className="text-[clamp(18px,1.67vw,24px)] font-semibold text-[#09469F] font-['Pretendard']">
        결론
      </h2>

      {/* 최종 평가 점수 / 경쟁력 */}
      <div className="flex flex-col gap-[clamp(10px,1.04vw,15px)]">
        <Row
          label="최종 평가 점수 :"
          value={averageScore != null ? averageScore + "점" : "-"}
          sub="기존합격자 평균 3.4점 대비 +0.7 ↑"
        />
        <Row
          label="경쟁력 :"
          value={evaluationResult?.level || "보통"}
          sub="기존합격자 수치 42.1% 대비 약 6~10%P ↑"
        />
      </div>

      {/* 강점 / 약점 */}
      <div className="grid grid-cols-2 max-[767px]:grid-cols-1 gap-[clamp(20px,2.8vw,40px)]">
        <div className="flex flex-col gap-[clamp(10px,1.1vw,16px)]">
          <h3 className={h3Style}>강점</h3>
          <BulletList items={evaluationResult?.strength} emptyText="강점 정보가 없습니다." />
        </div>
        <div className="flex flex-col gap-[clamp(10px,1.1vw,16px)]">
          <h3 className={h3Style}>약점</h3>
          <BulletList items={evaluationResult?.weakness} emptyText="약점 정보가 없습니다." />
        </div>
      </div>

      {/* 최종 조언 */}
      <div className="flex flex-col gap-[clamp(10px,1.1vw,16px)]">
        <h3 className={h3Style}>최종 조언</h3>
        <BulletList items={evaluationResult?.advice} emptyText="조언 정보가 없습니다." />
      </div>
    </section>
  );
}
