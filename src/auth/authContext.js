import React, { createContext, useContext, useEffect, useState } from "react";
import { checkAuthStatus, login, logout } from "auth/authService";

const authContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    checkAuthStatus().then((data) => {
      if (data) {
        setIsLoggedIn(true);
        setUserInfo(data);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  const handleLogout = async () => {
    await logout();
    setIsLoggedIn(false);
    setUserInfo({});
  };

  return (
    <authContext.Provider value={{ isLoggedIn, userInfo, login, logout: handleLogout }}>
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  return useContext(authContext);
}
