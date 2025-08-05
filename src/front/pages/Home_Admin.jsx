import React, { useState, useEffect }  from "react";
import { useNavigate , Link} from "react-router-dom";
import "./Home.css";
import Appointment_Admin from "../components/Appointment_Admin"
import User_Card from "../components/User_Card";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Carousel_Admin from "../components/Carousel_Admin";


const Home_Admin = () => {
  const api_URL=import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [workList, setWorkList] = useState([]);
  const [stylist, setStylist] = useState('');
  const [stylistList, setStylistList] = useState([]);
  const [email, setEmail]= useState('');
  const [nombre, setNombre]= useState('');
  const [telefono, setTelefono]= useState('');
  const [sexo,setSexo]= useState('');
  const [fecha_nacimiento, setfecha_nacimiento]= useState('');
  const [role, setRole]= useState('');
  const [picture, setPicture]= useState('');
  
  let duration=0;
  let cost=0;

  function createUser(){
      console.log("crear", email)
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
  	console.log(url);

    fetch(url)
    .then((response)=>{
			if(response.ok==false){
				throw new Error ('Error al consultar Las Citas');
			}
		  console.log(response);
      return response.json();
		})
		.then((data)=>{
			console.log(data);
      setAppointments(data.appointments);
      console.log(appointments);
		})
		.catch((error)=>{
			alert(error)
		})
	}

  function getStylistList(){
     fetch("https://glorious-space-spork-pjwx47757q4936gjw-3001.app.github.dev/admin/stylist_list")
		.then((response)=>{
		  
			if(response.ok==false){
				throw new Error ('Error al consultar Las Citas');
			}
		  return response.json();
		})
		.then((data)=>{
		   setStylistList(data.items);
		})
		.catch((error)=>{
			alert(error)
		})
  }

  function viewAppointment(indice,user_objeto,stylist) {
 
    setStylist(stylist);

    fetch("https://glorious-space-spork-pjwx47757q4936gjw-3001.app.github.dev/stylist/appoitment_detail/"+indice)
		.then((response)=>{
		  
			if(response.ok==false){
				throw new Error ('Error al consultar Las Citas');
			}
		  return response.json();
		})
		.then((data)=>{
			console.log('stylist',data)
      
      setWorkList(data.items);
		})
		.catch((error)=>{
			alert(error)
		})
		
	}

  function editAppointment(indice,user_objeto) {
    setUser(user_objeto);
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
  
 useEffect(()=>{
    getAppointments();
    getStylistList();
	},[selectedDate,workList])

  return (
    <div className="containerStyle mt-5">
      
      <div className="row text-center" style ={{ height:"50%"}}>
        <div className="col-3 ">
          <h2 className="columnTitleStyle">Appointment Date</h2>
          <div className="m-1 carousel-style" style={{height:"85%"}}>
             <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date) } inline/>
          </div> 
        </div>
        <div className="col-6">
          <h2 className="columnTitleStyle">Scheduled Appointments</h2>
          <div className="m-1 p-2 carousel-style" style={{height:"85%"}}>
              
              <div className="list-group">
                {appointments.map((appointment, index, array) => {
                  return (
                    <Appointment_Admin appointment={appointment} viewAppointment={viewAppointment} editAppointment={editAppointment} key={index} index={appointment.id}/>
                    )
                  })
                }
              </div>
          </div> 
        </div>
          <div className="col-3">
            <h2 className="columnTitleStyle">Scheduled Works</h2>
            <div className="m-1 p-2 carousel-style" style={{height:"85%"}}>
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
                <p><b>Stylist:  {stylist}</b></p>
                <p><b>Estimated Duration: {duration} min</b></p>
                <p><b>Total Cost:  ${cost}</b></p>
          </div> 
        </div>
      </div>
      <div className="row text-center" style ={{ height:"50%"}}>
      
        <div className="col-3">
            <h2 className="columnTitleStyle">Users</h2>
           <div className="">
                <Link to="/CreateBarber" type="button" className="btn modalButtonStyle mx-2">
                        New User
                    </Link>
                  
           </div>
        </div>
        <div className="col-6">
            <h2 className="columnTitleStyle">Stylist List</h2>
            <div className="row">
                <Carousel_Admin stylists={stylistList} />
            </div>   
        </div> 
         
      </div>
      
    </div>
  );
};


export default Home_Admin;
