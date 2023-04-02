import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchLists, getDetail } from "../../api";
import MovieSlider from "../../components/MovieSlider/MovieSlider";
import AuthContext from "../../context/AuthContext";
import styles from "./profile.module.css";
import Comments from "../Comments/Comments";

function Profile() {
  const { id } = useParams();

  const { user, logout } = useContext(AuthContext);

  const {
    isLoading: listsLoading,
    error: listsError,
    data: lists,
  } = useQuery("lists", () => fetchLists(user._id));

  if (listsLoading) return "Loading...";
  if (listsError) return "An error has occurred: " + listsError.message;

  let moviesData = [];

  function handleLogout() {
    logout();
  }

  function renderLists(list) {
    if (!(list.movies.length > 0)) {
      return null;
    }
    moviesData = list.movies.map((movie) => movie.movie);
    return (
      <>
        <div className={styles.sliderContainer}>
          <MovieSlider movies={moviesData}>{list.name}</MovieSlider>
        </div>
      </>
    );
  }

  return (
    <div className={styles.container}>
      <p className={styles.profileTxt}>Hoşgeldin {user?.name}</p>
      <p>Email adresin: {user?.email}</p>
      <p>Şifren: {user?.password}</p>
      <button
        onClick={handleLogout}
        className={"btn btn-danger " + styles.logoutBtn}
      >
        Logout
      </button>
      {lists.length > 0 ? lists.map(renderLists) : null}

      <Comments />
    </div>
  );
}

export default Profile;
