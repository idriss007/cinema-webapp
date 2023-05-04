import React from "react";
import { useQuery } from "react-query";
import {
  fetchNowPlayingOrUpcomingMovies,
  fetchUpcomingMovies,
} from "../../api";

import moment from "moment";

//Components
import MovieSlider from "../../components/MovieSlider/MovieSlider";
import LatestTrailerSection from "../../components/LatestTrailerSection/LatestTrailerSection";

//Stylesheet
import styles from "./home.module.css";

function Home() {
  let date = moment(new Date()).format("YYYY-MM-DD");
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
  } = useQuery(["movies", "upcoming?"], () => fetchUpcomingMovies(date));
  const {
    isLoading: statusPopular,
    error: errorPopular,
    data: popularMovies,
  } = useQuery(["movies", "popular?"], () =>
    fetchNowPlayingOrUpcomingMovies("popular?")
  );

  if (statusUpcoming && statusNowPlaying && statusPopular)
    return <div className={styles.mainContainer}></div>;
  if ((errorNowPlaying, errorPopular, errorUpcoming))
    return "An error has occurred: ";

  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <LatestTrailerSection upcomingMovies={upcomingMovies} />
        <MovieSlider key={"1"} movies={nowPlayingMovies?.results}>
          In theaters
        </MovieSlider>
        <MovieSlider key={"2"} movies={upcomingMovies?.results} type="upcoming">
          Coming soon to theaters
        </MovieSlider>
        <MovieSlider key={"3"} movies={popularMovies?.results}>
          Popular Movies
        </MovieSlider>
      </div>
    </div>
  );
}

export default Home;
