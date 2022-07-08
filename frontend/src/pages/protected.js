import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { isUserAuthenticated } from "../lib/auth";

export const ProtectedRoute = () => {
  return isUserAuthenticated() ? <Outlet /> : <Navigate to='/' replace />;
};
