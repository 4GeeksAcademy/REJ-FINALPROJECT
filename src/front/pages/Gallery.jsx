import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import "./Gallery.css";

// Importar imágenes locales
import barber from "../assets/img/barber.jpg";
import face from "../assets/img/face.jpg";
import mancut from "../assets/img/mancut.jpg";
import menCut from "../assets/img/menCut.jpg";
import nail from "../assets/img/nail.jpg";
import women from "../assets/img/women.jpg";

const images = [
  { src: mancut, text: "Classic Man Cut", category: "haircut" },
  { src: menCut, text: "Modern Design", category: "haircut" },
  { src: barber, text: "Professional Shave", category: "beard" },
  { src: nail, text: "Nail Design", category: "nails" },
  { src: women, text: "Women Cut", category: "haircut" },
  { src: face, text: "Face Massage", category: "spa" }
];

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flippedIndex, setFlippedIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? filteredImages.length - 1 : prev - 1));
    setFlippedIndex(null);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === filteredImages.length - 1 ? 0 : prev + 1));
    setFlippedIndex(null);
  };

  const handleFlip = (index) => {
    setFlippedIndex(index === flippedIndex ? null : index);
  };

  const filteredImages = activeCategory === "all" 
    ? images 
    : images.filter(img => img.category === activeCategory);

  useEffect(() => {
    const handleClickOutside = () => setFlippedIndex(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleCardClick = (e, index) => {
    e.stopPropagation();
    handleFlip(index);
  };

  const visibleImages = Math.min(4, filteredImages.length);
  const displayedImages = [];
  for (let i = 0; i < visibleImages; i++) {
    displayedImages.push(filteredImages[(currentIndex + i) % filteredImages.length]);
  }

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
          maxWidth: "1400px",
          margin: "0 auto",
          position: "relative",
          zIndex: 2
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1 
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: "700",
            marginBottom: "2rem",
            background: "linear-gradient(90deg, #fff, #f8d7d3)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            textAlign: "center"
          }}
        >
          Gallery
        </motion.h1>

        {/* Category filters */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "2rem"
        }}>
          <CategoryButton 
            active={activeCategory === "all"}
            onClick={() => setActiveCategory("all")}
          >
            all
          </CategoryButton>
          <CategoryButton 
            active={activeCategory === "haircut"}
            onClick={() => setActiveCategory("haircut")}
          >
            cuts
          </CategoryButton>
          <CategoryButton 
            active={activeCategory === "beard"}
            onClick={() => setActiveCategory("beard")}
          >
            shave
          </CategoryButton>
          <CategoryButton 
            active={activeCategory === "nails"}
            onClick={() => setActiveCategory("nails")}
          >
            nails
          </CategoryButton>
          <CategoryButton 
            active={activeCategory === "spa"}
            onClick={() => setActiveCategory("spa")}
          >
            Spa
          </CategoryButton>
        </div>

        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "2rem",
          position: "relative"
        }}>
          <motion.div 
            className="carousel-arrow left" 
            onClick={handlePrev}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaChevronLeft />
          </motion.div>
          
          <div style={{
            display: "flex",
            gap: "2rem",
            padding: "1rem 0",
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            scrollBehavior: "smooth",
            WebkitOverflowScrolling: "touch",
            width: "100%",
            justifyContent: "center"
          }}>
            {displayedImages.map((img, idx) => {
              const globalIndex = (currentIndex + idx) % filteredImages.length;
              return (
                <motion.div
                  key={globalIndex}
                  className={`carousel-card ${
                    flippedIndex === globalIndex ? "flipped" : ""
                  }`}
                  onClick={(e) => handleCardClick(e, globalIndex)}
                  whileHover={{ y: -10 }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="card-inner">
                    <div className="card-front">
                      <img 
                        src={img.src} 
                        alt={img.text} 
                        className="carousel-image" 
                      />
                    </div>
                    <div className="card-back">
                      <h3>{img.text}</h3>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          <motion.div 
            className="carousel-arrow right" 
            onClick={handleNext}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaChevronRight />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

const CategoryButton = ({ children, active, onClick }) => (
  <motion.button
    onClick={onClick}
    style={{
      padding: "0.6rem 1.2rem",
      borderRadius: "50px",
      background: active ? "rgba(255,255,255,0.3)" : "transparent",
      color: "#fff",
      cursor: "pointer",
      border: "1px solid rgba(255,255,255,0.3)",
      fontWeight: "500",
      fontSize: "0.9rem"
    }}
    whileHover={{ 
      background: "rgba(255,255,255,0.2)",
      scale: 1.05
    }}
    whileTap={{ scale: 0.95 }}
  >
    {children}
  </motion.button>
);

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

export default Gallery;