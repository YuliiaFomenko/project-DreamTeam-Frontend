// import React from 'react';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import css from './AuthorsPage.module.css';

// , useSelector
// import { selectError, selectLoadingApp } from '../../redux/authors/selectors';
import AuthorsList from '../../components/AuthorsList/AuthorsList';
import { fetchAuthors } from '../../redux/authors/operations';
// import { css } from "@emotion/react";
// import Loader from '../../components/Loader/Loader';

const AuthorsPage = () => {
  const dispatch = useDispatch();
  // const loadingApp = useSelector(selectLoadingApp);
  // const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchAuthors());
  }, [dispatch]);
  return (
    <div className="container"l>
      <h2 className={css.authors}>Authors</h2>
      <AuthorsList
      />
      <button>Load more</button>
    </div>
  )
};

export default AuthorsPage;