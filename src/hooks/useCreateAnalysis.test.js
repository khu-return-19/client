import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { useCreateAnalysis } from "./useCreateAnalysis";
import { useAnalysisStore } from "stores/analysisStore";

global.IS_REACT_ACT_ENVIRONMENT = true;

const mockCreateAnalysis = jest.fn();

jest.mock("api/analysisApi", () => ({
  createAnalysis: (...args) => mockCreateAnalysis(...args),
}));

describe("useCreateAnalysis pass score", () => {
  let container;
  let root;
  let start;

  function Harness() {
    start = useCreateAnalysis().start;
    return null;
  }

  beforeEach(() => {
    sessionStorage.clear();
    useAnalysisStore.getState().reset();
    container = document.createElement("div");
    root = createRoot(container);
    act(() => root.render(<Harness />));
  });

  afterEach(() => {
    act(() => root.unmount());
    mockCreateAnalysis.mockReset();
  });

  it("does not keep the previous analysis pass score when the new one has no sample", async () => {
    useAnalysisStore.getState().setPassScoreData({ x: 3.9, y: 3.8, z: 3.6, overall: 3.77 });
    mockCreateAnalysis.mockImplementation(async (_data, onEvent) => {
      onEvent({ id: "1", type: "pass_score", status: "RUNNING", data: null });
    });

    await act(async () => {
      await start({});
    });

    expect(useAnalysisStore.getState().passScoreData).toBeNull();
  });

  it("stores the pass score when the new analysis has a sample", async () => {
    mockCreateAnalysis.mockImplementation(async (_data, onEvent) => {
      onEvent({
        id: "1",
        type: "pass_score",
        status: "RUNNING",
        data: { company: "삼성", position: "IT", x: 3.9, y: 3.8, z: 3.6, overall: 3.77 },
      });
    });

    await act(async () => {
      await start({});
    });

    expect(useAnalysisStore.getState().passScoreData).toEqual({ x: 3.9, y: 3.8, z: 3.6, overall: 3.77 });
  });
});
