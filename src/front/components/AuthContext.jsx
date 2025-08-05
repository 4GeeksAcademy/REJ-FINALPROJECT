// src/front/components/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [role, setRole] = useState(localStorage.getItem("role") || null);

  // 🔹 Normalizamos la URL para evitar dobles slashes
  const backendURL = import.meta.env.VITE_BACKEND_URL.replace(/\/$/, "");

  // Mantener login si hay token en localStorage
  useEffect(() => {
    if (token) setIsLoggedIn(true);
  }, [token]);

  const login = async (email, password) => {
    try {
      const resp = await fetch(`${backendURL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include", // 🔹 Si usas JWT con cookies o sesiones
      });

      const data = await resp.json();

      if (!resp.ok) {
        throw new Error(data.msg || "Error al iniciar sesión");
      }

      const receivedToken = data.access_token || data.token;
      const userRole = data.role || "user";

      if (!receivedToken) throw new Error("Token no recibido del backend");

      // Guardar token y rol en localStorage
      localStorage.setItem("token", receivedToken);
      localStorage.setItem("role", userRole);

      // Actualizar estado global
      setToken(receivedToken);
      setRole(userRole);
      setIsLoggedIn(true);

      return { success: true, role: userRole };
    } catch (err) {
      console.error("❌ Error de login:", err.message);
      return { success: false, message: err.message };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken(null);
    setRole(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
