import React from "react";
import moment from "moment";
import styles from "./searchbox.module.css";
import { Link } from "react-router-dom";

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
  imgPath,
  searchBoxInput,
}) {
  return (
    <>
      <div className={styles.searchInputs}>
        <input
          onKeyDown={handleKeyPress}
          value={searchQuery}
          onChange={handleChange}
          className={styles.searchBoxInput}
          placeholder={placeholder}
          ref={searchBoxInput}
        />
      </div>

      {movies?.length > 0 ? (
        <div className={styles.queryResultContainer}>
          {movies?.slice(0, 5).map((movie) => {
            return (
              <Link reloadDocument style={linkStyle} to={"detail/" + movie.id}>
                <div className={styles.resultMovieContainer}>
                  <div className={styles.resultMovieImgContainer}>
                    <img
                      className={styles.resultMovieImg}
                      src={imgPath + movie.poster_path}
                      alt=""
                    />
                  </div>
                  <div className={styles.resultMovieInfoContainer}>
                    <div>
                      <p>{movie.original_title}</p>
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
