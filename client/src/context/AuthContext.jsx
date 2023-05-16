import React, { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

//Local Api
// import { fetchMe, fetchAccessTokenByRefreshToken } from "../api";
import { fetchMe, fetchAccessTokenByRefreshToken } from "internalApi";

//React Spinners
import SyncLoader from "react-spinners/SyncLoader";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        if (localStorage.getItem("access-token")) {
          const me = await fetchMe();

          setLoggedIn(true);
          setUser(me);

          // console.log("me " + JSON.stringify(me));
        }
        setLoading(false);
      } catch (err) {
        //Access token kullanım süresi bitmişse aşağıdaki kodlar çalışacaktır.
        //------------------------------------------------
        if (localStorage.getItem("refresh-token")) {
          try {
            const data = await fetchAccessTokenByRefreshToken();
            login(data);
            setLoading(false);
            // navigate("/");
            // navigate(prevLocation.pathname);
            return;
          } catch (err) {
            setLoading(false);
          }
        }
        //-----------------------------------------------

        localStorage.removeItem("access-token");
        localStorage.removeItem("refresh-token");
        setLoading(false);
      }
    })();
  }, []);

  function login(data) {
    setLoggedIn(true);
    setUser(data.user);
    localStorage.setItem("access-token", data.accessToken);
    localStorage.setItem("refresh-token", data.refreshToken);
    state ? navigate(state.previousPath) : navigate("/user/" + data.user._id);
  }

  async function logout() {
    setLoggedIn(false);
    setUser(null);

    localStorage.removeItem("access-token");
    localStorage.removeItem("refresh-token");
  }

  const values = {
    loggedIn,
    user,
    login,
    logout,
  };

  if (loading) {
    return (
      <div className="d-flex position-absolute h-100 w-100 justify-content-center align-items-center top0">
        <SyncLoader size={35} />
      </div>
    );
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export default AuthContext;
