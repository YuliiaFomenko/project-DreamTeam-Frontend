import React from 'react';
import {useSelector} from "react-redux";
import {selectLoggedIn} from "../../redux/auth/selectors.js";
import {Navigate} from "react-router-dom";

const RestrictedRoute = ({ component, redirectTo = '/' }) => {
    const isLoggedUser = useSelector(selectLoggedIn);

    if (isLoggedUser) {
        return <Navigate to={redirectTo} />;
    }

    return component;
};

export default RestrictedRoute;