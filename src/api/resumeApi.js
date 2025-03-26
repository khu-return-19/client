import api from "./axiosInstance";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

// NOTE: 이력서 조회
export const useFetchResume = () => {
  return useQuery({
    queryKey: ["resume"],
    queryFn: async () => {
      const response = await api.get("/resume");
      return response.data;
    },
  });
};

// NOTE: 이력서 저장
export const useUpdateResume = () => {
  return useMutation({
    mutationFn: (data) => api.patch("/resume", data),
    onSuccess: () => {
      toast.success("이력서가 성공적으로 저장되었습니다!");
    },
    onError: () => {
      toast.error("저장 중 오류가 발생했습니다. 다시 시도해주세요.");
    },
  });
};
