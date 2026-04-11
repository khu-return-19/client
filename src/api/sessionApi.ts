import { useMutation } from "@tanstack/react-query";
import api from "api/axiosInstance";

export const SESSION_STORAGE_KEY = "sessionStartTime";
export const SESSION_DURATION_MS = 30 * 60 * 1000; // 30분

interface StartSessionData {
  email: string;
  agreements: {
    termsOfServiceAgreed: boolean;
    privacyCollectionAgreed: boolean;
    privacyPolicyAgreed: boolean;
    thirdPartySharingAgreed: boolean;
  };
}

// NOTE: 세션 시작 (이메일 인증 + 약관 동의 후 세션 쿠키 발급)
export const useStartSession = () => {
  return useMutation({
    mutationFn: async (data: StartSessionData) => {
      const response = await api.post("/api/sessions/start", data, {
        headers: { "X-API-Version": "2" },
      });
      return response.data;
    },
  });
};

// NOTE: 세션 연장
export const useExtendSession = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await api.post(
        "/api/sessions/extend",
        { extendMinutes: 30 },
        { headers: { "X-API-Version": "2" } }
      );
      return response.data;
    },
  });
};
