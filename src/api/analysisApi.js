import { useMutation, useQuery, useInfiniteQuery } from "@tanstack/react-query";
import api from "api/axiosInstance";

// // NOTE: 분석 보고서 목록 조회
// export const useFetchAnalyses = ({ page }) => {
//   return useQuery({
//     queryKey: ["analyses", page],
//     queryFn: async () => {
//       const response = await api.get(`/analyses?page=${page}`);
//       return response.data;
//     },
//     keepPreviousData: true, // 페이지가 변경되어도 이전 데이터를 유지
//   });
// };

// NOTE: 분석 보고서 목록 무한 스크롤 조회
export const useFetchAnalyses = () => {
  return useInfiniteQuery({
    queryKey: ["analyses"],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await api.get(`/analyses?page=${pageParam}`);
      return response.data;
    },
    getNextPageParam: (lastPage, allPages) => {
      // 응답 데이터가 없으면 더 이상 요청하지 않음
      if (lastPage.length === 0) {
        return undefined;
      }
      // 데이터가 있으면 다음 페이지 번호를 반환
      return allPages.length + 1;
    },
    keepPreviousData: true, // 기존 데이터 유지
  });
};

// NOTE: 특정 분석 보고서 조회
export const useFetchAnalysis = (id) => {
  return useQuery({
    queryKey: ["analysis", id],
    queryFn: async () => {
      const response = await api.get(`/analysis/${id}`);
      return response.data;
    },
    enabled: !!id, // id가 있을 때만 활성화
  });
};

// // NOTE: 분석 보고서 생성
// export const useCreateAnalysis = () => {
//   return useMutation({
//     mutationFn: async (resumeId) => {
//       const response = await api.post("/analysis", { id: resumeId });
//       return response.data;
//     },
//   });
// };

// NOTE: 분석 보고서 삭제
export const useDeleteAnalyses = () => {
  return useMutation({
    mutationFn: async (ids) => {
      const response = await api.delete("/analyses", { data: { id: ids } });
      return response.data;
    },
  });
};

// NOTE: 분석 보고서 생성
export const useCreateAnalysis = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await api.post("/analysis", data);
      return response.data;
    },
  });
};
