import React from "react";
import { useQuery } from "react-query";
import MovieCard from "../../components/MovieCard/MovieCard";
import { fetchMovies } from "../../api";
import { useParams } from "react-router-dom";

function Movies() {
  const { query } = useParams();

  const { isLoading, error, data } = useQuery(["movies", query], () =>
    fetchMovies(query)
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  function renderProduct(item, key) {
    return <MovieCard key={key} movie={item} />;
  }

  return <div className={"container"}>{data.results.map(renderProduct)}</div>;
}

export default Movies;
