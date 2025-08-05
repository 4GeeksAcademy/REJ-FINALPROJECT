import React, { useState } from "react";
import User_Card from "./User_Card_Admin";

const Carousel_Admin = ({stylists}) => {
    let contador_indicadores = 0;
    let contador_item = 0;
   
    return (
        <div id="carouselExampleDark" className="carousel carousel-dark slide " style={{height:"18rem"}}>
            <div className="carousel-indicators">
                {stylists.map((item, index, array) => {
                    contador_indicadores = contador_indicadores+1;
                    if (contador_indicadores == 1) {
                        return (<button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="slide 1">
                        </button>)
                    }
                    else {
                        return (<button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to={contador_indicadores - 1} aria-label={contador_indicadores}></button>)
                    }
                })
                }
            </div>
            <div className="carousel-inner">
                {stylists.map((item, index, array) => {
                    contador_item = contador_item+1;
                    console.log(item.picture);
                    if (contador_item == 1) {
                        return (
                           <User_Card user={item} key={item.user_id} index={item.user_id}/>
                        )
                    } else {
                        return (
                            <div className="carousel-item" data-bs-interval="2000">
                                <img src={item.picture} className="d-block w-100 img-square rounded-5" alt="..." style={{height:"18rem"}}/>
                                <div className="carousel-caption d-none d-md-block">
                                    <h5><b>{item.nombre}</b></h5>
                                </div>
                            </div>
                        )
                    }
                }
            )}

            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>


    )
};
export default Carousel_Admin;