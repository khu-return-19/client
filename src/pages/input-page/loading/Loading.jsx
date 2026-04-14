import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";

// 컴포넌트
import AnalysisStateSection from "./layouts/AnalysisStateSection";
import LoadingPageLayout from "./layouts/LoadingPageLayout";

// hooks
import { useAnalysisStore } from "stores/analysisStore";

// 각 단계의 예상 소요 시간 (ms) — 프로그레스 속도 계산에 사용
const STAGE_DURATIONS = {
  schemer:    2000,
  web_search: 2700,
  pass_score: 50,
  evaluate:   15000,
  revise:     10000,
};

function useStreamStages() {
  const [stages, setStages] = useState([]);
  const [queueDone, setQueueDone] = useState(true);
  const currentIndexRef = useRef(-1);
  const queueRef = useRef([]);
  const processingRef = useRef(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => { mountedRef.current = false; };
  }, []);

  const applyEvent = useCallback((event) => {
    switch (event.type) {
      case "stage_start":
        currentIndexRef.current += 1;
        setStages((prev) => [
          ...prev,
          {
            title: event.title,
            completedTitle: event.completedTitle,
            items: [],
            completed: false,
            error: false,
            expectedDuration: event.expectedDuration,
          },
        ]);
        break;

      case "message":
        setStages((prev) => {
          const updated = [...prev];
          const i = currentIndexRef.current;
          if (i < 0 || i >= updated.length) return prev;
          const stage = { ...updated[i] };
          stage.items = [...(stage.items ?? []), { type: "text", value: event.text }];
          updated[i] = stage;
          return updated;
        });
        break;

      case "url_item":
        setStages((prev) => {
          const updated = [...prev];
          const i = currentIndexRef.current;
          if (i < 0 || i >= updated.length) return prev;
          const stage = { ...updated[i] };
          stage.items = [...(stage.items ?? []), { type: "url", url: event.url, hostname: event.hostname }];
          updated[i] = stage;
          return updated;
        });
        break;

      case "stage_done":
        setStages((prev) => {
          const updated = [...prev];
          const i = currentIndexRef.current;
          if (i < 0 || i >= updated.length) return prev;
          updated[i] = { ...updated[i], completed: true };
          return updated;
        });
        break;

      case "error":
        setStages((prev) => {
          const updated = [...prev];
          const i = currentIndexRef.current;
          if (i < 0 || i >= updated.length) return prev;
          updated[i] = { ...updated[i], error: true };
          return updated;
        });
        break;

      case "all_done":
        setStages((prev) => prev.map((s) => ({ ...s, completed: true })));
        break;

      default:
        break;
    }
  }, []);

  // 비동기 큐: stage_done 후 1000ms 대기하여 완료 애니메이션이 보이도록 순차 처리
  const processQueue = useCallback(async () => {
    if (processingRef.current) return;
    processingRef.current = true;
    if (mountedRef.current) setQueueDone(false);

    while (queueRef.current.length > 0) {
      if (!mountedRef.current) break;
      const item = queueRef.current.shift();
      applyEvent(item.event);
      if (item.afterDelay > 0) {
        await new Promise((r) => setTimeout(r, item.afterDelay));
      }
    }

    processingRef.current = false;
    if (mountedRef.current) setQueueDone(true);
  }, [applyEvent]);

  const dispatch = useCallback((event) => {
    // stage_done 후 1000ms 대기 (800ms 강제완료 + 200ms 전환 여유)
    const afterDelay = event.type === "stage_done" ? 1000 : 0;
    queueRef.current.push({ event, afterDelay });
    processQueue();
  }, [processQueue]);

  return { stages, dispatch, queueDone };
}

