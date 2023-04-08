import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getCredits, getDetail, getImages } from "../../api";
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

function Detail() {
  const { loggedIn } = useContext(AuthContext);
  const { lists, handleAddWatchlistClicked } = useContext(ListContext);

  const imageURL = "https://www.themoviedb.org/t/p/w780";

  const { id } = useParams();

  const [credits, setCredits] = useState(null);
  const [isInList, setIsInList] = useState();

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

        console.log(isContainInList);

        if (isContainInList) {
          setIsInList(true);
        }
        if (!isContainInList) {
          setIsInList(false);
        }
      }
    })();
  }, [id, lists, loggedIn]);

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

  if (!details || !images) {
    return <p>Yükleniyor</p>;
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
    .slice(0, 7);

  function renderCrew(crew, i, length) {
    const name = crew.name;
    if (length === i + 1) {
      return <Link to={"/name/" + crew.id}>{name}</Link>;
    } else {
      return (
        <>
          <Link to={"/name/" + crew.id}>{name}</Link>
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
        <div className={styles.cast}>
          <Link
            reloadDocument
            style={{ textDecoration: "none", color: "inherit" }}
            to={"/name/" + person.id}
          >
            <img src={profileImgUrl} />
            <p>{person.name}</p>
          </Link>
        </div>
      </>
    );
  }

  return (
    <div className={styles.container}>
      <Tabs
        defaultActiveKey="movie"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="movie" title="Movie Detail">
          <div className={styles.headContainer}>
            <div className={styles.leftInnerContainer}>
              <div className={styles.titleInnerContainer}>
                <p className={styles.title}>{details.original_title}</p>
              </div>

              <div className={styles.releaseDateInnerContainer}>
                <p className={styles.releaseDate}>
                  {moment(details.release_date).format("YYYY")}
                </p>
              </div>
            </div>

            <div className={styles.rightInnerContainer}>
              {(details.status === "released" || "Released") && (
                <div className={styles.userRatingContainer}>
                  <p className={styles.usersRatingText}>USERS RATING</p>
                  <div className="d-flex justify-content-center align-items-center">
                    <BsStarFill className="mr-1" color="#F5C518" size="30" />
                    <div className="">
                      <div className={styles.voteInnerContainer}>
                        <p className={styles.vote}>
                          {parseFloat(details.vote_average).toFixed(1)}/10
                        </p>
                      </div>

                      <div className={styles.voteCountInnerContainer}>
                        <p className={styles.voteCount}>
                          {details.vote_count.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {(details.status === "released" || "Released") && (
                <div className={styles.yourRatingContainer}>
                  <div className={styles.yourRatingTextContainer}>
                    <p className={styles.yourRatingText}>YOUR RATING</p>
                  </div>

                  <div className={styles.starContainer}>
                    <StarCard
                      movie={details}
                      size={"30"}
                      formOfCalling="inDetailPage"
                    />
                  </div>
                </div>
              )}

              <div className="ml-2">
                <WatchlistCard
                  loggedIn={loggedIn}
                  lists={lists}
                  isInList={isInList}
                  handleAddWatchlistClicked={handleAddWatchlistClicked}
                  movie={details}
                  setIsInList={setIsInList}
                  called="DetailPage"
                />
              </div>
            </div>
          </div>

          <div className={styles.middleContainer}>
            <img
              className={styles.poster}
              src={imageURL + details?.poster_path}
            />

            <div className={styles.carouselContainer}>
              {images ? <Slider allImages={allImages} /> : <p>Yükleniyor</p>}
            </div>
          </div>

          <div className={styles.gridInfoSection}>
            <div className={styles.genres + " " + styles.gridCol3}>
              <Genre genres={genreList} />
            </div>

            <div className={styles.crew + " " + styles.gridColAll}>
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

            <div className={styles.overview + " " + styles.gridColAll}>
              {details.overview}
            </div>

            <div
              className={
                styles.castCrew + " " + styles.gridColAll + " font-weight-bold"
              }
            >
              Top cast
            </div>

            {actingCrew ? (
              actingCrew.map(renderActingCrew)
            ) : (
              <p>Yükleniyor...</p>
            )}

            <div className={styles.gridColAll}>
              <RecommendationsForMovie movie={details} />
            </div>

            <div className={styles.imdbIdContainer}>
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
