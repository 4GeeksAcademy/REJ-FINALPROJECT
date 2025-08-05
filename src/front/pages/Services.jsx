import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight, FaTimes, FaClock, FaDollarSign } from "react-icons/fa";
import Modal from "react-modal";
import "./Services.css";

// Import local images
import nail from "../assets/img/nail.jpg";
import women from "../assets/img/women.jpg";
import mancut from "../assets/img/mancut.jpg";
import face from "../assets/img/face.jpg";
import barber from "../assets/img/barber.jpg";
import beautySalon from "../assets/img/BeautySalon.jpg";

Modal.setAppElement("#root");

const Services = () => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      id: 1,
      image: nail,
      title: "Premium Nail Art",
      description: "Manicure, pedicure and nail design with the best products on the market.",
      duration: "45-60 minutes",
      price: "$30-$50",
      category: "nail"
    },
    {
      id: 2,
      image: women,
      title: "Women's Styling",
      description: "Modern haircuts, coloring and professional hair treatments.",
      duration: "60-90 minutes",
      price: "$40-$80",
      category: "women"
    },
    {
      id: 3,
      image: mancut,
      title: "Classic Men's Cut",
      description: "Traditional haircut with perfect finish.",
      duration: "30-45 minutes",
      price: "$25-$40",
      category: "mencut"
    },
    {
      id: 4,
      image: face,
      title: "Premium Shave",
      description: "Classic shave with hot towel and luxury products.",
      duration: "40 minutes",
      price: "$35",
      category: "face"
    },
    {
      id: 5,
      image: barber,
      title: "Barber Treatment",
      description: "Complete barber service including facial massage.",
      duration: "60 minutes",
      price: "$45",
      category: "barber"
    },
    {
      id: 6,
      image: beautySalon,
      title: "Complete Experience",
      description: "Premium package including haircut, shave and facial treatment.",
      duration: "120 minutes",
      price: "$90",
      category: "premium"
    }
  ];

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

      {/* Main content */}
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
          Our Services
        </motion.h1>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: "2rem",
          marginTop: "2rem"
        }}>
          {services.map((service) => (
            <motion.div
              key={service.id}
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                borderRadius: "16px",
                overflow: "hidden",
                cursor: "pointer",
                transition: "all 0.3s ease"
              }}
              whileHover={{ y: -10, boxShadow: "0 15px 30px rgba(0,0,0,0.2)" }}
              onClick={() => setSelectedService(service)}
            >
              <img 
                src={service.image} 
                alt={service.title}
                style={{
                  width: "100%",
                  height: "250px",
                  objectFit: "cover"
                }}
              />
              <div style={{ padding: "1.5rem" }}>
                <h3 style={{
                  color: "#fff",
                  fontSize: "1.5rem",
                  marginBottom: "0.5rem"
                }}>
                  {service.title}
                </h3>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  margin: "0.5rem 0",
                  color: "rgba(255,255,255,0.8)"
                }}>
                  <FaClock />
                  <span>{service.duration}</span>
                </div>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  margin: "0.5rem 0",
                  color: "rgba(255,255,255,0.8)"
                }}>
                  <FaDollarSign />
                  <span>{service.price}</span>
                </div>
                <motion.button
                  style={{
                    background: "linear-gradient(90deg, #a7706c, #c58e7e)",
                    color: "#fff",
                    border: "none",
                    padding: "0.8rem 1.5rem",
                    borderRadius: "50px",
                    fontSize: "1rem",
                    fontWeight: "500",
                    cursor: "pointer",
                    marginTop: "1rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem"
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("/Contact");
                  }}
                >
                  Contact Us <FaArrowRight />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Service Modal */}
      <Modal
        isOpen={!!selectedService}
        onRequestClose={() => setSelectedService(null)}
        style={modalStyles}
        contentLabel="Service Details"
      >
        {selectedService && (
          <div style={{
            display: "flex",
            flexDirection: "column",
            height: "100%"
          }}>
            <button 
              onClick={() => setSelectedService(null)}
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                background: "none",
                border: "none",
                fontSize: "1.5rem",
                cursor: "pointer",
                color: "#5a4a42"
              }}
            >
              <FaTimes />
            </button>
            
            <div style={{
              display: "flex",
              flexDirection: window.innerWidth < 768 ? "column" : "row",
              gap: "2rem",
              flex: 1
            }}>
              <div style={{
                flex: 1,
                borderRadius: "12px",
                overflow: "hidden"
              }}>
                <img 
                  src={selectedService.image} 
                  alt={selectedService.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }}
                />
              </div>
              
              <div style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}>
                <div>
                  <h2 style={{
                    fontSize: "2rem",
                    color: "#5a4a42",
                    marginBottom: "1rem"
                  }}>
                    {selectedService.title}
                  </h2>
                  
                  <p style={{
                    color: "#7a6a62",
                    lineHeight: "1.6",
                    marginBottom: "1.5rem"
                  }}>
                    {selectedService.description}
                  </p>
                  
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    margin: "1rem 0",
                    color: "#5a4a42"
                  }}>
                    <FaClock style={{ fontSize: "1.2rem" }} />
                    <span style={{ fontWeight: "500" }}>Duration: {selectedService.duration}</span>
                  </div>
                  
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    margin: "1rem 0",
                    color: "#5a4a42"
                  }}>
                    <FaDollarSign style={{ fontSize: "1.2rem" }} />
                    <span style={{ fontWeight: "500" }}>Price: {selectedService.price}</span>
                  </div>
                </div>
                
                <div style={{
                  display: "flex",
                  gap: "1rem",
                  marginTop: "2rem"
                }}>
                  <motion.button
                    style={{
                      background: "transparent",
                      color: "#5a4a42",
                      border: "2px solid #5a4a42",
                      padding: "0.8rem 1.5rem",
                      borderRadius: "50px",
                      fontSize: "1rem",
                      fontWeight: "500",
                      cursor: "pointer",
                      flex: 1
                    }}
                    whileHover={{ backgroundColor: "rgba(90, 74, 66, 0.1)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedService(null)}
                  >
                    Back
                  </motion.button>
                  
                  <motion.button
                    style={{
                      background: "linear-gradient(90deg, #a7706c, #c58e7e)",
                      color: "#fff",
                      border: "none",
                      padding: "0.8rem 1.5rem",
                      borderRadius: "50px",
                      fontSize: "1rem",
                      fontWeight: "500",
                      cursor: "pointer",
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem"
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/Contact")}
                  >
                    Contact Us <FaArrowRight />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
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

const modalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    backdropFilter: "blur(5px)",
    zIndex: 1000
  },
  content: {
    position: "relative",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    maxWidth: "900px",
    width: "90%",
    maxHeight: "80vh",
    border: "none",
    borderRadius: "20px",
    padding: "2rem",
    background: "#f8f1e9",
    overflow: "hidden"
  }
};

export default Services;