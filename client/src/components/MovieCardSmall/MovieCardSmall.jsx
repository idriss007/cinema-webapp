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

function MovieCardSmall({ movie }) {
  const { loggedIn } = useContext(AuthContext);
  const { lists, handleAddWatchlistClicked } = useContext(ListContext);
  const [isInList, setIsInList] = useState();

  useEffect(() => {
    (async () => {
      if (loggedIn && lists) {
        const isContainInList = await lists[0]?.movies?.find(
          (movieData) => movieData?.movie?.id === parseInt(movie?.id)
        );

        console.log(isContainInList);

        if (isContainInList) {
          setIsInList(true);
        }
        if (!isContainInList) {
          setIsInList(false);
        }
      }
    })();
  }, [lists]);

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
      <p className={styles.title + " pl-2"}>{movie.original_title}</p>
      <div className="d-flex justify-content-center align-items-center p-2">
        <WatchlistCard
          loggedIn={loggedIn}
          lists={lists}
          isInList={isInList}
          handleAddWatchlistClicked={handleAddWatchlistClicked}
          movie={movie}
          setIsInList={setIsInList}
          called="MovieCardSmall"
        />
      </div>

      {/* <p>{moment(movie.release_date).format("YYYY")}</p> */}
    </div>
  );
}

export default MovieCardSmall;
