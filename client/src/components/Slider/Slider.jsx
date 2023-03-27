import React, { useState } from "react";
import styles from "./slider.module.css";

function Slider({ allImages }) {

    const [currentIndex, setCurrentIndex] = useState(allImages[0]);

    function goToPrevious() {
        const isFirstSlide = currentIndex === allImages[0];
        const getIndex = allImages.indexOf(currentIndex);
        const newIndex = isFirstSlide ? allImages.length - 1 : getIndex - 1;
        setCurrentIndex(allImages[newIndex]);
    }

    function goToNext() {
        const isLastSlide = currentIndex === allImages[allImages.length - 1];
        const getIndex = allImages.indexOf(currentIndex);
        const newIndex = isLastSlide ? 0 : getIndex + 1;
        setCurrentIndex(allImages[newIndex]);
    }

    return (
        <>
            
            <div className={styles.carouselSlide}>
            <button id={styles.prevBtn} onClick={goToPrevious} >{"<"}</button>
            <button id={styles.nextBtn} onClick={goToNext} >{">"}</button>
                {
                    allImages.map(image => {
                        return <img className={styles.slider} src={"https://www.themoviedb.org/t/p/w1280" + currentIndex}></img>
                    })
                }
            </div>


        </>
        // <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
        //     <div className="carousel-inner">
        //         <div className="carousel-item active">
        //             <img className="d-block w-100" src={items[0]} alt="First slide" />
        //         </div>
        //         { items.slice(1).map(item => 
        //             <div className="carousel-item">
        //                 <img className="d-block w-100" src={item} alt="Second slide" />
        //             </div>)
        //         }
        //     </div>
        //     <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
        //         <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        //         <span className="sr-only">Previous</span>
        //     </a>
        //     <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
        //         <span className="carousel-control-next-icon" aria-hidden="true"></span>
        //         <span className="sr-only">Next</span>
        //     </a>
        // </div>
    );

}

export default Slider;