import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "auth/authContext";

const PrivateRoute = ({ element }) => {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    return null;
  }

  return isLoggedIn ? element : <Navigate to="/error" replace />;
};

export default PrivateRoute;
