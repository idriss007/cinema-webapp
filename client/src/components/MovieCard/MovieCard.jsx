import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Genre from "../Genre/Genre";
import StarCard from "../StarCard/StarCard";
import style from "./moviecard.module.css";

function MovieCard(props) {

    const url = "https://image.tmdb.org/t/p/w500/" + props.movie.poster_path;

    return (
        <div className={style.container}>
            <div className={style.imageContainer}>
                <img loading="lazy" className={style.image} src={url} />
            </div>
            <div className={style.cardDetail}>
                <Link reloadDocument style={{ textDecoration: "none", color: "inherit", }} to={"/detail/" + props.movie.id}> <p className={style.title}> {props.movie.title} </p> </Link>
                <p className={style.detail}>{props.movie.overview}</p>
                <Genre genres={props.movie.genre_ids} />
            </div>
        </div>
    );
}

export default MovieCard;