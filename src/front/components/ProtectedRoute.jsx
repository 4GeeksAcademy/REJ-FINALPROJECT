import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Si no hay token, redirige al inicio (login)
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Si hay rol requerido y no coincide, redirige al home correspondiente
  if (requiredRole && role !== requiredRole) {
    switch (role) {
      case "admin":
        return <Navigate to="/Home_Admin" replace />;
      case "stylist":
        return <Navigate to="/Home_Stylist" replace />;
      case "user":
        return <Navigate to="/Home_User" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  // Si todo está correcto, renderiza el contenido protegido
  return children;
};

export default ProtectedRoute;
