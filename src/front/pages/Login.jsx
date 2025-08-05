import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const err = await response.json();
        setError(err.msg || "Error al iniciar sesión");
        return;
      }

      const data = await response.json();

      // Guardamos token en localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);

      // Redirección según rol
      switch (data.user.role) {
        case "admin":
          navigate("/Home-Admin");
          break;
        case "stylist":
          navigate("/Home-Stylist");
          break;
        case "user":
          navigate("/Home-User");
          break;
        default:
          setError("Rol desconocido, contacte al administrador.");
      }
    } catch (error) {
      console.error(error);
      setError("Error al conectar con el servidor");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="mb-3">
        <input
          type="email"
          placeholder="Correo electrónico"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <input
          type="password"
          placeholder="Contraseña"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary w-100">
        Ingresar
      </button>
    </form>
  );
};

export default Login;