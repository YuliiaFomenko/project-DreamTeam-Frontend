import React from 'react';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import css from './AuthorsPage.module.css';
import clsx from "clsx";
import { selectUserError, selectUserIsLoading, selectTopAuthorsPagination, selectTopAuthors } from '../../redux/user/selectors';
import AuthorsList from '../../components/AuthorsList/AuthorsList';
import { fetchTopAuthors } from '../../redux/user/operations';
import Loader from '../../components/Loader/Loader';
import LoadMoreBtn from '../../components/LoadMore/LoadMoreBtn';

const AuthorsPage = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  // const [allAuthors, setAuthors] = useState([]);
  const loading = useSelector(selectUserIsLoading);
  const error = useSelector(selectUserError);
  const pagination = useSelector(selectTopAuthorsPagination);
  const authors = useSelector(selectTopAuthors);

  const handleNextPage = () => {
      setPage(page + 1);
    };

  useEffect(() => {
    dispatch(fetchTopAuthors(page));
  }, [dispatch, page]);

  // setAuthors(prev => [...prev, ...authors]);


  // console.log(pagination);
  // console.log(authors)
  return (
    <section className={clsx("container", css.page)}>
      <h2 className={css.authors}>Authors</h2>
      {loading && <div className={css.loading}><h3>Please wait. Loading...</h3><Loader color='blue' loading={loading}/></div>}
      {error && <div className={css.loading}><h2>Sorry. Server is dead...</h2><Loader color='red' loading={loading}/></div>}
      <AuthorsList
        authors={ authors}
      />
      {(pagination.hasNextPage && !loading) &&
      <LoadMoreBtn
        nextPage={handleNextPage}
      />}
   
    </section>
  )
};

export default AuthorsPage;

// git switch main
// git pull
// git switch назва вашої гілки
// git merge main