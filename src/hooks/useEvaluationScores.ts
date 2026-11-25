import { useAnalysisStore } from "stores/analysisStore";

interface EvaluationScores {
  averageScore: number | null | string;
  averageCompareScore: number | null | string;
  // 합격자 표본이 없으면 null (비교하지 않음)
  xScoreDiff: number | null;
  yScoreDiff: number | null;
  zScoreDiff: number | null;
  averageDiff: number | null;
}

export function useEvaluationScores(): EvaluationScores {
  const { evaluationResult, passScoreData } = useAnalysisStore();

  if (!evaluationResult) {
    return {
      averageScore: null,
      averageCompareScore: null,
      xScoreDiff: null,
      yScoreDiff: null,
      zScoreDiff: null,
      averageDiff: null,
    };
  }

  const { x, y, z } = evaluationResult;
  const isString = (...vals: unknown[]) =>
    vals.some((v) => typeof v === "string");

  // 서버가 계산한 평균을 우선 쓰고, averageScore가 없는 이전 리포트만 직접 계산한다.
  const averageScore =
    typeof evaluationResult.averageScore === "number"
      ? (evaluationResult.averageScore.toFixed(1) as unknown as number)
      : isString(x.score, y.score, z.score)
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
    xScoreDiff: passScoreData != null ? x.score - passScoreData.x : null,
    yScoreDiff: passScoreData != null ? y.score - passScoreData.y : null,
    zScoreDiff: passScoreData != null ? z.score - passScoreData.z : null,
    averageDiff:
      averageScore !== "-" && averageCompareScore !== "-"
        ? averageScore - averageCompareScore
        : null,
  };
}
