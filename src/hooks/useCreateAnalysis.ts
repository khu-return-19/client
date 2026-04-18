import { createAnalysis } from "api/analysisApi";
import { useAnalysisStore } from "stores/analysisStore";
import { CreateAnalysisData } from "schema/Analysis";

export const useCreateAnalysis = () => {
  const { setEvents, setStatus, setFinalData, setPassScoreData } =
    useAnalysisStore();

  const start = async (data: CreateAnalysisData) => {
    setStatus("running");
    setEvents(() => []);

    try {
      await createAnalysis(data, (event) => {
        if (event.status === "FAILED") {
          setStatus("failed");
          return;
        }

        setEvents((prev) => [...prev, event]);

        if (event.type === "pass_score") {
          const { x, y, z, overall } = event.data as any;
          setPassScoreData({
            x: Math.ceil(x * 10) / 10,
            y: Math.ceil(y * 10) / 10,
            z: Math.ceil(z * 10) / 10,
            overall,
          });
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
