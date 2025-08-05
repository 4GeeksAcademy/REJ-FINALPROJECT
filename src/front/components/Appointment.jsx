import React, { useState } from "react";
import { FaCalendarAlt, FaUser, FaUserCircle } from "react-icons/fa";

const Appointment = ({ appointment, viewAppointment, editAppointment, index }) => {
    const [isDisabled, setIsDisabled] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [showMonthSelection, setShowMonthSelection] = useState(false);
    const [showAuthOptions, setShowAuthOptions] = useState(false);
    let images = [];
    let status;

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const fileChange = (event, id) => {
        images.push([id, event.target.files[0]]);
        console.log(images);
    };

    const statusChange = (event) => {
        status = event.target.value;
    };

    const handleMonthSelect = (monthIndex) => {
        setSelectedMonth(monthIndex);
        setShowMonthSelection(false);
    };

    const handleContinueAsGuest = () => {
        setShowAuthOptions(false);
        editAppointment(appointment.id, images, status);
        setIsDisabled(true);
    };

    const handleLogin = () => {
        setShowAuthOptions(false);
        // Redirect to login page with appointment data
        // navigate("/login", { state: { appointmentId: appointment.id } });
    };

    return (
        <li className="list-group-item list-group-item-danger" key={index} style={{ height: "20%" }}>
            <div className="row my-1 mx-2">
                <div className="col-8">
                    <h4>{appointment.date + "  " + appointment.user}</h4>
                </div>
                <div className="col-4">
                    <button
                        type="button"
                        className="btn boton"
                        onClick={() => { viewAppointment(index, appointment.user_objeto) }}
                    >
                        Details
                    </button>
                    <button
                        type="button"
                        className="btn boton mx-2"
                        data-bs-toggle="modal"
                        data-bs-target={`#modalEditAppointment-${index}`}
                    >
                        Edit
                    </button>
                    
                    <div className="modal fade " id={"modalEditAppointment-"+index}aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog carousel-style">
                            <div className="modal-content ">

                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Appointment</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="input-group mb-3">
                                        <label htmlFor="user" className="input-group-text">User</label>
                                        <input type="text" className="form-control" id="user" value={appointment.user} readOnly={true} />
                                    </div>
                                    <div className="input-group mb-3">
                                        <label htmlFor="stylist" className="input-group-text">Stylist</label>
                                        <input type="text" className="form-control" id="stylist" defaultValue={appointment.stylist} readOnly={true} />
                                    </div>

                                    {showMonthSelection && (
                                        <div className="mb-3">
                                            <label className="input-group-text d-flex align-items-center">
                                                <FaCalendarAlt className="me-2" />
                                                Select Month
                                            </label>
                                            <div className="d-flex flex-wrap gap-2 mt-2" style={{ backgroundColor: "#f8f9fa", padding: "10px", borderRadius: "8px" }}>
                                                {months.map((month, idx) => (
                                                    <button
                                                        key={month}
                                                        className={`btn btn-sm ${selectedMonth === idx ? 'btn-primary' : 'btn-outline-primary'}`}
                                                        onClick={() => handleMonthSelect(idx)}
                                                    >
                                                        {month}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}


                                    {!showMonthSelection && (
                                        <div className="input-group mb-3">
                                            <label htmlFor="date" className="input-group-text d-flex align-items-center">
                                                <FaCalendarAlt className="me-2" />
                                                Date
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="date"
                                                defaultValue={appointment.date}
                                                readOnly={true}
                                            />
                                            <button
                                                className="btn btn-outline-secondary"
                                                type="button"
                                                onClick={() => setShowMonthSelection(true)}
                                            >
                                                Change Month
                                            </button>
                                        </div>
                                    )}

                                    <div className="input-group mb-3">
                                        <label htmlFor="status" className="input-group-text">Status</label>
                                        <select
                                            className="form-select"
                                            id="inputGroupSelect01"
                                            onChange={statusChange}
                                            defaultValue={appointment.status || "pending"}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="completed">Completed</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    </div>

                                    <div className="m-1">
                                        <h3 className="modal-title fs-5 my-2">Work List</h3>
                                        {appointment.items.map((work) => {
                                            let id = `image-${work.id}`;
                                            return (
                                                <div className="my-2" key={id}>
                                                    <label htmlFor={id} className="input-group-text my-1">
                                                        {work.work_description}
                                                    </label>
                                                    <input
                                                        type="file"
                                                        className="form-control"
                                                        id={id}
                                                        onChange={(e) => fileChange(e, work.id)}
                                                    />
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                        Close
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        disabled={isDisabled}
                                        onClick={() => setShowAuthOptions(true)}
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Authentication Options Modal */}
            {showAuthOptions && (
                <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Complete Your Appointment</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowAuthOptions(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <p>How would you like to continue?</p>
                                <div className="d-grid gap-2">
                                    <button
                                        className="btn btn-primary d-flex align-items-center justify-content-center"
                                        onClick={handleLogin}
                                    >
                                        <FaUserCircle className="me-2" />
                                        Login to Your Account
                                    </button>
                                    <button
                                        className="btn btn-outline-primary d-flex align-items-center justify-content-center"
                                        onClick={handleContinueAsGuest}
                                    >
                                        <FaUser className="me-2" />
                                        Continue as Guest
                                    </button>
                                </div>
                                <p className="mt-3 small text-muted">
                                    Creating an account allows you to manage appointments and receive special offers.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </li>
    );
};

export default Appointment;
