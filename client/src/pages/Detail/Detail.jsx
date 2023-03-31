import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchLists, getCredits, getDetail, getImages } from "../../api";
import moment from "moment";
import axios from "axios";

import { LoadingButton } from "@mui/lab"

//Import components
import Genre from "../../components/Genre";
import Slider from "../../components/Slider";
import StarCard from "../../components/StarCard/StarCard";

//Import Contexts
import AuthContext from "../../context/AuthContext";
import ListContext from "../../context/ListContext";

//Import css file
import styles from "./detail.module.css";

function Detail() {

    const { user, loggedIn } = useContext(AuthContext)
    const { addToList, removeFromList, isInList, setIsInList } = useContext(ListContext);

    const imageURL = "https://www.themoviedb.org/t/p/w780";

    const { id } = useParams();
    const navigate = useNavigate();

    const [credits, setCredits] = useState(null);

    useEffect(() => {
        (async () => {


            try {
                //Film kadrosunu api ile çekme işlemi.
                const credits = await getCredits(id);
                setCredits(credits);
            } catch (err) {
                console.log(err.message);
            }

            if (loggedIn) {
                //Aktif kullanıcının oluşturduğu listeler veritabanından çekilir.
                const { data: listData } = await axios.get("http://localhost:4000/list/" + user._id);

                const isContainInList = listData[0].movies.find(movie => movie.movie.id === parseInt(id));

                if (isContainInList) { setIsInList(true); }
                if (!isContainInList) { setIsInList(false); }
            }

        })();

    }, []);

    //Get movie information
    const { data: details } = useQuery(["movieDetail", parseInt(id)], () => getDetail(id));
    //Get Movie images
    const { data: images } = useQuery({ enabled: details?.original_title !== null, queryKey: ["images", parseInt(id)], queryFn: () => getImages(id), });
    //Get User Lists
    const { data: lists } = useQuery(["lists", parseInt(id)], () => fetchLists(user._id), { enabled: loggedIn });

    if (!details || !images) { return <p>Yükleniyor</p> }

    //Filmin fotoğraf url adreslerini diziye aktar.
    const allImages = images?.images?.backdrops?.map(item => item.file_path);
    //Filmin türlerini genreList isimli diziye aktar.
    const genreList = details.genres.map(genre => genre.id);

    function handleAddWatchlistClicked() {
        //Kullanıcı giriş yapmışsa izleme listesine film ekleyip çıkarabilsin
        if (loggedIn === true) {
            if (isInList) {
                removeFromList(lists[0], details);
            }
            if (!isInList) {
                addToList(lists[0], details);
            }
        }
        //Kullanıcı giriş yapmamışsa login sayfasına yönlendirilsin
        if (!loggedIn) {
            return (navigate("/login"));
        }
    }

    const directors = credits?.crew?.filter(person => person.job === "Director");
    const writers = credits?.crew?.filter(person => { return (person.job === "Screenplay" || person.job === "Writer") });
    const actingCrew = credits?.cast?.slice(0, 7);

    function renderCrew(crew, i, length) {
        const name = crew.name;
        if (length === (i + 1)) {
            return <Link to={"/name/" + crew.id}>{name}</Link>;
        } else {
            return (
                <>
                    <Link to={"/name/" + crew.id}>{name}</Link><span>, </span>
                </>
            );
        }
    }

    function renderActingCrew(person, i) {
        const profileImgUrl = "https://image.tmdb.org/t/p/w185" + person.profile_path;
        if (!person.profile_path) {
            return null;
        }
        return (
            <>
                <div className={styles.cast}>
                    <Link reloadDocument style={{ textDecoration: "none", color: "inherit", }} to={"/name/" + person.id}>
                        <img src={profileImgUrl} />
                        <p>{person.name}</p>
                    </Link>
                </div>
            </>
        );
    }

    return (

        <div className={styles.container}>

            <div className={styles.headContainer}>

                <div className={styles.leftInnerContainer}>

                    <div className={styles.titleInnerContainer}>
                        <p className={styles.title}>{details.original_title}</p>
                    </div>

                    <div className={styles.releaseDateInnerContainer}>
                        <p className={styles.releaseDate}>{moment(details.release_date).format("YYYY")}</p>
                    </div>

                </div>

                <div className={styles.rightInnerContainer}>

                    <div className={styles.userRatingContainer}>

                        <p className={styles.usersRatingText}>USERS RATING</p>

                        <div className={styles.voteInnerContainer}>
                            <p className={styles.vote}>{parseFloat(details.vote_average).toFixed(1)}/10</p>
                        </div>

                        <div className={styles.voteCountInnerContainer}>
                            <p className={styles.voteCount}>{details.vote_count}</p>
                        </div>

                    </div>

                    <div className={styles.yourRatingContainer}>

                        <div className={styles.yourRatingTextContainer}>
                            <p className={styles.yourRatingText}>YOUR RATING</p>
                        </div>

                        <div className={styles.starContainer}>
                            <StarCard movie={details} />
                        </div>

                    </div>

                    <div className={styles.addToWatchlistBtnContainer}>
                        {/* LoadingButton için @mui/material @emotion/react @emotion/styled @mui/lab paketleri kuruldu */}
                        <LoadingButton
                            className={styles.addToWatchlistBtn}
                            loading={loggedIn && (lists ? false : true)} variant="contained"
                            onClick={handleAddWatchlistClicked}>
                            {isInList ? "✓ In Watchlist" : "+ Add to Watchlist"}
                        </LoadingButton>
                        {/* <button className={styles.addToWatchlistBtn + " " + (isInList ? "btn btn-danger" : "btn btn-success")}
                            onClick={handleAddWatchlistClicked} >
                            {isInList ? "— Kaldır" : "+ Add to watchlist"}
                        </button> */}
                    </div>
                </div>
            </div>

            <div className={styles.middleContainer}>
                <img className={styles.poster} src={imageURL + details?.poster_path} />

                <div className={styles.carouselContainer}>
                    {images ? <Slider allImages={allImages} /> : <p>Yükleniyor</p>}
                </div>

            </div>

            <div className={styles.gridInfoSection}>

                <div className={styles.genres + " " + styles.gridCol3}>
                    <Genre genres={genreList} />
                </div>

                <div className={styles.crew + " " + styles.gridColAll}>
                    <p>Yönetmen: {directors ? directors.map((director, i, length) => renderCrew(director, i, directors.length)) : null}</p>
                    {writers?.length > 0 ? (<p>Senaryo: {writers.map((writer, i, length) => renderCrew(writer, i, writers.length))}</p>) : null}
                </div>

                <div className={styles.castCrew + " " + styles.gridColAll}>Oyuncu Kadrosu</div>

                {actingCrew ? actingCrew.map(renderActingCrew) : <p>Yükleniyor...</p>}

                <div className={styles.overview + " " + styles.gridColAll}>
                    {details.overview}
                </div>

                <div className={styles.imdbIdContainer}>
                    <p><a href={"https://www.imdb.com/title/" + details.imdb_id} target="_blank">Imdb Sayfası</a></p>
                </div>

            </div>

        </div>
    );
}

export default Detail;