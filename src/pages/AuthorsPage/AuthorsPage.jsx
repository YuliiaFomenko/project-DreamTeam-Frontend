import React from 'react';
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import css from './AuthorsPage.module.css';
import clsx from "clsx";
import { selectUserError, selectUserIsLoading, selectTopAuthorsPagination, selectTopAuthors } from '../../redux/user/selectors';
import AuthorsList from '../../components/AuthorsList/AuthorsList';
import { fetchTopAuthors } from '../../redux/user/operations';
import Loader from '../../components/Loader/Loader';
import LoadMore from '../../components/LoadMore/LoadMoreBtn';

const AuthorsPage = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [allAuthors, setAuthors] = useState([]);
  let loading = useSelector(selectUserIsLoading);
  const error = useSelector(selectUserError);
  const pagination = useSelector(selectTopAuthorsPagination);
  const authors = useSelector(selectTopAuthors);
  
  const handleNextPage = () => {
    // setAuthors(prev => [...prev, ...authors]);
    setPage(page + 1);
  };

  useEffect(() => {
    dispatch(fetchTopAuthors(page));
  }, [dispatch, page]);

  useEffect(() => {
    const incoming = authors;
    if (!incoming || incoming.length === 0) return;
    const allAuthorsIDs = new Set(allAuthors.map((item) => item._id));
    const isDuplicating = incoming.some((item) => allAuthorsIDs.has(item._id));
    if (!isDuplicating) {
      setAuthors((prev) => {
        return page === 1 ? incoming : [...prev, ...incoming];
      });
    }
  }, [authors, page, allAuthors]);

  // useEffect(() => {
  //   const incoming = authors;
  //   if (!incoming || incoming.length === 0) return;

  //   const hitsIDs = new Set(hits.map((item) => item._id));
  //   const isDuplicating = incoming.some((item) => hitsIDs.has(item._id));

  //   // If it's the first page OR all articles are new → replace/append
  //   if (!isDuplicating) {
  //     setHits((prev) => {
  //       return page === 1 ? incoming : [...prev, ...incoming];
  //     });
  //   }
  // }, [articles, popular, filter]);

  const listAuthors = useRef(null);
    useEffect(() => {
      if (listAuthors.current && allAuthors.length > 20) {
        listAuthors.current.lastElementChild.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    }, [allAuthors]);
  
  loading = false;

  return (
    <section className={clsx("container", css.page)} ref={listAuthors}>
      <h2 className={css.authors}>Authors</h2>
      {loading && <div className={css.loading}><h3>Please wait. Loading...</h3><Loader color='blue' loading={loading}/></div>}
      {error && <div className={css.loading}><h2>Sorry. Server is dead...</h2><Loader color='red' loading={loading} /></div>}
      
      <AuthorsList
        listAuthors={allAuthors}
      />
      {(pagination.hasNextPage && !loading) &&
      <LoadMore
        nextPage={handleNextPage}
      />}
   
    </section>
  )
};

export default AuthorsPage;
