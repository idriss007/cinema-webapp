import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchLists } from "../../api";
import AuthContext from "../../context/AuthContext";
import styles from "./profile.module.css";

function Profile() {

    // const [lists, setLists] = useState([]);

    const { user, logout } = useContext(AuthContext);

    const { isLoading, error, data } = useQuery("lists", () => fetchLists(user._id));
 
    if (isLoading) return 'Loading...'
 
    if (error) return 'An error has occurred: ' + error.message

    console.log(data);

    // useEffect(() => {
    //     getLists();
    // }, []);

    function handleLogout() {
        logout();
    }

    // async function getLists() {
    //     let lists = []
    //     try {
    //         lists = await fetchLists(user._id);
    //     } catch (err) {
    //         console.log(err);
    //     }

    //     setLists(lists)
    // }

    return (
        <div className={styles.container}>
            {/* <p className={styles.profileTxt}>Profile</p> */}
            <p className={styles.profileTxt}>Hoşgeldin {user?.name}</p>
            <p>Email adresin: {user?.email}</p>
            <p>Şifren: {user?.password}</p>
            {/* <p>{JSON.stringify(user)}</p> */}
            <div>Lists</div>
            {data.map((item) => <p>{item.name}</p>)}
            <button onClick={handleLogout} className={"btn btn-danger " + styles.logoutBtn}>Logout</button>
        </div>
    );
}

export default Profile;