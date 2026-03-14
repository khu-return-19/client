import { useState, useEffect, useCallback, useRef } from "react";
import AnalysisStateSection from "./layouts/AnalysisStateSection";
import LoadingPageLayout from "./layouts/LoadingPageLayout";

// 개발용 시뮬레이션 데이터 — 실제 스트림 연결 시 제거
const SIMULATION_SCENARIO = [
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

/**
 * 스트림 이벤트를 stages 상태로 변환하는 훅.
 *
 * 스트림이 연결되면 useEffect 내부의 시뮬레이션을 제거하고
 * 실제 스트림 이벤트를 파싱해 dispatch를 호출하면 됩니다.
 *
 * 이벤트 스펙 (서버와 협의 후 확정):
 *   { type: 'stage_start', title: string }
 *   { type: 'message',     text: string  }
 *   { type: 'stage_done'                 }
 *   { type: 'done'                       }  ← 스트림 종료 신호 (확정 전)
 */
function useStreamStages() {
  const [stages, setStages] = useState([]);
  const currentIndexRef = useRef(-1);

  const dispatch = useCallback((event) => {
    switch (event.type) {
      case "stage_start":
        currentIndexRef.current += 1;
        setStages((prev) => [
          ...prev,
          { title: event.title, items: [], completed: false },
        ]);
        break;

      case "message":
        setStages((prev) => {
          const updated = [...prev];
          const i = currentIndexRef.current;
          const stage = { ...updated[i] };
          const newItems = [...stage.items, event.text];
          stage.items = newItems.length > 2 ? newItems.slice(-2) : newItems;
          updated[i] = stage;
          return updated;
        });
        break;

      case "stage_done":
        setStages((prev) => {
          const updated = [...prev];
          const i = currentIndexRef.current;
          updated[i] = { ...updated[i], completed: true };
          return updated;
        });
        break;

      case "done":
        // TODO: 결과 페이지로 이동
        break;

      default:
        break;
    }
  }, []);

  useEffect(() => {
    // TODO: 아래 시뮬레이션을 실제 스트림 소비 코드로 교체
    // 예시 (SSE):
    //   const es = new EventSource('/api/analysis');
    //   es.onmessage = (e) => dispatch(JSON.parse(e.data));
    //   return () => es.close();
    //
    // 예시 (fetch ReadableStream):
    //   const res = await fetch('/api/analysis');
    //   for await (const chunk of res.body) { dispatch(parse(chunk)); }

    const delay = (ms) => new Promise((r) => setTimeout(r, ms));

    async function simulate() {
      for (const scenario of SIMULATION_SCENARIO) {
        dispatch({ type: "stage_start", title: scenario.title });
        for (const text of scenario.messages) {
          await delay(1500);
          dispatch({ type: "message", text });
        }
        await delay(1500);
        dispatch({ type: "stage_done" });
        await delay(800);
      }
      dispatch({ type: "done" });
    }

    simulate();
  }, [dispatch]);

  return { stages };
}

function Loading() {
  const { stages } = useStreamStages();

  return (
    <LoadingPageLayout>
      <div className="flex flex-col gap-[60px] max-[893px]:gap-[30px]">
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
