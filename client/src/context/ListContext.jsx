import React, { createContext, useContext, useEffect, useState } from "react";
import { AddToList, RemoveFromList, fetchLists } from "../api";
import AuthContext from "./AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ListContext = createContext();

export function ListProvider({ children }) {
  const navigate = useNavigate();

  const { loggedIn, user } = useContext(AuthContext);

  const [lists, setLists] = useState();

  useEffect(() => {
    (async () => {
      if (loggedIn) {
        //Aktif kullanıcının oluşturduğu listeler veritabanından çekilir.
        const data = await fetchLists(user._id);
        setLists(data);
      }
    })();
  }, []);

  function handleAddWatchlistClicked(isInList, setIsInList, movie) {
    //Kullanıcı giriş yapmışsa izleme listesine film ekleyip çıkarabilsin
    if (loggedIn === true) {
      if (isInList) {
        removeFromList(lists[0], movie, isInList, setIsInList);
        setIsInList(false);
      }
      if (!isInList) {
        addToList(lists[0], movie, isInList, setIsInList);
        setIsInList(true);
      }
    }
    //Kullanıcı giriş yapmamışsa login sayfasına yönlendirilsin
    if (!loggedIn) {
      return navigate("/login");
    }
  }

  async function addToList(list, movieData, isInList, setIsInList) {
    if (isInList === false) {
      try {
        const response = await AddToList(list._id, movieData);
        setIsInList(true);
      } catch (err) {
        return console.log(err);
      }
    }
  }

  async function removeFromList(list, movieData, isInList, setIsInList) {
    if (isInList === true) {
      try {
        await RemoveFromList(list._id, movieData);
        setIsInList(false);
      } catch (err) {
        return console.log(err);
      }
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
