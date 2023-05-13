import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

//Local Api
// import { GetRating } from "../../api";
import { GetRating } from "internalApi";

//React Icons
import { BsStarFill } from "react-icons/bs";

//Stylesheet
import styles from "./recentlyratedmoviecard.module.css";

function RecentlyRatedMovieCard({ list, index, movie, userId }) {
  const { data: rating } = useQuery(["movieRating", parseInt(movie.id)], () =>
    GetRating({ user_id: userId, movie_id: movie.id })
  );
  return (
    <div className="col-3 d-flex justify-content-center align-items-center flex-column">
      <div>
        <Link
          reloadDocument={true}
          style={{ textDecoration: "none", color: "inherit" }}
          to={"/detail/" + movie.id}
        >
          <img
            className="w-100 rounded"
            src={"https://www.themoviedb.org/t/p/w342" + movie.poster_path}
            alt=""
          />
        </Link>
      </div>
      <div className={"w-100 d-flex justify-content-center mt-2 p-1"}>
        <Link
          className={styles.title}
          reloadDocument={true}
          style={{ textDecoration: "none", color: "inherit" }}
          to={"/detail/" + movie.id}
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
