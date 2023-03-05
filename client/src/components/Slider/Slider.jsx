import React from "react";
import styles from "./slider.module.css";

function Slider({ items }) {

    return (
        <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img className="d-block w-100" src={items[0]} alt="First slide" />
                </div>
                { items.slice(1).map(item => 
                    <div className="carousel-item">
                        <img className="d-block w-100" src={item} alt="Second slide" />
                    </div>)
                }
            </div>
            <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a>
        </div>
    );

}

export default Slider;