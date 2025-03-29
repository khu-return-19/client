import { useMutation, useQuery, useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import api from "api/axiosInstance";

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

export const useDeleteAnalyses = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const response = await api.delete("/analysis", { data: { id } });
      return response.data;
    },
    onSuccess: (_, id) => {
      console.log(id);
      queryClient.setQueryData(["analyses"], (oldData) => {
        const newPagesArray = oldData.pages.map(
          (page) => page.filter((analysis) => analysis.id !== id) // 삭제된 id 제외한 데이터
        );

        return {
          pages: newPagesArray,
          pageParams: oldData.pageParams,
        };
      });
    },
    onError: (error) => {
      console.error("삭제 중 오류 발생:", error);
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
