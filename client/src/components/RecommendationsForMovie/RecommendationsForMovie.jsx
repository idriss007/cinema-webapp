import React, { useEffect, useState } from "react";

//ExternalApi
import { getRecommendationsForMovie } from "api";

//Components
import MovieSlider from "components/MovieSlider";

function RecommendationsForMovie({ movie }) {
  const [movies, setMovies] = useState();

  useEffect(() => {
    (async () => {
      const movies = await getRecommendationsForMovie(movie.id);
      setMovies(movies.results);
    })();
  }, []);

  return (
    movies?.length > 0 && (
      <MovieSlider movies={movies}>More like this</MovieSlider>
    )
  );
}

export default RecommendationsForMovie;
