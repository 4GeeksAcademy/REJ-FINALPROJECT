import React, { useState } from "react";
import Edit_Appointment from "../components/Edit_Appointment"

const Appointment = ({ appointment, viewAppointment, editAppointment, index }) => {
    let work_likst = [];
    return (

        <li className="list-group-item list-group-item-danger" key={index} style={{ height: "20%" }}>
            <div className="row  my-1 mx-2 ">
                <div className="col-9">
                    <h4>{appointment.date + "  " + appointment.user}</h4>
                </div>
                <div className="col-3">
                    <button type="button" className="btn boton" onClick={() => { viewAppointment(index, appointment.user_objeto) }}>Details</button>
                    <button type="button" className="btn boton mx-2" data-bs-toggle="modal" data-bs-target={"#modalEditAppointment-"+index}>
                        Edit
                    </button>
                    
                    <div className="modal fade" id={"modalEditAppointment-"+index}aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modalStyle">
                            <div className="modal-content ">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Appointment</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="input-group mb-3">
                                        <label htmlFor="user" className="input-group-text">User</label>
                                        <input type="text" className="form-control" id="user" Value={appointment.user} readOnly={true}/>
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
                                        <select className="form-select" id="inputGroupSelect01" >
                                            <option defaultValue={appointment.status}></option>
                                            <option value="1">Pendiente</option>
                                            <option value="2">Completada</option>
                                            <option value="3">Cancelada</option>
                                        </select>
                                    <div className="border m-3">
                                        <h3 className="modal-title fs-5" id="exampleModalLabel">Work List</h3>
                                        {
                                            
                                            appointment.items.map((work, index, array) => {
                                                let id="image-"+index;
                                                console.log (work);
                                                return (
                                                
                                                <div className="mb-2">
                                                    <label htmlFor={id} className="input-group-text">{work.work_description}</label>
                                                    <input type="file" className="form-control" id={id} />
                                                </div>
                                                )
                                            })
                                        }
                                    </div>
                                    </div>
                                    <div className="input-group mb-3">

                                    </div>
                                           
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary" onClick={() => { editAppointment(appointment) }}>Save changes</button>
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