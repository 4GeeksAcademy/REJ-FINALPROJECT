import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import homeImage from "../assets/img/BeautySalon.jpg";
import { 
  FaFacebook, FaInstagram, FaTwitter, 
  FaPhone, FaEnvelope, FaMapMarkerAlt,
  FaCheckCircle, FaUser, FaLock, FaCommentAlt,
  FaArrowLeft
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import "./Home.css";

const ContactUs = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("contact");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    message: ""
  });
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);

  // Auto-scroll to register section if URL has #register
  useEffect(() => {
    if (window.location.hash === '#register') {
      setActiveTab("register");
      setTimeout(() => {
        const element = document.getElementById('register');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    }
  }, []);

  useEffect(() => {
    if (isSubmitting) {
      const timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(timer);
            setIsSubmitting(false);
            setShowModal(true);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
      return () => clearInterval(timer);
    }
  }, [isSubmitting]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setProgress(0);
    
    try {
      // Simulación de llamada a API
      await new Promise(resolve => setTimeout(resolve, 2000));
      setShowModal(true);
      
      // En producción, usarías:
      // const response = await fetch('/api/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      // if (!response.ok) throw new Error('Registration failed');
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    navigate("/");
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
        {/* Left side - Form */}
        <div style={{ flex: 1, color: "#fff" }}>
          <motion.button
            onClick={() => navigate(-1)}
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "none",
              color: "#fff",
              padding: "0.5rem 1rem",
              borderRadius: "50px",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "1.5rem",
              cursor: "pointer"
            }}
            whileHover={{ background: "rgba(255,255,255,0.2)" }}
          >
            <FaArrowLeft /> Back
          </motion.button>

          <motion.h1 
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: "700",
              marginBottom: "2rem",
              background: "linear-gradient(90deg, #fff, #f8d7d3)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent"
            }}
          >
            {activeTab === "contact" ? "Contact Us" : "Join Our Community"}
          </motion.h1>

          {/* Tabs */}
          <motion.div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
            {["contact", "register"].map((tab) => (
              <motion.button
                key={tab}
                style={{
                  padding: "0.75rem 1.5rem",
                  borderRadius: "50px",
                  background: activeTab === tab ? "rgba(255,255,255,0.3)" : "transparent",
                  border: activeTab === tab ? "1px solid rgba(255,255,255,0.5)" : "1px solid rgba(255,255,255,0.2)",
                  color: "#fff",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  fontWeight: "500"
                }}
                onClick={() => setActiveTab(tab)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab === "contact" ? "Contact Form" : "Create Account"}
              </motion.button>
            ))}
          </motion.div>

          {/* Contact Tab */}
          <AnimatePresence mode="wait">
            {activeTab === "contact" ? (
              <motion.div
                key="contact"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: "1.5rem",
                  marginBottom: "2rem"
                }}>
                  <ContactItem icon={<FaPhone />} title="Phone" value="+1 (555) 123-4567" />
                  <ContactItem icon={<FaEnvelope />} title="Email" value="info@beautyandstyle.com" />
                  <ContactItem icon={<FaMapMarkerAlt />} title="Location" value="123 Beauty Ave, Cartago" />
                </div>

                <div style={{ marginBottom: "2rem" }}>
                  <h3 style={{ marginBottom: "1rem", fontWeight: "500" }}>Follow Us</h3>
                  <div style={{ display: "flex", gap: "1.5rem" }}>
                    <SocialIcon icon={<FaFacebook />} color="#4267B2" />
                    <SocialIcon icon={<FaInstagram />} color="#E1306C" />
                    <SocialIcon icon={<FaTwitter />} color="#1DA1F2" />
                  </div>
                </div>

                <form style={formStyle}>
                  <FormField 
                    icon={<FaUser />}
                    type="text"
                    name="name"
                    placeholder="Your Name"
                  />
                  
                  <FormField 
                    icon={<FaEnvelope />}
                    type="email"
                    name="email"
                    placeholder="Your Email"
                  />
                  
                  <FormField 
                    icon={<FaCommentAlt />}
                    type="textarea"
                    name="message"
                    placeholder="Your Message"
                  />

                  <motion.button
                    type="submit"
                    style={submitButtonStyle}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Send Message
                  </motion.button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="register"
                id="register"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                style={{
                  background: "rgba(255,255,255,0.1)",
                  padding: "2rem",
                  borderRadius: "16px",
                  backdropFilter: "blur(5px)",
                  border: "1px solid rgba(255,255,255,0.2)"
                }}
              >
                <h2 style={{ 
                  fontSize: "1.5rem",
                  marginBottom: "1.5rem",
                  background: "linear-gradient(90deg, #fff, #f8d7d3)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent"
                }}>
                  Create Your Account
                </h2>
                
                <form onSubmit={handleSubmit} style={formStyle}>
                  <FormField 
                    icon={<FaUser />}
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    required
                  />
                  
                  <FormField 
                    icon={<FaEnvelope />}
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    required
                  />
                  
                  <FormField 
                    icon={<FaPhone />}
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                  />
                  
                  <FormField 
                    icon={<FaLock />}
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create Password"
                    required
                  />

                  <motion.button
                    type="submit"
                    style={{
                      ...submitButtonStyle,
                      position: "relative",
                      overflow: "hidden"
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          height: "100%",
                          width: `${progress}%`,
                          background: "rgba(255,255,255,0.3)",
                          transition: "width 0.3s ease"
                        }} />
                        <span>Creating Account... {progress}%</span>
                      </>
                    ) : (
                      "Register Now"
                    )}
                  </motion.button>
                </form>
                
                <p style={{ marginTop: "1.5rem", textAlign: "center" }}>
                  Already have an account?{' '}
                  <button 
                    onClick={() => setActiveTab("contact")}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#f8d7d3",
                      textDecoration: "underline",
                      cursor: "pointer",
                      fontWeight: "500"
                    }}
                  >
                    Contact us instead
                  </button>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
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
            transition={{ delay: 0.4 }}
            whileHover={{
              transform: "perspective(1000px) rotateY(0deg)"
            }}
          />
        </div>
      </motion.div>

      {/* Success Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            style={modalOverlayStyle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              style={{
                ...modalStyle,
                ...glassStyle,
                padding: "3rem",
                borderRadius: "24px",
                maxWidth: "500px",
                textAlign: "center"
              }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ duration: 0.8 }}
              >
                <FaCheckCircle style={successIconStyle} />
              </motion.div>
              
              <h2 style={modalTitleStyle}>Welcome to Beauty & Style!</h2>
              
              <p style={modalTextStyle}>
                Your account has been successfully created. We've sent a confirmation to {formData.email}.
              </p>
              
              <div style={{
                background: "rgba(255,255,255,0.1)",
                padding: "1.5rem",
                borderRadius: "12px",
                margin: "1.5rem 0"
              }}>
                <p style={{ marginBottom: "0.5rem" }}>Your Beauty ID:</p>
                <div style={{
                  background: "rgba(0,0,0,0.2)",
                  padding: "0.5rem",
                  borderRadius: "6px",
                  fontFamily: "monospace",
                  letterSpacing: "1px"
                }}>
                  {`BEAU-${Math.random().toString(36).substr(2, 8).toUpperCase()}`}
                </div>
              </div>
              
              <motion.button
                onClick={closeModal}
                style={modalButtonStyle}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Services
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Componentes reutilizables
const ContactItem = ({ icon, title, value }) => (
  <motion.div 
    style={{
      background: "rgba(255,255,255,0.1)",
      padding: "1.5rem",
      borderRadius: "12px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}
    whileHover={{ y: -5 }}
  >
    <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{icon}</div>
    <h4 style={{ marginBottom: "0.5rem", fontWeight: "500" }}>{title}</h4>
    <p>{value}</p>
  </motion.div>
);

const SocialIcon = ({ icon, color }) => (
  <motion.div
    style={{
      width: "3rem",
      height: "3rem",
      borderRadius: "50%",
      background: color,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1.5rem",
      color: "#fff",
      cursor: "pointer"
    }}
    whileHover={{ y: -3, boxShadow: `0 5px 15px ${color}80` }}
    whileTap={{ scale: 0.9 }}
  >
    {icon}
  </motion.div>
);

const FormField = ({ icon, type, ...props }) => (
  <div style={{ marginBottom: "1.5rem", position: "relative" }}>
    <div style={{
      position: "absolute",
      left: "1rem",
      top: "50%",
      transform: "translateY(-50%)",
      color: "rgba(255,255,255,0.7)"
    }}>
      {icon}
    </div>
    {type === "textarea" ? (
      <textarea
        style={{
          width: "100%",
          padding: "1rem 1rem 1rem 3rem",
          background: "rgba(255,255,255,0.1)",
          border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: "12px",
          color: "#fff",
          minHeight: "120px",
          resize: "none"
        }}
        {...props}
      />
    ) : (
      <input
        style={{
          width: "100%",
          padding: "1rem 1rem 1rem 3rem",
          background: "rgba(255,255,255,0.1)",
          border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: "12px",
          color: "#fff"
        }}
        type={type}
        {...props}
      />
    )}
  </div>
);

// Estilos
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
  flexDirection: "column"
};

const submitButtonStyle = {
  background: "linear-gradient(90deg, #a7706c, #c58e7e)",
  color: "#fff",
  border: "none",
  padding: "1rem",
  borderRadius: "12px",
  fontSize: "1rem",
  fontWeight: "500",
  cursor: "pointer",
  marginTop: "1rem"
};

const modalOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.7)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
  backdropFilter: "blur(5px)"
};

const modalStyle = {
  maxWidth: "500px",
  width: "90%",
  color: "#fff",
  position: "relative"
};

const successIconStyle = {
  color: "#a7706c",
  fontSize: "4rem",
  marginBottom: "1.5rem",
  filter: "drop-shadow(0 0 10px rgba(167, 112, 108, 0.5))"
};

const modalTitleStyle = {
  fontSize: "1.8rem",
  marginBottom: "1rem",
  fontWeight: "600",
  background: "linear-gradient(90deg, #fff, #f8d7d3)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent"
};

const modalTextStyle = {
  fontSize: "1.1rem",
  lineHeight: "1.6",
  marginBottom: "1.5rem",
  opacity: 0.9
};

const modalButtonStyle = {
  background: "linear-gradient(90deg, #a7706c, #c58e7e)",
  color: "#fff",
  border: "none",
  padding: "1rem 2rem",
  borderRadius: "50px",
  fontSize: "1rem",
  fontWeight: "500",
  cursor: "pointer",
  margin: "0 auto",
  display: "block"
};

export default ContactUs;