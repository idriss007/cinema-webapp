import React, { useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import clsx from "clsx";

//Config File
import configData from "config.json";

//React Icons
import { BsImage } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";

//Stylesheet
import styles from "./searchbox.module.css";

const linkStyle = {
  textDecoration: "none",
  color: "inherit",
};

function SearchBox({
  handleKeyPress,
  handleChange,
  searchQuery,
  placeholder,
  movies,
  searchBoxInput,
}) {
  const imgPath = configData.moviePosterUrlw154;
  return (
    <>
      <div className={clsx(styles.searchInputs)}>
        <form action={"http://localhost:3000/search/" + searchQuery}>
          <input
            onKeyDown={handleKeyPress}
            value={searchQuery}
            onChange={handleChange}
            className={styles.searchBoxInput}
            placeholder={placeholder}
            ref={searchBoxInput}
            type="text"
          />
        </form>
      </div>

      {movies?.length > 0 ? (
        <div className={styles.queryResultContainer}>
          {movies?.slice(0, 5).map((movie) => {
            return (
              <Link
                reloadDocument={true}
                style={linkStyle}
                to={"detail/" + movie.id}
              >
                <div className={styles.resultMovieContainer}>
                  <div className={styles.resultMovieImgContainer}>
                    {movie?.poster_path ? (
                      <img
                        className={styles.resultMovieImg}
                        src={`${imgPath}${movie.poster_path}`}
                        alt=""
                      />
                    ) : (
                      <div
                        role="img"
                        className={clsx(
                          styles.imageNotFound,
                          "w-100 rounded d-flex justify-content-center align-items-center"
                        )}
                      >
                        <BsImage size="20" />
                      </div>
                    )}
                  </div>
                  <div className={styles.resultMovieInfoContainer}>
                    <div>
                      <p>{movie.title}</p>
                    </div>
                    <div className={styles.resultMovieReleaseDateContainer}>
                      <p>{moment(movie.release_date).format("YYYY")}</p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : null}
    </>
  );
}

export default SearchBox;
