import React, { createContext, useEffect, useState } from "react";
import { AddToList, RemoveFromList } from "../api";

const ListContext = createContext();

export function ListProvider({ children }) {

    const [isInList, setIsInList] = useState();

    async function addToList(list, movie_id) {

        if (list.movieIds.length !== 0) {

            console.log(isInList);

            if (isInList === false) {
                try {
                    await AddToList(list._id, movie_id);
                    setIsInList(true);
                    return console.log("Film eklendi");
                } catch (err) {
                    return console.log(err);
                }
            }

        } else {
            try {
                await AddToList(list._id, movie_id);
                setIsInList(true);
                return console.log("Film eklendi");
            } catch (err) {
                return console.log(err);
            }
        }
    };

    async function removeFromList(list, movie_id) {

        if (list.movieIds.length !== 0) {

            console.log(isInList);

            if (isInList === true) {
                try {
                    await RemoveFromList(list._id, movie_id);
                    setIsInList(false);
                    return console.log("Film çıkarıldı");
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