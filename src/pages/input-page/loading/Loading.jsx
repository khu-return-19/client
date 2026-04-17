import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";

// 컴포넌트
import AnalysisStateSection from "./layouts/AnalysisStateSection";
import LoadingPageLayout from "./layouts/LoadingPageLayout";
import AnalysisErrorModal from "./components/AnalysisErrorModal";

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
            // false인 경우 완료 후 하위 요소를 표시하지 않음 (4, 5단계)
            showCompletedItems: event.showCompletedItems !== false,
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
    const afterDelay = event.type === "stage_done" ? 1000 : 0;
    queueRef.current.push({ event, afterDelay });
    processQueue();
  }, [processQueue]);

  return { stages, dispatch, queueDone };
}

// 에러 모달 텍스트 상수
const SCHEMER_FAILED_TITLE    = "자기소개서 내용을 검토해 주세요";
const SCHEMER_FAILED_FALLBACK = "제출하신 자기소개서의 내용이 올바르지 않습니다.\n내용을 재검토하신 후 다시 제출해 주시기 바랍니다.";
const SCHEMER_FAILED_HINT     = "자소서 내용을 수정하여 다시 시도해 주시기 바랍니다.";

const ANALYSIS_ERROR_TITLE    = "분석 중 오류가 발생했습니다";
const ANALYSIS_ERROR_FALLBACK = "일시적인 오류가 발생했습니다.\n잠시 후 다시 시도해 주시기 바랍니다.";

// pass_score 데이터 없음 안내
const PASS_SCORE_NO_DATA =
  "합격자 데이터가 없어, 직무 요구 역량 기준으로 분석을 진행할게요.";

function Loading() {
  const { stages, dispatch, queueDone } = useStreamStages();
  const status = useAnalysisStore((state) => state.status);
  const events = useAnalysisStore((state) => state.events);
  const navigate = useNavigate();
  const processedCountRef = useRef(0);
  const passScoreStartedRef = useRef(false);
  const passScoreDoneRef = useRef(false);
  const passScoreDataRef = useRef(null);
  const schemerDoneRef = useRef(false);
  const [errorModal, setErrorModal] = useState(null); // { title, message, hint? } | null

  // 에러 모달 닫기 — X / 확인 버튼 모두 자소서 페이지로 이동
  const handleErrorModalClose = useCallback(() => {
    setErrorModal(null);
    navigate("/input-page/self-introduction");
  }, [navigate]);

  useEffect(() => {
    const newEvents = events.slice(processedCountRef.current);
    processedCountRef.current = events.length;

    for (const event of newEvents) {
      // 모든 이벤트 raw 로그 — pass_score data null 여부 등 백엔드 검증용
      console.log("[stream event]", event.type, "status:", event.status, "data:", event.data);

      switch (event.type) {

        // ── 1단계: 입력 검증 ─────────────────────────────────────
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
            schemerDoneRef.current = true;
            dispatch({ type: "stage_done" });
            dispatch({ type: "message", text: event.data.validation_reason });
          }
          break;

        case "schemer_end":
          if (!schemerDoneRef.current) {
            dispatch({ type: "stage_done" });
          }
          break;

        case "schemer_failed":
          dispatch({ type: "error" });
          setErrorModal({
            title: SCHEMER_FAILED_TITLE,
            message: SCHEMER_FAILED_FALLBACK,
            detail: event.data || null,   // 토글로 펼치는 구체적 사유
            hint: SCHEMER_FAILED_HINT,
          });
          break;

        case "schemer_error":
          dispatch({ type: "error" });
          setErrorModal({
            title: ANALYSIS_ERROR_TITLE,
            message: ANALYSIS_ERROR_FALLBACK,
            detail: event.data || null,
          });
          break;

        // ── 2단계: 웹 조회 — URL 항목만 표시, 텍스트 메시지 생략 ──
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

        case "web_search_error":
          dispatch({ type: "error" });
          setErrorModal({
            title: ANALYSIS_ERROR_TITLE,
            message: ANALYSIS_ERROR_FALLBACK,
            detail: event.data || null,
          });
          break;

        // ── 3단계: 합격 데이터 참조 ───────────────────────────────
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
          if (event.data?.overall != null && passScoreDataRef.current === null) {
            passScoreDataRef.current = event.data;
          }
          break;

        // ── 4단계: 역량 평가 — 완료 후 하위 요소 미표시 ─────────
        case "evaluate_start":
          // pass_score 단계 완료 처리 + 데이터 유무에 따른 안내 메시지
          if (passScoreStartedRef.current && !passScoreDoneRef.current) {
            passScoreDoneRef.current = true;
            dispatch({ type: "stage_done" });
            if (passScoreDataRef.current) {
              const { company, position, overall } = passScoreDataRef.current;
              dispatch({
                type: "message",
                text: `${company} ${position} 합격자 평균 종합 점수 ${Math.ceil(overall * 10) / 10}점을 기준으로 분석을 진행할게요.`,
              });
            } else {
              dispatch({ type: "message", text: PASS_SCORE_NO_DATA });
            }
          }
          dispatch({
            type: "stage_start",
            title: "역량을 평가하고 있어요.",
            completedTitle: "역량 평가를 완료했어요.",
            expectedDuration: STAGE_DURATIONS.evaluate,
            showCompletedItems: false,
          });
          break;

        case "evaluate_generation":
          if (event.data) dispatch({ type: "message", text: String(event.data) });
          break;

        case "evaluate_end":
          dispatch({ type: "stage_done" });
          break;

        case "evaluate_error":
          dispatch({ type: "error" });
          setErrorModal({
            title: ANALYSIS_ERROR_TITLE,
            message: ANALYSIS_ERROR_FALLBACK,
            detail: event.data || null,
          });
          break;

        // ── 5단계: 개선 방향 — 완료 후 하위 요소 미표시 ─────────
        case "revise_start":
          dispatch({
            type: "stage_start",
            title: "개선 방향을 생각중이에요.",
            completedTitle: "개선 방향 도출을 완료했어요.",
            expectedDuration: STAGE_DURATIONS.revise,
            showCompletedItems: false,
          });
          break;

        case "revise_generation":
          if (event.data) dispatch({ type: "message", text: String(event.data) });
          break;

        case "revise_result":
          if (event.status === "COMPLETED") {
            dispatch({ type: "stage_done" });
          }
          break;

        case "revise_error":
          dispatch({ type: "error" });
          setErrorModal({
            title: ANALYSIS_ERROR_TITLE,
            message: ANALYSIS_ERROR_FALLBACK,
            detail: event.data || null,
          });
          break;

        case "final_state":
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
            showCompletedItems={stage.showCompletedItems}
          />
        ))}
      </div>
      {errorModal && (
        <AnalysisErrorModal
          title={errorModal.title}
          message={errorModal.message}
          detail={errorModal.detail}
          hint={errorModal.hint}
          onClose={handleErrorModalClose}
          onConfirm={handleErrorModalClose}
        />
      )}
    </LoadingPageLayout>
  );
}

export default Loading;
