import React, { useState } from "react";

const Carousel = ({doneItems}) => {
    let contador_indicadores = 0;
    let contador_item = 0;
    console.log(doneItems);
    return (
        <div id="carouselExampleDark" className="carousel carousel-dark slide">
            <div className="carousel-indicators">
                {doneItems.map((item, index, array) => {
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
                {doneItems.map((item, index, array) => {
                    contador_item = contador_item+1;
                    console.log(item.picture);
                    if (contador_item == 1) {
                        return (
                            <div className="carousel-item active" data-bs-interval="10000">
                                <img src={item.picture} className="d-block w-100" alt="..." />
                                <div className="carousel-caption d-none d-md-block">
                                    <h5>{item.work_description}</h5>
                                    <p>Some representative placeholder content for the first slide.</p>
                                </div>
                            </div>
                        )
                    } else {
                        return (
                            <div className="carousel-item" data-bs-interval="2000">
                                <img src={item.picture} className="d-block w-100" alt="..." />
                                <div className="carousel-caption d-none d-md-block">
                                    <h5>{item.work_description}</h5>
                                    <p>Some representative placeholder content for the second slide.</p>
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
export default Carousel;