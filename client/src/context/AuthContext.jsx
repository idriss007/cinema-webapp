import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchLogout, fetchMe } from "../api";
import {useNavigate} from "react-router-dom"; 

const AuthContext = createContext();

export function AuthProvider({children}) {

    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const me = await fetchMe();
                
                setLoggedIn(true);
                setUser(me);

                console.log("me " + me);
                setLoading(false);
            } catch(err) {
                setLoading(false);
                console.log(err);
            }
        })();
    }, []);

    function login(data) {
        setLoggedIn(true);
        setUser(data.user);
        localStorage.setItem("access-token", data.accessToken);
        localStorage.setItem("refresh-token", data.refreshToken);

        navigate("/profile");
    };

    async function logout() {
        setLoggedIn(false);
        setUser(null);

        await fetchLogout();

        localStorage.removeItem("access-token");
        localStorage.removeItem("refresh-token");

        navigate("/");
    }

    const values = {
        loggedIn,
        user,
        login,
        logout
    };

    if(loading) {
        return (
            <p>Yükleniyor...</p>
        );
    }

    return (<AuthContext.Provider value={values}>{children}</AuthContext.Provider>)
}

export default AuthContext;