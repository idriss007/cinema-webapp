import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { AddToList, fetchLists, getDetail, getImages } from "../../api";
import Genre from "../../components/Genre";
import Slider from "../../components/Slider";
import moment from "moment";

import styles from "./detail.module.css";

import AuthContext from "../../context/AuthContext";
import ListContext from "../../context/ListContext";
import WatchlistCard from "../../components/WatchlistCard/WatchlistCard";
import axios from "axios";

function Detail() {

    const { user } = useContext(AuthContext)
    const { addToList, removeFromList, isInList, setIsInList } = useContext(ListContext);

    const imageURL = "https://www.themoviedb.org/t/p/original";

    const { id } = useParams();

    let isContainInList = null;

    useEffect(() => {
        (async () => {

            const { data: listData } = await axios.get("http://localhost:4000/list/" + user._id);
            isContainInList = listData[0].movieIds.find(Id => Id === id);
            if(isContainInList) {setIsInList(true)} else {setIsInList(false)}

        })();

    });

    //Get movie information
    const { isLoading: statusDetails, error: errorDetails, data: details } = useQuery(["movieDetail", parseInt(id)], () => getDetail(id));
    //Get Movie images
    const { isLoading: statusImages, error: errorImages, data: images } = useQuery({ enabled: details?.original_title !== null, queryKey: ["images", parseInt(id)], queryFn: () => getImages(id), });
    //Get User Lists
    const { isLoading: statusLists, error: errorLists, data: lists } = useQuery(["lists", parseInt(id)], () => fetchLists(user._id));


    if (statusImages) return 'Loading...'
    if (errorImages) return 'An error has occurred: ' + errorImages.message

    if (statusDetails) return 'Loading...'
    if (errorDetails) return 'An error has occurred: ' + errorDetails.message

    if (statusLists) return 'Loading...'
    if (errorLists) return 'An error has occurred: ' + errorLists.message

    const allImages = images?.images?.backdrops?.map(item => imageURL + item.file_path);

    const genreList = []

    for (let i = 0; i < details.genres.length; i++) {
        genreList.push(details.genres[i].id);
    }

    // const isContainInList = lists[0].movieIds.find(Id => Id === JSON.stringify(details.id));

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
                    <div>
                        <p className={styles.usersRatingText}>USERS RATING</p>
                        <div className={styles.voteInnerContainer}>
                            <p className={styles.vote}>{parseFloat(details.vote_average).toFixed(1)}/10</p>
                        </div>
                        <div className={styles.voteCountInnerContainer}>
                            <p className={styles.voteCount}>{details.vote_count}</p>
                        </div>
                    </div>

                    <div>
                        <p className={styles.yourRatingText}>YOUR RATING</p>
                    </div>

                    {/* <WatchlistCard lists={lists} user={user} details={details} /> */}

                    <div className={styles.addToWatchlistBtnContainer}>
                        <button className={styles.addToWatchlistBtn + " " + (isInList ? "btn btn-danger" : "btn btn-success")} 
                        onClick={isInList === false ? () => addToList(lists[0], details.id) : () => removeFromList(lists[0], details.id)} >
                            {isInList ? "Kaldır" : "+ Add to watchlist"}
                        </button>
                    </div>
                </div>
            </div>

            <div className={styles.middleContainer}>
                <img className={styles.poster} src={imageURL + details?.poster_path} />
                <img className={styles.slider} src={allImages[0]}></img>{/*<Slider className={styles.image} items={allImages} />*/}
            </div>

            <div className={styles.bottomContainer}>
                <div className={styles.genres}><Genre genres={genreList} /></div>
                <p className={styles.overview}>{details.overview}</p>
            </div>
        </div>
    );
}

export default Detail;