import React from "react";
import styles from "./genrecard.module.css";
import { Link } from "react-router-dom";

function GenreCard({ item }) {
  return (
    <Link
      reloadDocument={true}
      className={"text-decoration-none mr-2 mb-2 " + styles.container}
      to={"/genre/" + item.name.toLowerCase()}
    >
      {item.name}
    </Link>
  );
}

export default GenreCard;
