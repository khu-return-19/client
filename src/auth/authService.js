import api from "api/axiosInstance";

// NOTE: 로그인
export const login = () => {
  window.location.href = "https://zackinthebox.shop/oauth2/authorization/google";
};

// NOTE: 로그아웃
export const logout = async () => {
  try {
    await api.post("/sign-out");
  } catch (error) {
    console.error("로그아웃 실패:", error);
  }
};

// NOTE: 로그인 상태 확인 및 사용자 정보 가져오기
export const checkAuthStatus = async () => {
  try {
    const response = await api.get("/my-info");
    return response.data; // { id, username, name, email, role, count }
  } catch (error) {
    return null;
  }
};
