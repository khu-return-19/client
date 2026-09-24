import axios from "axios";
import { API_BASE_URL } from "./baseUrl";
import { dispatchAuthExpired, isProtectedApiUrl } from "api/authRecovery";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "X-API-Version": "2",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error?.response?.status === 401 &&
      isProtectedApiUrl(error?.config?.url)
    ) {
      dispatchAuthExpired();
    }
    return Promise.reject(error);
  },
);

export default api;
