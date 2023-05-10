import React from "react";

import { FaImdb } from "react-icons/fa";

import styles from "./imdbcard.module.css";

function ImdbCard({ imdbUrl, size }) {
  return (
    <a className={styles.logo} href={imdbUrl} target="_blank" rel="noreferrer">
      <FaImdb size={size} />
    </a>
  );
}

export default ImdbCard;
