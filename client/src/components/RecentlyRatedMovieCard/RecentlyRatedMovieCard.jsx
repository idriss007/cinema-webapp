import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

//Local Api
// import { GetRating } from "../../api";
import { GetRating } from "internalApi";

//Config File
import configData from "config.json";

//React Icons
import { BsStarFill } from "react-icons/bs";

//Stylesheet
import styles from "./recentlyratedmoviecard.module.css";
import ImageNotFound from "components/ImageNotFound/ImageNotFound";

function RecentlyRatedMovieCard({ list, index, movie, userId }) {
  const { data: rating } = useQuery(["movieRating", parseInt(movie.id)], () =>
    GetRating(userId, movie.id)
  );
  return (
    <div className="col-6 col-sm-3 mb-2 mb-sm-0 d-flex justify-content-center align-items-center flex-column">
      {/* <div> */}
      <Link
        className="w-100 h-100"
        reloadDocument={true}
        style={{ textDecoration: "none", color: "inherit" }}
        to={`/detail/${movie.id}`}
      >
        {movie.poster_path ? (
          <img
            className="w-100 rounded"
            src={`${configData.moviePosterw342Url}${movie.poster_path}`}
            alt=""
          />
        ) : (
          <ImageNotFound
            size="80"
            containerWidth="100%"
            containerHeight="100%"
          />
        )}
      </Link>
      {/* </div> */}
      <div className={"w-100 d-flex justify-content-center mt-2 p-1"}>
        <Link
          className={styles.title}
          reloadDocument={true}
          style={{ textDecoration: "none", color: "inherit" }}
          to={`/detail/${movie.id}`}
        >
          <p className={styles.title}>
            {list.movies[list.movies.length - (index + 1)].movie.title}
          </p>
        </Link>
      </div>
      {rating && (
        <div className="d-flex justify-content-center align-items-center">
          <BsStarFill color="" />
          <p className="ml-1">{rating}</p>
        </div>
      )}
    </div>
  );
}

export default RecentlyRatedMovieCard;
