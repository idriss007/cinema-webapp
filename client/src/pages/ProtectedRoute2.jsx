import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function ProtectedRoute2({ component: Component, ...rest }) {
  const { loggedIn } = useContext(AuthContext);

  return !loggedIn ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoute2;
