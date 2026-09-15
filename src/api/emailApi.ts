import { useMutation } from "@tanstack/react-query";
import api from "api/axiosInstance";

function getRetryAfterHeader(headers: any) {
  if (!headers) return undefined;
  if (typeof headers.get === "function") {
    return headers.get("Retry-After") ?? headers.get("retry-after");
  }
  return headers["retry-after"] ?? headers["Retry-After"];
}

export const getRetryAfterSeconds = (error: any) => {
  if (Number.isFinite(error?.retryAfterSeconds)) {
    return Math.max(0, Math.ceil(error.retryAfterSeconds));
  }

  const raw = getRetryAfterHeader(error?.response?.headers);
  if (raw == null || raw === "") return 0;

  const seconds = Number(raw);
  if (Number.isFinite(seconds)) return Math.max(0, Math.ceil(seconds));

  const retryAt = Date.parse(raw);
  if (Number.isNaN(retryAt)) return 0;
  return Math.max(0, Math.ceil((retryAt - Date.now()) / 1000));
};

export const getResponseStatus = (error: any) =>
  error?.status ?? error?.response?.status;

const normalizeEmailError = (error: any) => {
  const normalized = new Error(
    error?.response?.data?.message || error?.message || "인증 요청에 실패했습니다.",
  ) as Error & {
    status?: number;
    retryAfterSeconds?: number;
    response?: any;
  };
  normalized.status = getResponseStatus(error);
  normalized.retryAfterSeconds = getRetryAfterSeconds(error);
  normalized.response = error?.response;
  return normalized;
};

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
        throw normalizeEmailError(error);
      }
    },
  });
};
// NOTE: 인증번호 확인
export const useVerifyEmailCode = () => {
  return useMutation({
    mutationFn: async ({ email, code }: VerifyEmailData) => {
      try {
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
      } catch (error: any) {
        throw normalizeEmailError(error);
      }
    },
  });
};
