import { Suspense } from "react";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import Loader from "../Loader/Loader.jsx";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  return (
    <div className="app-wrapper">
      <Header />
      <main className="content">
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default Layout;
