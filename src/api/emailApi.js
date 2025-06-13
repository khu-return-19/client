import { useMutation } from "@tanstack/react-query";
import api from "api/axiosInstance";

// NOTE: 인증 이메일 발송
export const useSendVerifyEmail = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      const response = await api.post("/send-verify-email", { email });
      return response.data;
    },
  });
};

// NOTE: 인증번호 확인
export const useVerifyEmailCode = () => {
  return useMutation({
    mutationFn: async ({ email, accessCode }) => {
      const response = await api.post("/verify-email", {
        email,
        accessCode: parseInt(accessCode, 10),
      });
      return response.data;
    },
  });
};
