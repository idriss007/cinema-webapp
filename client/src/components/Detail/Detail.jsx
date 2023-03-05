import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getDetail, getImages } from "../../api";
import Genre from "../Genre/Genre";
import Slider from "../Slider/Slider";
import moment from "moment";

import styles from "./detail.module.css";

function Detail() {
    const imageURL = "https://www.themoviedb.org/t/p/original";
    
    const { id } = useParams();

    const { isLoading: statusDetails, error: errorDetails, data: details } = useQuery(["movieDetail", parseInt(id)], () => getDetail(id));
    const { isLoading: statusImages, error: errorImages, data: images } = useQuery({enabled:details?.original_title !== null, queryKey:["images", parseInt(id)], queryFn:() => getImages(id),});
    
    if (statusImages) return 'Loading...'
    if (errorImages) return 'An error has occurred: ' + errorImages.message

    if (statusDetails) return 'Loading...'
    if (errorDetails) return 'An error has occurred: ' + errorDetails.message

    const allImages = images?.images?.backdrops?.map(item => imageURL + item.file_path);

    const genreList = []

    for(let i = 0; i < details.genres.length; i++) {
        genreList.push(details.genres[i].id);
    }
    
    return (
        
        <div className={"container " + styles.container}>
        {console.log(details)}
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
                </div>
            </div>

            <div className={styles.middleContainer}>
                <img className={styles.poster} src={imageURL + details?.poster_path} />
                <div className={styles.slider}><Slider className={styles.image} items={allImages} /></div>
            </div>

            <div className={styles.bottomContainer}>
                <div className={styles.genres}><Genre genres={genreList} /></div>
                <p className={styles.overview}>{details.overview}</p>
            </div>
        </div>
    );
}

export default Detail;