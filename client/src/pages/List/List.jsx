import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchList } from "../../api";

import MovieCard from "../../components/MovieCard/MovieCard";

function List() {
  const { listId } = useParams();

  const {
    isLoading: statusList,
    error: errorList,
    data: list,
  } = useQuery(["list", Date.now], () => fetchList(listId));
  //   console.log(list);

  if (!list) {
    return null;
  }

  return (
    <div className="container">
      <div className="display-4 mb-4">{list.name}</div>
      <div className="">
        {list.movies.map((movie, key) => (
          <MovieCard key={key} index={key} movie={movie.movie} />
        ))}
      </div>
    </div>
  );
}

export default List;
