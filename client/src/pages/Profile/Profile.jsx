import React, { useContext } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

//API Functions
import { fetchLists } from "../../api";
//Contexts
import AuthContext from "../../context/AuthContext";
//Stylesheet
import styles from "./profile.module.css";
//Components
import Comments from "../Comments/Comments";
//FontAwesome
import { FaUserCircle } from "react-icons/fa";

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
    console.log(list);
    return (
      <div className={"col-12 mt-1 mb-1 p-2"}>
        <div className="row no-gutters">
          {list.movies.length > 0 && (
            <div className="col-auto mr-2">
              {/* <p>{key + 1}.</p> */}
              <img
                className="w-100 rounded "
                src={
                  "https://www.themoviedb.org/t/p/w92/" +
                  list.movies[list.movies.length - 1].movie.poster_path
                }
                alt=""
              />
            </div>
          )}
          <div className="col-auto">
            <Link
              style={{ color: "inherit" }}
              reloadDocument
              to={"/list/" + list._id}
            >
              <p className="h4 mb-0">{list.name}</p>
            </Link>
            <p className="text-muted">
              {list.movies.length}
              {list.movies.length > 1 ? " titles" : " title"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container + " container"}>
      {/* <div className="row no-gutters">
        <div className="col-12">
          <p className="h2 ">Hoşgeldin {user?.name}</p>
        </div>
        <div className="col-12">
          <p>Email adresin: {user?.email}</p>
        </div>
        <div className="col-12">
          <p>Şifren: {user?.password}</p>
        </div>
      </div> */}
      <div className="row no-gutters">
        <div className="col-12">
          <div className="d-flex flex-column justify-content-center align-items-center">
            <FaUserCircle size="100" />
            <p className="mt-2 h5 font-weight-bold">{user?.name}</p>
          </div>
        </div>
      </div>
      <div className="row no-gutters border rounded p-3">
        <div className="col-auto">
          <p className={"font-weight-bold " + styles.yourListstxt}>
            Your Ratings
          </p>
        </div>
        <div className={"col-12 mt-1 mb-1 p-2"}>
          {/* {lists.length > 0
          ? lists.slice(1).map((list, key) => renderLists(list, key))
          : null} */}
          <Link
            style={{ color: "inherit" }}
            reloadDocument
            to={"/user/" + user._id + "/ratings"}
          >
            <p>See all of your ratings</p>
          </Link>
        </div>
      </div>
      <div className="row no-gutters border rounded p-3">
        <div className="col-12">
          <div className="row no-gutters align-items-center">
            <div className="col-auto mr-auto">
              <p className={"font-weight-bold " + styles.yourListstxt}>
                Your Lists
              </p>
            </div>
            <div className="col-auto ">
              <Link style={{ color: "inherit" }} reloadDocument to="">
                <p>Create a List</p>
              </Link>
            </div>
          </div>
        </div>

        {lists.length > 0
          ? lists.map((list, key) => renderLists(list, key))
          : null}
      </div>
    </div>
  );
}

export default Profile;
