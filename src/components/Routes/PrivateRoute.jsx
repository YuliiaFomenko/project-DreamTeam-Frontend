import React from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectIsRefreshing } from "../../redux/auth/selectors.js";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useRef } from "react";

const PrivateRoute = ({ children }) => {
  const isLoggedUser = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);

  const hasShownToast = useRef(false);

  if (isRefreshing) {
    return <Loader />;
  }

  if (!isLoggedUser) {
    if (!hasShownToast.current) {
      toast.error("You must be logged in to access this page.");
      hasShownToast.current = true;
    }
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
