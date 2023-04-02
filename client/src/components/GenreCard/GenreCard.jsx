import React from "react";
import style from "./genrecard.module.css";

function GenreCard({ item }) {
  return <div className={style.container}>{item}</div>;
}

export default GenreCard;
