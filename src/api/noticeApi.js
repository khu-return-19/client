import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "api/axiosInstance";

// NOTE: 공지사항 목록 조회
export const useFetchNotices = (page, size) => {
  return useQuery({
    queryKey: ["notices", page, size],
    queryFn: async () => {
      const response = await api.get("/notice", {
        params: { page, size }, //
      });
      return response.data;
    },
    keepPreviousData: true, // 페이지네이션 시 이전 데이터 유지
  });
};

// NOTE: 특정 공지사항 조회
export const useFetchNotice = (id) => {
  return useQuery({
    queryKey: ["notice", id],
    queryFn: async () => {
      const response = await api.get(`/notice/${id}`);
      return response.data;
    },
    enabled: !!id, // id가 있을 때만 요청 실행
  });
};

// NOTE: 공지사항 등록
export const useCreateNotice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (noticeData) => {
      const response = await api.post("/notice", noticeData);
      return response.data;
    },
    onSuccess: () => {
      // 새로운 공지가 추가되었을 때 기존 리스트를 갱신
      queryClient.invalidateQueries(["notices"]);
    },
  });
};

// NOTE: 공지사항 삭제
export const useDeleteNotice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const response = await api.delete("/notice", {
        data: { id },
      });
      return response.data;
    },
    onSuccess: () => {
      // 공지 삭제 후 공지 목록 갱신
      queryClient.invalidateQueries(["notices"]);
    },
  });
};

// NOTE: 공지사항 수정
export const useUpdateNotice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, title, content }) => {
      const response = await api.patch("/notice", { id, title, content });
      return response.data;
    },
    onSuccess: () => {
      // 공지 수정 후 공지 목록 갱신
      queryClient.invalidateQueries(["notices"]);
    },
  });
};
