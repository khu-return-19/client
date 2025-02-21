import { useMutation, useQuery } from "@tanstack/react-query";
import api from "api/axiosInstance";

// NOTE: 분석 보고서 목록 조회
export const useFetchAnalyses = () => {
  return useQuery({
    queryKey: ["analyses"],
    queryFn: async () => {
      const response = await api.get("/analyses");
      return response.data;
    },
  });
};
