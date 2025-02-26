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

// NOTE: 로그인 상태 확인
export const checkAuthStatus = async () => {
  try {
    const response = await api.get("/status");
    return response.data;
  } catch (error) {
    console.error("로그인 상태 확인 실패:", error);
    return false;
  }
};

// NOTE: 사용자 정보 가져오기 (로그인 상태일 때만 호출)
export const fetchUserInfo = async () => {
  try {
    const response = await api.get("/my-info");
    return response.data;
  } catch (error) {
    console.error("사용자 정보 가져오기 실패:", error);
    return null;
  }
};
