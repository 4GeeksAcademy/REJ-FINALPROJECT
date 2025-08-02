import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import homeImage from "../assets/img/BeautySalon.jpg";
import { FaFacebook, FaInstagram, FaTwitter, FaPhone, FaEnvelope, FaMapMarkerAlt, FaCheckCircle } from "react-icons/fa";
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log("Form submitted:", formData);
    setShowModal(true);
    setFormData({
      name: "",
      email: "",
      phone: "",
      password: "",
      message: ""
    });
  };

  const closeModal = () => {
    setShowModal(false);
    navigate("/"); // Optional: navigate to home after closing
  };

  return (
    <div style={containerStyle}>
      {/* Modal Overlay */}
      {showModal && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <FaCheckCircle style={successIconStyle} />
            <h2 style={modalTitleStyle}>Registration Successful!</h2>
            <p style={modalTextStyle}>
              Thank you for creating an account with Beauty And Style. 
              We'll contact you soon to confirm your details.
            </p>
            <button 
              onClick={closeModal}
              className="book-button"
              style={modalButtonStyle}
            >
              Continue
            </button>
          </div>
        </div>
      )}

      <div style={textSectionStyle}>
        {/* ... rest of your existing contact form code ... */}
      </div>

      <div style={imageSectionStyle}>
        <img 
          src={homeImage} 
          alt="Professional beauty salon" 
          style={imageStyle}
        />
      </div>
    </div>
  );
};

// Add these new styles to your existing styles
const modalOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(90, 74, 66, 0.9)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const modalStyle = {
  backgroundColor: "#f8f1e9",
  padding: "2.5rem",
  borderRadius: "10px",
  maxWidth: "500px",
  width: "90%",
  textAlign: "center",
  boxShadow: "0 15px 30px rgba(0,0,0,0.2)",
};

const successIconStyle = {
  color: "#a7706c",
  fontSize: "4rem",
  marginBottom: "1.5rem",
};

const modalTitleStyle = {
  color: "#5a4a42",
  fontSize: "1.8rem",
  marginBottom: "1rem",
};

const modalTextStyle = {
  color: "#7a6a62",
  fontSize: "1.1rem",
  lineHeight: "1.6",
  marginBottom: "2rem",
};

const modalButtonStyle = {
  margin: "0 auto",
  padding: "12px 40px",
};

// ... keep all your existing styles ...

export default ContactUs;