import { useMutation } from "@tanstack/react-query";
import api from "api/axiosInstance";

// NOTE: 인증 이메일 발송
export const useSendVerifyEmail = () => {
  return useMutation({
    mutationFn: async (email) => {
      const response = await api.post("/api/auth/email/verification", { email }, {
        headers: { "X-API-Version": "2" },
      });
      return response.data;
    },
  });
};

// NOTE: 인증번호 확인
export const useVerifyEmailCode = () => {
  return useMutation({
    mutationFn: async ({ email, accessCode }) => {
      const response = await api.post("/api/auth/email/verify", {
        email,
        accessCode: parseInt(accessCode, 10),
      }, {
        headers: { "X-API-Version": "2" },
      });
      return response.data;
    },
  });
};
