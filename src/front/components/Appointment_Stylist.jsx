import React, { useState } from "react";
import Edit_Appointment from "../components/Edit_Appointment"

const Appointment = ({ appointment, viewAppointment, editAppointment, index }) => {
    const [isDisabled, setIsDisabled] = useState(false);
    let images = [];
    let status;

    const fileChange = (event, id) => {
        images.push([id,event.target.files[0]])
        console.log(images)
      };

    const statusChange = (event) => {
            status= event.target.value;
      };

   const editar_cita = (event) =>{

    };  

    return (

        <li className="list-group-item list-group-item-danger" key={index} style={{ height: "20%" }}>
            <div className="row  my-1 mx-2 ">
                <div className="col-6">
                    <h4>{appointment.date + "  " + appointment.user}</h4>
                </div>
                <div className="col-6">
                    <button type="button" className="btn modalButtonStyle" onClick={() => { viewAppointment(index, appointment.user_objeto) }}>Details</button>
                    <button type="button" className="btn modalButtonStyle mx-2" data-bs-toggle="modal" data-bs-target={"#modalEditAppointment-"+index}>
                        Edit
                    </button>
                    
                    <div className="modal fade" id={"modalEditAppointment-"+index}aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog carousel-style">
                            <div className="modal-content modalStyle">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Appointment</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="input-group mb-3">
                                        <label htmlFor="user" className="input-group-text">User</label>
                                        <input type="text" className="form-control" id="user" value={appointment.user} readOnly={true}/>
                                    </div>
                                    <div className="input-group mb-3">
                                        <label htmlFor="stylist" className="input-group-text">Stylist</label>
                                        <input type="text" className="form-control" id="stylist" defaultValue={appointment.stylist} readOnly={true}/>
                                    </div>
                                    <div className="input-group mb-3">
                                        <label htmlFor="date" className="input-group-text">Date</label>
                                        <input type="text" className="form-control" id="date" defaultValue={appointment.date} readOnly={true}/>
                                    </div>
                                    <div className="input-group mb-3">
                                        <label htmlFor="status" className="input-group-text">Status</label>
                                        <select className="form-select" id="inputGroupSelect01" onChange={statusChange} >
            
                                            <option value="pendiente">pendiente</option>
                                            <option value="completada">completada</option>
                                            <option value="cancelada">cancelada</option>
                                        </select>
                                    <div className="m-1">
                                        <h3 className="modal-title fs-5 my-2" id="exampleModalLabel">Work List</h3>
                                        {
                                            
                                            appointment.items.map((work, index, array) => {
                                                let id="image-"+work.id;
                                              
                                                return (
                                                
                                                <div className="my-2">
                                                    <label htmlFor={id} className="input-group-text my-1">{work.work_description}</label>
                                                    <input type="file" className="form-control" id={id} 
                                                            onChange={(Event)=>{fileChange(Event,work.id)}}/>
                                                </div>
                                                )
                                            })
                                        }
                                    </div>
                                    </div>
                                  
                                           
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary" disabled={isDisabled} 
                                            onClick={() => { 
                                                editAppointment(appointment.id, images, status) ;
                                                setIsDisabled(true);
                                                }}
                                        >Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
};
export default Appointment;