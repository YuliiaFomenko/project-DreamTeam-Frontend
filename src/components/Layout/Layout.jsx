import React, {Suspense} from 'react'
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import Loader from "../Loader/Loader.jsx";
import {Outlet} from "react-router-dom";

const Layout = () => {
    return (
        <>
            <Header/>
            <Suspense fallback={<Loader />}>
                <Outlet />
            </Suspense>
            <Footer/>
        </>)
}

export default Layout