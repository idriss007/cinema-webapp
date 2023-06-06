import React, { useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

//Components
import TrailerCard from "components/TrailerCard/TrailerCard";

//Config File
import configData from "config.json";

//React Bootstrap
import Modal from "react-bootstrap/Modal";

//Stylesheets
import styles from "./latesttrailersection.module.css";
import "./latesttrailersection.css";

function LatestTrailerSection({ upcomingMovies }) {
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);
  const [activeTrailer, setActiveTrailer] = useState();

  const filteredMovies =
    upcomingMovies &&
    upcomingMovies?.results.filter((movie) => movie.backdrop_path !== null);

  function handleShow() {
    setFullscreen(true);
    setShow(true);
  }

  function handleTrailer(url) {
    setActiveTrailer(url);
  }

  return (
    <div className="row no-gutters d-flex justify-content-center">
      <div className="col-12">
        {filteredMovies && (
          <div
            id="carouselExampleControls"
            className="carousel slide"
            data-ride="carousel"
            data-interval="false"
          >
            <div className="carousel-inner">
              {filteredMovies.map((movie, key) => {
                return (
                  movie.backdrop_path && (
                    <div
                      key={key}
                      className={
                        key === 0 ? "carousel-item active" : "carousel-item"
                      }
                    >
                      <div className="row">
                        <div className="col-lg-2 col-md-12 d-flex justify-content-center align-items-center">
                          <Link
                            className="d-flex justify-content-center"
                            reloadDocument={true}
                            style={{ textDecoration: "none", color: "inherit" }}
                            to={`/detail/${movie.id}`}
                          >
                            <img
                              src={`${configData.moviePosterUrlw342}${movie.poster_path}`}
                              className={clsx(
                                styles.poster,
                                "d-block rounded mh-100"
                              )}
                              alt="..."
                            />
                          </Link>
                        </div>
                        <div
                          className={clsx(
                            styles.trailerCardContainer,
                            "col-lg-10 col-md-12"
                          )}
                        >
                          <TrailerCard
                            movie={movie}
                            handleTrailer={handleTrailer}
                            handleShow={handleShow}
                          />
                        </div>
                      </div>
                    </div>
                  )
                );
              })}
            </div>
            <a
              className="carousel-control-prev"
              href="#carouselExampleControls"
              role="button"
              data-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#carouselExampleControls"
              role="button"
              data-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
        )}
      </div>

      <Modal
        className="d-flex justify-content-center"
        centered
        show={show}
        fullscreen={fullscreen}
        onHide={() => setShow(false)}
        dialogClassName="trailer-dialog"
        contentClassName="trailer-content"
      >
        {/* <Modal.Header closeButton>
          <Modal.Title>Modal</Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
          <iframe
            width="100%"
            height="100%"
            src={"https://www.youtube.com/embed/" + activeTrailer}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default LatestTrailerSection;
