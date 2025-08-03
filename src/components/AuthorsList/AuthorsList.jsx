import React from 'react'
import css from './AuthorsList.module.css';
import AuthorsItem from '../AuthorsItem/AuthorsItem';
import Loader from '../Loader/Loader';


const AuthorsList = ({ authors }) => { 
  // console.log(authors);
  // console.log(allAuthors);
 
  // handlePage();
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
          }) 
          // : authors.map((card) => {
          //   return (<li key={card._id} className={css.cardItem}>
          //     <AuthorsItem
          //       author={{ card }}
          //     />
          //   </li>);
            // })
          }

          {/* {authors.map((card) => {
          return (<li key={card._id} className={css.cardItem}>
          <AuthorsItem
            author={{ card }}
          />
          </li>);
      }) } */}
    </ul>
    </div>
  </>)
};
export default AuthorsList;
