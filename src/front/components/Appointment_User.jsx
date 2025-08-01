import React, { useState } from "react";
import Edit_Appointment from "./Edit_Appointment"

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
                </div>
            </div>
        </li>
    );
};
export default Appointment;