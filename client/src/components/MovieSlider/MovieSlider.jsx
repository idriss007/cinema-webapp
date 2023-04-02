import React, { useState } from "react";
import { useQuery } from "react-query";
import { fetchNowPlayingOrUpcomingMovies } from "../../api";
import MovieCardSmall from "../MovieCardSmall/MovieCardSmall";
import styles from "./movieslider.module.css";
import Slider from "react-slick";

import "./slick.css";
import "./slick-theme.css";

function MovieSlider({ movies, children }) {
  const settings = {
    className: "center",
    dots: true,
    infinite: false,
    centerPadding: "60px",
    slidesToScroll: 5,
    slidesToShow: 5,
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
    return <MovieCardSmall key={key} movie={movie} />;
  }

  return (
    <>
      {children && <div className={styles.title}>{children}</div>}
      <div className={styles.container}>
        <Slider {...settings}>
          {movies?.map((movie, key) => renderMovies(movie, key))}
        </Slider>
      </div>
    </>
  );
}

export default MovieSlider;
