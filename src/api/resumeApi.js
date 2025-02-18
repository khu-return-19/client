import api from "./axiosInstance";
import { useMutation, useQuery } from "@tanstack/react-query";

// 자기소개서 목록 조회
export const useFetchResumes = () => {
  return useQuery({
    queryKey: ["resumes"],
    queryFn: async () => {
      const response = await api.get("/resumes");
      return response.data;
    },
  });
};

// 자기소개서 생성
export const useCreateResume = () => {
  return useMutation({
    mutationFn: (data) => api.post("/resume", data),
  });
};

// 자기소개서 삭제
export const useDeleteResume = () => {
  return useMutation({
    mutationFn: (resumeId) => api.delete(`/resume/${resumeId}`),
  });
};
