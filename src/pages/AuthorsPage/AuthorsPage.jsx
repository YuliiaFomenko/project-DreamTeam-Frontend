import React from 'react';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import css from './AuthorsPage.module.css';
import clsx from "clsx";
import { selectUserError, selectUserIsLoading } from '../../redux/user/selectors';
import AuthorsList from '../../components/AuthorsList/AuthorsList';
import { fetchTopAuthors } from '../../redux/user/operations';
import Loader from '../../components/Loader/Loader';
import LoadMoreBtn from '../../components/LoadMoreBtn/LoadMoreBtn';

const AuthorsPage = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectUserIsLoading);
  const error = useSelector(selectUserError);
  // const pagination = useSelector(selectTopAuthorsPagination);
  // const authors = useSelector(selectTopAuthors);

  useEffect(() => {
    dispatch(fetchTopAuthors());
  }, [dispatch]);
  return (
    <section className={clsx("container", css.page)}>
      <h2 className={css.authors}>Authors</h2>
      {loading && <div className={css.loading}><h3>Please wait. Loading...</h3><Loader color='blue' loading={loading}/></div>}
      {error && <div className={css.loading}><h2>Sorry. Server is dead...</h2><Loader color='red' loading={loading}/></div>}
      <AuthorsList
      />
      {/* {(result.length > 0 && !loading && page < pageMax) && */}
        <LoadMoreBtn
        //  nextPage={handleNextPage}
      />
        {/* } */}
    </section>
  )
};

export default AuthorsPage;