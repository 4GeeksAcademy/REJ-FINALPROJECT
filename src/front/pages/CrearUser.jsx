import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Home.css";
import Appointment_Admin from "../components/Appointment_Admin"
import User_Card from "../components/User_Card";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Carousel_Admin from "../components/Carousel_Admin";
import { CgPassword } from "react-icons/cg";


const CrearUser = () => {
    const api_URL = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [sexo, setSexo] = useState('');
    const [fecha_nacimiento, setfecha_nacimiento] = useState('');
    const [role, setRole] = useState('');
    const [picture, setPicture] = useState();
    const [password, setPassword] = useState('');
    const [pictureUrl, setPictureUrl] = useState('');

    let imagen = [];
    let imagenUrl = '';

    function createUser() {
        console.log("crear", email)
    }

    const fileChange = (event) => {
        /*imagen.push(event.target.files[0]);
        console.log(imagen);*/
        ImageUpload(event.target.files[0])
    };
    const emailChange = (event) => {
        setEmail(event.target.value);
    };
    const nombreChange = (event) => {
        setNombre(event.target.value);
    };
    const telefonoChange = (event) => {
        setTelefono(event.target.value);
    };
    const passwordChange = (event) => {
        setPassword(event.target.value);
    };
    const sexoChange = (event) => {
        setSexo(event.target.value);
    };

    function ImageUpload(image) {
        console.log(image)
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_PRESET);
        formData.append('api_key', import.meta.env.VITE_CLOUDINARY_API_KEY);
        formData.append('cloud_name', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

        let url = "https://api.cloudinary.com/v1_1/" + import.meta.env.VITE_CLOUDINARY_CLOUD_NAME + "/image/upload";

        fetch(url, {
            method: "POST",
            body: formData,

        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data.secure_url);
                imagenUrl = data.secure_url;
            })
            .catch(() => {
                alert(error)
            })
    }

    function crearUsuario() {


        //ImageUpload();

        let url = api_URL + 'register'
        console.log(url)

        let bodyData = {
            email: email,
            password: password,
            nombre: nombre,
            telefono: telefono,
            sexo: sexo,
            fecha_nacimiento: '1982-04-04',
            role: 'user',
            picture: imagenUrl
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


    };


    useEffect(() => {

    }, [])

    return (
        <div className="containerStyle mt-5 text-center row" >
            <div className=" text-center col-3">

            </div>
            <div className="text-center col-6">


                <div className="carousel-style mx-5 text-center" style={{ width: "50rem" }}>
                    <h1 className="titulo" id="exampleModalLabel">Create User</h1>

                    <div className="modal-body">
                        <div className="input-group mb-3">
                            <label htmlFor="user" className="input-group-text">email</label>
                            <input type="text" className="form-control" id="user" onChange={emailChange} />
                        </div>
                        <div className="input-group mb-3">
                            <label htmlFor="nombre" className="input-group-text">name</label>
                            <input type="text" className="form-control" id="nombre" onChange={nombreChange} />
                        </div>
                        <div className="input-group mb-3">
                            <label htmlFor="telefono" className="input-group-text">Telephone</label>
                            <input type="text" className="form-control" id="telefono" onChange={telefonoChange} />
                        </div>
                        <div className="input-group mb-3">
                            <label htmlFor="password" className="input-group-text">Password</label>
                            <input type="password" className="form-control" id="password" onChange={passwordChange} />
                        </div>
                        <div className="input-group mb-3">
                            <label htmlFor="sexo" className="input-group-text">Sexo</label>
                            <select className="form-select" id="sexo" onChange={sexoChange}>
                                <option value=""></option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="m-1">

                            <div className="my-2">
                                <label htmlFor="file" className="input-group-text my-1">Picture</label>
                                <input type="file" className="form-control" id="file"
                                    onChange={fileChange} />
                            </div>

                        </div>
                    </div>

                    <button type="button" className="btn modalButtonStyle"
                        onClick={() => {
                            crearUsuario();

                        }}
                    >Save changes</button>
                </div>
            </div>
                        
            <div className=" text-center col-3">

            </div>

        </div>

    );
};


export default CrearUser;
