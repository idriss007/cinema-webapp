import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import styles from "./profile.module.css";

function Profile() {

    const { user, logout } = useContext(AuthContext);

    function handleLogout() {
        logout();
    }

    return (
        <div className={styles.container}>
            {/* <p className={styles.profileTxt}>Profile</p> */}
            <p className={styles.profileTxt}>Hoşgeldin {user?.name}</p>
            <p>Email adresin: {user?.email}</p>
            <p>Şifren: {user?.password}</p>
            {/* <p>{JSON.stringify(user)}</p> */}
            <button onClick={handleLogout} className={"btn btn-danger " + styles.logoutBtn}>Logout</button>
        </div>
    );
}

export default Profile;