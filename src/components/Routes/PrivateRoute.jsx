import React from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectIsRefreshing } from "../../redux/auth/selectors.js";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

const PrivateRoute = ({ children }) => {
  const isLoggedUser = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);

  if (isRefreshing) {
    return <Loader />; // або null, або просто нічого не рендерити
  }

  if (!isLoggedUser) {
    toast.error("You must be logged in to access this page.");
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
