import React, { useContext, useEffect, useState } from "react";
import { BsStar } from "react-icons/bs";
import { BsStarFill } from "react-icons/bs";
import {
  addRating,
  AddToList,
  DeleteRating,
  fetchLists,
  GetRating,
  RemoveFromList,
} from "../../api";
import AuthContext from "../../context/AuthContext";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import styles from "./starcard.module.css";
import { useNavigate } from "react-router-dom";

function StarCard({ movie }) {
  const navigate = useNavigate();

  const [lists, setLists] = useState(null);
  const { user, loggedIn } = useContext(AuthContext);

  const [rating, setRating] = useState(null);
  const [ratedValue, setRatedValue] = useState(null);
  const [hover, setHover] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    (async () => {
      if (loggedIn) {
        try {
          const ratedValue = await GetRating({
            user_id: user._id,
            movie_id: movie.id,
          });
          setRatedValue(ratedValue);
        } catch (err) {}

        const listsData = await fetchLists(user._id);
        setLists(listsData);
      }
    })();
  }, []);

  return (
    <>
      <button
        type="button"
        data-toggle="modal"
        data-target="#exampleModal"
        style={{ background: "inherit", border: "none" }}
        // className =
        onClick={() => {
          handleShow();
          setRating(ratedValue);
        }}
      >
        {ratedValue ? (
          <p className={styles.ratingBtnTxt}>{ratedValue}/10</p>
        ) : (
          <BsStar size="30" />
        )}
      </button>

      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header className={styles.container}>
          <Modal.Title className={styles.modalRatingTxt}>
            {rating ? rating : "Puanla"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.container}>
          {[...Array(10)].map((star, i) => {
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
                  color={
                    ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                  }
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(null)}
                />
              </label>
            );
          })}
        </Modal.Body>
        <Modal.Footer className={styles.container}>
          {(ratedValue || rating) && (
            <Button
              className="btn btn-danger"
              variant="secondary"
              onClick={() => {
                if (loggedIn) {
                  DeleteRating({ user_id: user._id, movie_id: movie.id });
                  RemoveFromList(lists[1]._id, movie);
                  setRating(null);
                  setRatedValue(null);
                }
                handleClose();
              }}
            >
              Remove Rating
            </Button>
          )}

          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

          {rating && (
            <Button
              variant="primary"
              onClick={() => {
                if (loggedIn) {
                  AddToList(lists[1]._id, movie);
                  addRating({
                    user_id: user._id,
                    movie_id: movie.id,
                    ratingValue: rating,
                  });
                  setRatedValue(rating);
                } else {
                  navigate("/login");
                }
                handleClose();
              }}
            >
              Save Changes
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default StarCard;
