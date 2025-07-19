import React from "react";
import { useNavigate } from "react-router-dom";
import homeImage from "../assets/img/BeautySalon.jpg";
import "./Home.css";


const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={containerStyle}>
      
      <div style={textSectionStyle}>
        <h1 style={titleStyle}>Beauty And Style</h1>
        <p style={paragraphStyle}>
          "Vive, Vive! Cartago Vive!"
        </p>
        <button 
          onClick={() => navigate("/appointment")} 
          className="book-button" // 👈 Aplicamos la clase CSS
        >
          Contact Us
        </button>
      </div>

     
      <div style={imageSectionStyle}>
        <img 
          src={homeImage} 
          alt="Salón de belleza profesional" 
          style={imageStyle}
        />
      </div>
    </div>
  );
};


const containerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "4rem",
  minHeight: "80vh",
  background: "linear-gradient(135deg, rgba(246,195,179,0.9) 0%, rgba(167,112,108,0.9) 100%)",
  backgroundRepeat: "no-repeat",
  backgroundAttachment: "fixed", // Efecto parallax
};


const textSectionStyle = {
  flex: 1,
  maxWidth: "50%",
  paddingRight: "3rem",
};

const titleStyle = {
  fontSize: "2.5rem",
  color: "#5a4a42",
  marginBottom: "1.5rem",
  fontWeight: "500",
};

const paragraphStyle = {
  fontSize: "1.1rem",
  color: "#7a6a62",
  lineHeight: "1.6",
  marginBottom: "2rem",
};

const imageSectionStyle = {
  flex: 1,
  display: "flex",
  justifyContent: "center",
};

const imageStyle = {
  width: "100%",
  maxWidth: "600px",
  borderRadius: "10px",
  boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
};

export default Home;
