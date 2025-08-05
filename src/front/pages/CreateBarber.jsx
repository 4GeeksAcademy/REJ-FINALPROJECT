import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaCheckCircle, FaUser, FaLock, FaPhone, 
  FaEnvelope, FaVenusMars, FaCamera, 
  FaArrowLeft
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const CreateBarber = () => {
  const api_URL=import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    gender: "",
    role:"stylist",
    photo: null
  });

  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [picture, setPicture]= useState();

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

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPicture(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

function ImageUpload() {
    console.log (picture)
    const Data = new FormData();
    Data.append('file', picture);
    Data.append('upload_preset', import.meta.env.VITE_CLOUDINARY_PRESET); 
    Data.append('api_key', import.meta.env.VITE_CLOUDINARY_API_KEY);
    Data.append('cloud_name', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
    
    let url = "https://api.cloudinary.com/v1_1/"+import.meta.env.VITE_CLOUDINARY_CLOUD_NAME+"/image/upload";
    
    fetch(url,{
			            method:"POST",
			            body: formData,
			          
		})
			.then((response)=>{
				return response.json();
			})
			.then((data)=>{
        console.log(data.secure_url )
				setFormData(prev => ({ ...prev, photo: data.secure_url }));
			})
			.catch(()=>{
				alert(error)
			})

    
    }

  const handleSubmit = async (e) => {
    ImageUpload();

    let url = api_URL + 'register'
    console.log(url)
    console.log (formData);
    let bodyData = formData;

    console.log(bodyData);
    fetch(url, {
      method: "POST",
      body: JSON.stringify(bodyData),
      headers: { 'Content-Type': 'application/json' }
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch(() => {
        alert(error)
      })


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
      background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
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
          maxWidth: "800px",
          margin: "0 auto",
          position: "relative",
          zIndex: 2
        }}
   
        transition={{ duration: 0.5 }}
      >
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
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: "700",
            marginBottom: "2rem",
            background: "linear-gradient(90deg, #fff, #a8d0e6)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent"
          }}
        >
          Barber Registration
        </motion.h1>

        <form onSubmit={handleSubmit} style={formStyle}>
          {/* Photo Preview */}
          {photoPreview && (
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
              <img 
                src={photoPreview} 
                alt="Preview" 
                style={{ 
                  width: "120px", 
                  height: "120px", 
                  borderRadius: "50%", 
                  objectFit: "cover",
                  border: "3px solid rgba(255,255,255,0.3)"
                }} 
              />
            </div>
          )}

          {/* Photo Upload */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label htmlFor="photo" style={{ 
              color: "#fff", 
              marginBottom: "0.5rem", 
              display: "flex", 
              alignItems: "center",
              justifyContent: "center"
            }}>
              <FaCamera style={{ marginRight: "0.5rem" }} /> 
              {photoPreview ? "Change Profile Photo" : "Upload Profile Photo"}
            </label>
            <input 
              type="file" 
              id="photo"
              accept="image/*"
              onChange={handlePhotoChange}
              style={{
                width: "100%",
                padding: "0.5rem",
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "12px",
                color: "#fff"
              }}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
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
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            <FormField 
              icon={<FaPhone />}
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              required
            />
            
            <FormField 
              icon={<FaVenusMars />}
              type="select"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              options={[
                { value: "", label: "Select Gender" },
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
                { value: "other", label: "Other" },
                { value: "prefer-not-to-say", label: "Prefer not to say" }
              ]}
            />
          </div>

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
              overflow: "hidden",
              background: "linear-gradient(90deg, #a8d0e6, #374785)"
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
                <span>Creating Profile... {progress}%</span>
              </>
            ) : (
              "Register"
            )}
          </motion.button>
        </form>
      </motion.div>

      {/* Success Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            style={modalOverlayStyle}
       
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
            
              transition={{ type: "spring", damping: 20 }}
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ duration: 0.8 }}
              >
                <FaCheckCircle style={{ ...successIconStyle, color: "#a8d0e6" }} />
              </motion.div>
              
              <h2 style={modalTitleStyle}>Registration Complete!</h2>
              
              <p style={modalTextStyle}>
                Your account has been successfully created. You can now log in with your credentials.
              </p>
              
              {photoPreview && (
                <div style={{ margin: "1rem 0" }}>
                  <p>Your profile photo:</p>
                  <img 
                    src={photoPreview} 
                    alt="Profile Preview" 
                    style={{ 
                      width: "100px", 
                      height: "100px", 
                      borderRadius: "50%", 
                      objectFit: "cover",
                      border: "2px solid #a8d0e6"
                    }} 
                  />
                </div>
              )}
              
              <motion.button
                onClick={closeModal}
                style={{
                  ...modalButtonStyle,
                  background: "linear-gradient(90deg, #a8d0e6, #374785)"
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Continue
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Reusable FormField component
const FormField = ({ icon, type, options, ...props }) => (
  <div style={{ position: "relative" }}>
    {icon && (
      <div style={{
        position: "absolute",
        left: "1rem",
        top: '50%',
        transform: 'translateY(-50%)',
        color: "rgba(255,255,255,0.7)"
      }}>
        {icon}
      </div>
    )}
    {type === "select" ? (
      <select
        style={{
          width: "100%",
          padding: "1rem",
          paddingLeft: icon ? "3rem" : "1rem",
          background: "rgba(255,255,255,0.1)",
          border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: "12px",
          color: "#fff",
          appearance: "none"
        }}
        {...props}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    ) : (
      <input
        style={{
          width: "100%",
          padding: "1rem",
          paddingLeft: icon ? "3rem" : "1rem",
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
  gap: "1rem"
};

const submitButtonStyle = {
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
  fontSize: "4rem",
  marginBottom: "1.5rem",
  filter: "drop-shadow(0 0 10px rgba(168, 208, 230, 0.5))"
};

const modalTitleStyle = {
  fontSize: "1.8rem",
  marginBottom: "1rem",
  fontWeight: "600",
  background: "linear-gradient(90deg, #fff, #a8d0e6)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent"
};

const modalTextStyle = {
  fontSize: "1.1rem",
  lineHeight: "1.6",
  marginBottom: "1.5rem",
 
};

const modalButtonStyle = {
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

export default CreateBarber;