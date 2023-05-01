import React, { useContext } from "react";
import { useQuery } from "react-query";
import { fetchLists } from "../../api";
import MovieSlider from "../../components/MovieSlider/MovieSlider";
import AuthContext from "../../context/AuthContext";
import styles from "./profile.module.css";
import Comments from "../Comments/Comments";
import { Link } from "react-router-dom";

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
    // if (!(list.movies.length > 0)) {
    //   return null;
    // }
    // moviesData = list.movies.map((movie, key) => movie.movie);
    return (
      <>
        <div className={styles.sliderContainer + " col-12 mt-1 mb-1 p-2"}>
          {/* <MovieSlider key={key} movies={moviesData}>
            {list.name}
          </MovieSlider> */}
          <Link
            style={{ color: "inherit" }}
            reloadDocument
            to={"/list/" + list._id}
          >
            {key + 1 + ". " + list.name}
          </Link>
        </div>
      </>
    );
  }

  return (
    <div className={styles.container + " container"}>
      <p className="h2 ">Hoşgeldin {user?.name}</p>
      <p>Email adresin: {user?.email}</p>
      <p>Şifren: {user?.password}</p>
      <div className="row no-gutters mt-5">
        <p className="col-12 h4 font-weight-bold text-warning">Your Lists</p>
        {lists.length > 0
          ? lists.map((list, key) => renderLists(list, key))
          : null}
      </div>
    </div>
  );
}

export default Profile;
