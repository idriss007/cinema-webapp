import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({children}) {
    const [user, setUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);

    function login(data) {
        setLoggedIn(true);
        setUser(data);
    };

    const values = {
        loggedIn,
        user,
        login
    };

    return (<AuthContext.Provider value={values}>{children}</AuthContext.Provider>)
}

// function useAuth() {
//     useContext(AuthContext);
// };

// export { AuthProvider, useAuth };

export default AuthContext;