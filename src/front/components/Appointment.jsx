import React, {useState} from "react";
import Edit_Appointment from "../components/Edit_Appointment"



const Appointment = ({appointment, viewAppointment, editAppointment, setModalIsOpen, modalIsOpen, index}) => {
  

    return (
        
        <li className="list-group-item list-group-item-danger" key={index} style ={{ height:"20%"}}>
            <div className="row  my-1 mx-2 ">
                <div className="col-9">
                    <h4>{appointment.date +"  " + appointment.user}</h4>
                </div>
                <div className="col-3">
                  <button type="button" className="btn boton"  onClick={() => { viewAppointment(index,appointment.user_objeto) }}>Details</button>
                  <button type="button" className="btn boton mx-2" onClick={() => setModalIsOpen(true)}>Edit</button>
                  <Edit_Appointment appointment={appointment} editAppointment={editAppointment} isOpen={modalIsOpen} />

                </div>
            </div>
        </li> 
    );
};
export default Appointment;