import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import homeImage from "../assets/img/BeautySalon.jpg";
import logo from "../assets/img/logo.webp";
import { FaArrowRight } from "react-icons/fa";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  // Glass morphism effect
  const glassStyle = {
    background: "rgba(255, 255, 255, 0.15)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: "1px solid rgba(255, 255, 255, 0.18)",
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)"
  };

  return (
    <div style={{
      background: "linear-gradient(135deg, #c58e7e 0%, #663f3d 100%)",
      minHeight: "100vh",
      padding: "2rem",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Floating particles background */}
      <div style={particlesContainer}>
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            style={particleStyle}
            animate={{
              y: [0, 100, 0],
              x: [0, 50, 0],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 10 + Math.random() * 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Main content with glass morphism */}
      <motion.div 
        style={{
          ...glassStyle,
          borderRadius: "24px",
          padding: "3rem",
          display: "flex",
          flexDirection: window.innerWidth < 1024 ? "column" : "row",
          gap: "3rem",
          maxWidth: "1400px",
          margin: "0 auto",
          position: "relative",
          zIndex: 2
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Left side - Text content */}
        <div style={{
          flex: 1,
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <img 
              src={logo} 
              alt="Beauty and Style Logo" 
              style={{
                height: "80px",
                marginBottom: "2rem",
                filter: "drop-shadow(0 0 10px rgba(255,255,255,0.3))"
              }}
            />
            
            <motion.h1 
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: "700",
                marginBottom: "1.5rem",
                background: "linear-gradient(90deg, #fff, #f8d7d3)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent"
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              Beauty And Style
            </motion.h1>
            
            <motion.p
              style={{
                fontSize: "1.2rem",
                color: "rgba(255,255,255,0.9)",
                lineHeight: "1.6",
                marginBottom: "2.5rem",
                textShadow: "0 2px 4px rgba(0,0,0,0.1)"
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              "Vive, Vive! Cartago Vive!"
              <br />
              Experience luxury beauty treatments with our expert stylists.
            </motion.p>
            
            <motion.button
              onClick={() => navigate("/Contact")}
              style={{
                background: "linear-gradient(90deg, #a7706c, #c58e7e)",
                color: "#fff",
                border: "none",
                padding: "1rem 2rem",
                borderRadius: "50px",
                fontSize: "1rem",
                fontWeight: "500",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                width: "fit-content",
                boxShadow: "0 4px 15px rgba(167, 112, 108, 0.4)"
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Contact Us <FaArrowRight />
            </motion.button>
          </motion.div>
        </div>

        {/* Right side - Image */}
        <div style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <motion.img 
            src={homeImage} 
            alt="Professional beauty salon" 
            style={{
              width: "100%",
              maxWidth: "600px",
              borderRadius: "20px",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.3)",
              transform: "perspective(1000px) rotateY(10deg)"
            }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            whileHover={{
              transform: "perspective(1000px) rotateY(0deg)"
            }}
          />
        </div>
      </motion.div>
    </div>
  );
};

// Styles
const particlesContainer = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  overflow: "hidden",
  zIndex: 1
};

const particleStyle = {
  position: "absolute",
  background: "rgba(255,255,255,0.6)",
  borderRadius: "50%",
  width: "6px",
  height: "6px"
};

export default Home;