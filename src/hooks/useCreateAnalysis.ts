import { createAnalysis } from "api/analysisApi";
import { useAnalysisStore } from "stores/analysisStore";
import { CreateAnalysisData } from "schema/Analysis";

export const useCreateAnalysis = () => {
  const { setEvents, setStatus, setFinalData } = useAnalysisStore();

  const start = async (data: CreateAnalysisData) => {
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
      });
    } catch (e) {
      setStatus("failed");
    }
  };

  return { start };
};
