import { GetTopRatedMovies } from "api";
import MovieCard from "components/MovieCard/MovieCard";
import PageNotFound from "components/PageNotFound/PageNotFound";
import PaginationCard from "components/PaginationCard/PaginationCard";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

//React Spinners
import { SyncLoader } from "react-spinners";

function TopRatedMovies() {
  const { pageId } = useParams();

  const topRatedMovies = useQuery(["top-rated-movies"], () =>
    GetTopRatedMovies(pageId)
  );

  if (topRatedMovies.isLoading) {
    return (
      <div className="d-flex position-absolute h-100 w-100 justify-content-center align-items-center top0">
        <SyncLoader size={35} />
      </div>
    );
  }

  if (topRatedMovies.isError) {
    return <PageNotFound />;
  }

  function renderMovies(item, key) {
    return <MovieCard key={key} index={key} movie={item} />;
  }

  return (
    <div className="container customContainer">
      <div className="row no-gutters">
        <div className="col-12 h1">Top rated movies</div>
        {topRatedMovies.data.results.map(renderMovies)}

        <div className="col-12 justify-content-center d-flex margin-end-to-page">
          <div className="row no-gutters">
            <PaginationCard
              pageId={pageId}
              totalPages={
                topRatedMovies.data.total_pages > 500
                  ? 500
                  : topRatedMovies.data.total_pages
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopRatedMovies;
