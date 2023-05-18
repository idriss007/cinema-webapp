import React, { useEffect } from "react";
import clsx from "clsx";

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
        className={clsx(
          styles.button,
          "w-100 p-3 d-flex justify-content-start"
        )}
        onClick={() => {
          if (!isInList.includes(index)) {
            addToList(list._id, movie);
          }
          setIsInList((prevState) => {
            if (prevState.includes(index)) {
              removeFromList(list._id, movie);
              return prevState.filter((item) => item !== index);
            }

            return [...prevState, index];
          });
        }}
      >
        {isInList.includes(index) ? `✓ ${list.name}` : `+ ${list.name}`}
      </button>
    </div>
  );
}

export default ListCard;
