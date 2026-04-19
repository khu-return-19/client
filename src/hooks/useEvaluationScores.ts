import { useAnalysisStore } from "stores/analysisStore";

interface EvaluationScores {
  averageScore: number | null | string;
  averageCompareScore: number | null | string;
  xScoreDiff: number;
  yScoreDiff: number;
  zScoreDiff: number;
  averageDiff: number;
}

export function useEvaluationScores(): EvaluationScores {
  const { evaluationResult, passScoreData } = useAnalysisStore();

  if (!evaluationResult) {
    return {
      averageScore: null,
      averageCompareScore: null,
      xScoreDiff: 0,
      yScoreDiff: 0,
      zScoreDiff: 0,
      averageDiff: 0,
    };
  }

  const { x, y, z } = evaluationResult;
  const isString = (...vals: unknown[]) =>
    vals.some((v) => typeof v === "string");

  const averageScore = isString(x.score, y.score, z.score)
    ? "-"
    : ((
        ((x.score as number) + (y.score as number) + (z.score as number)) /
        3
      ).toFixed(1) as unknown as number);

  const averageCompareScore =
    passScoreData == null
      ? "-"
      : ((Math.ceil(passScoreData.overall * 10) / 10) as unknown as number);

  return {
    averageScore,
    averageCompareScore,
    xScoreDiff: x.score - (passScoreData?.x || 0),
    yScoreDiff: y.score - (passScoreData?.y || 0),
    zScoreDiff: z.score - (passScoreData?.z || 0),
    averageDiff:
      averageScore !== "-" && averageCompareScore !== "-"
        ? averageScore - averageCompareScore
        : 0,
  };
}
