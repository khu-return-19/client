import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isYesterday from "dayjs/plugin/isYesterday";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(isYesterday);

export const groupAnalysesByDate = (analyses) => {
  const today = dayjs();
  const groupedData = {};

  analyses.forEach((analysis) => {
    const createdAt = dayjs(analysis.createdAt);

    if (createdAt.isSame(today, "day")) {
      groupedData["오늘"] = groupedData["오늘"] || [];
      groupedData["오늘"].push(analysis);
    } else if (createdAt.isYesterday()) {
      groupedData["어제"] = groupedData["어제"] || [];
      groupedData["어제"].push(analysis);
    } else if (createdAt.isSameOrAfter(today.subtract(7, "day"), "day")) {
      groupedData["지난 7일"] = groupedData["지난 7일"] || [];
      groupedData["지난 7일"].push(analysis);
    } else if (createdAt.isSameOrAfter(today.subtract(30, "day"), "day")) {
      groupedData["지난 30일"] = groupedData["지난 30일"] || [];
      groupedData["지난 30일"].push(analysis);
    } else if (createdAt.year() === today.year()) {
      // 올해(2025년) 데이터는 "월" 단위로 저장
      const monthLabel = `${createdAt.month() + 1}월`;
      groupedData[monthLabel] = groupedData[monthLabel] || [];
      groupedData[monthLabel].push(analysis);
    } else {
      // 작년(2024년)부터 그 이전까지는 "연도" 단위로 저장
      const yearLabel = `${createdAt.year()}년`;
      groupedData[yearLabel] = groupedData[yearLabel] || [];
      groupedData[yearLabel].push(analysis);
    }
  });

  return groupedData;
};
