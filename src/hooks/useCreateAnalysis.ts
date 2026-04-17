import { createAnalysis } from "api/analysisApi";
import { useAnalysisStore } from "stores/analysisStore";
import { CreateAnalysisData } from "schema/Analysis";

export const useCreateAnalysis = () => {
  const { setEvents, setStatus, setFinalData, setAbortController } = useAnalysisStore();

  const start = async (data: CreateAnalysisData) => {
    const controller = new AbortController();
    setAbortController(controller);
    setStatus("running");
    setEvents(() => []);

    try {
      await createAnalysis(data, (event) => {
        // FAILED 이벤트도 events에 먼저 추가 — Loading.jsx에서 에러 타입·메시지 처리
        setEvents((prev) => [...prev, event]);

        if (event.status === "FAILED") {
          setStatus("failed");
          return;
        }

        if (event.type === "final_state" && event.status === "COMPLETED") {
          setFinalData(event.data as any);
          setStatus("done");
        }
      }, controller.signal);
    } catch (e: any) {
      // 사용자가 취소한 경우(AbortError)는 에러 처리 생략
      if (e?.name !== "AbortError") {
        setStatus("failed");
      }
    } finally {
      setAbortController(null);
    }
  };

  return { start };
};
