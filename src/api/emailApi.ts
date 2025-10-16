import { useMutation } from "@tanstack/react-query";
import api from "api/axiosInstance";

// NOTE: 이메일 인증 코드 확인 API에 전달할 데이터 타입
export interface VerifyEmailCodeData {
  email: string;
  accessCode: string;
}

// NOTE: 인증 이메일 발송 API의 응답 타입
export interface SendVerifyEmailResponse {
  success: boolean;
  message: string | null;
}

// NOTE: 이메일 인증 코드 확인 API의 응답 타입
export interface VerifyEmailCodeResponse {
  id: number;
  email: string;
  count: number;
  verificationSuccessCount: number;
  valid: boolean;
}

// NOTE: 인증 이메일 발송
export const useSendVerifyEmail = () => {
  return useMutation<SendVerifyEmailResponse, Error, string>({
    mutationFn: async (email) => {
      const response = await api.post("/send-verify-email", { email });
      return response.data;
    },
  });
};

// NOTE: 인증번호 확인
export const useVerifyEmailCode = () => {
  return useMutation<VerifyEmailCodeResponse, Error, VerifyEmailCodeData>({
    mutationFn: async ({ email, accessCode }) => {
      const response = await api.post("/verify-email", {
        email,
        accessCode: parseInt(accessCode, 10),
      });
      return response.data;
    },
  });
};
