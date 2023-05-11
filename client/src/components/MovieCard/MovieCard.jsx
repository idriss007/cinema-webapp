import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

//Components
import Genre from "../Genre/Genre";
import StarCard from "../StarCard/StarCard";

//Stylesheet
import styles from "./moviecard.module.css";

//React Icons
import { BsStarFill } from "react-icons/bs";

function MovieCard(props) {
  const url = "https://image.tmdb.org/t/p/w500/" + props.movie.poster_path;

  // if (!props.movie.poster_path) {
  //   return null;
  // }

  let genres = [];

  const isReleased =
    moment(new Date()).format("YYYYMMDD") >
    moment(props.movie.release_date).format("YYYYMMDD");

  console.log(isReleased);

  !props.movie.genre_ids &&
    props.movie.genres.map((genre) => genres.push(genre.id));

  return (
    <div className={"mb-5 p-4 w-100 " + styles.container}>
      <div className="row">
        <div className={"col-md-auto " + styles.centerContainer}>
          <div className={styles.imageContainer + " mr-3 ml-3"}>
            <Link
              reloadDocument={true}
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
          <div
            className={"row mb-2 align-items-center " + styles.centerContainer}
          >
            <Link
              reloadDocument={true}
              style={{ textDecoration: "none", color: "inherit" }}
              to={"/detail/" + props.movie.id}
            >
              {" "}
              <p className={styles.title}> {props.movie.title} </p>{" "}
            </Link>
            <div className="ml-2 d-flex justify-content-center align-items-center">
              ({moment(props.movie.release_date).format("YYYY")})
            </div>
            {/* {props.list.name !== "Rated" && (
              <div className="col-auto ml-lg-auto">
                <button
                  className="btn btn-danger"
                  onClick={() => props.handleDeleteBtn(props.movie)}
                >
                  Delete
                </button>
              </div>
            )} */}
          </div>
          <div className={"row mb-1 " + styles.centerContainer}>
            {props.movie.genre_ids ? (
              <Genre genres={props.movie.genre_ids} />
            ) : (
              <Genre genres={genres} />
            )}
          </div>
          {isReleased && (
            <div
              className={
                "row d-flex align-items-center mb-2 " + styles.centerContainer
              }
            >
              <div className="d-flex align-items-center mr-1">
                <BsStarFill className="mr-1" color="#F5C518" size="17" />
                {parseFloat(props.movie.vote_average).toFixed(1)}
              </div>
              <StarCard movie={props.movie} />
            </div>
          )}
          <div className="row mb-2">
            <p className={styles.detail}>{props.movie.overview}</p>
          </div>
          {isReleased && (
            <div className={"row " + styles.centerContainer}>
              Votes: {props.movie.vote_count.toLocaleString()}
            </div>
          )}

          {props.called === "List" &&
            props.list.user === props.user_id &&
            props.list.name !== "Rated" &&
            props.list.name && (
              <div className="row no gutters">
                <button
                  className="btn btn-danger col-auto ml-auto"
                  onClick={() => props.handleDeleteBtn(props.movie)}
                >
                  Delete
                </button>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
