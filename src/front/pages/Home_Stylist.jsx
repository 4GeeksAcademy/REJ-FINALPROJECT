import React, { useState, useEffect }  from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Appointment from "../components/Appointment"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const Home_Stylist = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [workList, setWorkList] = useState([]);
  const [user, setUser] = useState([]);
  let duration=0;
  let cost=0;

  function getAppointments(){
	  fetch("https://glorious-space-spork-pjwx47757q4936gjw-3001.app.github.dev/stylist/pending_appoitments")
		.then((response)=>{
		  console.log(response);
			if(response.ok==false){
				throw new Error ('Error al consultar Las Citas');
			}
		  return response.json();
		})
		.then((data)=>{
			console.log("data:",data);
			setAppointments(data.appointments);
			console.log("apointments:",appointments);
		})
		.catch((error)=>{
			alert(error)
		})
	}

  function viewAppointment(indice) {
	
    fetch("https://glorious-space-spork-pjwx47757q4936gjw-3001.app.github.dev/stylist/appoitment_detail/"+indice)
		.then((response)=>{
		  console.log(response);
			if(response.ok==false){
				throw new Error ('Error al consultar Las Citas');
			}
		  return response.json();
		})
		.then((data)=>{
			setWorkList(data.items);
			console.log("items:",workList);
		})
		.catch((error)=>{
			alert(error)
		})
		
	}

 useEffect(()=>{
    getAppointments();
	},[selectedDate,workList])



  return (
    <div className="" style={containerStyle}>
      
      <div className="row text-center" style ={{ height:"50%"}}>
        <div className="col-4 ">
          <div className="m-1">
             <h2 className="columnTitleStyle">Appointment Date</h2>
             <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date) } inline/>
          </div> 
        </div>
        <div className="col-8">
          <div className="border m-1 p-2 scroll" >
              <h2 className="columnTitleStyle">Scheduled Appointments</h2>
              <div className="list-group">
                {appointments.map((appointment, index, array) => {
                  return (
                    <Appointment Appointment={appointment} viewAppointment={viewAppointment} key={index} index={appointment.id}/>
                    )
                  })
                }
              </div>
          </div> 
        </div>
      </div>
      <div className="row text-center">
        <div className="col-3">
            <h2 className="columnTitleStyle">Scheduled Works</h2>
            <div className="border m-1 p-2 scroll" >
              <div className="list-group">
                {
                  workList.map((work, index, array) => {
                    cost=cost+work.cost;
                    duration=duration+work.duration;
                    return (
                      <li className="list-group-item list-group-item-danger">{work.description}</li>
                    )
                  })
                }
              </div>
                <br/>
                <p>Estimated Duration: {duration} min</p>
                <p>Total Cost: ${cost}</p>
          </div> 
        </div>
        <div className="col-3">
            <h2 className="columnTitleStyle">User Info</h2>
        </div>
         <div className="col-6">
            <h2 className="columnTitleStyle">User History</h2>
        </div>
      </div>
      
      

    </div>
  );
};


const containerStyle = {
  
  alignItems: "center",
  justifyContent: "space-between",
  padding: "4rem",
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
