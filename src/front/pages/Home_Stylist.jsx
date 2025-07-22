import React from "react";
import { useNavigate } from "react-router-dom";
import homeImage from "../assets/img/BeautySalon.jpg";
import "./Home.css";
import Date_Picker from "../components/DatePicker"
import DatePicker from "react-datepicker";

const Home_Stylist = () => {
  const navigate = useNavigate();

  return (
    <div className="" style={containerStyle}>
      
      <div className="row align-items-center">
        <div className="col-4 border align-items-center">
            <Date_Picker />
        </div>
        <div className="col-8 border">
          
        </div>
      </div>
      <div className="row align-items-start">
        <div className="col-3">
            
        </div>
        <div className="col-3">
          
        </div>
         <div className="col-6">
          
        </div>
      </div>
      
      

    </div>
  );
};


const containerStyle = {
  alignItems: "center",
  justifyContent: "space-between",
  padding: "4rem",
  minHeight: "80vh",
  background: "linear-gradient(135deg, rgba(197, 142, 126, 0.9) 0%, rgba(102, 63, 61, 0.9) 100%)",
  backgroundRepeat: "no-repeat",
  backgroundAttachment: "fixed"
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

export default Home_Stylist;
