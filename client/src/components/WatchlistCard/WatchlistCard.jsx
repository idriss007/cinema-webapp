import React from "react";

import { LoadingButton } from "@mui/lab";

import styles from "./watchlistcard.module.css";

function WatchlistCard({
  loggedIn,
  lists,
  handleAddWatchlistClicked,
  isInList,
}) {
  return (
    <>
      {/* LoadingButton için @mui/material @emotion/react @emotion/styled @mui/lab paketleri kuruldu */}
      <LoadingButton
        className={styles.addToWatchlistBtn}
        loading={loggedIn && (lists ? false : true)}
        variant="contained"
        onClick={handleAddWatchlistClicked}
      >
        {isInList ? "✓ In Watchlist" : "+ Add to Watchlist"}
      </LoadingButton>
    </>
  );
}

export default WatchlistCard;
