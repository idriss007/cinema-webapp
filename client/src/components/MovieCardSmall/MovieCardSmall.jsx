import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import styles from "./moviecardsmall.module.css";

function MovieCardSmall({ movie }) {

    const poster = "https://www.themoviedb.org/t/p/w342/" + movie?.poster_path;

    return (
        <div className={styles.container}>

            <div className={styles.posterContainer}>

                <Link reloadDocument style={{ textDecoration: "none", color: "inherit", }} to={"/detail/" + movie.id}>
                    <img className={styles.poster} src={poster} />
                </Link>
                <p className={styles.vote}>{parseFloat(movie.vote_average).toFixed(1)}/10</p>

                <p className={styles.title}>{movie.original_title}</p>
            </div>


            {/* <p>{moment(movie.release_date).format("YYYY")}</p> */}

        </div>
    );
}

export default MovieCardSmall;