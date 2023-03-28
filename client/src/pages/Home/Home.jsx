import React from "react";
import { useQuery } from "react-query";
import { fetchNowPlayingMovies, fetchPopularMovies, fetchUpcomingMovies } from "../../api";
import MovieSlider from "../../components/MovieSlider/MovieSlider";
import styles from "./home.module.css";

function Home() {

    return (
        <div className={styles.container} >

            <MovieSlider query="now_playing?" >Vizyondaki Filmler</MovieSlider>
            <MovieSlider query="upcoming?" >Yakında Vizyona Girecek Filmler</MovieSlider>
            <MovieSlider query="popular?" >Popüler Filmler</MovieSlider>

        </div>
    );

}

export default Home;