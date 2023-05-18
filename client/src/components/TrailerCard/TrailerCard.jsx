import React from "react";
import { useQuery } from "react-query";
import clsx from "clsx";

//External Api
import { fetchTrailer } from "api";

//Config File
import configData from "config.json";

//React Icons
import { IoPlayCircleOutline } from "react-icons/io5";

//Stylesheet
import styles from "./trailercard.module.css";

function TrailerCard({ movie, handleTrailer, handleShow }) {
  const {
    isLoading: statusUpcoming,
    error: errorUpcoming,
    data: trailerData,
  } = useQuery(["movieTrailers", parseInt(movie.id)], () =>
    fetchTrailer(movie.id)
  );

  return (
    <div
      className={styles.container}
      onClick={() => {
        const trailers = trailerData?.results.filter(
          (content) => content.type === "Trailer"
        );
        console.log(trailers);
        trailers?.length > 0 &&
          handleTrailer(trailers[trailers.length - 1].key);
        trailers?.length > 0 && handleShow();
      }}
    >
      <img
        src={`${configData.backdropImageUrlw1280}${movie.backdrop_path}`}
        className={clsx(styles.trailerImg, "d-block w-100 rounded")}
        alt="..."
      />
      <div className={clsx(styles.infoContainer, "p-2")}>
        <IoPlayCircleOutline className={styles.playIcon} />
        <p className={styles.title}>{movie.title}</p>
      </div>
    </div>
  );
}

export default TrailerCard;
