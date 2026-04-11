import { useMutation } from "@tanstack/react-query";
import api from "api/axiosInstance";

interface StartSessionData {
  email: string;
  agreements: {
    termsOfServiceAgreed: boolean;
    privacyCollectionAgreed: boolean;
    privacyPolicyAgreed: boolean;
    thirdPartySharingAgreed: boolean;
  };
}

// 세션 시작 (이메일 인증 + 약관 동의 후 세션 쿠키 발급)
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
