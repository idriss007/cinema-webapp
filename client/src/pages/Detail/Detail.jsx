import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { fetchLists, getCredits, getDetail, getImages } from "../../api";
import moment from "moment";

//React Icons
import { BsStarFill } from "react-icons/bs";

//Bootstrap
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

//Import components
import Genre from "../../components/Genre";
import Slider from "../../components/Slider";
import StarCard from "../../components/StarCard/StarCard";
import Comments from "../Comments/Comments";

//Import Contexts
import AuthContext from "../../context/AuthContext";
import ListContext from "../../context/ListContext";

//Import css file
import styles from "./detail.module.css";
import RecommendationsForMovie from "../../components/RecommendationsForMovie/RecommendationsForMovie";
import WatchlistCard from "../../components/WatchlistCard/WatchlistCard";

import SyncLoader from "react-spinners/SyncLoader";

function Detail() {
  const { loggedIn } = useContext(AuthContext);
  const { lists, handleAddWatchlistClicked } = useContext(ListContext);

  const imageURL = "https://www.themoviedb.org/t/p/w780";

  const { id } = useParams();

  const [credits, setCredits] = useState(null);
  const [isInList, setIsInList] = useState();
  const [isInListLoading, setIsInListLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        //Film kadrosunu api ile çekme işlemi.
        const credits = await getCredits(id);
        setCredits(credits);
      } catch (err) {
        console.log(err.message);
      }

      if (loggedIn && lists) {
        const isContainInList = await lists[0]?.movies?.find(
          (movieData) => movieData?.movie?.id === parseInt(id)
        );

        setIsInList(isContainInList);
      }
      setIsInListLoading(false);
    })();
  }, []);

  //Get movie information
  const { data: details } = useQuery(["movieDetail", parseInt(id)], () =>
    getDetail(id)
  );
  //Get Movie images
  const { data: images } = useQuery({
    enabled: details?.original_title !== null,
    queryKey: ["images", parseInt(id)],
    queryFn: () => getImages(id),
  });
  // const {
  //   isLoading: listsLoading,
  //   error: listsError,
  //   data: listsData,
  // } = useQuery(["lists", Date.now], () => fetchLists(user._id));

  if (!details || !images) {
    return (
      <div className="d-flex position-absolute h-100 w-100 justify-content-center align-items-center top0">
        <SyncLoader
          size={35}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  //Filmin fotoğraf url adreslerini diziye aktar.
  const allImages = images?.images?.backdrops?.map((item) => item.file_path);
  //Filmin türlerini genreList isimli diziye aktar.
  const genreList = details.genres.map((genre) => genre.id);

  const directors = credits?.crew?.filter(
    (person) => person.job === "Director"
  );
  const writers = credits?.crew?.filter((person) => {
    return person.job === "Screenplay" || person.job === "Writer";
  });
  const actingCrew = credits?.cast
    ?.filter((people) => people.profile_path !== null)
    .slice(0, 6);

  function renderCrew(crew, i, length) {
    const { name, id } = crew;
    if (length === i + 1) {
      return <Link to={"/name/" + id}>{name}</Link>;
    } else {
      return (
        <>
          <Link to={"/name/" + id}>{name}</Link>
          <span>, </span>
        </>
      );
    }
  }

  function renderActingCrew(person, i) {
    const profileImgUrl =
      "https://image.tmdb.org/t/p/w185" + person.profile_path;
    if (!person.profile_path) {
      return null;
    }
    return (
      <>
        <div
          className={
            "col-xl-2 col-sm-4 col-xs-12 justify-content-center d-flex mt-3"
          }
        >
          <div className={styles.castContainer + " d-flex"}>
            <Link
              className="d-flex flex-column"
              reloadDocument
              style={{ textDecoration: "none", color: "inherit" }}
              to={"/name/" + person.id}
            >
              <img className="mw-100 " src={profileImgUrl} />
              <div className="text-center d-flex align-items-center justify-content-center flex-grow-1 p-1">
                <p className="">{person.name}</p>
              </div>
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="container customContainer">
      <Tabs
        defaultActiveKey="movie"
        id="uncontrolled-tab-example"
        className="mb-3 mt-4"
      >
        <Tab eventKey="movie" title="Movie Detail">
          <div className={"row no-gutters mb-2"}>
            <div className={"col-sm-12 col-md-12 col-lg-6 mr-auto mb-2"}>
              <div className={styles.titleInnerContainer}>
                <p className={styles.title}>{details.original_title}</p>
              </div>

              <div className={styles.releaseDateInnerContainer}>
                <p className={styles.releaseDate}>
                  {moment(details.release_date).format("YYYY")}
                </p>
              </div>
            </div>

            <div className="col-md-12 col-lg-auto d-flex">
              <div className="mr-3">
                {details.status.toUpperCase() !== "RELEASED" ? null : (
                  <div
                    className={
                      styles.userRatingContainer +
                      " d-flex flex-column align-items-center"
                    }
                  >
                    <p
                      className={
                        styles.usersRatingText +
                        " mb-2 text-nowrap font-weight-bold text-black-50"
                      }
                    >
                      USERS RATING
                    </p>
                    <div className="d-flex justify-content-center align-items-center">
                      <BsStarFill className="mr-1" color="#F5C518" size="30" />
                      <div className="">
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
                    <p
                      className={
                        styles.yourRatingText +
                        " font-weight-bold text-black-50"
                      }
                    >
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

          <div className={styles.middleContainer + " mb-4"}>
            <img
              className={styles.poster}
              src={imageURL + details?.poster_path}
              alt="movie poster"
            />

            <div className={styles.carouselContainer}>
              {images && <Slider allImages={allImages} />}
            </div>
          </div>

          <div className="row no-gutters mb-3">
            <Genre genres={genreList} />
          </div>

          <div className="row no-gutters">
            <p>
              <span className="font-weight-bold">
                {directors?.length > 1 ? "Directors:" : "Director:"}
              </span>{" "}
              {directors
                ? directors.map((director, i, length) =>
                    renderCrew(director, i, directors.length)
                  )
                : null}
            </p>
          </div>

          <div className="row no-gutters mb-3">
            {writers?.length > 0 ? (
              <p>
                <span className="font-weight-bold">
                  {writers?.length > 1 ? "Writers:" : "Writer:"}
                </span>{" "}
                {writers.map((writer, i, length) =>
                  renderCrew(writer, i, writers.length)
                )}
              </p>
            ) : null}
          </div>

          <div className="row no-gutters">
            <div className="col-lg-8">{details.overview}</div>
            <div className="col-lg-4">
              <div className="d-flex justify-content-center align-items-center ml-2">
                {lists && (
                  <WatchlistCard
                    loggedIn={loggedIn}
                    lists={lists}
                    isInList={isInList}
                    handleAddWatchlistClicked={handleAddWatchlistClicked}
                    movie={details}
                    setIsInList={setIsInList}
                    called="DetailPage"
                    isInListLoading={isInListLoading}
                    // listsData={listsData.slice(2)}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12 font-weight-bold h2 mt-5">Top cast</div>
            {actingCrew ? (
              actingCrew.map(renderActingCrew)
            ) : (
              <p>Yükleniyor...</p>
            )}
          </div>

          <div className="row no-gutters">
            <div className="col-lg-12">
              <RecommendationsForMovie movie={details} />
            </div>
          </div>

          <div className={styles.imdbIdContainer + " mt-5 mb-5"}>
            <p>
              <a
                href={"https://www.imdb.com/title/" + details.imdb_id}
                target="_blank"
                rel="noreferrer"
              >
                Imdb Sayfası
              </a>
            </p>
          </div>
        </Tab>

        <Tab eventKey="comments" title="Comments">
          <Comments movie_id={details.id} />
        </Tab>
      </Tabs>
    </div>
  );
}

export default Detail;
