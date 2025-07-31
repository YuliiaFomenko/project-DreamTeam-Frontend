import React from 'react'
import css from './AuthorsList.module.css';
// import { useSelector } from 'react-redux';
import AuthorsItem from '../AuthorsItem/AuthorsItem';
// import { selectAuthors } from '../../redux/authors/selectors';
//  selectLoading, selectError,
// import Loader from '../Loader/Loader';

const AuthorsList = () => {
    // const error = useSelector(selectError);
    // const loading = useSelector(selectLoading);
  // const authors = useSelector(selectAuthors);
  const authors = [{
  _id: "6881563901add19ee16fcff2",
  name: "Анастасія Олійник",
  avatarUrl: "https://ftp.goit.study/img/harmoniq/users/6881563901add19ee16fcff2.webp",
  articlesAmount: 2
},
{
  _id: "6881563901add19ee16fcff3"
  ,
  name: "Назар Ткаченко",
  avatarUrl: "https://ftp.goit.study/img/harmoniq/users/6881563901add19ee16fcff3.webp",
  articlesAmount: 9
},
{
  _id: "6881563901add19ee16fcff4"
  ,
  name: "Єва Бондаренко",
  avatarUrl: "https://ftp.goit.study/img/harmoniq/users/6881563901add19ee16fcff4.webp",
  articlesAmount: 6
},
{
  _id: "6881563901add19ee16fcff5"
  ,
  name: "Дмитро Романенко",
  avatarUrl: "https://ftp.goit.study/img/harmoniq/users/6881563901add19ee16fcff5.webp",
  articlesAmount: 14
},
{
  _id: "6881563901add19ee16fcff6"
  ,
  name: "Олександра Бондаренко",
  avatarUrl: "https://ftp.goit.study/img/harmoniq/users/6881563901add19ee16fcff6.webp",
  articlesAmount: 10
}];
    
  return(
    <div>
     {/* {loading && <div className={css.loading}><h3>Please wait. Loading...</h3><Loader color='blue' loading={loading}/></div>}
    {error && <div className={css.loading}><h2>Sorry. Server is dead...</h2><Loader color='red' loading={loading}/></div>} */}
    <ul className={css.list}>
        {authors.map((card) => {
          card.name = card.name.split(' ')[0];
        return (<li key={card._id} className={css.cardItem}>
          <AuthorsItem
            author={{ card }}
          />
        </li>);
      })}
    </ul>
    
  </div>)
};
export default AuthorsList;
