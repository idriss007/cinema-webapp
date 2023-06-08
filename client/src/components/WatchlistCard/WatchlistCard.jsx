import React from "react";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";

//Components
import AddToCustomListModal from "components/AddToCustomListModal/AddToCustomListModal";

//React Spinners
import ClipLoader from "react-spinners/ClipLoader";

//Stylesheet
import styles from "./watchlistcard.module.css";

function WatchlistCard({
  handleAddWatchlistClicked,
  loggedIn,
  isInList,
  setIsInList,
  movie,
  called,
  isInListLoading,
  setIsInListLoading,
  width,
  lists,
}) {
  const { pathname } = useLocation();

  let inList = "";
  let addList = "";

  if (called === "DetailPage") {
    inList = "✓ In Watchlist";
    addList = "+ Add to Watchlist";
  } else {
    inList = "✓ Watchlist";
    addList = "+ Watchlist";
  }

  return (
    <>
      <div className={clsx(width, "d-flex align-items-center")}>
        <button
          disabled={isInListLoading}
          className={clsx(
            styles.addToWatchlistBtn,
            "d-flex align-items-center justify-content-center w-100",
            called === "DetailPage" ? "p-3" : "pl-3 pr-3 pt-2 pb-2"
          )}
          onClick={() => {
            if (!isInListLoading) {
              handleAddWatchlistClicked(
                isInList,
                setIsInList,
                movie,
                setIsInListLoading
              );
            }
          }}
        >
          {isInListLoading ? (
            <div>
              <ClipLoader size="12px" />
            </div>
          ) : loggedIn ? (
            <p className="d-flex justify-content-center align-items-center text-nowrap">
              {isInList ? inList : addList}
            </p>
          ) : (
            <Link
              // reloadDocument={true}
              className="d-flex justify-content-center align-items-center text-nowrap text-decoration-none color-inherit no-hover"
              to="/signin"
              state={{ previousPath: pathname }}
            >
              {isInList
                ? called === "DetailPage"
                  ? "✓ In Watchlist"
                  : "✓ Watchlist"
                : called === "DetailPage"
                ? "+ Add to Watchlist"
                : "+  Watchlist"}
            </Link>
          )}
        </button>

        {isInListLoading
          ? null
          : loggedIn &&
            called === "DetailPage" && (
              <div
                role="button"
                id="asd"
                data-toggle="modal"
                data-target="#newListModal"
                className={clsx(
                  styles.addToWatchlistBtn,
                  "ml-1 d-flex align-items-center justify-content-center p-3 w-100"
                )}
              >
                ▼
              </div>
            )}
      </div>

      {<AddToCustomListModal lists={lists} movie={movie} />}
    </>
  );
}

export default WatchlistCard;
