import { groupAnalysesByDate } from "./groupAnalysesByDate";

export const mergeNewData = (prevGroupedAnalyses, newAnalyses) => {
  const updatedGrouped = { ...prevGroupedAnalyses };
  const newGroupedData = groupAnalysesByDate(newAnalyses);

  Object.entries(newGroupedData).forEach(([key, analyses]) => {
    if (!updatedGrouped[key]) {
      updatedGrouped[key] = [];
    }
    updatedGrouped[key] = [...updatedGrouped[key], ...analyses];
  });

  return updatedGrouped;
};
