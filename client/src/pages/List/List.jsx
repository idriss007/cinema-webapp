import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchList, fetchLists } from "../../api";

import MovieCard from "../../components/MovieCard/MovieCard";

function List({ calledType }) {
  const { listId, userId } = useParams();

  const {
    isLoading: statusList,
    error: errorList,
    data: list,
  } = useQuery(["list", Date.now], () =>
    listId ? fetchList(listId) : fetchLists(userId)
  );
  console.log(list);
  // console.log(userId);
  console.log(calledType);

  if (!list) {
    return null;
  }

  return (
    <div className="container">
      <div className="display-4 mb-4">
        {listId
          ? list.name
          : calledType === "watchlist"
          ? list[0].name
          : list[1].name}
      </div>
      <div className="">
        {listId
          ? list.movies.map((movie, key) => (
              <MovieCard key={key} index={key} movie={movie.movie} />
            ))
          : calledType === "watchlist"
          ? list[0].movies.map((movie, key) => (
              <MovieCard key={key} index={key} movie={movie.movie} />
            ))
          : list[1].movies.map((movie, key) => (
              <MovieCard key={key} index={key} movie={movie.movie} />
            ))}
      </div>
    </div>
  );
}

export default List;
