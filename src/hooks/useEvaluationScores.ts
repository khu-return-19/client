import { useAnalysisStore } from "stores/analysisStore";

interface EvaluationScores {
  averageScore: number | null;
  averageCompareScore: number | null;
}

export function useEvaluationScores(): EvaluationScores {
  const { evaluationResult } = useAnalysisStore();

  if (!evaluationResult) {
    return { averageScore: null, averageCompareScore: null };
  }

  const { x, y, z } = evaluationResult;

  return {
    averageScore: (x.score + y.score + z.score) / 3,
    averageCompareScore: (x.compareScore + y.compareScore + z.compareScore) / 3,
  };
}
