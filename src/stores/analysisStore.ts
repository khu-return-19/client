import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  AnalysisEvent,
  EvaluateResultData,
  FinalStateData,
  ReviseResultData,
} from "schema/Analysis";

type NormalData = Omit<FinalStateData, "evaluationResult" | "revisedResult">;
type PassScoreData = { x: number; y: number; z: number; overall: number };

interface AnalysisStore {
  events: AnalysisEvent[];
  status: "idle" | "running" | "done" | "failed";
  normalData: NormalData | null;
  evaluationResult: EvaluateResultData | null;
  revisedResult: ReviseResultData | null;
  passScoreData: PassScoreData | null;
  abortController: AbortController | null;
  setEvents: (updater: (prev: AnalysisEvent[]) => AnalysisEvent[]) => void;
  setStatus: (status: AnalysisStore["status"]) => void;
  setFinalData: (data: FinalStateData) => void;
  setPassScoreData: (data: PassScoreData) => void;
  setAbortController: (ctrl: AbortController | null) => void;
  reset: () => void;
}

export const useAnalysisStore = create<AnalysisStore>()(
  persist(
    (set, get) => ({
      events: [],
      status: "idle",
      normalData: null,
      evaluationResult: null,
      revisedResult: null,
      passScoreData: null,
      abortController: null,
      setEvents: (updater) => set((state) => ({ events: updater(state.events) })),
      setStatus: (status) => set({ status }),
      setFinalData: (data) => {
        const { evaluationResult, revisedResult, ...normalData } = data;
        set({ normalData, evaluationResult, revisedResult });
      },
      setPassScoreData: (data) => set({ passScoreData: data }),
      setAbortController: (ctrl) => set({ abortController: ctrl }),
      reset: () => {
        get().abortController?.abort();
        set({
          events: [],
          status: "idle",
          normalData: null,
          evaluationResult: null,
          revisedResult: null,
          passScoreData: null,
          abortController: null,
        });
      },
    }),
    {
      name: "analysis-store",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        status: state.status,
        normalData: state.normalData,
        evaluationResult: state.evaluationResult,
        revisedResult: state.revisedResult,
        passScoreData: state.passScoreData,
      }),
    }
  )
);
