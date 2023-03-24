import React, { createContext, useEffect, useState } from "react";
import { AddToList, RemoveFromList } from "../api";

const ListContext = createContext();

export function ListProvider({ children }) {

    const [isInList, setIsInList] = useState();

    async function addToList(list, movieData) {

        if (list.movies.length !== 0) {

            // console.log(isInList);

            if (isInList === false) {
                try {
                    const response = await AddToList(list._id, movieData);
                    setIsInList(true);
                    // return console.log(response);
                } catch (err) {
                    return console.log(err);
                }
            }

        } else {
            try {
                const response = await AddToList(list._id, movieData);
                setIsInList(true);
                return console.log(response);
            } catch (err) {
                return console.log(err);
            }
        }
    };

    async function removeFromList(list, movieData) {

        if (list.movies.length !== 0) {

            // console.log(isInList);

            if (isInList === true) {
                try {
                    await RemoveFromList(list._id, movieData);
                    setIsInList(false);
                    // return console.log("Film çıkarıldı");
                } catch (err) {
                    return console.log(err);
                }
            }

        }
    };

    const values = {
        addToList,
        removeFromList,
        isInList,
        setIsInList
    };


    return (
        <ListContext.Provider value={values} >
            {children}
        </ListContext.Provider>
    );

}

export default ListContext;