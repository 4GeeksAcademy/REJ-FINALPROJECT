import React, { useState, useEffect }  from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Appointment from "../components/Appointment_Stylist"
import User_Card from "../components/User_Card";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Carousel from "../components/Carousel";
import { Image } from 'cloudinary-react';                     

const Home_Stylist = () => { 
  const api_URL= import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [doneAppointments, setDoneAppointments] = useState([]);
  const [doneItems, setDoneItems] = useState([]);
  const [workList, setWorkList] = useState([]);
  const [user, setUser] = useState([]);
  const [reviewDescription,setReviewDescription]=useState('');
    
  let duration=0;
  let cost=0;
  let imgUrls=[];
  let imgid=[];

  function setReview(doneWorks,appointmentReview){
    setReviewDescription(appointmentReview);
    setDoneItems(doneWorks);
  }

  function getAppointments(){
    
    let day = selectedDate.getDate();
    let month = selectedDate.getMonth()+1;
    let year = selectedDate.getFullYear();
    let end_date= new Date();
    end_date.setDate(selectedDate.getDate()+1);
    let end_day = end_date.getDate();
    let end_month = end_date.getMonth()+1;
    let end_year = end_date.getFullYear();
    
    let start_date =year+'-'+month+'-'+day;
    end_date=end_year+'-'+end_month+'-'+end_day;
    let url = api_URL+'stylist/appointments_date?start_date='+start_date+'&end_date='+end_date;
  	
    fetch(url)
    .then((response)=>{
			if(response.ok==false){
				throw new Error ('Error al consultar Las Citas');
			}
		  return response.json();
		})
		.then((data)=>{
			setAppointments(data.appointments);
		})
		.catch((error)=>{
			alert(error)
		})
	}



  function getDoneAppointments(user_id){
    
    let url = api_URL+'stylist/done_appointments/'+user_id;
  	
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

  function viewAppointment(indice,user_objeto) {
    setUser(user_objeto);
    console.log(user_objeto);
    getDoneAppointments(user_objeto.id);
    let url = api_URL+"stylist/appoitment_detail/"+indice;

    fetch(url)
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

  function editAppointment(appointment_id, works, status) {
   
    let cantidadTrabajos = works.length;

    for (let i = 0; i < cantidadTrabajos; i++) {
        ImageUpload(works[i][0],works[i][1]);
    }

    let url = api_URL+"stylist/appointments/"+appointment_id
    let bodyData = {appointment_id: appointment_id, 
                    status: status
                  };

		fetch(url,{
			            method:"PUT",
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

  function updateAppointmentItem(id,imageUrl) {
    let url = api_URL+'stylist/apointment_item_update'
    let bodyData = {id: id, 
                    picture: imageUrl};
    console.log(bodyData);
		  fetch(url,{
			            method:"PUT",
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

    
  function ImageUpload(id,file) {
    console.log(file);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_PRESET); 
    formData.append('api_key', import.meta.env.VITE_CLOUDINARY_API_KEY);
    formData.append('cloud_name', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
    
    let url = "https://api.cloudinary.com/v1_1/"+import.meta.env.VITE_CLOUDINARY_CLOUD_NAME+"/image/upload";
    
    fetch(url,{
			            method:"POST",
			            body: formData,
			          
		})
			.then((response)=>{
				return response.json();
			})
			.then((data)=>{
				imgUrls.push([id,data.secure_url]);
        updateAppointmentItem(id,data.secure_url) 
			})
			.catch(()=>{
				alert(error)
			})

    
    }


 
 
 useEffect(()=>{
    getAppointments();
	},[selectedDate,workList,user,doneAppointments,doneItems])



  return (
    <div className="containerStyle mt-5">
      
      <div className="row text-center" style ={{ height:"50%"}}>
        <div className="col-4 ">
          <h2 className="columnTitleStyle">Appointment Date</h2>
          <div className="m-1 carousel-style">
             <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date) } inline/>
          </div> 
        </div>
        <div className="col-8">
          <h2 className="columnTitleStyle">Scheduled Appointments</h2>
          <div className="m-1 p-2 carousel-style" >
              
              <div className="list-group">
                {appointments.map((appointment, index, array) => {
                  return (
                    <Appointment appointment={appointment} viewAppointment={viewAppointment} editAppointment={editAppointment} key={index} index={appointment.id}/>
                    )
                  })
                }
              </div>
          </div> 
        </div>
      </div>
      <div className="row text-center" style ={{ height:"50%"}}>
        <div className="col-3">
            <h2 className="columnTitleStyle">Scheduled Works</h2>
            <div className="m-1 p-2 card" style={{height:"20rem"}}>
              <div className="list-group">
                {
                  workList.map((work, index, array) => {
                    cost=cost+work.cost;
                    duration=duration+work.duration;
                    return (
                      <li className="list-group-item list-group-item-danger" key={index}>{work.description}</li>
                    )
                  })
                }
              </div>
                <p>Estimated Duration: {duration} min</p>
                <p>Total Cost: ${cost}</p>
          </div> 
        </div>
        <div className="col-3">
            <h2 className="columnTitleStyle">User Info</h2>
            <User_Card user={user} key={user.user_id} index={user.user_id}/>
        </div>
        <div className="col-6">
            <h2 className="columnTitleStyle">User History</h2>
            <div className="row carousel-style">
                <div className="col-4 pt-1">
                  {doneAppointments.map((doneAppointment, index, array) => {
                     let review=doneAppointment.review +" Stars " + doneAppointment.review_description;
                      return (
                        <button type="button" className="btn modalButtonStyle my-1" onClick={() => setReview(doneAppointment.items,review)}>{doneAppointment.date}</button>
                      )
                    })
                  }
                  </div>
                <div className="col-8 pt-1 ">
                     <Carousel doneItems={doneItems} />
                     <p><b>{reviewDescription}</b></p>
                </div>
            </div>
            
        </div> 
         
      </div>
      
      

    </div>
  );
};




export default Home_Stylist;
