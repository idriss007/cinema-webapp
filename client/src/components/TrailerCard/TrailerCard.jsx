import React from "react";
import { useQuery } from "react-query";
import { fetchTrailer } from "../../api";

import styles from "./trailercard.module.css";

import { IoPlayCircleOutline } from "react-icons/io5";

function TrailerCard({ movie, handleTrailer, handleShow }) {
  const {
    isLoading: statusUpcoming,
    error: errorUpcoming,
    data: trailerData,
  } = useQuery(["movieTrailers", parseInt(movie.id)], () =>
    fetchTrailer(movie.id)
  );

  // trailerData && console.log(trailerData.results);

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
        src={"https://image.tmdb.org/t/p/w1280" + movie.backdrop_path}
        className={"d-block w-100 rounded " + styles.trailerImg}
        alt="..."
      />
      <div className={styles.infoContainer + " p-2"}>
        <IoPlayCircleOutline className={styles.playIcon} />
        <p className={styles.title}>{movie.title}</p>
      </div>
    </div>
  );
}

export default TrailerCard;
