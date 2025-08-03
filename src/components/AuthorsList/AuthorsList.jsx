import React from 'react'
import css from './AuthorsList.module.css';
import AuthorsItem from '../AuthorsItem/AuthorsItem';
import Loader from '../Loader/Loader';


const AuthorsList = ({ listAuthors }) => { 

  return(
   <>
      <ul className={css.list}>
        {listAuthors.map((card) => {
          return (<li key={card._id} className={css.cardItem}>
            <AuthorsItem
              author={{ card }}
                         />
          </li>);
        })}
    </ul>
  </> )
};

export default AuthorsList;
