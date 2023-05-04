import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

//Stylesheet
import styles from "./moviecardsmall.module.css";

//Components
import StarCard from "../StarCard/StarCard";
import WatchlistCard from "../WatchlistCard/WatchlistCard";

//React Icons
import { BsStarFill } from "react-icons/bs";

//Contexts
import AuthContext from "../../context/AuthContext";
import ListContext from "../../context/ListContext";

function MovieCardSmall({ movie, type }) {
  const { loggedIn } = useContext(AuthContext);
  const { lists, handleAddWatchlistClicked } = useContext(ListContext);
  const [isInList, setIsInList] = useState();
  const [isInListLoading, setIsInListLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (loggedIn && lists) {
        const isContainInList = await lists[0]?.movies?.find(
          (movieData) => movieData?.movie?.id === parseInt(movie?.id)
        );

        if (isContainInList) {
          setIsInList(true);
        }
        if (!isContainInList) {
          setIsInList(false);
        }

        setIsInListLoading(false);
      } else {
        setIsInListLoading(false);
      }
    })();
  }, [lists, loggedIn, movie?.id]);

  const poster = "https://www.themoviedb.org/t/p/w342/" + movie?.poster_path;

  return (
    <div className={styles.container}>
      <div className={styles.posterContainer}>
        <Link
          reloadDocument
          style={{ textDecoration: "none", color: "inherit" }}
          to={"/detail/" + movie.id}
        >
          <img className={styles.poster} src={poster} />
        </Link>
      </div>
      {type !== "upcoming" && (
        <div className="d-flex align-items-center mt-2">
          <div className={styles.vote + " d-flex pl-2 pr-2"}>
            <BsStarFill className="mr-1" color="#F5C518" />
            {parseFloat(movie.vote_average).toFixed(1)}
          </div>
          <div
            className={
              "d-flex justify-content-center align-items-center " +
              styles.ratingInfoContainer
            }
          >
            <StarCard
              movie={movie}
              size="14"
              formOfCalling="inMovieCardComponent"
            />
          </div>
        </div>
      )}
      <div
        className={
          type !== "upcoming"
            ? styles.title + " pl-2"
            : styles.title + " pl-2 mt-2"
        }
      >
        {movie.original_title}
      </div>
      <div className="d-flex justify-content-center align-items-center p-2">
        <WatchlistCard
          loggedIn={loggedIn}
          lists={lists}
          isInList={isInList}
          handleAddWatchlistClicked={handleAddWatchlistClicked}
          movie={movie}
          setIsInList={setIsInList}
          called="MovieCardSmall"
          isInListLoading={isInListLoading}
          width="w-100"
        />
      </div>

      {/* <p>{moment(movie.release_date).format("YYYY")}</p> */}
    </div>
  );
}

export default MovieCardSmall;
