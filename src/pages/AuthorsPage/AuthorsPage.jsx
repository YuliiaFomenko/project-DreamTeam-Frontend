import React from 'react';
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import css from './AuthorsPage.module.css';
import clsx from "clsx";
import { selectUserError, selectUserIsLoading, selectTopAuthorsPagination, selectTopAuthors } from '../../redux/user/selectors';
import AuthorsList from '../../components/AuthorsList/AuthorsList';
import { fetchTopAuthors } from '../../redux/user/operations';
import Loader from '../../components/Loader/Loader';
import LoadMoreBtn from '../../components/LoadMoreBtn/LoadMoreBtn';
import { BarLoader } from "react-spinners";

const AuthorsPage = () => {
    const override = {
    display: "block",
    margin: "40px auto",
  };
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [allAuthors, setAuthors] = useState([]);
  const isLoading = useSelector(selectUserIsLoading);
  const error = useSelector(selectUserError);
  const pagination = useSelector(selectTopAuthorsPagination);
  const authors = useSelector(selectTopAuthors);
  
  const handleLoadMore = () => {
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

  const listAuthors = useRef(null);
      useEffect(() => {
      if (listAuthors.current && allAuthors.length > 20) {
        listAuthors.current.lastElementChild.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    }, [allAuthors]);

  return (
    <section className={clsx("container", css.page)} ref={listAuthors}>
      <h2 className={css.authors}>Authors</h2>

      {error && isLoading ?
        (<div className={css.loading}><Loader /></div>) :
        (<AuthorsList listAuthors={allAuthors} />
        )}
   
      {pagination.hasNextPage && (isLoading ? (
        <BarLoader cssOverride={override} color={"#374f42"} />
      ) : (
        <LoadMoreBtn handleLoadMore={handleLoadMore} />
      ))}
    </section>
  )
};
export default AuthorsPage;
