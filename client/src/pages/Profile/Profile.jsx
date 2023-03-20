import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";

function Profile() {

    const { user, logout } = useContext(AuthContext);

    function handleLogout() {
        logout();
    }

    return (
        <>
            <p>{JSON.stringify(user)}</p>
            <button onClick={handleLogout} className="btn btn-danger">Logout</button>
        </>
    );
}

export default Profile;