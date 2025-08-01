import React, { useState, useEffect, startTransition }  from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Appointment_User from "../components/Appointment_User"
import User_Card from "../components/User_Card";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Carousel from "../components/Carousel";


const Home_User = () => {
  const api_URL='https://glorious-space-spork-pjwx47757q4936gjw-3001.app.github.dev/'
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [doneAppointments, setDoneAppointments] = useState([]);
  const [user, setUser] = useState([]);
  const [workList, setWorkList] = useState([]);
  const [doneItems, setDoneItems] = useState([]);
  const [stars, setStars] = useState(0);
  const [comment, setComment]=useState('');
  
  let duration=0;
  let cost=0;

  const starsChange = (event) => {
        setStars(event.target.value);
      };
  
  const commentChange = (event) => {
        setComment(event.target.value);
      };

  function getAppointments(){
    
    let url = api_URL+'user/pending_appointments';
  	
    fetch(url)
    .then((response)=>{
			if(response.ok==false){
				throw new Error ('Error al consultar Las Citas');
			}
		  return response.json();
		})
		.then((data)=>{
      setAppointments(data.appointments);
      console.log(data)
		})
		.catch((error)=>{
			alert(error)
		})
	}

  function getDoneAppointments(){
    
    let url = api_URL+'user/done_appointments';
  	
    fetch(url)
    .then((response)=>{
			if(response.ok==false){
				throw new Error ('Error al consultar Las Citas');
			}
		  return response.json();
		})
		.then((data)=>{
      setDoneAppointments(data.appointments);
      console.log(data)
		})
		.catch((error)=>{
			alert(error)
		})
	}

  function getUser() {
    let url = api_URL+'profile'
    fetch(url)
		.then((response)=>{
			if(response.ok==false){
				throw new Error ('Error al consultar Las Citas');
			}
		  return response.json();
		})
		.then((data)=>{
			setUser(data);
		})
		.catch((error)=>{
			alert(error)
		})
		
	}

  function viewAppointment(indice,user_objeto) {
   
    console.log(user_objeto);
    getDoneAppointments(user_objeto.id);

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

  function editAppointment() {
    let url = api_URL+'profile'
    fetch(url)
		.then((response)=>{
		  console.log(response);
			if(response.ok==false){
				throw new Error ('Error al consultar Las Citas');
			}
		  return response.json();
		})
		.then((data)=>{
			setUser(data);
			console.log("user:",data);
		})
		.catch((error)=>{
			alert(error)
		})
		
	}

  function rateAppointment(appointment_id) {
    let url = api_URL+'review'
    let bodyData = {appointment_id: appointment_id, 
                    review: stars, 
                    review_description:comment};

		console.log (bodyData);
		  fetch(url,{
			            method:"POST",
			            body: JSON.stringify(bodyData),
			            headers:{'Content-Type':'application/json'}
		})
			.then((response)=>{
				return response.json();
			})
			.then((data)=>{
				console.log(data);
			})
			.catch(()=>{
				alert(error)
			})
	}
  


  useEffect(()=>{
  getUser();  
  getDoneAppointments(); 
  getAppointments();
	},[])



  return (
    <div className="containerStyle">
      
      <div className="row text-center  " >
        <div className="col-4 ">
         
            <h2 className="columnTitleStyle">User Info</h2>
            <User_Card user={user} key={user.user_id} index={user.user_id}/>
        
        </div>
        <div className="col-8">
            <h2 className="columnTitleStyle">User History</h2>
            <div className="row carousel-style">
                <div className="col-4 pt-1">
                  {doneAppointments.map((doneAppointment, index, array) => {
                      return (
                        <div>

                        <button type="button" className="btn boton" onClick={() => setDoneItems(doneAppointment.items)}>{doneAppointment.date}</button>
                        <button type="button" className="btn boton mx-2" data-bs-toggle="modal" data-bs-target={"#modalEditAppointment-"+index}>
                          Rate
                        </button>
                    
                          <div className="modal fade" id={"modalEditAppointment-"+index} aria-labelledby="exampleModalLabel" aria-hidden="true">
                              <div className="modal-dialog modalStyle">
                                  <div className="modal-content ">
                                      <div className="modal-header">
                                          <h1 className="modal-title fs-5" id="exampleModalLabel">Rate Appointment</h1>
                                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                      </div>
                                      <div className="modal-body">
                                          <div className="input-group mb-3">
                                              <label htmlFor="user" className="input-group-text">User</label>
                                              <input type="text" className="form-control" id="user" value={doneAppointment.user} readOnly={true}/>
                                          </div>
                                          <div className="input-group mb-3">
                                              <label htmlFor="stylist" className="input-group-text">Stylist</label>
                                              <input type="text" className="form-control" id="stylist" defaultValue={doneAppointment.stylist} readOnly={true}/>
                                          </div>
                                          <div className="input-group mb-3">
                                              <label htmlFor="date" className="input-group-text">Date</label>
                                              <input type="text" className="form-control" id="date" defaultValue={doneAppointment.date} readOnly={true}/>
                                          </div>
                                          <div className="input-group mb-3">
                                              <label htmlFor="status" className="input-group-text">Stars</label>
                                              <select className="form-select" id="inputGroupSelect01"  value={stars} onChange={starsChange}>
                                                  <option value="5">5 - Excelent</option>
                                                  <option value="4">4 - Good</option>
                                                  <option value="3">3 - Average</option>
                                                  <option value="2">2 - Could be Better</option>
                                                  <option value="1">1 - Back to School</option>                                            
                                              </select>
                                          </div>
                                          
                                          <div className="form-floating">
                                            <textarea className="form-control" placeholder="Leave a comment here" id="comments" value={comment} onChange={commentChange}></textarea>
                                            <label htmlFor="comments">Comments</label>
                                          </div> 
                                      </div>
                                      <div className="modal-footer">
                                          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                          <button type="button" className="btn btn-primary" onClick={() => { rateAppointment(doneAppointment.id) }}>Save changes</button>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      )
                    })
                  }
                  </div>
                <div className="col-8 pt-1">
                     <Carousel doneItems={doneItems} />
                </div>
            </div>
            
        </div> 

      </div>
      <div className="row text-center" style ={{ height:"50%"}}>

        <div className="col-8">
          <div className="m-1 p-2" >
              <h2 className="columnTitleStyle">Scheduled Appointments</h2>
              <div className="list-group carousel-style">
                {appointments.map((appointment, index, array) => {
                  return (
                    <Appointment_User appointment={appointment} viewAppointment={viewAppointment} editAppointment={editAppointment} key={index} index={appointment.id}/>
                    )
                  })
                }
              </div>
          </div> 
        </div>
        
        <div className="col-4">
            
            <div className="m-1 p-2" style={{height:"20rem"}}>
              <h2 className="columnTitleStyle">Scheduled Works</h2>
              <div className="list-group carousel-style">
                {
                  workList.map((work, index, array) => {
                    cost=cost+work.cost;
                    duration=duration+work.duration;
                    return (
                      <li className="list-group-item list-group-item-danger" key={index}>{work.description}</li>
                    )
                  })
                }
                <br></br>
                <p><b>Estimated Duration: {duration} min</b></p>
                <p><b>Total Cost: ${cost}</b></p>
              </div>
          </div> 
        </div>
      </div>
      
      

    </div>
  );
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


export default Home_User;
