import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

//External Api
import { fetchMovies } from "api";

//Components
import PaginationCard from "components/PaginationCard/PaginationCard";
import MovieCard from "components/MovieCard/MovieCard";
import PageNotFound from "components/PageNotFound/PageNotFound";

//React Spinners
import SyncLoader from "react-spinners/SyncLoader";

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

  function renderMovies(item, key) {
    return <MovieCard key={key} index={key} movie={item} />;
  }

  if (pageId > movies?.data.total_pages || !query) {
    return <PageNotFound />;
  }

  return (
    <div className="container customContainer">
      <div className="row no-gutters">
        <div className="col-12 h1">{`Search results for: ${query}`}</div>
        {movies.data.results.map(renderMovies)}

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
