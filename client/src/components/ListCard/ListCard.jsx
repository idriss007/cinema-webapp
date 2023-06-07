import React, { useEffect } from "react";
import clsx from "clsx";

//React Spinners
import ClipLoader from "react-spinners/ClipLoader";

//Stylesheet
import styles from "./listcard.module.css";

function ListCard({
  list,
  index,
  isInList,
  setIsInList,
  movie,
  addToList,
  removeFromList,
  isInListLoading,
}) {
  useEffect(() => {
    const isContainInList = list.movies.find(
      (movieData) =>
        JSON.stringify(movieData.movie.id) === JSON.stringify(movie.id)
    );

    isContainInList && setIsInList((prevState) => [...prevState, index]);
  }, []);

  return (
    <div key={index} className="col-12 d-flex">
      <button
        disabled={isInListLoading.includes(index) || isInListLoading.length > 0}
        className={clsx(
          styles.button,
          "w-100 p-3 d-flex justify-content-start"
        )}
        onClick={() => {
          if (!isInList.includes(index)) {
            addToList(list._id, movie, index);
          } else {
            removeFromList(list._id, movie, index);
          }
          // setIsInList((prevState) => {
          //   if (prevState.includes(index)) {
          //     removeFromList(list._id, movie, index);
          //     return prevState.filter((item) => item !== index);
          //   }

          //   return [...prevState, index];
          // });
        }}
      >
        {isInListLoading.includes(index) ? (
          <div className="d-flex justify-content-center w-100">
            <ClipLoader size="12px" color="white" />
          </div>
        ) : isInList.includes(index) ? (
          `✓ ${list.name}`
        ) : (
          `+ ${list.name}`
        )}
        {}
      </button>
    </div>
  );
}

export default ListCard;
