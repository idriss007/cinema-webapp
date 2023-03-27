import React from "react";
import { useQuery } from "react-query";
import { fetchNowPlayingOrUpcomingMovies } from "../../api";
import MovieCardSmall from "../MovieCardSmall/MovieCardSmall";
import styles from "./movieslider.module.css";
import Slider from "react-slick";

import "./slick.css";
import "./slick-theme.css";

function MovieSlider({ query }) {

    const settings = {
        className: "center",
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 5,
        swipeToSlide: true,
        afterChange: function (index) {
            console.log(
                `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
            );
        }
    }

    const { isLoading: statusDetails, error: errorDetails, data: movies } = useQuery(["movies", { query }], () => fetchNowPlayingOrUpcomingMovies(query));

    if (statusDetails) return 'Loading...'
    if (errorDetails) return 'An error has occurred: ' + errorDetails.message

    function renderMovies(movie, key) {
        return <MovieCardSmall key={key} movie={movie} />
    }

    return (
        <div className={styles.container}>

            <Slider {...settings}>

                {/* <div>
                    <h3>1</h3>
                </div>
                <div>
                    <h3>2</h3>
                </div>
                <div>
                    <h3>3</h3>
                </div>
                <div>
                    <h3>4</h3>
                </div>
                <div>
                    <h3>5</h3>
                </div>
                <div>
                    <h3>6</h3>
                </div>
                <div>
                    <h3>7</h3>
                </div>
                <div>
                    <h3>8</h3>
                </div>
                <div>
                    <h3>9</h3>
                </div> */}
                {movies?.results.map((movie, key) => renderMovies(movie, key))}
            </Slider>

            

        </div>
    );
}

export default MovieSlider;