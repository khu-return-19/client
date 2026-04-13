import { create } from "zustand";
import {
  AnalysisEvent,
  FinalStateData,
  EvaluateResultData,
  ReviseResultData,
} from "schema/Analysis";

type NormalData = Omit<FinalStateData, "evaluationResult" | "revisedResult">;

interface AnalysisStore {
  events: AnalysisEvent[];
  status: "idle" | "running" | "done" | "failed";
  normalData: NormalData | null;
  evaluationResult: EvaluateResultData | null;
  revisedResult: ReviseResultData | null;
  setEvents: (updater: (prev: AnalysisEvent[]) => AnalysisEvent[]) => void;
  setStatus: (status: AnalysisStore["status"]) => void;
  setFinalData: (data: FinalStateData) => void;
  reset: () => void;
}

export const useAnalysisStore = create<AnalysisStore>((set) => ({
  events: [],
  status: "idle",
  normalData: null,
  evaluationResult: null,
  revisedResult: null,
  setEvents: (updater) => set((state) => ({ events: updater(state.events) })),
  setStatus: (status) => set({ status }),
  setFinalData: (data) => {
    const { evaluationResult, revisedResult, ...normalData } = data;
    set({ normalData, evaluationResult, revisedResult });
  },
  reset: () =>
    set({
      events: [],
      status: "idle",
      normalData: null,
      evaluationResult: null,
      revisedResult: null,
    }),
}));
