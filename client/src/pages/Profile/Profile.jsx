import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

//API Functions
import { DeleteList, fetchLists } from "../../api";
//Contexts
import AuthContext from "../../context/AuthContext";
//Stylesheet
import styles from "./profile.module.css";
//Components
import Comments from "../Comments/Comments";
//FontAwesome
import { FaUserCircle } from "react-icons/fa";
import RecentlyRatedMovieCard from "../../components/RecentlyRatedMovieCard/RecentlyRatedMovieCard";

function Profile() {
  const [lists, setLists] = useState();

  const { user } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      const data = await fetchLists(user._id);
      setLists(data);
    })();
  }, []);

  if (!lists) {
    return "Loading...";
  }

  function renderLists(list, key) {
    return (
      <div className={"col-12 mt-1 mb-1 p-3"}>
        <div className="row no-gutters">
          {list.movies.length > 0 && (
            <div className="col-auto mr-2">
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
          <div className="col-auto ml-auto text-white">
            <button
              className={styles.button + " p-2 rounded bg-danger"}
              onClick={() => {
                DeleteList(list._id);

                setLists(() => {
                  const newLists = lists.filter(
                    (listItem) => listItem._id !== list._id
                  );
                  return newLists;
                });
              }}
            >
              Delete List
            </button>
          </div>
        </div>
      </div>
    );
  }

  function renderRecentlyRatedMovies(movie, index) {
    if (index > 3) {
      return null;
    }
    return (
      <RecentlyRatedMovieCard
        key={index}
        index={index}
        list={lists[1]}
        movie={lists[1].movies[lists[1].movies.length - (index + 1)].movie}
        user={user}
      />
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
      <div className="row no-gutters border rounded p-3 mb-4">
        <div className="col-12">
          <p className={"font-weight-bold " + styles.yourListstxt}>
            Your Ratings
          </p>
        </div>

        <div className={"col-12 mt-1 mb-1 p-3"}>
          <p className="mb-2 font-weight-bold text-muted">
            Most Recently Rated
          </p>
          {lists[1].movies.length > 0 && (
            <div className="row no-gutters">
              {lists[1].movies.map(renderRecentlyRatedMovies)}
            </div>
          )}

          {lists[1].movies.length > 0 ? (
            lists[1].movies.length > 4 && (
              <div className="mt-4">
                <Link
                  style={{ color: "inherit" }}
                  reloadDocument
                  to={"/user/" + user._id + "/ratings"}
                >
                  <p>
                    See all {lists[1].movies.length} ratings {">>"}
                  </p>
                </Link>
              </div>
            )
          ) : (
            <p>You haven't rated any titles yet.</p>
          )}
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
              <Link
                reloadDocument
                style={{ color: "inherit" }}
                to="/list/create"
              >
                <p>Create a List</p>
              </Link>
            </div>
          </div>
        </div>

        {lists.length > 2 ? (
          lists.slice(2).map((list, key) => renderLists(list, key))
        ) : (
          <div className="mt-2 p-3 row no-gutters">
            <p className="col-auto">Create your own movie list.</p>
            <Link
              className="col-auto ml-1"
              reloadDocument
              style={{ color: "inherit" }}
              to="/list/create"
            >
              <p>Get started!</p>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
