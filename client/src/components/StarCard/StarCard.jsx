import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//API CALLS
import {
  addRating,
  AddToList,
  DeleteRating,
  fetchLists,
  GetRating,
  RemoveFromList,
} from "../../api";

//Contexts
import AuthContext from "../../context/AuthContext";

//React Bootstrap Components
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

//React Icons
import { BsStar } from "react-icons/bs";
import { BsStarFill } from "react-icons/bs";

//Loader
import ClipLoader from "react-spinners/ClipLoader";

//Stylesheet
import styles from "./starcard.module.css";

function StarCard({ movie, size, formOfCalling }) {
  const navigate = useNavigate();

  const [lists, setLists] = useState(null);
  const { user, loggedIn } = useContext(AuthContext);

  const [rating, setRating] = useState(null);
  const [ratedValue, setRatedValue] = useState(null);
  const [loading, setLoading] = useState(true);
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
          setLoading(false);
        } catch (err) {
          setLoading(false);
        }

        const listsData = await fetchLists(user._id);
        setLists(listsData);
      }
    })();
  }, []);

  return (
    <>
      <div
        className={
          styles.starBtn +
          " d-flex align-align-items-center justify-content-center"
        }
        type="button"
        data-toggle="modal"
        data-target="#exampleModal"
        onClick={() => {
          handleShow();
          setRating(ratedValue);
        }}
      >
        {loading ? (
          <div className="">
            <ClipLoader />
          </div>
        ) : ratedValue ? (
          formOfCalling === "inDetailPage" ? (
            <div className="d-flex align-items-center">
              <BsStarFill size="30" />
              <p className={styles.ratingBtnTxtBig + " ml-2"}>
                {ratedValue}/10
              </p>
            </div>
          ) : (
            <div className="d-flex">
              <BsStarFill size={size} />
              <p className={styles.ratingBtnTxtSmall + " ml-1"}>{ratedValue}</p>
            </div>
          )
        ) : (
          <div className="d-flex align-items-center">
            <BsStar className={styles.star} size={size} />
            {formOfCalling === "inDetailPage" && (
              <div className={"ml-2 " + styles.ratingBtnTxtBig}>Rate</div>
            )}
          </div>
        )}
      </div>

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
