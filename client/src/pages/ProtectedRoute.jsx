import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

//Context
import AuthContext from "context/AuthContext";

function ProtectedRoute({ component: Component, ...rest }) {
  const { loggedIn } = useContext(AuthContext);

  return loggedIn ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoute;
