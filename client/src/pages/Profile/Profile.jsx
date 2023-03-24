import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { fetchLists, getDetail } from "../../api";
import ListMovies from "../../components/ListMovies/ListMovies";
import MovieCardSmall from "../../components/MovieCardSmall/MovieCardSmall";
import AuthContext from "../../context/AuthContext";
import styles from "./profile.module.css";

function Profile() {

    // const [lists, setLists] = useState();

    const { id } = useParams();

    const { user, logout } = useContext(AuthContext);

    // useEffect(() => {
    //     (async () => {
    //         const listsData = await axios.get("http://localhost:4000/list/" + user.id)
    //         setLists(listsData);
    //     })()
    // }, []);

    const { isLoading: listsLoading, error: listsError, data: lists } = useQuery("lists", () => fetchLists(user._id));

    if (listsLoading) return 'Loading...'
    if (listsError) return 'An error has occurred: ' + listsError.message

    function handleLogout() {
        logout();
    }

    function renderLists(list) {
        // const { data } = await getDetail(id);
        return (
            <>
                <div className={styles.listNameTxt}>{lists[0].movies[0] && list.name}</div>
                {/* {<ListMovies list={list} />} */}
                <div className={styles.innerListContainer}>
                    {list.movies.map(renderMovies)}
                </div>
            </>
        );
    }

    function renderMovies(movie) {
        // return (<Link style={{ textDecoration: "none", color: "inherit", }} to={"/detail/" + movie.movie.id}><p>{movie.movie.original_title}</p></Link>);
        return (<div className={styles.movieContainer}><MovieCardSmall movie={movie.movie} /></div>);
    }

    return (
        <div className={styles.container}>
            {/* <p className={styles.profileTxt}>Profile</p> */}
            <p className={styles.profileTxt}>Hoşgeldin {user?.name}</p>
            <p>Email adresin: {user?.email}</p>
            <p>Şifren: {user?.password}</p>
            {/* <p>{JSON.stringify(user)}</p> */}
            {lists[0].movies[0] && (<div className={styles.listContainer}>
                {/* <div className={styles.listTxt}>{lists[0].movies[0] && "Film Listelerin"}</div> */}
                {lists.map(renderLists)}
            </div>)}
            <button onClick={handleLogout} className={"btn btn-danger " + styles.logoutBtn}>Logout</button>
        </div>
    );
}

export default Profile;