import React, {Suspense} from 'react'
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import Loader from "../Loader/Loader.jsx";
import {Outlet} from "react-router-dom";
import {Toaster} from "react-hot-toast";

const Layout = () => {
    return (
        <>
            <Header/>
            <Suspense fallback={<Loader/>}>
                <Outlet/>
            </Suspense>
            <Footer/>
            <Toaster position='top-right' reverseOrder={false}/>)
        </>)
}

export default Layout