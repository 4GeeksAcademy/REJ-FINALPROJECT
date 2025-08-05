import React, { useState, useEffect, startTransition } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Appointment_User from "../components/Appointment_User"
import User_Card from "../components/User_Card";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Carousel from "../components/Carousel";


const Home_User = () => {
  const api_URL = import.meta.env.VITE_BACKEND_URL;
  
  const [appointments, setAppointments] = useState([]);
  const [doneAppointments, setDoneAppointments] = useState([]);
  const [user, setUser] = useState([]);
  const [workList, setWorkList] = useState([]);
  const [doneItems, setDoneItems] = useState([]);
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState('');
  const [stylistList, setStylistList] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [Disabled, setDisabled] = useState(false);
  const [stylist, setStylist] = useState(0);
  const [workTypes, setWorkTypes] = useState([]);
  const [selectedItem1, setSelectedItem1]= useState(0);
  const [selectedItem2, setSelectedItem2]= useState(0);
  const [selectedItem3, setSelectedItem3]= useState(0);

  let duration = 0;
  let cost = 0;
  

  const starsChange = (event) => {
    setStars(event.target.value);
  };

  const commentChange = (event) => {
    setComment(event.target.value);
  };

  const itemChange1 =(Event)=>{
    setSelectedItem1(Event.target.value);
  }
  const itemChange2 =(Event)=>{
    setSelectedItem2(Event.target.value);
  }
  const itemChange3 =(Event)=>{
    setSelectedItem3(Event.target.value);
  }
  
  const stylistChange =(Event)=>{
    setStylist(Event.target.value);
  }

  function isDisabled() {
    setDisabled(true);
  }

  function getAppointments() {

    let url = api_URL + 'user/pending_appointments';

    fetch(url)
      .then((response) => {
        if (response.ok == false) {
          throw new Error('Error al consultar Las Citas');
        }
        return response.json();
      })
      .then((data) => {
        setAppointments(data.appointments);
        console.log(data)
      })
      .catch((error) => {
        alert(error)
      })
  }

  function getDoneAppointments() {

    let url = api_URL + 'user/done_appointments';

    fetch(url)
      .then((response) => {
        if (response.ok == false) {
          throw new Error('Error al consultar Las Citas');
        }
        return response.json();
      })
      .then((data) => {
        setDoneAppointments(data.appointments);
        console.log(data)
      })
      .catch((error) => {
        alert(error)
      })
  }

  function getUser() {
    let url = api_URL + 'profile'
    fetch(url)
      .then((response) => {
        if (response.ok == false) {
          throw new Error('Error al consultar Las Citas');
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        alert(error)
      })

  }

  function viewAppointment(indice, user_objeto) {

    console.log(user_objeto);
    getDoneAppointments(user_objeto.id);

    fetch("https://glorious-space-spork-pjwx47757q4936gjw-3001.app.github.dev/stylist/appoitment_detail/" + indice)
      .then((response) => {
        console.log(response);
        if (response.ok == false) {
          throw new Error('Error al consultar Las Citas');
        }
        return response.json();
      })
      .then((data) => {
        setWorkList(data.items);
        console.log("items:", workList);
      })
      .catch((error) => {
        alert(error)
      })

  }

  function editAppointment() {
    let url = api_URL + 'profile'
    fetch(url)
      .then((response) => {
        console.log(response);
        if (response.ok == false) {
          throw new Error('Error al consultar Las Citas');
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
        console.log("user:", data);
      })
      .catch((error) => {
        alert(error)
      })

  }

  function rateAppointment(appointment_id) {
    let url = api_URL + 'review'
    let bodyData = {
      appointment_id: appointment_id,
      review: stars,
      review_description: comment
    };

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
  }

  function getStylistList() {
    let url = api_URL + 'admin/stylist_list'
    fetch(url)
      .then((response) => {
        if (response.ok == false) {
          throw new Error('Error al consultar Los Estilistas');
        }
        return response.json();
      })
      .then((data) => {
        setStylistList(data.items);
      })
      .catch((error) => {
        alert(error)
      })

  }

  function getWorTypes() {
    let url = api_URL + 'catalog'
    fetch(url)
      .then((response) => {
        if (response.ok == false) {
          throw new Error('Error al consultar Los Trabajos');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setWorkTypes(data);
      })
      .catch((error) => {
        alert(error)
      })

  }

  function addAppointment () {
    let url = api_URL + 'stylist/appointment_items'
    console.log (user);
    let bodyData = {
                  date: selectedDate,
                  status: 'pendiente',
                  user_id: user.user_id,
                  stylist_id: stylist,
                  items:[selectedItem1,selectedItem2,selectedItem3]
    };

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
  }

  useEffect(() => {
    getUser();
    getDoneAppointments();
    getAppointments();
    getStylistList();
    getWorTypes();
  }, [])



  return (
    <div className="containerStyle mt-5">

      <div className="row text-center  " >
        <div className="col-4 ">

          <h2 className="columnTitleStyle">User Info</h2>
          <User_Card user={user} key={user.user_id} index={user.user_id} />

        </div>
        <div className="col-8">
          <h2 className="columnTitleStyle">User History</h2>
          <div className="row carousel-style">
            <div className="col-4 pt-1">
              {doneAppointments.map((doneAppointment, index, array) => {
                return (
                  <div className="m-2">

                    <button type="button" className="btn boton" onClick={() => setDoneItems(doneAppointment.items)}>{doneAppointment.date}</button>
                    <button type="button" className="btn boton mx-2" data-bs-toggle="modal" data-bs-target={"#modalEditAppointment-" + index}>
                      Rate
                    </button>

                    <div className="modal fade" id={"modalEditAppointment-" + index} aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div className="modal-dialog modalStyle">
                        <div className="modal-content ">
                          <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Rate Appointment</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div className="modal-body">
                            <div className="input-group mb-3">
                              <label htmlFor="user" className="input-group-text">User</label>
                              <input type="text" className="form-control" id="user" value={doneAppointment.user} readOnly={true} />
                            </div>
                            <div className="input-group mb-3">
                              <label htmlFor="stylist" className="input-group-text">Stylist</label>
                              <input type="text" className="form-control" id="stylist" defaultValue={doneAppointment.stylist} readOnly={true} />
                            </div>
                            <div className="input-group mb-3">
                              <label htmlFor="date" className="input-group-text">Date</label>
                              <input type="text" className="form-control" id="date" defaultValue={doneAppointment.date} readOnly={true} />
                            </div>
                            <div className="input-group mb-3">
                              <label htmlFor="status" className="input-group-text">Stars</label>
                              <select className="form-select" id="inputGroupSelect01" value={stars} onChange={starsChange}>
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
      <div className="row text-center" style={{ height: "50%" }}>

        <div className="col-8">
          <div className="m-1 p-2" >
            <h2 className="columnTitleStyle">Scheduled Appointments</h2>
            <div className="list-group carousel-style">
              {appointments.map((appointment, index, array) => {
                return (
                  <Appointment_User appointment={appointment} viewAppointment={viewAppointment} editAppointment={editAppointment} key={index} index={appointment.id} />
                )
              })
              }
              <button type="button" className="btn boton my-2" data-bs-toggle="modal" data-bs-target={"#modalAddAppointment"}>
                Add Apointment
              </button>
            </div>

            <div className="modal fade " id={"modalAddAppointment"} aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog carousel-style">
                <div className="modal-content modalStyle">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Add Appointment</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body" style={{width:"90%"}}>
                    <div className="input-group mb-3">
                      <label htmlFor="user" className="input-group-text">User</label>
                      <input type="text" className="form-control" id="user" value={user.email} readOnly={true} />
                    </div>
                    <div className="input-group mb-2">
                      <label htmlFor="stylist" className="input-group-text">Stylist</label>
                      <select className="form-select" id="stylist" value ={stylist} onChange={stylistChange}>
                        <option value="0"></option>
                        {stylistList.map((stylist, index, array) => {
                          return (
                            <option value={stylist.id}>{stylist.nombre}</option>
                            )
                          })
                        }
                      </select>
                    </div>
                    <div className="input-group mb-3">
                        <DatePicker className="input-group-text" selected={selectedDate} onChange={(date) => setSelectedDate(date)}  showTimeSelect id="date"/>
                    </div>

                    <div className="m-1">
                      <h3 className="modal-title fs-5 my-2" id="exampleModalLabel">Work List</h3>
                      
                      <div className="input-group mb-2">
                        <label htmlFor="items-1" className="input-group-text">Work 1</label>
                        <select className="form-select" id="items-1" value={ selectedItem1 } onChange={itemChange1}>
                          <option value="0"></option>
                          {workTypes.map((work, index, array) => {
                            return (
                              <option value={work.id}>{work.description}</option>
                              )
                            })
                          }
                        </select>
                      </div>
                      <div className="input-group mb-2">
                        <label htmlFor="items-2" className="input-group-text">Work 2</label>
                        <select className="form-select" id="items-2" value={ selectedItem2 } onChange={itemChange2}>
                          <option value="0"></option>
                          {workTypes.map((work, index, array) => {
                            return (
                              <option value={work.id}>{work.description}</option>
                              )
                            })
                          }
                        </select>
                      </div>
                      <div className="input-group mb-2">
                        <label htmlFor="items-3" className="input-group-text">Work 3</label>
                        <select className="form-select" id="items-3" value={ selectedItem3 } onChange={itemChange3}>
                          <option value="0"></option>
                          {workTypes.map((work, index, array) => {
                            return (
                              <option value={work.id}>{work.description}</option>
                              )
                            })
                          }
                        </select>
                      </div>

                    </div>
                  </div>

                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" disabled={Disabled}
                      onClick={() => {
                        addAppointment ();
                        setDisabled(true);
                      }}
                    >Save changes</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>


        <div className="col-4">

          <div className="m-1 p-2" style={{ height: "20rem" }}>
            <h2 className="columnTitleStyle">Scheduled Works</h2>
            <div className="list-group carousel-style">
              {
                workList.map((work, index, array) => {
                  cost = cost + work.cost;
                  duration = duration + work.duration;
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



export default Home_User;
