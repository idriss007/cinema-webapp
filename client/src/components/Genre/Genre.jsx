import React from "react";
import { useQuery } from "react-query";

//External Api
import { getGenreList } from "api";

//Components
import GenreCard from "components/GenreCard/GenreCard";

function Genre(props) {
  const { data } = useQuery("genre", getGenreList);
  const genres = data?.genres;

  const resultGenres = [];

  for (let i = 0; i < genres?.length; i++) {
    for (let j = 0; j < props?.genres?.length; j++) {
      if (genres[i].id === props.genres[j]) {
        resultGenres.push(genres[i]);
      }
    }
  }

  function renderGenres(genre, key) {
    return <GenreCard key={key} item={genre} />;
  }

  return (
    <div className="row no-gutters d-flex justify-content-center">
      {resultGenres.map(renderGenres)}
    </div>
  );
}

export default Genre;
