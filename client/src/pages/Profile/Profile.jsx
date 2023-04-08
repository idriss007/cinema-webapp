import React, { useContext } from "react";
import { useQuery } from "react-query";
import { fetchLists } from "../../api";
import MovieSlider from "../../components/MovieSlider/MovieSlider";
import AuthContext from "../../context/AuthContext";
import styles from "./profile.module.css";
import Comments from "../Comments/Comments";

function Profile() {
  const { user } = useContext(AuthContext);

  const {
    isLoading: listsLoading,
    error: listsError,
    data: lists,
  } = useQuery(["lists", Date.now], () => fetchLists(user._id));

  if (listsLoading) return "Loading...";
  if (listsError) return "An error has occurred: " + listsError.message;

  let moviesData = [];

  function renderLists(list, key) {
    if (!(list.movies.length > 0)) {
      return null;
    }
    moviesData = list.movies.map((movie, key) => movie.movie);
    return (
      <>
        <div className={styles.sliderContainer}>
          <MovieSlider key={key} movies={moviesData}>
            {list.name}
          </MovieSlider>
        </div>
      </>
    );
  }

  return (
    <div className={styles.container}>
      <p className={styles.profileTxt}>Hoşgeldin {user?.name}</p>
      <p>Email adresin: {user?.email}</p>
      <p>Şifren: {user?.password}</p>
      {lists.length > 0
        ? lists.map((list, key) => renderLists(list, key))
        : null}
    </div>
  );
}

export default Profile;
