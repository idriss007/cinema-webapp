import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

//Local Api
//API CALLS
// import {
//   addRating,
//   AddToList,
//   DeleteRating,
//   fetchLists,
//   GetRating,
//   RemoveFromList,
// } from "../../api";
import {
  addRating,
  AddToList,
  DeleteRating,
  RemoveFromList,
} from "internalApi";

//Contexts
import AuthContext from "context/AuthContext";
import ListContext from "context/ListContext";

//React Bootstrap
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

//React Icons
import { BsStar } from "react-icons/bs";
import { BsStarFill } from "react-icons/bs";

//React Spinners
import ClipLoader from "react-spinners/ClipLoader";

//Stylesheets
import styles from "./starcard.module.css";
import "./starcard.css";

function StarCard({ movie, size, formOfCalling, index }) {
  const navigate = useNavigate();

  const { loggedIn } = useContext(AuthContext);
  const { lists, ratings } = useContext(ListContext);

  // const [lists, setLists] = useState(null);
  const [rating, setRating] = useState(null);
  const [ratedValue, setRatedValue] = useState(null);
  const [loading, setLoading] = useState(true);

  const [hover, setHover] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (loggedIn && ratings) {
      const ratedValue = ratings[0]?.rating.filter(
        (movieItem) => movieItem.movie_id == movie.id
      );
      const ratingValue = ratedValue && ratedValue[0]?.ratingValue;

      setRatedValue(ratingValue);
      // setLoading(false);
    } else {
      // setLoading(false);
      // setRating(null);
      setRatedValue(null);
    }
    ratings && lists ? setLoading(false) : setLoading(true);
    if (!loggedIn) {
      setLoading(false);
    }
  }, [ratings, lists]);

  return (
    <>
      <button
        // disabled={!lists}
        className={clsx(
          styles.starBtn,
          "d-flex align-align-items-center justify-content-center"
        )}
        type="button"
        data-toggle="modal"
        data-target={"#exampleModal"}
        onClick={() => {
          handleShow();
          setRating(ratedValue);
        }}
      >
        {loading ? (
          <div>
            <ClipLoader size="15px" />
          </div>
        ) : ratedValue ? (
          formOfCalling === "inDetailPage" ? (
            <div className="d-flex align-items-center">
              <BsStarFill size="30" />
              <p className={clsx(styles.ratingBtnTxtBig, "ml-2")}>
                {ratedValue}/10
              </p>
            </div>
          ) : (
            <div className="d-flex justify-content-center align-items-center">
              <BsStarFill size={size} />
              <p className={clsx(styles.ratingBtnTxtSmall, "ml-1")}>
                {ratedValue}
              </p>
            </div>
          )
        ) : (
          <div className="d-flex align-items-center">
            <BsStar className={styles.star} size={size} />
            {formOfCalling === "inDetailPage" && (
              <div className={clsx(styles.ratingBtnTxtBig, "ml-2")}>Rate</div>
            )}
          </div>
        )}
      </button>

      <Modal
        centered
        show={show}
        onHide={handleClose}
        className={clsx("d-flex justify-content-center align-items-center")}
        contentClassName="starcard-modal-content"
        dialogClassName="starcard-dialog"
      >
        <Modal.Header className={clsx(styles.container)}>
          <Modal.Title className={clsx(styles.modalRatingTxt)}>
            {rating ? rating : "Puanla"}
          </Modal.Title>
          <button
            className={clsx(
              "justify-content-end mr-3 rounded pt-2 pb-2 pr-3 pl-3",
              styles.closeBtn
            )}
            onClick={handleClose}
          >
            X
          </button>
        </Modal.Header>
        <Modal.Body className={styles.container}>
          <div className="row no-gutters">
            {[...Array(10)].map((star, i) => {
              const ratingValue = i + 1;

              return (
                <label className="col-auto" key={i}>
                  <input
                    className={styles.starInput}
                    type="radio"
                    name="rating"
                    value={ratingValue}
                    onClick={() => setRating(ratingValue)}
                  />

                  <BsStarFill
                    size="30"
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
          </div>
        </Modal.Body>
        <Modal.Footer className={styles.container}>
          {(ratedValue || rating) && (
            <button
              disabled={loading}
              className={clsx("rounded-0", styles.removeBtn)}
              onClick={() => {
                if (loggedIn) {
                  try {
                    DeleteRating({ movie_id: movie.id });
                    RemoveFromList(lists[1]?._id, movie);
                    setRating(null);
                    setRatedValue(null);
                  } catch (error) {
                    console.log(error);
                  }
                }
                handleClose();
              }}
            >
              Remove Rating
            </button>
          )}

          {rating && (
            <button
              className={clsx(styles.saveBtn)}
              disabled={loading || (ratedValue && rating == ratedValue)}
              onClick={() => {
                if (loggedIn) {
                  try {
                    AddToList(lists[1]?._id, movie);
                    addRating({
                      movie_id: movie.id,
                      ratingValue: rating,
                    });
                    setRatedValue(rating);
                    setLoading(false);
                  } catch (error) {
                    console.log(error);
                  }
                } else {
                  navigate("/signin");
                }
                handleClose();
              }}
            >
              Rate
            </button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default StarCard;
