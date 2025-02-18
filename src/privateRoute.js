import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "auth/authContext";

const PrivateRoute = ({ element }) => {
  const { isLoggedIn, loading, error } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error occurred while checking authentication.</div>;
  }

  return isLoggedIn ? element : <Navigate to="/error" replace />;
};

export default PrivateRoute;
