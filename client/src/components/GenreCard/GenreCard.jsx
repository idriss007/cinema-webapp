import React from "react";
import style from "./genrecard.module.css";

function GenreCard({ item }) {
  return <div className={style.container + " mr-2 mb-2"}>{item}</div>;
}

export default GenreCard;
