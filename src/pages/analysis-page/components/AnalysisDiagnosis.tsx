import cn from "utils/cn";
import ReportGraph from "pages/report/components/ReportGraph";
import { useAnalysisStore } from "stores/analysisStore";
import AnalysisHeader from "./AnalysisHeader";
import { useEvaluationScores } from "hooks/useEvaluationScores";

export default function AnalysisDiagnosis({
  onNext,
  onPrev,
}: {
  onNext?: () => void;
  onPrev?: () => void;
}) {
  const { evaluationResult } = useAnalysisStore();
  const { averageScore } = useEvaluationScores();
  const sections = [
    {
      axis: "X",
      title: "X축 (학습수준) 평가",
      score: evaluationResult?.x.score.toFixed(1),
      scoreText: evaluationResult?.x.summary || "",
      criteria: evaluationResult?.x.criteria || [],
      evidence: evaluationResult?.x.basis || [],
    },
    {
      axis: "Y",
      title: "Y축 (직무적합성 수준) 평가",
      score: evaluationResult?.y.score.toFixed(1),
      scoreText: evaluationResult?.y.summary || "",
      criteria: evaluationResult?.y.criteria || [],
      evidence: evaluationResult?.y.basis || [],
    },
    {
      axis: "Z",
      title: "Z축 (수행역량 수준) 평가",
      score: evaluationResult?.z.score.toFixed(1),
      scoreText: evaluationResult?.z.summary || "",
      criteria: evaluationResult?.z.criteria || [],
      evidence: evaluationResult?.z.basis || [],
    },
  ];

  const labelStyle = "font-medium text-[16px] text-gray900 shrink-0";

  return (
    <>
      <section>
        <AnalysisHeader title="3D 평가 세부 결과" />
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
                  highlightAxis={section.axis as "X" | "Y" | "Z"}
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
                      {section.score}점
                    </div>
                    <div>{section.scoreText}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
      {/* 종합 평가 및 경쟁력 */}
      <section className="px-5 py-[75px] border-y-[1px] border-[#B5B5B5]">
        <AnalysisHeader title="종합평가 및 경쟁력" />
        <div className="flex gap-8">
          <div className="flex flex-col gap-4 shrink-0">
            <div className="flex gap-[18px]">
              <h3 className="font-semibold text-lg">3D 평가 점수</h3>
              <div className="text-lg">
                {sections.map((section, index) => (
                  <span key={section.axis}>
                    <span>
                      {section.score} ({section.axis}){" "}
                      {index !== sections.length - 1 ? "/ " : ""}
                    </span>
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-[18px]">
              <h3 className="font-semibold text-lg">평균</h3>
              <div className="text-lg">{averageScore?.toFixed(1)}</div>
            </div>
            <div className="flex gap-[18px]">
              <h3 className="font-semibold text-lg">경쟁력</h3>
              <div className="text-lg">{evaluationResult?.level}</div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-1">요약</h3>
            <div className="text-lg flex flex-col gap-[7px]">
              {evaluationResult?.scoreSummary?.map((summary, index) => (
                <div className="flex gap-2">
                  <span>• </span>
                  <p key={index}>{summary}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="pt-[75px]">
        <AnalysisHeader title="기존 합격자 비교 분석" />
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <ReportGraph
              userX={evaluationResult?.x.score}
              userY={evaluationResult?.y.score}
              userZ={evaluationResult?.z.score}
            />
          </div>
          <div className="flex flex-col py-4 flex-1 min-w-0">
            {/* Header */}
            <div className="flex gap-0 pb-2 mb-1">
              <div className="flex-[2] text-base">평가 항목</div>
              <div className="flex-[1.5] flex flex-col items-center text-base">
                합격자 평균
                <div className="text-[12px] text-gray900">(227건, 동직군)</div>
              </div>
              <div className="flex-[1] flex justify-center text-base px-3">
                지원자
              </div>
              <div className="flex-[2.5] text-base">비교분석</div>
            </div>

            {/* Row 1 */}
            <div className="flex items-center py-3">
              <div className="flex-[2] text-xs text-gray900">
                X축 (학습 수준)
              </div>
              <div className="flex-[1.5] text-base flex justify-center">
                {evaluationResult?.x.score || ""}
              </div>
              <div className="flex-[1] flex flex-col items-center px-3">
                <div className="text-base font-medium text-gray-900">4.1</div>
                <div className="text-[10px] text-blue-500">+0.54p</div>
              </div>
              <div className="flex-[2.5] text-xs text-gray-900">
                {evaluationResult?.x.compareScore || ""}
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex items-center py-3">
              <div className="flex-[2] text-xs text-gray900">
                Y축 (직무 적성)
              </div>
              <div className="flex-[1.5] text-base flex justify-center">
                {evaluationResult?.y.score || ""}
              </div>
              <div className="flex-[1] flex flex-col items-center px-3">
                <div className="text-base font-medium text-gray-900">4.0</div>
                <div className="text-[10px] text-blue-500">+0.6p</div>
              </div>
              <div className="flex-[2.5] text-xs text-gray-900">
                {evaluationResult?.y.compareScore || ""}
              </div>
            </div>

            {/* Row 3 */}
            <div className="flex items-center py-3">
              <div className="flex-[2] text-xs text-gray900">
                Z축 (수행 역량)
              </div>
              <div className="flex-[1.5] text-base flex justify-center">
                {evaluationResult?.z.score || ""}
              </div>
              <div className="flex-[1] flex flex-col items-center px-3">
                <div className="text-base font-medium text-gray-900">4.2</div>
                <div className="text-[10px] text-red-500">-0.6p</div>
              </div>
              <div className="flex-[2.5] text-xs text-gray-900">
                {evaluationResult?.z.compareScore || ""}
              </div>
            </div>

            {/* Row 4 */}
            <div className="flex items-center py-3">
              <div className="flex-[2] text-xs font-medium text-gray900">
                최종 평가 점수
              </div>
              <div className="flex-[1.5] text-base flex justify-center">
                {averageScore ? averageScore.toFixed(1) : ""}
              </div>
              <div className="flex-[1] flex flex-col items-center px-3">
                <div className="text-base font-medium text-gray-900">4.1</div>
              </div>
              <div className="flex-[2.5] text-xs text-gray-900">
                동직군 대조, 전 항목 우위
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-xl mb-4 mt-[52px]">
                경쟁력 비교
              </h4>
              {evaluationResult?.compareProb.map((prob, index) => (
                <div className="flex gap-2">
                  <span>• </span>
                  <p key={index} className="text-base">
                    {prob}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
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
    </>
  );
}
