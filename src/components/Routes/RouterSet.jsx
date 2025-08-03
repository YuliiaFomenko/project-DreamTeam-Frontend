import React, { lazy, Suspense } from "react";
import Loader from "../Loader/Loader.jsx";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute.jsx";
import RestrictedRoute from "./RestrictedRoute.jsx";
import Layout from "../Layout/Layout.jsx";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage.jsx";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage.jsx"));
const LoginPage = lazy(() => import("../../pages/LoginPage/LoginPage.jsx"));
const RegisterPage = lazy(() =>
  import("../../pages/RegisterPage/RegisterPage.jsx")
);
const UploadPhoto = lazy(() =>
  import("../../pages/UploadPhoto/UploadPhotoPage.jsx")
);
const ArticlesPage = lazy(() =>
  import("../../pages/ArticlesPage/ArticlesPage.jsx")
);
const ArticlePage = lazy(() =>
  import("../../pages/ArticlePage/ArticlePage.jsx")
);
const AuthorsPage = lazy(() =>
  import("../../pages/AuthorsPage/AuthorsPage.jsx")
);
const AuthorsProfilePage = lazy(() =>
  import("../../pages/AuthorProfilePage/AuthorProfilePage.jsx")
);
const CreateArticlePage = lazy(() =>
  import("../../pages/CreateArticlePage/CreateArticlePage.jsx")
);

const RouterSet = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route
            path="create"
            element={
              <PrivateRoute>
                <CreateArticlePage />
              </PrivateRoute>
            }
          />
          <Route
            path="create/:articleId"
            element={
              <PrivateRoute>
                <CreateArticlePage />
              </PrivateRoute>
            }
          />
          <Route path="register" element={<RestrictedRoute component={<RegisterPage />} redirectTo="/" />} />
          <Route path="login" element={<RestrictedRoute component={<LoginPage />} redirectTo="/" />} />
          <Route path="photo" element={<RestrictedRoute component={<UploadPhoto />} redirectTo="/login" />} />
          <Route path="articles" element={<ArticlesPage />} />
          <Route path="articles/:id" element={<ArticlePage />} />
          <Route path="authors" element={<AuthorsPage />} />
          <Route path="authors/:id" element={<AuthorsProfilePage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default RouterSet;
