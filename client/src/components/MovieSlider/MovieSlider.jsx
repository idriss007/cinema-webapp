import React from "react";
import Slider from "react-slick";
import clsx from "clsx";

//Components
import MovieCardSmall from "components/MovieCardSmall/MovieCardSmall";

//Stylesheets
import styles from "./movieslider.module.css";
import "./slick.css";
import "./slick-theme.css";

function MovieSlider({ movies, children, type }) {
  const settings = {
    className: "center",
    dots: false,
    infinite: false,
    centerPadding: "60px",
    slidesToScroll: 5,
    slidesToShow: 5,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1500, // width to change options
        settings: {
          slidesToScroll: 4,
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1200, // width to change options
        settings: {
          slidesToScroll: 3,
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 900, // width to change options
        settings: {
          slidesToScroll: 2,
          slidesToShow: 2,
          dots: false,
        },
      },
      {
        breakpoint: 600, // width to change options
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
    <div className={clsx(styles.container, "mt-4 pt-4 pb-5 row no-gutters")}>
      {children && (
        <div
          className={clsx(
            styles.title,
            "p-0 m-0 mb-4 d-flex justify-content-center justify-content-md-start col-12"
          )}
        >
          {children}
        </div>
      )}
      {movies?.length > 0 && (
        <div className="col-12">
          <Slider {...settings}>
            {movies?.map((movie, key) => renderMovies(movie, key))}
          </Slider>
        </div>
      )}
    </div>
  );
}

export default MovieSlider;
