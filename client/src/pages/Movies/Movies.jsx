import React, { useState } from "react";
import { useQuery } from "react-query";
import MovieCard from "../../components/MovieCard/MovieCard";
import { fetchMovies } from "../../api";
import { useParams } from "react-router-dom";
import styles from "./movies.module.css";

import SyncLoader from "react-spinners/SyncLoader";
import PaginationCard from "../../components/PaginationCard/PaginationCard";

function Movies() {
  const { query, pageId } = useParams();

  const movies = useQuery(["movies", { pageId }], () =>
    fetchMovies(query, pageId)
  );

  if (movies.isLoading)
    return (
      <div className="d-flex position-absolute h-100 w-100 justify-content-center align-items-center top0">
        <SyncLoader size={35} />
      </div>
    );

  if (movies.isError) return "An error has occurred: " + movies.error.message;

  function renderProduct(item, key) {
    return <MovieCard key={key} index={key} movie={item} />;
  }

  return (
    <div className="container customContainer">
      <div className="row no-gutters">
        {movies.data.results.map(renderProduct)}

        <div className="col-12 justify-content-center d-flex margin-end-to-page">
          <div className="row no-gutters">
            <PaginationCard
              addToUrl={query}
              pageId={pageId}
              totalPages={movies.data.total_pages}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Movies;
