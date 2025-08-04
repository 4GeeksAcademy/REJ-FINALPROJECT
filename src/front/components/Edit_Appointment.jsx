import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

const Edit_Appointment = (appointment,editAppointment,isOpen) => {
    
    console.log(appointment)

    return(
        <div>
            <Modal isOpen={isOpen} onRequestClose={() => setModalIsOpen(false)}
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
                    <button type="button" className="btn boton"  onClick={() => { editAppointment(appointment) }}>Details</button>
                </div>
            </Modal>
        </div>
    );
};

export default Edit_Appointment;