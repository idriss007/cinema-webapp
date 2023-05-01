import React, { useState } from "react";

// React Bootstrap Components
import Modal from "react-bootstrap/Modal";
import Carousel from "react-bootstrap/Carousel";

// Stylesheets
import styles from "./latesttrailersection.module.css";
import "./latesttrailersection.css";
import TrailerCard from "../TrailerCard/TrailerCard";
import { Link } from "react-router-dom";

function LatestTrailerSection({ upcomingMovies }) {
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);
  const [activeTrailer, setActiveTrailer] = useState();

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
        {upcomingMovies && (
          <div
            id="carouselExampleControls"
            className="carousel slide"
            data-ride="carousel"
            data-interval="false"
          >
            <div className="carousel-inner">
              {upcomingMovies.results.map((movie, key) => {
                return movie.backdrop_path ? (
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
                          reloadDocument
                          style={{ textDecoration: "none", color: "inherit" }}
                          to={"/detail/" + movie.id}
                        >
                          <img
                            src={
                              "https://image.tmdb.org/t/p/w342" +
                              movie.poster_path
                            }
                            className={"d-block rounded " + styles.poster}
                            alt="..."
                          />
                        </Link>
                      </div>
                      <div className="col-lg-10 col-md-12 mt-3">
                        <TrailerCard
                          movie={movie}
                          handleTrailer={handleTrailer}
                          handleShow={handleShow}
                        />
                      </div>
                    </div>
                  </div>
                ) : null;
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
        className="d-flex p-0"
        show={show}
        fullscreen={fullscreen}
        onHide={() => setShow(false)}
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
