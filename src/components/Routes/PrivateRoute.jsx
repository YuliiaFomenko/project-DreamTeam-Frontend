import React from "react";
import { useSelector } from "react-redux";
import {selectToken} from "../../redux/auth/selectors.js";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";


const PrivateRoute = ({ children }) => {
  const isLoggedUser = useSelector(selectToken);
  
  if (!isLoggedUser) {
    toast.error("You must be logged in to access this page.");
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
