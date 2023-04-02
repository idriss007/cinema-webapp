import React, { createContext, useState } from "react";
import { AddToList, RemoveFromList } from "../api";

const ListContext = createContext();

export function ListProvider({ children }) {
  const [isInList, setIsInList] = useState();

  async function addToList(list, movieData) {
    if (isInList === false) {
      try {
        const response = await AddToList(list._id, movieData);
        setIsInList(true);
      } catch (err) {
        return console.log(err);
      }
    }
  }

  async function removeFromList(list, movieData) {
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
  };

  return <ListContext.Provider value={values}>{children}</ListContext.Provider>;
}

export default ListContext;
