// src/components/PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const userRole = localStorage.getItem("userRole");
  return userRole ? children : <Navigate to="/" />;
};

export default PrivateRoute;
