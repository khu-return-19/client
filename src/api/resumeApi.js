import api from "./axiosInstance";
import { useMutation, useQuery } from "@tanstack/react-query";

// NOTE: 자기소개서 목록 조회
export const useFetchResumes = () => {
  return useQuery({
    queryKey: ["resumes"],
    queryFn: async () => {
      const response = await api.get("/resumes");
      return response.data;
    },
  });
};

// // NOTE: 자기소개서 조회
// export const useFetchResume = (id) => {
//   return useQuery({
//     queryKey: ["resume", id],
//     queryFn: async () => {
//       const response = await api.get(`/resume/${id}`);
//       return response.data;
//     },
//     enabled: !!id, // id가 있을 때만 쿼리 활성화
//   });
// };

// // 자기소개서 수정
// export const useUpdateResume = (id) => {
//   return useMutation({
//     mutationFn: (data) => api.patch(`/resume/${id}`, data),
//   });
// };

// NOTE: 자기소개서 생성
export const useCreateResume = () => {
  return useMutation({
    mutationFn: (data) => api.post("/resume", data),
  });
};

// NOTE: 자기소개서 삭제
export const useDeleteResume = () => {
  return useMutation({
    mutationFn: (resumeId) => api.delete(`/resume/${resumeId}`),
  });
};

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

export const useUpdateResume = () => {
  return useMutation({
    mutationFn: (data) => api.patch("/resume", data),
  });
};