function Loading() {
  const { stages, dispatch, queueDone } = useStreamStages();
  const status = useAnalysisStore((state) => state.status);
  const events = useAnalysisStore((state) => state.events);
  const navigate = useNavigate();
  const processedCountRef = useRef(0);
  const passScoreStartedRef = useRef(false);

  useEffect(() => {
    if (events.length === 0) return;
    console.log("[stream event]", events[events.length - 1]);
  }, [events]);

  useEffect(() => {
    const newEvents = events.slice(processedCountRef.current);
    processedCountRef.current = events.length;

    for (const event of newEvents) {
      switch (event.type) {
        case "schemer_start":
          dispatch({
            type: "stage_start",
            title: "사용자의 입력을 검증중이에요.",
            completedTitle: "사용자의 입력을 검증했어요.",
            expectedDuration: STAGE_DURATIONS.schemer,
          });
          break;

        case "schemer_result":
          if (event.data?.validation_reason) {
            dispatch({ type: "message", text: event.data.validation_reason });
          }
          break;

        case "schemer_end":
          // _end 이벤트는 status와 무관하게 단계 종료
          dispatch({ type: "stage_done" });
          break;

        case "web_search_start":
          dispatch({
            type: "stage_start",
            title: "트랜드 파악을 위해 웹을 조회하고 있어요.",
            completedTitle: "웹 조회를 완료했어요.",
            expectedDuration: STAGE_DURATIONS.web_search,
          });
          break;

        case "web_search_result":
          if (event.data?.items) {
            for (const item of event.data.items) {
              try {
                const hostname = new URL(item.url).hostname;
                dispatch({ type: "url_item", url: item.url, hostname });
              } catch {}
            }
          }
          break;

        case "web_search_end":
          dispatch({ type: "stage_done" });
          break;

        case "pass_score":
          if (!passScoreStartedRef.current) {
            passScoreStartedRef.current = true;
            dispatch({
              type: "stage_start",
              title: "합격 데이터를 참조하여 경쟁력을 알아보고 있어요.",
              completedTitle: "합격 데이터 참조를 완료했어요.",
              expectedDuration: STAGE_DURATIONS.pass_score,
            });
          }
          break;

        case "evaluate_start":
          // pass_score 단계가 열려 있으면 evaluate_start 시점에 자동 완료
          if (passScoreStartedRef.current) {
            dispatch({ type: "stage_done" });
          }
          dispatch({
            type: "stage_start",
            title: "역량을 평가하고 있어요.",
            completedTitle: "역량 평가를 완료했어요.",
            expectedDuration: STAGE_DURATIONS.evaluate,
          });
          break;

        case "evaluate_end":
          dispatch({ type: "stage_done" });
          break;

        case "revise_start":
          dispatch({
            type: "stage_start",
            title: "개선 방향을 생각중이에요.",
            completedTitle: "개선 방향 도출을 완료했어요.",
            expectedDuration: STAGE_DURATIONS.revise,
          });
          break;

        case "revise_result":
          if (event.status === "COMPLETED") {
            dispatch({ type: "stage_done" });
          }
          break;

        case "final_state":
          // 개별 완료 신호를 놓쳤을 경우를 대비한 catch-all
          dispatch({ type: "all_done" });
          break;

        default:
          break;
      }
    }
  }, [events, dispatch]);

  // stream 완료 + UI 큐 소진 후 1500ms 대기 후 이동
  useEffect(() => {
    if (status !== "done" || !queueDone) return;
    const timer = setTimeout(() => navigate("/analysis"), 1500);
    return () => clearTimeout(timer);
  }, [status, queueDone, navigate]);

  return (
    <LoadingPageLayout>
      <div className="flex flex-col gap-[60px] max-[893px]:gap-[30px] pb-[120px]">
        {stages.map((stage, index) => (
          <AnalysisStateSection
            key={index}
            completed={stage.completed}
            error={stage.error}
            title={stage.title}
            completedTitle={stage.completedTitle}
            items={stage.items}
            expectedDuration={stage.expectedDuration}
          />
        ))}
      </div>
    </LoadingPageLayout>
  );
}

export default Loading;
