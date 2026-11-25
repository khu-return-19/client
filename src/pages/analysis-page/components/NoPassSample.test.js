import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import AnalsisSummary from "./AnalsisSummary";
import AnalysisDiagnosis from "./AnalysisDiagnosis";
import { NO_PASS_SAMPLE_NOTICE } from "./shared/NoPassSampleNotice";
import { useAnalysisStore } from "stores/analysisStore";

global.IS_REACT_ACT_ENVIRONMENT = true;

jest.mock("pages/report/components/ReportGraph", () => () => null);

const axis = (score) => ({
  score,
  criteria: [],
  basis: [],
  summary: "",
  compareScore: "합격자 평균과 비슷한 수준",
});

const evaluationResult = {
  x: axis(3.5),
  y: axis(3.2),
  z: axis(3.0),
  averageScore: 3.2,
  roleFit: "",
  domainFit: "",
  cultureFit: "",
  skillFit: "",
  compareProb: ["합격 가능성 비교 문장"],
  scoreSummary: [],
  level: "낮음",
  jobSummary: "",
  overall: "",
  strength: [],
  weakness: [],
  advice: [],
  improveOverall: [],
  improveStrategy: [],
  improveExpectation: [],
};

describe("comparison sections without a pass sample", () => {
  let container;
  let root;

  beforeEach(() => {
    sessionStorage.clear();
    useAnalysisStore.getState().reset();
    useAnalysisStore.getState().setFinalData({
      company: "카카오",
      jobPosition: "백엔드 개발",
      evaluationResult,
      revisedResult: null,
    });
    container = document.createElement("div");
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
  });

  it.each([
    ["summary", AnalsisSummary],
    ["diagnosis", AnalysisDiagnosis],
  ])("%s shows only the fixed notice when there is no sample", (_, Component) => {
    act(() => root.render(<Component />));
    const text = container.textContent;

    NO_PASS_SAMPLE_NOTICE.forEach((line) => expect(text).toContain(line));
    expect(text).not.toContain("합격자 점수");
    expect(text).not.toContain("합격자 평균");
    expect(text).not.toContain("경쟁력 비교");
    expect(text).not.toContain("합격 가능성 비교 문장");
  });

  it("keeps the comparison when there is a sample", () => {
    useAnalysisStore
      .getState()
      .setPassScoreData({ x: 3.9, y: 3.8, z: 3.6, overall: 3.77 });

    act(() => root.render(<AnalsisSummary />));
    expect(container.textContent).toContain("합격자 점수");
    expect(container.textContent).not.toContain(NO_PASS_SAMPLE_NOTICE[0]);

    act(() => root.render(<AnalysisDiagnosis />));
    expect(container.textContent).toContain("합격자 평균");
    expect(container.textContent).toContain("합격 가능성 비교 문장");
    expect(container.textContent).not.toContain(NO_PASS_SAMPLE_NOTICE[0]);
  });
});
