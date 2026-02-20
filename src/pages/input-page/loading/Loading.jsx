import { useState, useEffect, useCallback } from "react";
import AnalysisStateSection from "./layouts/AnalysisStateSection";
import LoadingPageLayout from "./layouts/LoadingPageLayout";

// 더미 시나리오 데이터
const ANALYSIS_SCENARIO = [
  {
    title: "학습 수준 분석",
    messages: [
      "학습 이력 데이터를 수집하고 있습니다.",
      "학습 성취도를 평가하고 있습니다.",
      "학습 패턴을 분석하고 있습니다.",
      "역량 수준을 산출하고 있습니다.",
    ],
  },
  {
    title: "직무적합 수준 분석",
    messages: [
      "합격자 데이터를 참조하고 있습니다.",
      "직무 역량 매칭을 분석하고 있습니다.",
      "산업별 요구 역량을 비교하고 있습니다.",
      "적합도 점수를 계산하고 있습니다.",
    ],
  },
  {
    title: "수행역량 수준 분석",
    messages: [
      "OKR 달성 능력 데이터를 참고하고 있습니다.",
      "KPI 달성 데이터를 참조하고 있습니다.",
      "프로젝트 수행 이력을 분석하고 있습니다.",
      "종합 역량 점수를 산출하고 있습니다.",
    ],
  },
];

// 각 메시지 표시 간격 (ms)
const MESSAGE_INTERVAL = 1500;
// 단계 완료 후 다음 단계 시작까지 대기 (ms)
const STAGE_COMPLETE_DELAY = 800;

function Loading() {
  const [stages, setStages] = useState([]);

  const runSimulation = useCallback(async () => {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    for (let i = 0; i < ANALYSIS_SCENARIO.length; i++) {
      const scenario = ANALYSIS_SCENARIO[i];

      // 새 단계 등장
      setStages((prev) => [
        ...prev,
        { title: scenario.title, completed: false, items: [] },
      ]);

      // 메시지를 하나씩 추가 (최대 2개 유지)
      for (let j = 0; j < scenario.messages.length; j++) {
        await delay(MESSAGE_INTERVAL);

        setStages((prev) => {
          const updated = [...prev];
          const current = { ...updated[i] };
          const newItems = [...current.items, scenario.messages[j]];
          current.items = newItems.length > 2 ? newItems.slice(-2) : newItems;
          updated[i] = current;
          return updated;
        });
      }

      // 단계 완료
      await delay(MESSAGE_INTERVAL);
      setStages((prev) => {
        const updated = [...prev];
        updated[i] = { ...updated[i], completed: true };
        return updated;
      });

      // 다음 단계 전 잠깐 대기
      if (i < ANALYSIS_SCENARIO.length - 1) {
        await delay(STAGE_COMPLETE_DELAY);
      }
    }

    // TODO: 모든 분석 완료 후 결과 페이지로 이동
  }, []);

  useEffect(() => {
    runSimulation();
  }, [runSimulation]);

  return (
    <LoadingPageLayout>
      <div className="flex flex-col gap-10">
        {stages.map((stage, index) => (
          <AnalysisStateSection
            key={index}
            completed={stage.completed}
            title={`${stage.title} ${stage.completed ? "완료" : "중"}`}
            items={stage.items}
          />
        ))}
      </div>
    </LoadingPageLayout>
  );
}

export default Loading;
