import React, { useContext, useEffect, useState } from "react";
import { BsStar } from "react-icons/bs";
import { BsStarFill } from "react-icons/bs";
import { addRating, AddToList, DeleteRating, fetchLists, GetRating, RemoveFromList } from "../../api";
import AuthContext from "../../context/AuthContext";
import $ from "jquery";

import styles from "./starcard.module.css";
import { useNavigate } from "react-router-dom";

function StarCard({ movie }) {
    // function StarCard({ lists, movie }) {

    const navigate = useNavigate();

    const [lists, setLists] = useState(null);
    const { user, loggedIn } = useContext(AuthContext);

    const [rating, setRating] = useState(null);
    const [ratedValue, setRatedValue] = useState(null);
    const [hover, setHover] = useState(null);

    useEffect(() => {
        
        (async () => {

            if (loggedIn) {
                try {
                    const ratedValue = await GetRating({ user_id: user._id, movie_id: movie.id });
                    setRatedValue(ratedValue);
                } catch (err) {

                }


                const listsData = await fetchLists(user._id);
                setLists(listsData);
            }


            // const isContainInList = listData[0].movies.find(movie => movie.movie.id === parseInt(id));

            // if (isContainInList) { setIsInList(true); }
            // if (!isContainInList) { setIsInList(false); }

        })();

    }, []);

    // lists[0].movies.length >0 && console.log(lists[0].movies[0].movie.original_title);

    // $('#myModal').on('hidden.bs.modal', function (event) {

    // })

    return (
        <>
            <button
                type="button"
                data-toggle="modal"
                data-target="#exampleModal"
                style={{ background: "inherit", border: "none" }}
                onClick={() => {
                    setRating(ratedValue);
                }}>
                {ratedValue ? <p className={styles.ratingBtnTxt}>{ratedValue}/10</p> : (<BsStar size="35" />)}
            </button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered " role="document">
                    <div className="modal-content">
                        <div className={"modal-header " + styles.container}>
                            <h5 className={"modal-title " + styles.modalRatingTxt} id="exampleModalLabel">{rating ? rating : "Puanla"}</h5>
                            {/* <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button> */}
                        </div>
                        <div className={"modal-body " + styles.container}>
                            {
                                [...Array(10)].map((star, i) => {

                                    const ratingValue = i + 1;

                                    return (
                                        <label key={i}>
                                            <input
                                                className={styles.starInput}
                                                type="radio"
                                                name="rating"
                                                value={ratingValue}
                                                onClick={() => setRating(ratingValue)}
                                            />

                                            <BsStarFill
                                                size="35"
                                                className={styles.star}
                                                color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                                                onMouseEnter={() => setHover(ratingValue)}
                                                onMouseLeave={() => setHover(null)}
                                            />
                                        </label>
                                    );
                                })
                            }
                        </div>
                        <div className={"modal-footer " + styles.container}>
                            {(ratedValue || rating) && (<button
                                type="button"
                                className="btn btn-danger"
                                data-dismiss="modal"
                                onClick={() => {
                                    if (loggedIn) {
                                        DeleteRating({ user_id: user._id, movie_id: movie.id });
                                        RemoveFromList(lists[1]._id, movie);
                                        setRating(null);
                                        setRatedValue(null);
                                    }
                                }}>
                                Remove Rating
                            </button>)}

                            {/* <button type="button" className="btn btn-danger" onClick={() => setRating(null)}>Remove Rating</button> */}

                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-dismiss="modal">
                                Close
                            </button>

                            {rating && (<button
                                type="button"
                                className="btn btn-primary"
                                data-dismiss="modal"
                                onClick={() => {
                                    if (loggedIn) {
                                        AddToList(lists[1]._id, movie);
                                        addRating({ user_id: user._id, movie_id: movie.id, ratingValue: rating });
                                        setRatedValue(rating);
                                    } else {
                                        navigate("/login");
                                    }
                                }}>
                                Save changes
                            </button>)}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default StarCard;