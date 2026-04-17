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
  abortController: AbortController | null;
  setEvents: (updater: (prev: AnalysisEvent[]) => AnalysisEvent[]) => void;
  setStatus: (status: AnalysisStore["status"]) => void;
  setFinalData: (data: FinalStateData) => void;
  setAbortController: (ctrl: AbortController | null) => void;
  reset: () => void;
}

export const useAnalysisStore = create<AnalysisStore>((set, get) => ({
  events: [],
  status: "idle",
  normalData: null,
  evaluationResult: null,
  revisedResult: null,
  abortController: null,
  setEvents: (updater) => set((state) => ({ events: updater(state.events) })),
  setStatus: (status) => set({ status }),
  setFinalData: (data) => {
    const { evaluationResult, revisedResult, ...normalData } = data;
    set({ normalData, evaluationResult, revisedResult });
  },
  setAbortController: (ctrl) => set({ abortController: ctrl }),
  reset: () => {
    // 진행 중인 fetch 요청 취소
    get().abortController?.abort();
    set({
      events: [],
      status: "idle",
      normalData: null,
      evaluationResult: null,
      revisedResult: null,
      abortController: null,
    });
  },
}));
