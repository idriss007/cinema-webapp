import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RemoveFromList, fetchList, fetchLists } from "../../api";

import MovieCard from "../../components/MovieCard/MovieCard";

function List({ calledType }) {
  const { listId, userId } = useParams();
  const [list, setList] = useState();

  useEffect(() => {
    (async () => {
      const data = listId ? await fetchList(listId) : await fetchLists(userId);
      listId
        ? setList(data)
        : calledType === "watchlist"
        ? setList(data[0])
        : setList(data[1]);
    })();
  }, []);

  if (!list) {
    return null;
  }

  function handleDeleteBtn(movieData) {
    setList((prevValue) => {
      const newMovies = list.movies.filter(
        (movie) => movie.movie.id !== movieData.id
      );
      return { ...prevValue, movies: newMovies };
    });
    RemoveFromList(list._id, movieData);
  }

  return (
    <div className="container customContainer">
      <div className="row no-gutters mb-4">
        <div className="col-12">
          <p className="display-4">{list.name}</p>
        </div>
        <div className="col-12">
          <p className="text-muted">
            {list.movies.length > 1
              ? list.movies.length + " titles"
              : list.movies.length + " title"}
          </p>
        </div>
      </div>
      <div className="row no-gutters">
        {list.movies.map((movie, key) => (
          <MovieCard
            key={key}
            index={key}
            movie={movie.movie}
            listName={list.name}
            handleDeleteBtn={handleDeleteBtn}
          />
        ))}
      </div>
    </div>
  );
}

export default List;
