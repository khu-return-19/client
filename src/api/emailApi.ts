import { useMutation } from "@tanstack/react-query";
import api from "api/axiosInstance";

interface VerifyEmailData {
  email: string;
  code: string;
}

// NOTE: 인증 이메일 발송
export const useSendVerifyEmail = () => {
  return useMutation({
    mutationFn: async (email) => {
  try {
    const response = await api.post(
      "/api/auth/email/verification",
      { email },
      { headers: { "X-API-Version": "2" } },
    );
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    return response.data;
 } catch (error: any) {
  const message = error.response?.data?.message || error.message;
  throw new Error(message);
}
},
  });
};
// NOTE: 인증번호 확인
export const useVerifyEmailCode = () => {
  return useMutation({
    mutationFn: async ({ email, code }: VerifyEmailData) => {
      const response = await api.post(
        "/api/auth/email/verify",
        {
          email,
          code: parseInt(code, 10),
        },
        {
          headers: { "X-API-Version": "2" },
        },
      );
      return response.data;
    },
  });
};
