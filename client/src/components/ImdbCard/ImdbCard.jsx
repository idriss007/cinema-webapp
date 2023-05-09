import React from "react";

import { FaImdb } from "react-icons/fa";

function ImdbCard({ imdbUrl, size, color }) {
  return (
    <a href={imdbUrl} target="_blank" rel="noreferrer">
      <FaImdb size={size} color={color} />
    </a>
  );
}

export default ImdbCard;
