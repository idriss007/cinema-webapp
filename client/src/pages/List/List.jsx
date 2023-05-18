import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

//Local Api
// import { RemoveFromList, fetchList, fetchLists } from "../../api";
import { AddToList, RemoveFromList, fetchList, fetchLists } from "internalApi";

//Components
import MovieCard from "components/MovieCard/MovieCard";

//Context
import AuthContext from "context/AuthContext";

//React Spinners
import SyncLoader from "react-spinners/SyncLoader";

function List({ calledType }) {
  const { listId, userId } = useParams();
  const [list, setList] = useState();
  const [isRatingList, setIsRatingList] = useState(null);
  const [isWatchedlist, setIsWatchedlist] = useState(null);
  const [isWatchlist, setIsWatchlist] = useState(null);
  const { user } = useContext(AuthContext);

  //watchlist, ratings ve watchedlist gibi default listelere gidilirken userId değişkeni olacak.
  //Fakat eğer kullanıcı girişi yapılmamışsa user._id değişkeni olmayacak.
  const isAdmin = user?._id === userId;

  const { data: lists } = useQuery(
    ["list"],
    () => (listId ? fetchList(listId) : fetchLists(userId)),
    {
      onSuccess: (lists) => {
        handleSuccess(lists);
      },
    }
  );

  if (!list) {
    return (
      <div className="d-flex position-absolute h-100 w-100 justify-content-center align-items-center top0">
        <SyncLoader
          size={35}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  function handleSuccess(lists) {
    if (listId) {
      document.title = lists.name;
      setList(lists);
      return;
    }

    if (calledType === "watchlist") {
      document.title = lists[0].name;
      setList(lists[0]);
      setIsWatchlist(true);
      return;
    }

    if (calledType === "ratings") {
      setList(lists[1]);
      setIsRatingList(true);
      document.title = lists[1].name;
      return;
    }

    setList(lists[2]);
    setIsWatchedlist(true);
    document.title = lists[2].name;
  }

  async function handleDeleteBtn(movieData) {
    setList((prevValue) => {
      const newMovies = list.movies.filter(
        (movie) => movie.movie.id !== movieData.id
      );
      return { ...prevValue, movies: newMovies };
    });
    await RemoveFromList(list._id, movieData);
  }

  async function handleAddToWatchedlist(movieData) {
    setList((prevValue) => {
      const newMovies = list.movies.filter(
        (movie) => movie.movie.id !== movieData.id
      );
      return { ...prevValue, movies: newMovies };
    });
    const response = await AddToList(lists[2]._id, movieData);
  }

  return (
    <div className="container customContainer">
      <div className="row no-gutters mb-4">
        <div className="col-12">
          <p className="display-4 line-height-1">
            {
              //isAdmin sadece eğer kullanıcı kendi ratings, watchlislist ve watchedlist e giderken ve kullanıcı
              //giriş yapmışsa true olur.
              isAdmin && userId ? `Your ${list.name}` : list.name
            }
          </p>
        </div>
        <div className="col-12">
          <p className="text-muted">
            {list.movies.length > 1
              ? `${list.movies.length} titles`
              : `${list.movies.length} title`}
          </p>
        </div>
      </div>
      <div className="row no-gutters">
        {list.movies.map((movie, key) => (
          <MovieCard
            key={key}
            index={key}
            movie={movie.movie}
            list={list}
            handleDeleteBtn={handleDeleteBtn}
            handleAddToWatchedlist={handleAddToWatchedlist}
            called="List"
            userIdOfListOwner={list?.user}
            user_id={user?._id}
            isRatingList={isRatingList}
            isWatchedlist={isWatchedlist}
            isWatchlist={isWatchlist}
          />
        ))}
      </div>
    </div>
  );
}

export default List;
