import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPersonCredit, getPersonDetail } from "../../api";
import { useQuery } from "react-query";
import moment from "moment";

import styles from "./persondetail.module.css";
import MovieSlider from "../../components/MovieSlider/MovieSlider";

import SyncLoader from "react-spinners/SyncLoader";
import ImdbCard from "../../components/ImdbCard/ImdbCard";

function PersonDetail() {
  const { name_id } = useParams();

  const [personCredits, setPersonCredits] = useState();

  useEffect(() => {
    (async () => {
      const credits = await getPersonCredit(name_id);
      const sortedCastCredits = credits?.cast?.sort((a, b) => {
        return a.order - b.order || b.vote_count - a.vote_count;
      });
      const sortedCrewCredits = credits?.crew?.sort((a, b) => {
        return a.order - b.order || b.vote_count - a.vote_count;
      });

      // if (credits?.cast.length > credits?.crew.length) {
      //     //Başrol ve oy sıralamasına göre yapımları sırala
      //     const sortedCredits = credits?.cast?.sort((a, b) => { return a.order - b.order || b.vote_count - a.vote_count});
      //     setPersonCredits(sortedCredits);
      // } else {
      //     const sortedCredits = credits?.crew?.sort((a, b) => { return a.order - b.order || b.vote_count - a.vote_count});
      //     // const sortedCredits = credits?.crew?.sort((a, b) => { return b.vote_count - a.vote_count });
      //     setPersonCredits(sortedCredits);
      // }

      //Kişinin asıl mesleğinin oyuncu mu yoksa başka meslek mi olduğuna bak
      if (sortedCrewCredits.length <= 0) {
        setPersonCredits(sortedCastCredits);
      } else if (sortedCastCredits.length <= 0) {
        setPersonCredits(sortedCrewCredits);
      } else {
        if (sortedCastCredits?.length > sortedCrewCredits?.length) {
          //Başrol ve oy sıralamasına göre yapımları sırala
          setPersonCredits(sortedCastCredits);
        } else {
          console.log(personCredits);
          setPersonCredits(sortedCrewCredits);
        }
      }
    })();
  }, []);

  const {
    isLoading: statusPerson,
    error: errorPerson,
    data: person,
  } = useQuery(["person", parseInt(name_id)], () => getPersonDetail(name_id), {
    onSuccess: (person) => (document.title = person.name),
  });
  if (statusPerson)
    return (
      <div className="d-flex position-absolute h-100 w-100 justify-content-center align-items-center top0">
        <SyncLoader
          size={35}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  if (errorPerson) return "An error has occurred: " + errorPerson.message;

  const profileImgUrl = "https://image.tmdb.org/t/p/h632" + person.profile_path;
  const imdb_id = person.imdb_id;
  const imdbUrl = "https://www.imdb.com/name/" + imdb_id;

  return (
    <div className="container customContainer">
      <div className="row no-gutters">
        <div className="col-12">
          <div className="h2 font-weight-bold m-0 line-height-1">
            <p>{person.name}</p>
          </div>
          <div className="h5 m-0">
            <p>{person.known_for_department}</p>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-auto col-sm-5 col-lg-3">
            <img className="w-100 rounded" src={profileImgUrl} />
          </div>

          <div className="col-auto col-sm-7 col-lg-9 mt-4 mt-sm-0">
            <div className="row no-gutters">
              <div className="col-12">
                <span className="font-weight-bold">Birthday:</span>{" "}
                {person.birthday
                  ? moment(person.birthday).format("DD/MM/YYYY")
                  : "Kayıtlarımızda doğum tarihi ile ilgili bir kayıt bulunmamaktadır."}
              </div>

              {person.deathday && (
                <div className="col-12 mt-1">
                  <span className="font-weight-bold">Day of Death:</span>{" "}
                  {moment(person.deathday).format("DD/MM/YYYY")}
                </div>
              )}

              <div className="col-12 mt-1">
                <span className="font-weight-bold">Place of Birth:</span>{" "}
                {person.place_of_birth}
              </div>

              <div className="col-12 mt-3 line-height-p">
                {person.biography
                  ? person.biography
                  : "Kayıtlarımızda " +
                    person.name +
                    " için biyografimiz bulunmamaktadır."}
              </div>
            </div>
          </div>
        </div>

        {personCredits && (
          <div className="col-12">
            <MovieSlider movies={personCredits}>Known For</MovieSlider>
          </div>
        )}

        <div className="col-12 mt-5 mb-5">
          <ImdbCard imdbUrl={imdbUrl} size="40" color="black" />
        </div>
      </div>
    </div>
  );
}

export default PersonDetail;
