import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetail } from "../../api";
import MovieCardSmall from "../MovieCardSmall/MovieCardSmall";

function ListMovies({ list }) {

    const [moviesData, setMoviesData] = useState([]);
    const { id } = useParams();

    const movies = [];

    console.log(movies);

    //listenin idlerini maple ve film detaylarını al

    return (
        <></>
    );
}

export default ListMovies;