import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import clsx from "clsx";

//React Icons
import { BsStarFill, BsImage } from "react-icons/bs";

//React Spinners
import SyncLoader from "react-spinners/SyncLoader";

//Bootstrap
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

//Api
import { getDetail } from "api";

//Import components
import Genre from "components/Genre";
import Slider from "components/Slider";
import StarCard from "components/StarCard/StarCard";
import ImdbCard from "components/ImdbCard/ImdbCard";
import RecommendationsForMovie from "components/RecommendationsForMovie/RecommendationsForMovie";
import WatchlistCard from "components/WatchlistCard/WatchlistCard";

//Pages
import Comments from "pages/Comments/Comments";

//Contexts
import AuthContext from "context/AuthContext";
import ListContext from "context/ListContext";

//Config File
import configData from "config.json";

//Css file
import styles from "./detail.module.css";
import FullPageImageModal from "components/FullPageImageModal/FullPageImageModal";

function Detail() {
  const { id } = useParams();

  const { loggedIn } = useContext(AuthContext);
  const { lists, handleAddWatchlistClicked } = useContext(ListContext);

  const [show, setShow] = useState(false);
  const [showKey, setShowKey] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  function handleClose() {
    setShow(false);
  }
  function handleShow(key, url) {
    setShowKey(key);
    setImageUrl(url);
    setShow(true);
  }

  const [isInList, setIsInList] = useState();
  const [isInListLoading, setIsInListLoading] = useState(true);

  const imageURL = configData.moviePosterw780;

  useEffect(() => {
    (async () => {
      if (lists) {
        const isContainInList = lists[0].movies.find(
          (movieData) => movieData?.movie?.id === parseInt(id)
        );

        setIsInList(isContainInList);

        setIsInListLoading(false);
      }

      if (!loggedIn) {
        setIsInListLoading(false);
      }
    })();
  }, [id, isInListLoading, lists, loggedIn]);

  //Get movie information
  const {
    isLoading,
    isError,
    data: details,
  } = useQuery(
    ["movieDetail", parseInt(id)],
    () => getDetail(id, "images,credits"),
    {
      onSuccess: (details) => {
        document.title = details.title;
      },
    }
  );

  if (isLoading) {
    return (
      <div className="d-flex position-absolute h-100 w-100 justify-content-center align-items-center top0">
        <SyncLoader size={35} />
      </div>
    );
  }

  //Filmin fotoğraf url adreslerini diziye aktar.
  const allImages = details.images.backdrops.map((item) => item.file_path);
  //Filmin türlerini genreList isimli diziye aktar.
  const genreList = details.genres.map((genre) => genre.id);
  const imdbUrl = `${configData.imdbTitleUrl}${details.imdb_id}`;

  const directors = details.credits.crew.filter(
    (person) => person.job === "Director"
  );
  const writers = details.credits.crew.filter((person) => {
    return person.job === "Screenplay" || person.job === "Writer";
  });
  const actingCrew = details.credits.cast.slice(0, 6);

  function renderCrew(crew, i, length) {
    const { name, id } = crew;
    return (
      <span key={i}>
        <span>{i ? ", " : ""}</span>
        <Link
          reloadDocument={true}
          className="text-decoration-none"
          to={`/name/${id}`}
        >
          {name}
        </Link>
      </span>
    );
  }

  function renderActingCrew(person, i) {
    const { profile_path, id, name } = person;
    const profileImgUrl = `${configData.profilePosterUrlw342}${profile_path}`;
    if (!profile_path) {
      return (
        <div
          key={i}
          className="col-xl-2 col-sm-4 col-6 justify-content-center d-flex mt-3 flex-column"
        >
          <div className={clsx(styles.castContainer)}>
            <Link
              className="d-flex flex-column text-decoration-none color-inherit"
              reloadDocument={true}
              to={"/name/" + id}
            >
              <div
                className={clsx(
                  styles.posterNotFound,
                  "w-100 d-flex justify-content-center align-items-center"
                )}
              >
                <BsImage size="40" />
              </div>
              <div className="text-center text-nowrap d-flex align-items-center justify-content-center flex-grow-1 p-1">
                <p className="text-truncate">{name}</p>
              </div>
            </Link>
          </div>
        </div>
      );
    }
    return (
      <div
        key={i}
        className="col-xl-2 col-sm-4 col-6 justify-content-center d-flex mt-3 flex-column"
      >
        <div className={clsx(styles.castContainer)}>
          <Link
            className="d-flex flex-column text-decoration-none color-inherit"
            reloadDocument={true}
            to={"/name/" + id}
          >
            <img className="mw-100 w-100" src={profileImgUrl} alt={name} />
            <div className="text-center text-nowrap d-flex align-items-center justify-content-center flex-grow-1 p-1">
              <p className="text-truncate">{name}</p>
            </div>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container customContainer">
      <Tabs defaultActiveKey="movie" id="uncontrolled-tab-example">
        <Tab eventKey="movie" title="Movie Detail">
          <div className={"row no-gutters mb-2 mt-2"}>
            <div className={"col-sm-12 col-md-12 col-lg-6 mr-auto mb-2"}>
              <div>
                <p className={styles.title}>{details.title}</p>
              </div>

              <div>
                <p>{moment(details.release_date).format("YYYY")}</p>
              </div>
            </div>

            <div className="col-md-12 col-lg-auto d-flex">
              <div className="mr-3">
                {details.status.toUpperCase() !== "RELEASED" ? null : (
                  <div className="d-flex flex-column align-items-center">
                    <p className="mb-2 text-nowrap font-weight-bold text-black-50">
                      USERS RATING
                    </p>
                    <div className="d-flex justify-content-center align-items-center">
                      <BsStarFill className="mr-1" color="#F5C518" size="30" />
                      <div>
                        <div>
                          <p className="font-weight-bold">
                            {parseFloat(details.vote_average).toFixed(1)}/10
                          </p>
                        </div>

                        <div>
                          <p className={styles.voteCount}>
                            {details.vote_count.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div>
                {details.status.toUpperCase() !== "RELEASED" ? null : (
                  <div className="d-flex flex-column align-items-center">
                    <p className="font-weight-bold text-black-50">
                      YOUR RATING
                    </p>
                    <StarCard
                      movie={details}
                      size={"30"}
                      formOfCalling="inDetailPage"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* {details.poster_path && allImages?.length > 0 && ( */}
          <div className={clsx(styles.middleContainer, "mb-4")}>
            {details?.poster_path && (
              <img
                onClick={() => handleShow("moviePoster", details.poster_path)}
                className={clsx(styles.poster)}
                src={`${imageURL}${details?.poster_path}`}
                alt="movie poster"
              />
            )}
            {allImages.length > 0 && (
              <div className={styles.carouselContainer}>
                {details.images && (
                  <Slider handleShow={handleShow} allImages={allImages} />
                )}
              </div>
            )}
          </div>

          <div className="row no-gutters mb-3">
            <Genre genres={genreList} />
          </div>

          {directors?.length > 0 && (
            <div className="row no-gutters">
              <p>
                <span className="font-weight-bold">
                  {directors?.length > 1 ? "Directors:" : "Director:"}
                </span>{" "}
                {directors
                  ? directors.map((director, i, length) =>
                      renderCrew(director, i, directors?.length)
                    )
                  : null}
              </p>
            </div>
          )}

          {writers?.length > 0 ? (
            <div className="row no-gutters mb-3">
              <p>
                <span className="font-weight-bold">
                  {writers?.length > 0 &&
                    (writers?.length > 1 ? "Writers:" : "Writer:")}
                </span>{" "}
                {writers.map((writer, i, length) =>
                  renderCrew(writer, i, writers?.length)
                )}
              </p>
            </div>
          ) : null}

          <div className="row">
            <div className="col-lg-8 line-height-p">{details.overview}</div>
            <div className="col-lg-4 d-flex justify-content-lg-end justify-content-start align-items-center mt-4 mt-lg-0">
              <div className="">
                <WatchlistCard
                  loggedIn={loggedIn}
                  lists={lists}
                  isInList={isInList}
                  handleAddWatchlistClicked={handleAddWatchlistClicked}
                  movie={details}
                  setIsInList={setIsInList}
                  called="DetailPage"
                  isInListLoading={isInListLoading}
                  setIsInListLoading={setIsInListLoading}
                />
              </div>
            </div>
          </div>

          {actingCrew?.length > 0 && (
            <div className="row">
              <div className="col-12 font-weight-bold h2 mt-5">Top cast</div>
              {actingCrew ? actingCrew.map(renderActingCrew) : null}
            </div>
          )}

          <div className="row no-gutters">
            <div className="col-lg-12">
              <RecommendationsForMovie movie={details} />
            </div>
          </div>

          <div className={"mt-4 mb-4"}>
            <p>
              <ImdbCard imdbUrl={imdbUrl} size="40" color="black" />
            </p>
          </div>
        </Tab>

        <Tab eventKey="comments" title="Comments">
          <Comments movie_id={details.id} />
        </Tab>
      </Tabs>

      <FullPageImageModal
        show={show}
        setShow={setShow}
        handleClose={handleClose}
        showKey={showKey}
        imageUrl={imageUrl}
      />
    </div>
  );
}

export default Detail;
