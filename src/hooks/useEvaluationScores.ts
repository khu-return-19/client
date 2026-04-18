import { useAnalysisStore } from "stores/analysisStore";

interface EvaluationScores {
  averageScore: number | null | string;
  averageCompareScore: number | null | string;
}

export function useEvaluationScores(): EvaluationScores {
  const { evaluationResult, passScoreData } = useAnalysisStore();

  if (!evaluationResult) {
    return { averageScore: null, averageCompareScore: null };
  }

  const { x, y, z } = evaluationResult;
  const isString = (...vals: unknown[]) =>
    vals.some((v) => typeof v === "string");

  return {
    averageScore: isString(x.score, y.score, z.score)
      ? "-"
      : ((
          ((x.score as number) + (y.score as number) + (z.score as number)) /
          3
        ).toFixed(1) as unknown as number),
    averageCompareScore:
      passScoreData == null
        ? "-"
        : ((Math.ceil(passScoreData.overall * 10) / 10) as unknown as number),
  };
}
