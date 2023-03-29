import React from "react";
import { useParams } from "react-router-dom";
import { getPersonDetail } from "../../api";
import { useQuery } from "react-query";
import moment from "moment";

import styles from "./persondetail.module.css";


function PersonDetail() {

    const { name_id } = useParams();

    const { isLoading: statusPerson, error: errorPerson, data: person } = useQuery(["person", parseInt(name_id)], () => getPersonDetail(name_id));
    if (statusPerson) return 'Loading...'
    if (errorPerson) return 'An error has occurred: ' + errorPerson.message

    const profileImgUrl = "https://image.tmdb.org/t/p/h632" + person.profile_path;
    const imdb_id = person.imdb_id;
    const imdbUrl = "https://www.imdb.com/name/" + imdb_id;

    return (
        <div className={styles.container}>
            <div className={styles.gridContainer} >

                <div className={styles.gridColAll}>
                    <div className={styles.nameContainer} >
                        <p>{person.name}</p>
                    </div>
                    <div className={styles.jobContainer} >
                        <p>{person.known_for_department}</p>
                    </div>
                </div>

                <div className={styles.personImgContainer} >
                    <img className={styles.personImg} src={profileImgUrl} />
                </div>

                <div className={styles.infoContainer}>
                    <p><span>Doğum Tarihi:</span> {person.birthday ? moment(person.birthday).format("DD/MM/YYYY") : "Kayıtlarımızda doğum tarihi ile ilgili bir kayıt bulunmamaktadır."}</p>
                    {person.deathday && <p>Ölüm Tarihi: {moment(person.deathday).format("DD/MM/YYYY")}</p>}
                    <p><span>Doğum Yeri:</span> {person.place_of_birth}</p>
                    <div className={styles.biographyContainer}><p>{person.biography ? person.biography : ("Kayıtlarımızda " + person.name + " için biyografimiz bulunmamaktadır.")}</p></div>
                </div>

                {[...Array(5)].map((item, i) => {
                    return <p>Oynadığı Film - {i + 1}</p>
                })}

                <div><a href={imdbUrl} target="_blank" >Imdb Sayfası</a></div>

            </div>
        </div>
    );

}

export default PersonDetail;