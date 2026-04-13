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
        if (event.status === "FAILED") {
          setStatus("failed");
          return;
        }

        setEvents((prev) => [...prev, event]);

        if(event.status === "COMPLETED"){
          console.log(event.data);
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
