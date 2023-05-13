import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

//Stylesheet
import styles from "./genrecard.module.css";

function GenreCard({ item }) {
  return (
    <Link
      reloadDocument={true}
      className={clsx(styles.container, "text-decoration-none mr-2 mb-2")}
      to={"/genre/" + item.name.toLowerCase()}
    >
      {item.name}
    </Link>
  );
}

export default GenreCard;
