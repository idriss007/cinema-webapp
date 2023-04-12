import React from "react";

import styles from "./watchlistcard.module.css";

import ClipLoader from "react-spinners/ClipLoader";

function WatchlistCard({
  handleAddWatchlistClicked,
  isInList,
  setIsInList,
  movie,
  called,
  isInListLoading,
}) {
  return (
    <>
      {isInListLoading ? (
        <div className="d-flex justify-content-center align-items-center pt-3 pb-3 pl-4 pr-4">
          <ClipLoader />
        </div>
      ) : (
        <div
          className={
            styles.addToWatchlistBtn +
            " d-flex align-items-center justify-content-center pl-3 pr-3 pt-2 pb-2"
          }
          // loading={loggedIn && (lists ? false : true)}
          onClick={() =>
            handleAddWatchlistClicked(isInList, setIsInList, movie)
          }
        >
          {isInList
            ? called === "DetailPage"
              ? "✓ In Watchlist"
              : "✓ Watchlist"
            : called === "DetailPage"
            ? "+ Add to Watchlist"
            : "+  Watchlist"}
        </div>
      )}
    </>
  );
}

export default WatchlistCard;
