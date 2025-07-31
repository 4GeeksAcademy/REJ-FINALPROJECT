import React, { useState } from "react";
import Edit_Appointment from "../components/Edit_Appointment"
import Modal from 'react-modal';
//<Edit_Appointment appointment={appointment} editAppointment={editAppointment} isOpen={modalIsOpen} />

const Appointment = ({ appointment, viewAppointment, editAppointment, setModalIsOpen, modalIsOpen, index }) => {


    return (

        <li className="list-group-item list-group-item-danger" key={index} style={{ height: "20%" }}>
            <div className="row  my-1 mx-2 ">
                <div className="col-9">
                    <h4>{appointment.date + "  " + appointment.user}</h4>
                </div>
                <div className="col-3">
                    <button type="button" className="btn boton" onClick={() => { viewAppointment(index, appointment.user_objeto) }}>Details</button>
                    <button type="button" className="btn boton mx-2" onClick={() => setModalIsOpen(true)}>Edit</button>
                    <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}
                        contentLabel="Example Modal"
                    >

                        <div className="mb-3">
                            <label for="user" className="form-label">User</label>
                            <input type="text" className="form-control" id="user" />
                            <label for="stylist" className="form-label">Stylist</label>
                            <input type="text" className="form-control" id="stylist" />
                            <label for="date" className="form-label">Date</label>
                            <input type="text" className="form-control" id="date" />
                            <label for="status" className="form-label">Status</label>
                            <input type="text" className="form-control" id="status" />
                            <button type="button" className="btn boton" onClick={() => { editAppointment(appointment) }}>Details</button>
                        </div>
                    </Modal>

                </div>
            </div>
        </li>
    );
};
export default Appointment;