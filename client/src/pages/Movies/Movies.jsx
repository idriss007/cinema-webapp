import React, { useState } from "react";
import { useQuery } from "react-query";
import MovieCard from "../../components/MovieCard/MovieCard";
import { fetchMovies } from "../../api";
import { useParams } from "react-router-dom";
import styles from "./movies.module.css";

function Movies() {
  const { query } = useParams();
  const [page, setPage] = useState(1);

  const { isLoading, error, data } = useQuery(["movies", query + page], () =>
    fetchMovies(query, page)
  );

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  function renderProduct(item, key) {
    return <MovieCard key={key} index={key} movie={item} />;
  }

  const pageNumbers = [];

  for (let i = 1; i <= data.total_pages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container customContainer">
      {data.results.map(renderProduct)}

      <nav className="mb-3">
        <ul className="pagination justify-content-center">
          {pageNumbers.map((number) => (
            <li
              key={number}
              className={"page-item " + (number === page && "active")}
              onClick={() => setPage(number)}
            >
              <a className="page-link" href="#">
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Movies;
