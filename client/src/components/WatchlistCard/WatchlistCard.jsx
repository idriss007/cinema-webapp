import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { AddToList, fetchLists } from "../../api";
import ListContext from "../../context/ListContext";
import styles from "./watchlistcard.module.css";

function WatchlistCard({ user, details }) {
  const [isInList, setIsInList] = useState(false);
  const { id } = useParams();

  useEffect(() => {}, []);

  const {
    isLoading: statusLists,
    error: errorLists,
    data: lists,
  } = useQuery(["lists", parseInt(id)], () => fetchLists(user._id));
  if (statusLists) return "Loading...";
  if (errorLists) return "An error has occurred: " + errorLists.message;

  const isContainInList = lists[0].movieIds.find(
    (Id) => Id === JSON.stringify(details.id)
  );

  async function addToList(list, movie_id) {
    if (list.movieIds.length !== 0) {
      // const isContainInList = list.movieIds.find(Id => Id === JSON.stringify(movie_id));

      if (isContainInList) {
        setIsInList(true);
        // return console.log("Movie already in this list.");
      }
      if (!isContainInList) {
        setIsInList(false);
      }

      if (isInList === false) {
        console.log("movie added");
        try {
          await AddToList(list._id, movie_id);
          setIsInList(true);
          return console.log("Film eklendi");
        } catch (err) {
          console.log(err);
        }
      }

      if (isInList === true) {
        console.log("movie couldn't added");
      }
    }
  }

  return (
    <>
      <div className={styles.addToWatchlistBtnContainer}>
        <button
          className={"btn btn-success " + styles.addToWatchlistBtn}
          onClick={() => addToList(lists[0], details.id)}
        >
          {isInList ? "Kaldır" : "+ Add to watchlist"}
        </button>
      </div>
    </>
  );
}

export default WatchlistCard;
