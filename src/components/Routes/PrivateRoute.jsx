import React from 'react';
import {useSelector} from "react-redux";
import {selectIsLoggedIn} from "../../redux/auth/selectors.js";
import {Navigate} from "react-router-dom";
import toast from "react-hot-toast";

const PrivateRoute = ({ children}) => {
    const isLoggedUser = useSelector(selectIsLoggedIn);

    if(!isLoggedUser) {
        toast.error("You must be logged in to access this page.");
        return <Navigate to="/login" />
    }

    return children;
};

export default PrivateRoute;