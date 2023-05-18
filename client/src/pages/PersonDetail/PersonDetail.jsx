import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import moment from "moment";
import clsx from "clsx";

//External Api
import { getPersonCredit, getPersonDetail } from "api";

//Components
import MovieSlider from "components/MovieSlider/MovieSlider";
import ImdbCard from "components/ImdbCard/ImdbCard";

//Config File
import configData from "config.json";

//React Icons
import { BsImage } from "react-icons/bs";

//React Spinners
import SyncLoader from "react-spinners/SyncLoader";

//Stylesheet
import styles from "./persondetail.module.css";

function PersonDetail() {
  const { name_id } = useParams();

  const [allCredits, setAllCredits] = useState();

  const credits = useQuery(["credits"], () => getPersonCredit(name_id), {
    onSuccess: (credits) => {
      const a = [credits.crew];
      const b = [credits.cast];
      setAllCredits(() => {
        const c = a.concat(b);
        let allCreditsData = [];

        for (let i = 0; i < c[0].length; i++) {
          allCreditsData.push(c[0][i]);
        }
        for (let i = 0; i < c[1].length; i++) {
          allCreditsData.push(c[1][i]);
        }
        allCreditsData.sort((a, b) => {
          return a.order - b.order || b.vote_count - a.vote_count;
        });
        const uniq = allCreditsData.filter(
          (value, index, self) =>
            index === self.findIndex((t) => t.id === value.id)
        );
        return uniq;
      });
    },
  });

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
  if (errorPerson) return `An error has occurred: ${errorPerson.message}`;

  const profileImgUrl = `${configData.profileImageUrlh632}${person.profile_path}`;
  const imdb_id = person.imdb_id;
  const imdbUrl = `${configData.imdbNameUrl}${imdb_id}`;
  const job =
    person.known_for_department.toLowerCase() === "directing"
      ? "Director"
      : person.known_for_department.toLowerCase() === "acting"
      ? person.gender === 1
        ? "Actress"
        : "Actor"
      : person.known_for_department.toLowerCase() === "writing"
      ? "Writer"
      : null;

  return (
    <div className="container customContainer">
      <div className="row no-gutters">
        <div className="col-12">
          <div className="h2 font-weight-bold m-0 line-height-1">
            <p>{person.name}</p>
          </div>
          <div className="h5 m-0">
            <p>{job ? job : person.known_for_department}</p>
          </div>
        </div>

        <div className="row mt-4 w-100">
          <div className="col-12 col-md-5 col-lg-3">
            {person.profile_path ? (
              <img className="w-100 rounded" src={profileImgUrl} />
            ) : (
              <div
                role="img"
                className={clsx(
                  styles.imageNotFound,
                  "w-100 rounded d-flex justify-content-center align-items-center"
                )}
              >
                <BsImage size="80" />
              </div>
            )}
          </div>

          <div className="col-12 col-md-7 col-lg-9 mt-4 mt-sm-0">
            <div className="row no-gutters">
              <div className="col-12">
                <span className="font-weight-bold">Birthday:</span>{" "}
                {person.birthday
                  ? moment(person.birthday).format("DD/MM/YYYY")
                  : "-"}
              </div>

              {person.deathday && (
                <div className="col-12 mt-1">
                  <span className="font-weight-bold">Day of Death:</span>{" "}
                  {moment(person.deathday).format("DD/MM/YYYY")}
                </div>
              )}

              <div className="col-12 mt-1">
                <span className="font-weight-bold">Place of Birth:</span>{" "}
                {person.place_of_birth ? person.place_of_birth : "-"}
              </div>

              <div className="col-12 mt-3 line-height-p">
                {person.biography
                  ? person.biography
                  : "We don't have a biography for " + person.name + "."}
              </div>
            </div>
          </div>
        </div>

        {allCredits && allCredits.length > 0 && (
          <div className="col-12">
            <MovieSlider movies={allCredits}>Known For</MovieSlider>
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
