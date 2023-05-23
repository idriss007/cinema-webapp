import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";

//Local Api
// import { AddToList, RemoveFromList, fetchLists } from "../api";
import {
  AddToList,
  GetAllRatings,
  RemoveFromList,
  fetchLists,
} from "internalApi";

//Contexts
import AuthContext from "./AuthContext";

import SyncLoader from "react-spinners/SyncLoader";
import { IoLogoGoogle } from "react-icons/io5";

const ListContext = createContext();

export function ListProvider({ children }) {
  const navigate = useNavigate();

  const { loggedIn, user } = useContext(AuthContext);

  const [lists, setLists] = useState();

  const { data } = useQuery(
    ["lists"],
    () => fetchLists(user._id),
    { enabled: loggedIn },
    {
      // onSuccess: (data) => {
      //   if (loggedIn) {
      //     setLists(data);
      //   }
      // },
    }
  );

  const { data: ratings, isLoading } = useQuery(
    ["ratings"],
    () => GetAllRatings(user._id),
    { enabled: loggedIn }
  );

  function handleAddWatchlistClicked(isInList, setIsInList, movie) {
    //Kullanıcı giriş yapmışsa izleme listesine film ekleyip çıkarabilsin
    if (loggedIn === true) {
      if (isInList) {
        removeFromList(data[0], movie);
        setIsInList(false);
        return;
      }
      if (!isInList) {
        addToList(data[0], movie);
        setIsInList(true);
        return;
      }
    }
    //Kullanıcı giriş yapmamışsa login sayfasına yönlendirilsin
    if (!loggedIn) {
      return navigate("/signin");
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
    lists: data,
    ratings,
    handleAddWatchlistClicked,
  };

  if (isLoading) {
    return (
      <div className="d-flex position-absolute h-100 w-100 justify-content-center align-items-center top0">
        <SyncLoader size={35} />
      </div>
    );
  }

  return <ListContext.Provider value={values}>{children}</ListContext.Provider>;
}

export default ListContext;
