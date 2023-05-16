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

function MovieCard({
  movie,
  user,
  userIdOfListOwner,
  list,
  index,
  user_id,
  called,
  handleDeleteBtn,
  isRatingList,
  handleAddToWatchedlist,
  isWatchlist,
}) {
  const url = "https://image.tmdb.org/t/p/w185/" + movie.poster_path;
  let isPosterExist = true;

  const isAdmin = user_id === userIdOfListOwner;

  if (!movie.poster_path) {
    isPosterExist = false;
  }

  let genres = [];

  const isReleased =
    moment(new Date()).format("YYYYMMDD") >
    moment(movie.release_date).format("YYYYMMDD");

  !movie.genre_ids && movie.genres.map((genre) => genres.push(genre.id));

  const listOwnersRatings = useQuery(
    ["rating", movie.id],
    () => GetRating({ user_id: userIdOfListOwner, movie_id: movie.id }),
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
              to={"/detail/" + movie.id}
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
              to={"/detail/" + movie.id}
            >
              {" "}
              <p className={styles.title}> {movie.title} </p>{" "}
            </Link>
            <div className="ml-2 d-flex justify-content-center align-items-center">
              ({moment(movie.release_date).format("YYYY")})
            </div>
            {/* {list.name !== "Rated" && (
              <div className="col-auto ml-lg-auto">
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteBtn(movie)}
                >
                  Delete
                </button>
              </div>
            )} */}
          </div>
          <div className={clsx(styles.centerContainer, "row mb-1")}>
            {movie.genre_ids ? (
              <Genre genres={movie.genre_ids} />
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
                {parseFloat(movie.vote_average).toFixed(1)}
              </div>
              {!isAdmin && isRatingList && (
                <div className="d-flex align-items-center mr-1">
                  <BsStarFill className="ml-3 mr-1" color="green" size="17" />
                  {listOwnersRatings.data}
                </div>
              )}
              <StarCard key={index} index={index} movie={movie} />
            </div>
          )}
          <div className="row mb-2">
            <p className={styles.detail}>{movie.overview}</p>
          </div>
          {isReleased && (
            <div className={clsx(styles.centerContainer, "row")}>
              Votes: {movie.vote_count.toLocaleString()}
            </div>
          )}

          {isAdmin && (
            <div className="row no-gutters justify-content-end">
              {isWatchlist && isReleased && (
                <div className="col-auto mr-2">
                  <button
                    className="btn btn-success"
                    onClick={() => handleAddToWatchedlist(movie)}
                  >
                    Watched
                  </button>
                </div>
              )}

              {!isRatingList && (
                <div className="col-auto">
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteBtn(movie)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
