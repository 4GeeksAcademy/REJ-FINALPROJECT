import React, {useState} from "react";

const Appointment = ({Appointment, viewAppointment, index}) => {
    
    return (
        
        <li className="list-group-item list-group-item-danger" key={index} style ={{ height:"20%"}}>
            <div className="row  my-1 mx-2 ">
                <div className="col-9">
                    <h4>{Appointment.date +"  " + Appointment.user}</h4>
                </div>
                <div className="col-3">
                  <button type="button" className="btn btn-light"  onClick={() => { viewAppointment(index,Appointment.user_objeto) }}>Details</button>
                </div>
            </div>
        </li> 
    );
};
export default Appointment;