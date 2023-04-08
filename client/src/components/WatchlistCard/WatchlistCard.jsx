import React from "react";

import styles from "./watchlistcard.module.css";

function WatchlistCard({
  loggedIn,
  lists,
  handleAddWatchlistClicked,
  isInList,
  setIsInList,
  movie,
  called,
}) {
  return (
    <>
      <div
        className={
          styles.addToWatchlistBtn +
          " d-flex align-items-center justify-content-center pl-3 pr-3 pt-2 pb-2"
        }
        // loading={loggedIn && (lists ? false : true)}
        onClick={() => handleAddWatchlistClicked(isInList, setIsInList, movie)}
      >
        {isInList
          ? called === "DetailPage"
            ? "✓ In Watchlist"
            : "✓ Watchlist"
          : called === "DetailPage"
          ? "+ Add to Watchlist"
          : "+  Watchlist"}
      </div>
    </>
  );
}

export default WatchlistCard;
