import React from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";

//External Api
import { getGenreList, getMoviesByGenre } from "api";

//Components
import MovieCard from "components/MovieCard/MovieCard";
import PaginationCard from "components/PaginationCard/PaginationCard";
import PageNotFound from "components/PageNotFound/PageNotFound";

//React Spinners
import SyncLoader from "react-spinners/SyncLoader";

function SearchMovieByGenreResults() {
  const { genreName, pageId } = useParams();

  let genre = "";

  const genreList = useQuery(["genres"], () => getGenreList());

  if (genreList.isSuccess) {
    genre = genreList.data.genres.find(
      (genre) => genre.name.toLowerCase() === genreName
    );
  }

  const movies = useQuery(
    ["movies", genreName],
    () => getMoviesByGenre(genre.id, pageId),
    { enabled: genre ? true : false, retry: false }
  );

  if (movies.isLoading || genreList.isLoading) {
    return (
      <div className="d-flex position-absolute h-100 w-100 justify-content-center align-items-center top0">
        <SyncLoader size={35} />
      </div>
    );
  }

  // if (movies.isError) {
  //   return <p>{movies.error.message}</p>;
  // }

  if (movies.isError) {
    return <PageNotFound />;
  }

  function renderProduct(item, key) {
    return <MovieCard key={key} index={key} movie={item} />;
  }

  // if (parseInt(pageId) > parseInt(movies?.data.total_pages)) {
  //   console.log("hello");
  //   return <PageNotFound />;
  // }

  return (
    <div className="container customContainer">
      <div className="col-12 h1">{`Results for: ${genreName}`}</div>
      <div className="row no-gutters">
        {movies.data.results.map(renderProduct)}

        <div className="col-12 justify-content-center d-flex margin-end-to-page">
          <div className="row no-gutters">
            <PaginationCard
              addToUrl={genreName}
              pageId={pageId}
              totalPages={
                movies.data.total_pages > 500 ? 500 : movies.data.total_pages
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchMovieByGenreResults;
