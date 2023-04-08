import React from "react";
import { Link } from "react-router-dom";
import Genre from "../Genre/Genre";
import styles from "./moviecard.module.css";
import StarCard from "../StarCard/StarCard";
import moment from "moment";

//React Icons
import { BsStarFill } from "react-icons/bs";

function MovieCard(props) {
  const url = "https://image.tmdb.org/t/p/w500/" + props.movie.poster_path;

  if (!props.movie.poster_path) {
    return null;
  }

  return (
    <div className={"container mb-5 mt-5 p-4 " + styles.container}>
      <div className="row">
        <div className="col-md-auto">
          <div className={styles.imageContainer + " mr-3 ml-3"}>
            <Link
              reloadDocument
              style={{ textDecoration: "none", color: "inherit" }}
              to={"/detail/" + props.movie.id}
            >
              {" "}
              <p className={styles.title}>
                <img loading="lazy" className={styles.image} src={url} />{" "}
              </p>{" "}
            </Link>
          </div>
        </div>
        <div className="col">
          <div className="row mb-2">
            <Link
              reloadDocument
              style={{ textDecoration: "none", color: "inherit" }}
              to={"/detail/" + props.movie.id}
            >
              {" "}
              <p className={styles.title}> {props.movie.title} </p>{" "}
            </Link>
            <div className="ml-2 d-flex justify-content-center align-items-center">
              ({moment(props.movie.release_date).format("YYYY")})
            </div>
          </div>
          <div className="row mb-1">
            <Genre genres={props.movie.genre_ids} />
          </div>
          <div className="row d-flex align-items-center mb-2">
            <div className="d-flex align-items-center mr-1">
              <BsStarFill className="mr-1" color="#F5C518" size="17" />
              {parseFloat(props.movie.vote_average).toFixed(1)}
            </div>
            <StarCard movie={props.movie} />
          </div>
          <div className="row mb-2">
            <p className={styles.detail}>{props.movie.overview}</p>
          </div>
          <div className="row">
            Votes: {props.movie.vote_count.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
