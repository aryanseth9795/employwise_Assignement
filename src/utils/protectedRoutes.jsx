import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAuth, children, Redirect = "/" }) => {
  if (!isAuth) return <Navigate to={Redirect} />;
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
