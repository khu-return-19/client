import React, { createContext, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { checkAuthStatus, login, logout } from "auth/authService";

const authContext = createContext();

export function AuthProvider({ children }) {
  const queryClient = useQueryClient();

  // NOTE: 로그인 상태를 체크하는 useQuery
  const {
    data: userInfo,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: "authStatus",
    queryFn: checkAuthStatus,
    retry: false,
  });

  // NOTE: 로그아웃 처리하는 useMutation
  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      // NOTE: 로그아웃 후에는 인증 정보를 새로고침하여 반영
      queryClient.invalidateQueries("authStatus");
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const isLoggedIn = isSuccess && userInfo !== null;

  return (
    <authContext.Provider
      value={{
        isLoggedIn,
        userInfo,
        login,
        logout: handleLogout,
        loading: isLoading,
        error: isError,
      }}
    >
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  return useContext(authContext);
}
