import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaUser, FaChevronDown, FaTimes, FaBars } from "react-icons/fa";
import logo from "../assets/img/logo1.jpg";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [location]);

  // Glass morphism effect
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
      <Link 
        to="/" 
        style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: "1rem",
          textDecoration: "none",
          zIndex: 1001
        }}
      >
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
      <div style={{ display: { xs: "none", md: "flex" } }}>
        <ul style={{
          display: "flex",
          listStyle: "none",
          gap: "2rem",
          margin: 0,
          padding: 0
        }}>
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
          <span>Sign In</span>
          <motion.span
            animate={{ rotate: dropdownOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <FaChevronDown size={14} />
          </motion.span>
        </motion.button>

        <AnimatePresence>
          {dropdownOpen && (
            <motion.ul
              style={{
                position: "absolute",
                right: 0,
                top: "100%",
                marginTop: "0.5rem",
                background: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(10px)",
                borderRadius: "12px",
                padding: "0.5rem 0",
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                listStyle: "none",
                minWidth: "200px",
                overflow: "hidden"
              }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <li style={{ 
                padding: "0.75rem 1.5rem",
                color: "#5a4a42",
                fontWeight: "600",
                borderBottom: "1px solid rgba(0,0,0,0.05)"
              }}>
                User Name
              </li>
              {[
                { path: "/profile", name: "Profile" },
                { path: "/appointment", name: "My Appointments" },
                { path: "/contact", name: "Contact Support" }
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    style={{
                      display: "block",
                      padding: "0.75rem 1.5rem",
                      color: "#5a4a42",
                      textDecoration: "none",
                      transition: "all 0.2s ease"
                    }}
                    whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "0.75rem 1.5rem",
                    background: "none",
                    border: "none",
                    color: "#ff4d4f",
                    cursor: "pointer",
                    fontWeight: "500"
                  }}
                  onClick={() => console.log("Logout")}
                >
                  Sign Out
                </button>
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        style={{
          display: { xs: "flex", md: "none" },
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(167, 112, 108, 0.95)",
              backdropFilter: "blur(10px)",
              zIndex: 1000,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "2rem"
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
              textAlign: "center"
            }}>
              {[
                { path: "/", name: "Home" },
                { path: "/services", name: "Services" },
                { path: "/gallery", name: "Gallery" },
                { path: "/appointment", name: "Appointment" },
                { path: "/contact", name: "Contact" }
              ].map((item) => (
                <motion.li
                  key={item.path}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <Link
                    to={item.path}
                    style={{
                      color: location.pathname === item.path ? "#fff" : "rgba(255,255,255,0.8)",
                      textDecoration: "none",
                      fontSize: "1.5rem",
                      fontWeight: "500"
                    }}
                    onClick={toggleMobileMenu}
                  >
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;