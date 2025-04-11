import React, { createContext, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { checkAuthStatus, fetchUserInfo, login, logout } from "auth/authService";

const authContext = createContext();

export function AuthProvider({ children }) {
  const queryClient = useQueryClient();

  // NOTE: 로그인 상태를 체크하는 useQuery
  const {
    data: isAuthenticated,
    isLoading: isAuthLoading,
    isError: isAuthError,
    isSuccess: isAuthSuccess,
  } = useQuery({
    queryKey: ["authStatus"],
    queryFn: checkAuthStatus,
    retry: false,
  });

  // NOTE: 사용자 정보를 가져오는 useQuery (로그인 상태일 때만 실행)
  const {
    data: userInfo,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useQuery({
    queryKey: ["userInfo"],
    queryFn: fetchUserInfo,
    enabled: isAuthSuccess && isAuthenticated, // 로그인 상태일 때만 요청
    retry: false,
  });

  // NOTE: 로그아웃 처리하는 useMutation
  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries(["authStatus"]);
      queryClient.removeQueries(["userInfo"]);
      window.location.replace("/");
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const isLoggedIn = isAuthSuccess && isAuthenticated;
  const loading = isAuthLoading || isUserLoading;
  const error = isAuthError || isUserError;

  return (
    <authContext.Provider
      value={{
        isLoggedIn,
        userInfo,
        login,
        logout: handleLogout,
        loading,
        error,
      }}
    >
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  return useContext(authContext);
}
