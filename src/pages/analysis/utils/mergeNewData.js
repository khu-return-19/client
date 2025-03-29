import { groupAnalysesByDate } from "./groupAnalysesByDate";

export const mergeNewData = (prevGroupedAnalyses, newAnalyses, allAnalyses) => {
  const updatedGrouped = { ...prevGroupedAnalyses };
  const newGroupedData = groupAnalysesByDate(newAnalyses);

  // 1. 새로 받은 데이터를 기존 groupedAnalyses에 추가
  Object.entries(newGroupedData).forEach(([key, analyses]) => {
    if (!updatedGrouped[key]) {
      updatedGrouped[key] = [];
    }
    updatedGrouped[key] = [...updatedGrouped[key], ...analyses];
  });

  // 2. 삭제된 항목 처리
  Object.keys(updatedGrouped).forEach((category) => {
    // 기존 카테고리의 분석 데이터
    const prevCategoryAnalyses = updatedGrouped[category];

    // 해당 카테고리에서 삭제된 항목을 제거
    updatedGrouped[category] = prevCategoryAnalyses.filter((analysis) =>
      allAnalyses.some((newAnalysis) => newAnalysis.id === analysis.id)
    );

    // 카테고리 내에 더 이상 항목이 없으면 해당 카테고리 삭제
    if (updatedGrouped[category].length === 0) {
      delete updatedGrouped[category];
    }
  });

  return updatedGrouped;
};
