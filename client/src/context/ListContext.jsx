import React, { createContext, useContext, useEffect, useState } from "react";
// import { AddToList, RemoveFromList, fetchLists } from "../api";
import { AddToList, RemoveFromList, fetchLists } from "../internalApi";
import AuthContext from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";

const ListContext = createContext();

export function ListProvider({ children }) {
  const navigate = useNavigate();

  const { loggedIn, user } = useContext(AuthContext);

  const [lists, setLists] = useState();

  const { data } = useQuery(
    ["lists"],
    () => fetchLists(user._id),
    { enabled: user ? true : false },
    {
      onSuccess: (data) => {
        if (loggedIn) {
          setLists(data);
        }
      },
    }
  );

  function handleAddWatchlistClicked(isInList, setIsInList, movie) {
    //Kullanıcı giriş yapmışsa izleme listesine film ekleyip çıkarabilsin
    if (loggedIn === true) {
      if (isInList) {
        removeFromList(lists[0], movie);
        setIsInList(false);
        return;
      }
      if (!isInList) {
        addToList(lists[0], movie);
        setIsInList(true);
        return;
      }
    }
    //Kullanıcı giriş yapmamışsa login sayfasına yönlendirilsin
    if (!loggedIn) {
      return navigate("/login");
    }
  }

  async function addToList(list, movieData) {
    try {
      await AddToList(list._id, movieData);
    } catch (err) {
      return console.log(err);
    }
  }

  async function removeFromList(list, movieData) {
    try {
      await RemoveFromList(list._id, movieData);
    } catch (err) {
      return console.log(err);
    }
  }

  const values = {
    addToList,
    removeFromList,
    lists,
    handleAddWatchlistClicked,
  };

  return <ListContext.Provider value={values}>{children}</ListContext.Provider>;
}

export default ListContext;
