import React, {useState} from "react";

const User_Card = ({user, index}) => {
    
    console.log(user);
    return (
        

<div className="card" style={{height:"20rem"}}>
  <div className="m-1">
      <img src={user.picture} className="card-img-top text-center img-square" alt="..." style={{height:"45%", width:"60%"}}/>
    
    <p className="card-title text-center"><b>{user.nombre}</b></p>
    <p className="card-text m-1 ">Birth Date: {user.fecha_nacimiento}</p>
    <p className="card-text m-1 ">e-mail:     {user.email}</p>
    <p className="card-text m-1 ">Phone:      {user.telefono}</p>
  </div>
</div>


        
    );
};
export default User_Card;