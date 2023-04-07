import React from "react";
import { useQuery } from "react-query";
import { fetchNowPlayingOrUpcomingMovies } from "../../api";
import MovieSlider from "../../components/MovieSlider/MovieSlider";
import styles from "./home.module.css";

function Home() {
  const {
    isLoading: statusNowPlaying,
    error: errorNowPlaying,
    data: nowPlayingMovies,
  } = useQuery(["movies", "now_playing?"], () =>
    fetchNowPlayingOrUpcomingMovies("now_playing?")
  );
  const {
    isLoading: statusUpcoming,
    error: errorUpcoming,
    data: upcomingMovies,
  } = useQuery(["movies", "upcoming?"], () =>
    fetchNowPlayingOrUpcomingMovies("upcoming?")
  );
  const {
    isLoading: statusPopular,
    error: errorPopular,
    data: popularMovies,
  } = useQuery(["movies", "popular?"], () =>
    fetchNowPlayingOrUpcomingMovies("popular?")
  );

  if (statusUpcoming && statusNowPlaying && statusPopular) return "Loading...";
  if ((errorNowPlaying, errorPopular, errorUpcoming))
    return "An error has occurred: ";

  return (
    <div className={styles.container}>
      <MovieSlider key={"1"} movies={nowPlayingMovies?.results}>
        In theaters
      </MovieSlider>
      {/* <MovieSlider key={"2"} movies={upcomingMovies?.results}>
        Coming soon to theaters
      </MovieSlider> */}
      <MovieSlider key={"3"} movies={popularMovies?.results}>
        Popular Movies
      </MovieSlider>
    </div>
  );
}

export default Home;
