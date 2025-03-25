import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "auth/authContext";
import LoadingSpinner from "shared/loadingSpinner";

const PrivateRoute = ({ element }) => {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return isLoggedIn ? <Outlet /> : <Navigate to="/error" replace />;
};

export default PrivateRoute;
