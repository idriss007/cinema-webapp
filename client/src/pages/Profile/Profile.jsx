import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import clsx from "clsx";

//Local Api
// import { DeleteList, fetchLists } from "../../api";
import {
  DeleteList,
  GetUser,
  GetUsersComments,
  SetRatingsPrivacy,
  fetchLists,
} from "internalApi";

//Contexts
import AuthContext from "context/AuthContext";

//Stylesheet
import styles from "./profile.module.css";

//Components
import RecentlyRatedMovieCard from "components/RecentlyRatedMovieCard/RecentlyRatedMovieCard";

//Config File
import configData from "config.json";

//React Icons
import { FaUserCircle } from "react-icons/fa";
import { TbError404 } from "react-icons/tb";

//React Spinners
import SyncLoader from "react-spinners/SyncLoader";
import UserCommentsSection from "components/UserCommentsSection/UserCommentsSection";
import ImageNotFound from "components/ImageNotFound/ImageNotFound";
import ListContext from "context/ListContext";

function Profile({ title }) {
  const [lists, setLists] = useState();

  useEffect(() => {}, []);

  const { user } = useContext(AuthContext);
  const { user_id } = useParams();

  const isAdmin = user?._id === user_id;

  const listsData = useQuery(["lists", user_id], () => fetchLists(user_id), {
    onSuccess: (listsData) => setLists(listsData),
    retry: false,
  });

  //İlk 3 default liste(Watchlist, Watchedlist, Ratinglist) hariç, herkese açık listeler publicLists değişkenine atanıyor
  const publicLists = lists
    ? lists?.slice(3)?.filter((list) => list.isPrivate !== true)
    : null;

  const comments = useQuery(
    ["comments", user_id],
    () => GetUsersComments(user_id),
    {
      onSuccess: (comments) => {
        comments.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
      },
      retry: false,
    }
  );

  const foundUser = useQuery(["user", user_id], () => GetUser(user_id), {
    // enabled: !isAdmin ? true : false,
    onSuccess: (foundUser) => {
      document.title = foundUser.name;
    },
    retry: false,
  });

  if (listsData.isLoading || comments.isLoading || foundUser.isLoading) {
    return (
      <div className="d-flex position-absolute h-100 w-100 justify-content-center align-items-center top0">
        <SyncLoader size={35} />
      </div>
    );
  }

  if (foundUser.isError) {
    console.log(foundUser.error.message);
    return (
      <div className="d-flex flex-column justify-content-center align-items-center">
        <TbError404 size="300px" />
        Something went wrong!
      </div>
    );
  }

  async function handleSetListPrivacy(listId) {
    const updatedList = await SetRatingsPrivacy(listId);
    const filteredList = lists.map((list) => {
      if (list._id === updatedList._id) {
        list.isPrivate = updatedList.isPrivate;
      }
      return list;
    });

    setLists(filteredList);
  }

  function renderLists(list, key) {
    if (!isAdmin && list.isPrivate) {
      return null;
    }
    return (
      <div key={key} className="col-12 mt-1 mb-1 p-3">
        <div className="row no-gutters">
          {list?.movies?.length > 0 && (
            <div className="col-auto mr-2">
              {list?.movies[list.movies.length - 1]?.movie.poster_path ? (
                <img
                  className="w-100 rounded "
                  src={`${configData.moviePosterwUrl92}${
                    list?.movies[list.movies.length - 1]?.movie.poster_path
                  }`}
                  alt=""
                />
              ) : (
                <ImageNotFound containerWidth="92px" containerHeight="138px" />
              )}
            </div>
          )}
          <div className="col-auto">
            <Link
              style={{ color: "inherit" }}
              reloadDocument={true}
              to={`/list/${list._id}`}
            >
              <p className="h4 mb-0">{list.name}</p>
            </Link>
            <p className="text-muted">
              {list?.movies?.length}
              {list?.movies?.length > 1 ? " titles" : " title"}
            </p>
          </div>
          {isAdmin && (
            <div className="col-auto ml-auto text-white d-flex justify-content-center align-items-center">
              <button
                className={clsx(styles.button, "p-2 rounded bg-danger")}
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure that you want to delete the list?"
                    )
                  ) {
                    DeleteList(list._id);

                    setLists(() => {
                      const newLists = lists.filter(
                        (listItem) => listItem._id !== list._id
                      );
                      return newLists;
                    });
                  }
                }}
              >
                Delete List
              </button>
              <button
                onClick={() => handleSetListPrivacy(list._id)}
                className={clsx(
                  styles.button,
                  "rounded p-2 border-0 bg-info ml-2"
                )}
              >
                {list.isPrivate ? "Make public" : "Make private"}
              </button>
            </div>
          )}
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
        movie={lists[1]?.movies[lists[1]?.movies?.length - (index + 1)].movie}
        userId={user_id}
      />
    );
  }

  return (
    <div className="container customContainer">
      <div className="row no-gutters justify-content-center">
        <div className="col-10 col-sm-6 col-md-4 col-lg-12 d-flex justify-content-center">
          <div
            className={clsx(
              styles.avatarContainer,
              "d-flex flex-column align-items-center"
            )}
          >
            {foundUser?.data?.profile_image ? (
              <img
                className={clsx(styles.avatar, "w-100")}
                src={foundUser?.data?.profile_image}
                alt="avatar"
              />
            ) : (
              <FaUserCircle size="100" />
            )}
            <p className="mt-2 h5 font-weight-bold">{foundUser?.data?.name}</p>
          </div>
        </div>
      </div>

      <div className="row no-gutters justify-content-around p-3 border mb-3">
        <div className="col-12 col-sm-4 d-flex justify-content-center">
          {listsData?.data[1]?.movies?.length > 0
            ? listsData?.data[1]?.movies?.length
            : 0}
          {listsData?.data[1]?.movies?.length > 1 ? " Ratings" : " Rating"}
        </div>
        <div className="col-12 col-sm-4 d-flex justify-content-center">
          {comments?.data.length ? comments?.data.length : 0}
          {comments?.data.length > 1 ? " Comments" : " Comment"}
        </div>
        <div className="col-12 col-sm-4 d-flex justify-content-center">
          {listsData?.data.length > 0 && listsData?.data.length - 3}
          {listsData?.data.length > 4 ? " Lists" : " List"}
        </div>
      </div>

      {lists &&
        (isAdmin || (lists[1]?.movies?.length > 0 && !lists[1]?.isPrivate)) && (
          <div className="row no-gutters border rounded p-3 mb-4">
            <div className="col-12">
              <p className={clsx(styles.yourListstxt, "font-weight-bold")}>
                {isAdmin ? "Your Ratings" : "Ratings"}
              </p>
            </div>

            <div className={"col-12 mt-1 mb-1 p-3"}>
              {lists[1]?.movies?.length > 0 && (
                <div className="row">
                  <p className="col-12 mb-2 font-weight-bold text-muted">
                    Most Recently Rated
                  </p>
                  {lists[1]?.movies?.map(renderRecentlyRatedMovies)}
                </div>
              )}

              {lists[1]?.movies?.length > 0 ? (
                lists[1]?.movies?.length > 4 && (
                  <div className="mt-4">
                    <Link
                      style={{ color: "inherit" }}
                      reloadDocument={true}
                      to={"/user/" + user_id + "/ratings"}
                    >
                      <p>
                        See all {lists[1]?.movies?.length} ratings {">>"}
                      </p>
                    </Link>
                  </div>
                )
              ) : (
                <p>You haven't rated any titles yet.</p>
              )}
            </div>
          </div>
        )}

      {(isAdmin || (lists?.length > 3 && publicLists?.length > 0)) && (
        <div className="row no-gutters border rounded p-3">
          <div className="col-12">
            <div className="row no-gutters align-items-center">
              <div className="col-auto mr-auto">
                <p className={clsx(styles.yourListstxt, "font-weight-bold")}>
                  {isAdmin ? "Your Lists" : "Lists"}
                </p>
              </div>
              {isAdmin && (
                <div className="col-auto">
                  <Link
                    reloadDocument={true}
                    style={{ color: "inherit" }}
                    to="/list/create"
                  >
                    <p>Create a List</p>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {lists?.length > 3 ? (
            lists.slice(3).map((list, key) => renderLists(list, key))
          ) : (
            <div className="mt-2 p-3 row no-gutters">
              <p className="col-auto">Create your own movie list.</p>
              <Link
                className="col-auto ml-1"
                reloadDocument={true}
                style={{ color: "inherit" }}
                to="/list/create"
              >
                <p>Get started!</p>
              </Link>
            </div>
          )}
        </div>
      )}

      {(isAdmin || comments?.data?.length > 0) && (
        <div className="row no-gutters">
          <UserCommentsSection isAdmin={isAdmin} comments={comments} />
        </div>
      )}
    </div>
  );
}

export default Profile;
