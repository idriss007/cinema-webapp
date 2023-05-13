import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import clsx from "clsx";

//Components
import Genre from "components/Genre/Genre";
import StarCard from "components/StarCard/StarCard";

//React Icons
import { BsStarFill, BsImage } from "react-icons/bs";

//Stylesheet
import styles from "./moviecard.module.css";
import { useQuery } from "react-query";
import { GetRating } from "internalApi";

function MovieCard(props) {
  const url = "https://image.tmdb.org/t/p/w185/" + props.movie.poster_path;
  let isPosterExist = true;

  const isAdmin = props?.user?._id === props.userId;

  if (!props.movie.poster_path) {
    isPosterExist = false;
  }

  let genres = [];

  const isReleased =
    moment(new Date()).format("YYYYMMDD") >
    moment(props.movie.release_date).format("YYYYMMDD");

  !props.movie.genre_ids &&
    props.movie.genres.map((genre) => genres.push(genre.id));

  const rating = useQuery(
    ["rating", props.movie.id],
    () => GetRating({ user_id: props.userId, movie_id: props.movie.id }),
    { enabled: !isAdmin ? true : false }
  );

  return (
    <div className={clsx(styles.container, "mb-5 p-4 w-100")}>
      <div className="row">
        <div className={clsx(styles.centerContainer, "col-md-auto")}>
          <div className={clsx(styles.imageContainer, "mr-3 ml-3")}>
            <Link
              reloadDocument={true}
              style={{ textDecoration: "none", color: "inherit" }}
              to={"/detail/" + props.movie.id}
            >
              {/* {" "} */}
              {/* <p className={styles.title}> */}
              {isPosterExist ? (
                <img loading="lazy" className={styles.image} src={url} />
              ) : (
                <div
                  className={clsx(
                    styles.posterNotFound,
                    "d-flex justify-content-center align-items-center rounded"
                  )}
                >
                  <BsImage size="40" />
                </div>
              )}
              {/* {" "} */}
              {/* </p>{" "} */}
            </Link>
          </div>
        </div>
        <div className="col">
          <div
            className={clsx(
              "row mb-2 align-items-center",
              styles.centerContainer
            )}
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
          <div className={clsx(styles.centerContainer, "row mb-1")}>
            {props.movie.genre_ids ? (
              <Genre genres={props.movie.genre_ids} />
            ) : (
              <Genre genres={genres} />
            )}
          </div>
          {isReleased && (
            <div
              className={clsx(
                styles.centerContainer,
                "row d-flex align-items-center mb-2"
              )}
            >
              <div className="d-flex align-items-center mr-1">
                <BsStarFill className="mr-1" color="#F5C518" size="17" />
                {parseFloat(props.movie.vote_average).toFixed(1)}
              </div>
              {!isAdmin && (
                <div className="d-flex align-items-center mr-1">
                  <BsStarFill className="ml-3 mr-1" color="green" size="17" />
                  {rating.data}
                </div>
              )}
              <StarCard movie={props.movie} />
            </div>
          )}
          <div className="row mb-2">
            <p className={styles.detail}>{props.movie.overview}</p>
          </div>
          {isReleased && (
            <div className={clsx(styles.centerContainer, "row")}>
              Votes: {props.movie.vote_count.toLocaleString()}
            </div>
          )}

          {props.called === "List" &&
            props.list.user === props?.user_id &&
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
