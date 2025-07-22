import React from "react";
import { FaFacebookF, FaInstagram, FaMapMarkerAlt, FaLinkedin, FaTwitter } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div style={columnsContainerStyle}>
        
        <div style={columnStyle}>
          <h3 style={columnTitleStyle}>Servicios</h3>
          <ul style={listStyle}>
            <li><a href="/Service" style={menuLinkStyle}>Service</a></li>
            <li><a href="/Gallery" style={menuLinkStyle}>Gallery</a></li>
            <li><a href="/Appointment" style={menuLinkStyle}>Appointment</a></li>
            <li><a href="/Contact Us" style={menuLinkStyle}>Contact Us</a></li>
          </ul>
        </div>

       
        <div style={columnStyle}>
          <h3 style={columnTitleStyle}>Conéctate</h3>
          <div style={socialIconsContainer}>
            <a href="https://facebook.com" style={socialLinkStyle}><FaFacebookF /></a>
            <a href="https://instagram.com" style={socialLinkStyle}><FaInstagram /></a>
            <a href="https://linkedin.com" style={socialLinkStyle}><FaLinkedin /></a>
            <a href="https://x.com" style={socialLinkStyle}><FaTwitter /></a>
          </div>
          <div style={locationLinkStyle}>
            <FaMapMarkerAlt style={{ marginRight: "8px" }} />
            <a href="https://maps.google.com" target="_blank" rel="noreferrer">
              Nuestra ubicación
            </a>
          </div>
        </div>

       
        <div style={columnStyle}>
          <h3 style={columnTitleStyle}>Contacto</h3>
          <address style={addressStyle}>
            <p>Calle Central 123, Tu Pueblo</p>
            <p>+34 123 456 789</p>
            <p><a href="mailto:hola@beautysalon.com" style={emailLinkStyle}>hola@beautysalon.com</a></p>
          </address>
          <div style={businessHoursStyle}>
            <p><strong>Horario:</strong></p>
            <p>Lun-Vie: 9:00 - 20:00</p>
            <p>Sábados: 10:00 - 18:00</p>
          </div>
        </div>
      </div>

      
      <div style={copyrightStyle}>
        <p>© {new Date().getFullYear()} REJ Beauty Salon. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};


const footerStyle = {
  background: "linear-gradient(135deg, #a7706c, #f6c3b3)",
  color: "#f8e9e6",
  fontFamily: "'Georgia', serif",
  padding: "40px 5%",
  width: "100%",
  boxSizing: "border-box"
};

const columnsContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
  maxWidth: "1200px",
  margin: "0 auto",
  gap: "30px",
  flexWrap: "wrap" 
};

const columnStyle = {
  flex: "1",
  minWidth: "200px",
  marginBottom: "20px"
};

const columnTitleStyle = {
  fontSize: "1.1rem",
  fontWeight: "normal",
  textTransform: "uppercase",
  letterSpacing: "1px",
  marginBottom: "1.2rem",
  borderBottom: "1px solid rgba(255,255,255,0.2)",
  paddingBottom: "0.5rem"
};

const listStyle = {
  listStyle: "none",
  padding: "0",
  margin: "0"
};

const menuLinkStyle = {
  color: "#f8e9e6",
  textDecoration: "none",
  display: "block",
  marginBottom: "0.6rem",
  transition: "color 0.3s",
  ":hover": {
    color: "#fff",
    textDecoration: "underline"
  }
};

const socialIconsContainer = {
  display: "flex",
  gap: "15px",
  marginBottom: "1.5rem"
};

const socialLinkStyle = {
  color: "#f8e9e6",
  fontSize: "1.3rem",
  transition: "color 0.3s",
  ":hover": {
    color: "#fff"
  }
};

const locationLinkStyle = {
  display: "flex",
  alignItems: "center",
  marginBottom: "1.5rem"
};

const addressStyle = {
  fontStyle: "normal",
  lineHeight: "1.6",
  marginBottom: "1.5rem"
};

const emailLinkStyle = {
  color: "#f8e9e6",
  textDecoration: "none",
  ":hover": {
    textDecoration: "underline"
  }
};

const businessHoursStyle = {
  lineHeight: "1.5"
};

const copyrightStyle = {
  textAlign: "center",
  marginTop: "40px",
  paddingTop: "20px",
  borderTop: "1px solid rgba(255,255,255,0.2)",
  fontSize: "0.85rem",
  color: "rgba(255,255,255,0.7)"
};