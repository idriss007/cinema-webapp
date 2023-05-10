import React from "react";

//React Spinners
import ClipLoader from "react-spinners/ClipLoader";
//Stylesheet
import styles from "./watchlistcard.module.css";
import NewList from "../NewList/NewList";
import { Link, useLocation } from "react-router-dom";

function WatchlistCard({
  handleAddWatchlistClicked,
  loggedIn,
  isInList,
  setIsInList,
  movie,
  called,
  isInListLoading,
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

  // if (isInListLoading) {
  //   return (
  //     <div className="">
  //       <ClipLoader />
  //     </div>
  //   );
  // }

  return (
    <>
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
              reloadDocument={true}
              className="d-flex justify-content-center align-items-center text-nowrap text-decoration-none color-inherit no-hover"
              to="/login"
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
        </div>

        {isInListLoading
          ? null
          : loggedIn &&
            called === "DetailPage" && (
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

      {<NewList lists={lists} movie={movie} />}
    </>
  );
}

export default WatchlistCard;
