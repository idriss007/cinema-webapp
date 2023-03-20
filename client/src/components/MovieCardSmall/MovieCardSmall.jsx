import React from "react";
import { Link } from "react-router-dom";
import styles from "./moviecardsmall.module.css";

function MovieCardSmall({ movie }) {

    const poster = "https://www.themoviedb.org/t/p/w500/" + movie?.poster_path;

    return (
        <div className={styles.container}>
            <div className={styles.posterContainer}><Link style={{ textDecoration: "none", color: "inherit", }} to={"/detail/" + movie.id}><img className={styles.poster} src={poster} /></Link></div>
            <p className={styles.title}>{movie.original_title}</p>
        </div>
    );
}

export default MovieCardSmall;