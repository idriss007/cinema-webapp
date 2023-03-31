import React from "react";
import { useQuery } from "react-query";
import { fetchNowPlayingMovies, fetchNowPlayingOrUpcomingMovies, fetchPopularMovies, fetchUpcomingMovies } from "../../api";
import MovieSlider from "../../components/MovieSlider/MovieSlider";
import styles from "./home.module.css";

function Home() {

    const { isLoading: statusNowPlaying, error: errorNowPlaying, data: nowPlayingMovies } = useQuery(["movies", "now_playing?"], () => fetchNowPlayingOrUpcomingMovies("now_playing?"));
    const { isLoading: statusUpcoming, error: errorUpcoming, data: upcomingMovies } = useQuery(["movies", "upcoming?"], () => fetchNowPlayingOrUpcomingMovies("upcoming?"));
    const { isLoading: statusPopular, error: errorPopular, data: popularMovies } = useQuery(["movies", "popular?"], () => fetchNowPlayingOrUpcomingMovies("popular?"));

    if (statusUpcoming && statusNowPlaying && statusPopular) return 'Loading...'
    if (errorNowPlaying, errorPopular, errorUpcoming) return 'An error has occurred: '

    return (
        <div className={styles.container} >

            <MovieSlider movies={nowPlayingMovies?.results}>Vizyondaki Filmler</MovieSlider>
            <MovieSlider movies={upcomingMovies?.results}>Yakında Vizyona Girecek Filmler</MovieSlider>
            <MovieSlider movies={popularMovies?.results}>Popüler Filmler</MovieSlider>

        </div>
    );

}

export default Home;