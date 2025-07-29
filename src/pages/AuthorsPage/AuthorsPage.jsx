import React from 'react';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectError, selectLoadingApp } from '../../redux/authors/selectors';
import AuthorsList from '../../components/AuthorsList/AuthorsList';
import { fetchAuthors } from '../../redux/authors/operations';
import Loader from '../../components/Loader/Loader';

const AuthorsPage = () => {
  const dispatch = useDispatch();
  const loadingApp = useSelector(selectLoadingApp);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchAuthors());
  }, [dispatch]);
  return (
    <>
      <h2>Authors</h2>
      {loadingApp && !error && <b>Request in progress...<Loader color='green' loader={loadingApp} /></b>}
      <AuthorsList
      />
      {/* <button>Load more</button> */}
    </>
  )
};

export default AuthorsPage;