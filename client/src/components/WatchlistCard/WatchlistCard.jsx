import React, { useState } from "react";

//React Spinners
import ClipLoader from "react-spinners/ClipLoader";
//Stylesheet
import styles from "./watchlistcard.module.css";
import NewList from "../NewList/NewList";

function WatchlistCard({
  handleAddWatchlistClicked,
  isInList,
  setIsInList,
  movie,
  called,
  isInListLoading,
  width,
  lists,
}) {
  return (
    <>
      {isInListLoading ? (
        <div className="d-flex justify-content-center align-items-center pt-3 pb-3 pl-4 pr-4">
          <ClipLoader />
        </div>
      ) : (
        <div className={"d-flex align-items-center " + width}>
          <div
            className={
              called === "DetailPage"
                ? styles.addToWatchlistBtn +
                  " d-flex align-items-center justify-content-center p-3 w-100"
                : styles.addToWatchlistBtn +
                  " d-flex align-items-center justify-content-center pl-3 pr-3 pt-2 pb-2 w-100"
            }
            onClick={() =>
              handleAddWatchlistClicked(isInList, setIsInList, movie)
            }
          >
            <p className="d-flex justify-content-center align-items-center text-nowrap">
              {isInList
                ? called === "DetailPage"
                  ? "✓ In Watchlist"
                  : "✓ Watchlist"
                : called === "DetailPage"
                ? "+ Add to Watchlist"
                : "+  Watchlist"}
            </p>
          </div>

          {called === "DetailPage" && (
            <div
              role="button"
              id="asd"
              data-toggle="modal"
              data-target="#newListModal"
              className={
                "ml-1 d-flex align-items-center justify-content-center p-3 w-100 " +
                styles.addToWatchlistBtn
              }
            >
              ▼
            </div>
          )}
        </div>
      )}

      <NewList lists={lists} movie={movie} />
    </>
  );
}

export default WatchlistCard;
