import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaUser, FaChevronDown, FaTimes, FaBars, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { useAuth } from './AuthContext';
import logo from "../assets/img/logo1.jpg";

const Navbar = () => {
  const { isLoggedIn, login, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [location]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password); // Asegúrate que tu AuthContext acepte estos parámetros
      setDropdownOpen(false);
    } catch (error) {
      alert("Error al iniciar sesión: " + error.message);
    }
  };

  const glassStyle = {
    background: scrolled ? "rgba(167, 112, 108, 0.9)" : "rgba(167, 112, 108, 0.7)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    borderBottom: scrolled ? "1px solid rgba(255, 255, 255, 0.1)" : "none",
    boxShadow: scrolled ? "0 5px 15px rgba(0,0,0,0.1)" : "none"
  };

  return (
    <motion.nav
      style={{
        ...glassStyle,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        padding: "1rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 1000,
        transition: "all 0.3s ease"
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Logo */}
      <Link to="/" style={{ display: "flex", alignItems: "center", gap: "1rem", textDecoration: "none", zIndex: 1001 }}>
        <motion.img
          src={logo}
          alt="Beauty Salon Logo"
          style={{
            height: "50px",
            width: "auto",
            borderRadius: "50%",
            objectFit: "cover",
            border: "2px solid rgba(255,255,255,0.2)"
          }}
          whileHover={{ rotate: 5 }}
        />
        <motion.span
          style={{
            color: "#fff",
            fontSize: "1.5rem",
            fontWeight: "600",
            textShadow: "0 2px 5px rgba(0,0,0,0.2)"
          }}
          whileHover={{ scale: 1.05 }}
        >
          Beauty Salon
        </motion.span>
      </Link>

      {/* Desktop Navigation */}
      <div style={{ display: "flex" }}>
        <ul style={{ display: "flex", listStyle: "none", gap: "2rem", margin: 0, padding: 0 }}>
          {[
            { path: "/", name: "Home" },
            { path: "/services", name: "Services" },
            { path: "/gallery", name: "Gallery" },
            { path: "/appointment", name: "Appointment" },
            { path: "/contact", name: "Contact" }
          ].map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                style={{
                  color: location.pathname === item.path ? "#fff" : "rgba(255,255,255,0.8)",
                  textDecoration: "none",
                  fontSize: "1.1rem",
                  fontWeight: "500",
                  position: "relative",
                  padding: "0.5rem 0"
                }}
              >
                {item.name}
                {location.pathname === item.path && (
                  <motion.span
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: "2px",
                      backgroundColor: "#fff",
                      borderRadius: "2px"
                    }}
                    layoutId="underline"
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* User Dropdown */}
      <div style={{ position: "relative", zIndex: 1001 }}>
        <motion.button
          onClick={toggleDropdown}
          style={{
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.3)",
            color: "#fff",
            padding: "0.5rem 1rem",
            borderRadius: "50px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "1rem"
          }}
          whileHover={{ background: "rgba(255,255,255,0.2)" }}
          whileTap={{ scale: 0.95 }}
        >
          <FaUser />
          <span>{isLoggedIn ? "Account" : "Sign In"}</span>
          <motion.span animate={{ rotate: dropdownOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <FaChevronDown size={14} />
          </motion.span>
        </motion.button>

        <AnimatePresence>
          {dropdownOpen && (
            <motion.div
              style={{
                position: "absolute",
                right: 0,
                top: "100%",
                marginTop: "0.5rem",
                background: "rgba(255,255,255,0.95)",
                backdropFilter: "blur(10px)",
                borderRadius: "12px",
                padding: "1.5rem",
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                minWidth: "300px",
                overflow: "hidden"
              }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {!isLoggedIn ? (
                <>
                  <h4 style={{ marginBottom: "1rem", color: "#5a4a42", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <FaSignInAlt /> Iniciar Sesión
                  </h4>
                  <form onSubmit={handleLogin}>
                    <div style={{ marginBottom: "1rem" }}>
                      <input
                        type="email"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "0.75rem",
                          borderRadius: "8px",
                          border: "1px solid #ddd",
                          fontSize: "0.9rem"
                        }}
                        required
                      />
                    </div>
                    <div style={{ marginBottom: "1.5rem" }}>
                      <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "0.75rem",
                          borderRadius: "8px",
                          border: "1px solid #ddd",
                          fontSize: "0.9rem"
                        }}
                        required
                      />
                    </div>
                    <div style={{ display: "flex", gap: "0.75rem" }}>
                      <motion.button
                        type="submit"
                        style={{
                          flex: 1,
                          background: "linear-gradient(90deg, #a7706c, #c58e7e)",
                          color: "#fff",
                          border: "none",
                          padding: "0.75rem",
                          borderRadius: "8px",
                          cursor: "pointer",
                          fontSize: "0.9rem",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "0.5rem"
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <FaSignInAlt /> Ingresar
                      </motion.button>
                      <Link to="/CrearUsuario" style={{ flex: 1, textDecoration: "none" }}>
                        <motion.button
                          type="button"
                          style={{
                            width: "100%",
                            background: "transparent",
                            color: "#5a4a42",
                            border: "1px solid #5a4a42",
                            padding: "0.75rem",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontSize: "0.9rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "0.5rem"
                          }}
                          whileHover={{ scale: 1.02, backgroundColor: "rgba(90, 74, 66, 0.1)" }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setDropdownOpen(false)}
                        >
                          <FaUserPlus /> Registrarse
                        </motion.button>
                      </Link>
                      <Link to="/Home_Admin" style={{ flex: 1, textDecoration: "none" }}>
                        <motion.button
                          type="button"
                          style={{
                            width: "100%",
                            background: "transparent",
                            color: "#5a4a42",
                            border: "1px solid #5a4a42",
                            padding: "0.75rem",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontSize: "0.9rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "0.5rem"
                          }}
                          whileHover={{ scale: 1.02, backgroundColor: "rgba(90, 74, 66, 0.1)" }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setDropdownOpen(false)}
                        >
                          <FaUserPlus /> Admin
                        </motion.button>
                      </Link>
                      <Link to="/Home_Stylist" style={{ flex: 1, textDecoration: "none" }}>
                        <motion.button
                          type="button"
                          style={{
                            width: "100%",
                            background: "transparent",
                            color: "#5a4a42",
                            border: "1px solid #5a4a42",
                            padding: "0.75rem",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontSize: "0.9rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "0.5rem"
                          }}
                          whileHover={{ scale: 1.02, backgroundColor: "rgba(90, 74, 66, 0.1)" }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setDropdownOpen(false)}
                        >
                          <FaUserPlus /> Stylist
                        </motion.button>
                      </Link>
                      <Link to="/Home_User" style={{ flex: 1, textDecoration: "none" }}>
                        <motion.button
                          type="button"
                          style={{
                            width: "100%",
                            background: "transparent",
                            color: "#5a4a42",
                            border: "1px solid #5a4a42",
                            padding: "0.75rem",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontSize: "0.9rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "0.5rem"
                          }}
                          whileHover={{ scale: 1.02, backgroundColor: "rgba(90, 74, 66, 0.1)" }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setDropdownOpen(false)}
                        >
                          <FaUserPlus /> User
                        </motion.button>
                      </Link>
                    </div>
                  </form>
                </>
              ) : (
                <>
                  <div style={{
                    padding: "0.75rem 1.5rem",
                    color: "#5a4a42",
                    fontWeight: "600",
                    borderBottom: "1px solid rgba(0,0,0,0.05)",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem"
                  }}>
                    <FaUser /> ¡Bienvenid@!
                  </div>
                  {[
                    { path: "/profile", name: "Perfil", icon: <FaUser /> },
                    { path: "/appointment", name: "Mis Citas", icon: <FaCalendarAlt /> },
                    { path: "/contact", name: "Soporte", icon: <FaHeadset /> }
                  ].map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        padding: "0.75rem 1.5rem",
                        color: "#5a4a42",
                        textDecoration: "none",
                        transition: "all 0.2s ease",
                        borderBottom: "1px solid rgba(0,0,0,0.05)"
                      }}
                      onClick={() => setDropdownOpen(false)}
                    >
                      {item.icon} {item.name}
                    </Link>
                  ))}
                  <button
                    onClick={() => {
                      logout();
                      setDropdownOpen(false);
                    }}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "0.75rem 1.5rem",
                      background: "none",
                      border: "none",
                      color: "#ff4d4f",
                      cursor: "pointer",
                      fontWeight: "500",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      marginTop: "0.5rem"
                    }}
                  >
                    <FaSignOutAlt /> Cerrar Sesión
                  </button>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Menu Toggle */}
      <button
        onClick={toggleMobileMenu}
        style={{
          display: "none",
          background: "none",
          border: "none",
          color: "#fff",
          fontSize: "1.5rem",
          cursor: "pointer",
          zIndex: 1001
        }}
      >
        {mobileMenuOpen ? <FaTimes /> : <FaBars />}
      </button>
    </motion.nav>
  );
};

export default Navbar;