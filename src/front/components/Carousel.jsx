import React, { useState } from "react";

const Carousel = ({doneAppointments, index }) => {
    let contador_indicadores = 0;
    let contador_item = 0;
    return (
    <div id="carouselExampleDark" className="carousel carousel-dark slide">
        <div className="carousel-indicators">
            {doneAppointments.map((appointment, index, array) => {
                contador_indicadores=contador_indicadores++;
                if (contador_indicadores ==0){
                    return (<button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label={appointment}>
                        </button>)
                }
                else{   
                    return (<button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to={contador_indicadores-1} aria-label={appointment}></button>)
                    }
                })
            }
        </div>
        <div className="carousel-inner">
            <div className="carousel-item active" data-bs-interval="10000">
                <img src="..." className="d-block w-100" alt="..."/>
                    <div className="carousel-caption d-none d-md-block">
                        <h5>First slide label</h5>
                        <p>Some representative placeholder content for the first slide.</p>
                    </div>
            </div>
            <div className="carousel-item" data-bs-interval="2000">
                <img src="..." className="d-block w-100" alt="..."/>
                    <div className="carousel-caption d-none d-md-block">
                        <h5>Second slide label</h5>
                        <p>Some representative placeholder content for the second slide.</p>
                    </div>
            </div>
            <div className="carousel-item">
                <img src="..." className="d-block w-100" alt="..."/>
                    <div className="carousel-caption d-none d-md-block">
                        <h5>Third slide label</h5>
                        <p>Some representative placeholder content for the third slide.</p>
                    </div>
            </div>
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


)};
export default Carousel;