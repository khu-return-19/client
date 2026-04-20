import {
  useMutation,
  useQuery,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import api from "api/axiosInstance";
import { CreateAnalysisData, AnalysisEvent } from "schema/Analysis";

// NOTE: 분석 보고서 목록 무한 스크롤 조회
export const useFetchAnalyses = () => {
  return useInfiniteQuery({
    queryKey: ["analyses"],
    queryFn: async ({ pageParam = 1 }: { pageParam?: number }) => {
      const response = await api.get(`/analyses?page=${pageParam}`);
      return response.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage: any[], allPages: any[][]) => {
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
export const useFetchAnalysis = (id: string | number) => {
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
    mutationFn: async (id: string | number) => {
      const response = await api.delete("/analysis", { data: { id } });
      return response.data;
    },
    onSuccess: (_, id: string | number) => {
      console.log(id);
      queryClient.setQueryData(["analyses"], (oldData: any) => {
        const newPagesArray = oldData.pages.map(
          (page: any[]) => page.filter((analysis: any) => analysis.id !== id), // 삭제된 id 제외한 데이터
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

export const getNumOfAnalysis = async () => {
  const email = sessionStorage.getItem("verifiedEmail");
  const response = await api.get("/api/auth/email/credit", {
    params: { email },
  });
  return response.data;
};

export const useNumOfAnalysis = () => {
  return useQuery({
    queryKey: ["numOfAnalysis"],
    queryFn: getNumOfAnalysis,
  });
};

// 스트리밍 fetch + EventSorce 방식 사용을 위해 fetch API로 직접 구현
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const createAnalysis = async (
  data: CreateAnalysisData,
  onEvent: (event: AnalysisEvent) => void,
  signal?: AbortSignal,
) => {
  const response = await fetch(`${BASE_URL}/api/analysis`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-API-Version": "2" },
    body: JSON.stringify(data),
    signal,
  });

  if (!response.ok) throw new Error("분석 요청 실패");

  const reader = response.body!.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  // signal abort 시 reader도 강제 취소
  signal?.addEventListener("abort", () => { reader.cancel(); });

  while (true) {
    const { done, value } = await reader.read();
    if (done || signal?.aborted) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      if (!line.startsWith("data:")) continue;
      const event = JSON.parse(line.slice(5));
      onEvent(event);
    }
  }
};
