import React from "react";
import MovieCardSmall from "../MovieCardSmall/MovieCardSmall";
import styles from "./movieslider.module.css";
import Slider from "react-slick";

import "./slick.css";
import "./slick-theme.css";

function MovieSlider({ movies, children, type }) {
  const settings = {
    className: "center",
    dots: true,
    infinite: false,
    centerPadding: "60px",
    slidesToScroll: 5,
    slidesToShow: 5,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1300, // width to change options
        settings: {
          slidesToScroll: 4,
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1100, // width to change options
        settings: {
          slidesToScroll: 3,
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 840, // width to change options
        settings: {
          slidesToScroll: 2,
          slidesToShow: 2,
          dots: true,
        },
      },
      {
        breakpoint: 590, // width to change options
        settings: {
          slidesToScroll: 1,
          slidesToShow: 1,
          dots: false,
        },
      },
    ],
  };

  if (movies?.length === 1) {
    settings.slidesToShow = 1;
  }
  if (movies?.length === 2) {
    settings.slidesToShow = 2;
  }
  if (movies?.length === 3) {
    settings.slidesToShow = 3;
  }
  if (movies?.length === 4) {
    settings.slidesToShow = 4;
  }
  if (movies?.length === 5) {
    settings.slidesToShow = 5;
  }

  function renderMovies(movie, key) {
    if (!movie?.poster_path) {
      return null;
    }
    return <MovieCardSmall key={movie.id} movie={movie} type={type} />;
  }

  return (
    <>
      {children && <div className={styles.title}>{children}</div>}
      {movies?.length > 0 && (
        <div className={styles.container}>
          <Slider {...settings}>
            {movies?.map((movie, key) => renderMovies(movie, key))}
          </Slider>
        </div>
      )}
    </>
  );
}

export default MovieSlider;
