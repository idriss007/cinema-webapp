import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import moment from "moment";

//Components
import StarCard from "components/StarCard/StarCard";
import WatchlistCard from "components/WatchlistCard/WatchlistCard";

//Contexts
import AuthContext from "context/AuthContext";
import ListContext from "context/ListContext";

//React Icons
import { BsStarFill } from "react-icons/bs";

//Stylesheet
import styles from "./moviecardsmall.module.css";
import { useQuery } from "react-query";
import { getCreditDetails } from "api";

function MovieCardSmall({ movie, type }) {
  const { loggedIn } = useContext(AuthContext);
  const { lists, handleAddWatchlistClicked } = useContext(ListContext);
  const [isInList, setIsInList] = useState();
  const [isInListLoading, setIsInListLoading] = useState(true);

  const credit = useQuery(
    ["credit", movie.credit_id],
    () => getCreditDetails(movie.credit_id),
    {
      enabled: movie.credit_id ? true : false,
      // onSuccess: (credit) => console.log(credit),
    }
  );

  // const job =
  //   credit?.data?.job?.toLowerCase() === "actor" &&
  //   credit.data.person.gender === 1
  //     ? "Actress"
  //     : "Actor";

  useEffect(() => {
    (async () => {
      if (lists) {
        const isContainInList = await lists[0].movies.find(
          (movieData) => movieData?.movie?.id === parseInt(movie?.id)
        );

        // if (isContainInList) {
        //   setIsInList(true);
        // }
        // if (!isContainInList) {
        //   setIsInList(false);
        // }

        setIsInList(isContainInList);

        setIsInListLoading(false);
      }

      if (!loggedIn) {
        setIsInListLoading(false);
      }
    })();
  }, [lists]);

  const isReleased =
    moment(new Date()).format("YYYYMMDD") >
    moment(movie.release_date).format("YYYYMMDD");

  const poster = "https://www.themoviedb.org/t/p/w342/" + movie?.poster_path;

  return (
    <div className={clsx(styles.container, "row no-gutters")}>
      <div className={clsx(styles.posterContainer, "col-12")}>
        <Link
          reloadDocument={true}
          style={{ textDecoration: "none", color: "inherit" }}
          to={"/detail/" + movie.id}
        >
          <img className={styles.poster} src={poster} />
        </Link>
      </div>

      <div className="d-flex align-items-center mt-1 mb-1 row no-gutters">
        <div
          className={clsx(
            styles.vote,
            "d-flex pl-2 pr-2 col-auto justify-content-center align-items-center"
          )}
        >
          {isReleased ? (
            <BsStarFill className="mr-1" color="#F5C518" />
          ) : (
            <BsStarFill className="mr-1" color="#9E9E9E" />
          )}
          {isReleased ? parseFloat(movie.vote_average).toFixed(1) : ""}
        </div>
        {isReleased && (
          <div
            className={clsx(
              styles.ratingInfoContainer,
              "d-flex justify-content-center align-items-center col-auto"
            )}
          >
            <StarCard
              movie={movie}
              size="14"
              formOfCalling="inMovieCardComponent"
            />
          </div>
        )}
      </div>

      <div className={styles.title + " col-12 pl-2"}>
        {/* {movie.original_title} */}
        {movie.title}
      </div>

      {credit.data ? (
        <div className="col-12 text-white pl-2">
          {`(${credit?.data?.department})`}
        </div>
      ) : null}

      <div className="d-flex justify-content-center align-items-center p-2 col-12">
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
