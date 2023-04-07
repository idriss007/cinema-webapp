import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPersonCredit, getPersonDetail } from "../../api";
import { useQuery } from "react-query";
import moment from "moment";

import styles from "./persondetail.module.css";
import MovieSlider from "../../components/MovieSlider/MovieSlider";

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
  } = useQuery(["person", parseInt(name_id)], () => getPersonDetail(name_id));
  if (statusPerson) return "Loading...";
  if (errorPerson) return "An error has occurred: " + errorPerson.message;

  const profileImgUrl = "https://image.tmdb.org/t/p/h632" + person.profile_path;
  const imdb_id = person.imdb_id;
  const imdbUrl = "https://www.imdb.com/name/" + imdb_id;
  const imageURL = "https://www.themoviedb.org/t/p/w780";

  return (
    <div className={styles.container}>
      <div className={styles.gridContainer}>
        <div className={styles.gridColAll}>
          <div className={styles.nameContainer}>
            <p>{person.name}</p>
          </div>
          <div className={styles.jobContainer}>
            <p>{person.known_for_department}</p>
          </div>
        </div>

        <div className={styles.personImgContainer}>
          <img className={styles.personImg} src={profileImgUrl} />
        </div>

        <div className={styles.infoContainer}>
          <p>
            <span>Birthday:</span>{" "}
            {person.birthday
              ? moment(person.birthday).format("DD/MM/YYYY")
              : "Kayıtlarımızda doğum tarihi ile ilgili bir kayıt bulunmamaktadır."}
          </p>
          {person.deathday && (
            <p>
              <span>Day of Death:</span>{" "}
              {moment(person.deathday).format("DD/MM/YYYY")}
            </p>
          )}
          <p>
            <span>Place of Birth:</span> {person.place_of_birth}
          </p>
          <div className={styles.biographyContainer}>
            <p>
              {person.biography
                ? person.biography
                : "Kayıtlarımızda " +
                  person.name +
                  " için biyografimiz bulunmamaktadır."}
            </p>
          </div>
        </div>

        {/* <div className={styles.gridColAll}>
                    <p></p>
                </div> */}

        {personCredits && (
          <div className={styles.credit + " " + styles.gridColAll}>
            <MovieSlider movies={personCredits}>Known For</MovieSlider>
          </div>
        )}

        <div>
          <a href={imdbUrl} target="_blank">
            Imdb Sayfası
          </a>
        </div>
      </div>
    </div>
  );
}

export default PersonDetail;
