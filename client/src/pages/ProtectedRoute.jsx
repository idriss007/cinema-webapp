import React, { useContext } from "react";
import {
  Navigate,
  Outlet,
  redirect,
  Route,
  useNavigate,
} from "react-router-dom";
import AuthContext from "../context/AuthContext";

function ProtectedRoute({ component: Component, ...rest }) {
  const { loggedIn } = useContext(AuthContext);

  return loggedIn ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoute;
