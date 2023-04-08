import React, { createContext, useContext, useEffect, useState } from "react";
import { AddToList, RemoveFromList } from "../api";
import AuthContext from "./AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ListContext = createContext();

export function ListProvider({ children }) {
  const navigate = useNavigate();

  const { loggedIn, user } = useContext(AuthContext);

  const [isInList, setIsInList] = useState();
  const [lists, setLists] = useState();

  useEffect(() => {
    (async () => {
      if (loggedIn) {
        //Aktif kullanıcının oluşturduğu listeler veritabanından çekilir.
        const { data: listData } = await axios.get(
          "http://localhost:4000/list/" + user._id
        );
        setLists(listData);
      }
    })();
  }, []);

  function handleAddWatchlistClicked(isInList, setIsInList, movie) {
    //Kullanıcı giriş yapmışsa izleme listesine film ekleyip çıkarabilsin
    if (loggedIn === true) {
      if (isInList) {
        removeFromList(lists[0], movie, isInList);
        setIsInList(false);
      }
      if (!isInList) {
        addToList(lists[0], movie, isInList);
        setIsInList(true);
      }
    }
    //Kullanıcı giriş yapmamışsa login sayfasına yönlendirilsin
    if (!loggedIn) {
      return navigate("/login");
    }
  }

  async function addToList(list, movieData, isInList) {
    if (isInList === false) {
      try {
        const response = await AddToList(list._id, movieData);
        setIsInList(true);
      } catch (err) {
        return console.log(err);
      }
    }
  }

  async function removeFromList(list, movieData, isInList) {
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
    isInList,
    setIsInList,
    lists,
    handleAddWatchlistClicked,
  };

  return <ListContext.Provider value={values}>{children}</ListContext.Provider>;
}

export default ListContext;
