import React from 'react'
import css from './AuthorsList.module.css'
import { useSelector } from 'react-redux';
import AuthorsItem from '../AuthorsItem/AuthorsItem';
import { selectLoading, selectError, selectAuthors } from '../../redux/authors/selectors';
import Loader from '../Loader/Loader';

const AuthorsList = () => {
    const error = useSelector(selectError);
    const loading = useSelector(selectLoading);
    const authors = useSelector(selectAuthors);
    
  return
  <div>
    {loading && <div className={css.loading}><h3>Please wait. Loading...</h3><Loader color='blue' loading={loading}/></div>}
    {error && <div className={css.loading}><h2>Sorry. Server is dead...</h2><Loader color='red' loading={loading}/></div>}
    <ul className={css.list}>
      {authors.map((card) => {
        return (<li key={card.id} className={css.cardItem}>
                    <AuthorsItem
                        author={card}
                    />
        </li>);
      })}
    </ul>
  </div>
};
export default AuthorsList;
