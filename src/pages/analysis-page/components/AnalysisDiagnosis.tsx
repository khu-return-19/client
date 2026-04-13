import cn from "utils/cn";
import ReportGraph from "pages/report/components/ReportGraph";
import { useAnalysisStore } from "stores/analysisStore";

export default function AnalysisDiagnosis({
  onNext,
  onPrev,
}: {
  onNext?: () => void;
  onPrev?: () => void;
}) {
  const { evaluationResult } = useAnalysisStore();
  const sections = [
    {
      axis: "X",
      title: "X축 (학습수준) 평가",
      score: evaluationResult?.x.score.toFixed(1) + "점" || "0점",
      scoreText: evaluationResult?.x.summary || "",
      criteria: evaluationResult?.x.criteria || [],
      evidence: evaluationResult?.x.basis || [],
      chartLabels: ["X", "4.1", "4.0", "4.2"],
    },
    {
      axis: "Y",
      title: "Y축 (직무적합성 수준) 평가",
      score: evaluationResult?.y.score.toFixed(1) + "점" || "0점",
      scoreText: evaluationResult?.y.summary || "",
      criteria: evaluationResult?.y.criteria || [],
      evidence: evaluationResult?.y.basis || [],
      extraItems: [
        {
          label: "Role Fit",
          text: "모바일(Flutter/Android), Back-End와의 연계, 서버-아키텍처 이해도 강조",
        },
        {
          label: "Domain Fit",
          text: "모바일(Flutter/Android), Back-End와의 연계, 서버-아키텍처 이해도 강조",
        },
        {
          label: "Culture Fit",
          text: "모바일(Flutter/Android), Back-End와의 연계, 서버-아키텍처 이해도 강조",
        },
        {
          label: "Skill Fit",
          text: "모바일(Flutter/Android), Back-End와의 연계, 서버-아키텍처 이해도 강조",
        },
      ],
      chartLabels: ["Y", "4.0", "4.1", "4.2"],
    },
    {
      axis: "Z",
      title: "Z축 (수행역량 수준) 평가",
      score: evaluationResult?.z.score.toFixed(1) + "점" || "0점",
      scoreText: evaluationResult?.z.summary || "",
      criteria: evaluationResult?.z.criteria || [],
      evidence: evaluationResult?.z.basis || [],
      chartLabels: ["Z", "4.2", "4.0", "4.1"],
    },
  ];

  const labelStyle = "font-medium text-[16px] text-gray900 shrink-0";

  return (
    <section>
      <h2 className="text-navy900 font-semibold text-2xl mb-10">
        3D 평가 세부 결과
      </h2>
      {sections.map((section) => (
        <div className="mb-[10px]">
          <h3 className="font-semibold text-lg">{section.title}</h3>
          <div className="flex mt-4 w-full gap-10">
            <div className="w-[350px]">
              <ReportGraph
                position={-1}
                userX={evaluationResult?.x.score}
                userY={evaluationResult?.y.score}
                userZ={evaluationResult?.z.score}
              />
            </div>
            <div>
              <div className="flex gap-8 mb-10">
                <h4 className={labelStyle}>평가 기준</h4>
                <div className="flex flex-col gap-[6px]">
                  {section.criteria.map((criterion, index) => (
                    <p key={index}>• {criterion}</p>
                  ))}
                </div>
              </div>
              <div className="flex gap-8 mb-10">
                <h4 className={labelStyle}>평가 근거</h4>
                <div className="flex flex-col gap-[6px]">
                  {section.evidence.map((evidence, index) => (
                    <p key={index}>• {evidence}</p>
                  ))}
                </div>
              </div>
              <div className="flex gap-8 mb-10">
                <h4 className={cn(labelStyle, "mt-[2px]")}>
                  {section.axis}축 점수
                </h4>
                <div className="flex flex-col gap-[10px]">
                  <div className="text-[#2876F1] text-xl font-semibold">
                    {section.score}
                  </div>
                  <div>{section.scoreText}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* 하단 버튼 */}
      <div className="flex justify-center gap-[16px] pt-[60px] pb-[60px]">
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
    </section>
  );
}
