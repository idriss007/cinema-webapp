import React from "react";
import { useQuery } from "react-query";
import { fetchNowPlayingOrUpcomingMovies } from "../../api";
import MovieCardSmall from "../MovieCardSmall/MovieCardSmall";
import styles from "./movieslider.module.css";

function MovieSlider({ query }) {

    const { isLoading: statusDetails, error: errorDetails, data: movies } = useQuery(["movies", {query}], () => fetchNowPlayingOrUpcomingMovies(query));

    if (statusDetails) return 'Loading...'
    if (errorDetails) return 'An error has occurred: ' + errorDetails.message

    function renderMovies(movie, key) {
        return <MovieCardSmall key={key} movie={movie} />
    }

    return (
        <div className={styles.container}>
            {movies?.results.map((movie, key) => renderMovies(movie, key))}
        </div>
    );
}

export default MovieSlider;