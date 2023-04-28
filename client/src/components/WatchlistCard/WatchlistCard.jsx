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
            called === "DetailPage"
              ? styles.addToWatchlistBtn +
                " d-flex align-items-center justify-content-center pr-3 pl-3 pt-3 pb-3 w-100"
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
      )}
    </>
  );
}

export default WatchlistCard;
