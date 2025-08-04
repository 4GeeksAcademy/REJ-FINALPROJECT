import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaClock, FaArrowRight } from "react-icons/fa";
import "./Appointment.css";

const Appointment = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedService, setSelectedService] = useState("");

  // Available services
  const services = [
    { id: 1, name: "Classic Cut", duration: "30 min", price: "$25" },
    { id: 2, name: "Modern Cut", duration: "45 min", price: "$35" },
    { id: 3, name: "Premium Shave", duration: "40 min", price: "$30" },
    { id: 4, name: "Facial Treatment", duration: "60 min", price: "$50" },
    { id: 5, name: "Complete Manicure", duration: "45 min", price: "$35" },
    { id: 6, name: "Premium Package", duration: "120 min", price: "$90" }
  ];

  // Available time slots
  const availableTimes = [
    "9:00 AM", "10:00 AM", "11:00 AM", 
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"
  ];

  // Generate days for current month + next month
  const generateCalendarDays = () => {
    const days = [];
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    // Days in current month
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentYear, currentMonth, i);
      if (date >= today) { // Only show future dates
        days.push(date);
      }
    }
    
    return days;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to submit appointment would go here
    navigate("/confirmation", {
      state: {
        date: selectedDate,
        time: selectedTime,
        service: selectedService
      }
    });
  };

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
          maxWidth: "1200px",
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
          Book Your Appointment
        </motion.h1>

        <form onSubmit={handleSubmit} style={formStyle}>
          {/* Service selection */}
          <div style={formSectionStyle}>
            <h3 style={sectionTitleStyle}>
              <FaCalendarAlt style={{ marginRight: "0.5rem" }} />
              Select a Service
            </h3>
            <div style={servicesGridStyle}>
              {services.map(service => (
                <motion.div
                  key={service.id}
                  style={{
                    ...serviceCardStyle,
                    border: selectedService === service.name ? "2px solid #a7706c" : "1px solid rgba(255,255,255,0.2)"
                  }}
                  onClick={() => setSelectedService(service.name)}
                  whileHover={{ y: -5 }}
                >
                  <h4 style={{ marginBottom: "0.5rem" }}>{service.name}</h4>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>{service.duration}</span>
                    <span style={{ fontWeight: "bold" }}>{service.price}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Calendar */}
          <div style={formSectionStyle}>
            <h3 style={sectionTitleStyle}>
              <FaCalendarAlt style={{ marginRight: "0.5rem" }} />
              Select a Date
            </h3>
            <div style={calendarGridStyle}>
              {generateCalendarDays().map((date, index) => {
                const day = date.getDate();
                const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getDay()];
                const isSelected = selectedDate && selectedDate.toDateString() === date.toDateString();
                
                return (
                  <motion.div
                    key={index}
                    style={{
                      ...dateCardStyle,
                      background: isSelected ? "rgba(167, 112, 108, 0.3)" : "rgba(255,255,255,0.1)"
                    }}
                    onClick={() => setSelectedDate(date)}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div style={{ fontSize: "0.9rem" }}>{weekday}</div>
                    <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>{day}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Time slots */}
          {selectedDate && (
            <div style={formSectionStyle}>
              <h3 style={sectionTitleStyle}>
                <FaClock style={{ marginRight: "0.5rem" }} />
                Select a Time
              </h3>
              <div style={timesGridStyle}>
                {availableTimes.map((time, index) => (
                  <motion.div
                    key={index}
                    style={{
                      ...timeCardStyle,
                      background: selectedTime === time ? "rgba(167, 112, 108, 0.3)" : "rgba(255,255,255,0.1)"
                    }}
                    onClick={() => setSelectedTime(time)}
                    whileHover={{ scale: 1.05 }}
                  >
                    {time}
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Submit button */}
          <motion.button
            type="submit"
            style={{
              background: "linear-gradient(90deg, #a7706c, #c58e7e)",
              color: "#fff",
              border: "none",
              padding: "1rem 2rem",
              borderRadius: "50px",
              fontSize: "1.1rem",
              fontWeight: "600",
              cursor: "pointer",
              margin: "2rem auto 0",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem"
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={!selectedDate || !selectedTime || !selectedService}
          >
            Confirm Appointment <FaArrowRight />
          </motion.button>
        </form>
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

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "2rem"
};

const formSectionStyle = {
  background: "rgba(255,255,255,0.1)",
  borderRadius: "16px",
  padding: "1.5rem"
};

const sectionTitleStyle = {
  color: "#fff",
  marginBottom: "1.5rem",
  display: "flex",
  alignItems: "center"
};

const servicesGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
  gap: "1rem"
};

const serviceCardStyle = {
  background: "rgba(255,255,255,0.1)",
  borderRadius: "12px",
  padding: "1rem",
  cursor: "pointer",
  color: "#fff",
  transition: "all 0.3s ease"
};

const calendarGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(60px, 1fr))",
  gap: "0.8rem"
};

const dateCardStyle = {
  background: "rgba(255,255,255,0.1)",
  borderRadius: "8px",
  padding: "0.8rem 0",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  color: "#fff",
  transition: "all 0.3s ease"
};

const timesGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
  gap: "0.8rem"
};

const timeCardStyle = {
  background: "rgba(255,255,255,0.1)",
  borderRadius: "8px",
  padding: "0.8rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  color: "#fff",
  transition: "all 0.3s ease"
};

export default Appointment;