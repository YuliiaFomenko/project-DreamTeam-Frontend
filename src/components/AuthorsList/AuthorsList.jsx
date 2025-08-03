import React from 'react'
import css from './AuthorsList.module.css';
// import { useState } from "react";
// import { useSelector } from 'react-redux';
import AuthorsItem from '../AuthorsItem/AuthorsItem';
// import { selectUserIsLoading, selectUserError, selectTopAuthorsPagination} from '../../redux/user/selectors';
//  selectTopAuthors,
// import Loader from '../Loader/Loader';

const AuthorsList = ({ authors }) => {
  
  // const [allAuthors, setAuthors] = useState([]);
  // setAuthors(prev => [...prev, ...authors]);
  
  console.log(authors);
  // const error = useSelector(selectUserError);
  // const loading = useSelector(selectUserIsLoading);

  return(
    <>
     {/* {loading && <div className={css.loading}><h3>Please wait. Loading...</h3><Loader color='blue' loading={loading}/></div>}
    {error && <div className={css.loading}><h2>Sorry. Server is dead...</h2><Loader color='red' loading={loading}/></div>} */}
    <div>
      <ul className={css.list}>
          {authors.map((card) => {
          return (<li key={card._id} className={css.cardItem}>
          <AuthorsItem
            author={{ card }}
          />
          </li>);
      })}
    </ul>
    </div>
  </>)
};
export default AuthorsList;
