import React, { useState } from "react";

const Appointment = ({ appointment, viewAppointment, editAppointment, index }) => {
  
    return (

        <li className="list-group-item list-group-item-danger" key={index} style={{ height: "20%" }}>
            <div className="row  my-1 mx-2 ">
                <div className="col-8">
                    <h4>{appointment.date + "  " + appointment.user}</h4>
                </div>
                <div className="col-4">
                    <button type="button" className="btn boton" onClick={() => { viewAppointment(index, appointment.user_objeto, appointment.stylist) }}>Details</button>
                </div>
            </div>
        </li>
    );
};
export default Appointment;