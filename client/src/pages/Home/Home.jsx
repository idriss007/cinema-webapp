import React, { useContext } from "react";
import { useQuery } from "react-query";
import moment from "moment";
import clsx from "clsx";

//Exrenal Api
import {
  fetchNowPlayingOrUpcomingMovies,
  fetchUpcomingMovies,
  getMoviesByGenre,
} from "api";

//Components
import MovieSlider from "components/MovieSlider/MovieSlider";
import LatestTrailerSection from "components/LatestTrailerSection/LatestTrailerSection";

//Stylesheet
import styles from "./home.module.css";
import ListContext from "context/ListContext";

function Home() {
  const { lists } = useContext(ListContext);

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

  const genres = [];
  //genres dizisine puanlanan her filmin id'si ekleniyor
  if (lists && lists[1]?.movies?.length > 4) {
    for (let i = 0; i < lists[1]?.movies?.length; i++) {
      if (lists[1]?.movies[i]?.movie?.genre_ids) {
        lists[1]?.movies[i]?.movie?.genre_ids.map((id) => genres.push(id));
      }
      if (lists[1]?.movies[i]?.movie.genres) {
        lists[1]?.movies[i]?.movie?.genres.map((genre) =>
          genres.push(genre.id)
        );
      }
    }
  }

  // // Function parameters = Data Array and top "n" elements to find
  // function getMax(data, n) {
  //   var tmp = {},
  //     tops = [];

  //   // Create object with count of occurances of each array element
  //   data.forEach(function (item) {
  //     tmp[item] = tmp[item] ? tmp[item] + 1 : 1;
  //   });

  //   // Create an array of the sorted object properties
  //   tops = Object.keys(tmp).sort(function (a, b) {
  //     return tmp[a] - tmp[b];
  //   });

  //   // Return last n elements in reverse order
  //   return tops.slice(-n).reverse();
  // }

  // // Test with sample data and top "n"
  // console.log(getMax(genres, 3).toString());

  // //genres dizisinin eleman sayısı 0'dan büyükse fetch işlemini yap.
  // const recommendedMovies = useQuery(
  //   ["recommendedMovies"],
  //   () => getMoviesByGenre(getMax(genres, 3).toString()),
  //   { enabled: genres.length > 0 ? true : false }
  // );

  if (
    statusUpcoming ||
    statusNowPlaying ||
    statusPopular
    // || recommendedMovies.isLoading
  )
    return <div className={styles.mainContainer}></div>;
  if (
    errorNowPlaying ||
    errorPopular ||
    errorUpcoming
    // || recommendedMovies.isError
  )
    return "An error has occurred: ";

  return (
    <div className={styles.mainContainer}>
      <div className={clsx(styles.container, "container customContainer")}>
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
        {/* {recommendedMovies?.data?.results?.length > 0 && (
          <MovieSlider key={"4"} movies={recommendedMovies?.data?.results}>
            Recommended For You
          </MovieSlider>
        )} */}
      </div>
    </div>
  );
}

export default Home;
