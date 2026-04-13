import { create } from "zustand";
import { AnalysisEvent, FinalStateData } from "schema/Analysis";

interface AnalysisStore {
  events: AnalysisEvent[];
  status: "idle" | "running" | "done" | "failed";
  finalData: FinalStateData | null;
  setEvents: (updater: (prev: AnalysisEvent[]) => AnalysisEvent[]) => void;
  setStatus: (status: AnalysisStore["status"]) => void;
  setFinalData: (data: FinalStateData) => void;
  reset: () => void;
}

export const useAnalysisStore = create<AnalysisStore>((set) => ({
  events: [],
  status: "idle",
  finalData: null,
  setEvents: (updater) => set((state) => ({ events: updater(state.events) })),
  setStatus: (status) => set({ status }),
  setFinalData: (data) => set({ finalData: data }),
  reset: () => set({ events: [], status: "idle", finalData: null }),
}));
