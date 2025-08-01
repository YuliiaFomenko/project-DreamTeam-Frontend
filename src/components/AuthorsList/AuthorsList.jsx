import React from 'react'
import css from './AuthorsList.module.css';
// import { useSelector } from 'react-redux';
import AuthorsItem from '../AuthorsItem/AuthorsItem';
// import { selectUserIsLoading, selectUserError, selectTopAuthorsPagination} from '../../redux/user/selectors';
//  selectTopAuthors,
// import Loader from '../Loader/Loader';

const AuthorsList = () => {
  // const error = useSelector(selectUserError);
  // const loading = useSelector(selectUserIsLoading);

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
    },
  {
  _id: "6881563901add19ee16fcff7"
  ,
  name: "Олександр Шевчук",
  avatarUrl: "https://ftp.goit.study/img/harmoniq/users/6881563901add19ee16fcff7.webp",
  articlesAmount: 11
},
{
  _id: "6881563901add19ee16fcff8"
  ,
  name: "Софія Мельник",
  avatarUrl: "https://ftp.goit.study/img/harmoniq/users/6881563901add19ee16fcff8.webp",
  articlesAmount: 5
},
{
  _id: "6881563901add19ee16fcff9"
  ,
  name: "Владислав Поліщук",
  avatarUrl: "https://ftp.goit.study/img/harmoniq/users/6881563901add19ee16fcff9.webp",
  articlesAmount: 6
},
{
  _id: "6881563901add19ee16fcffa"
  ,
  name: "Іван Ковальчук",
  avatarUrl: "https://ftp.goit.study/img/harmoniq/users/6881563901add19ee16fcffa.webp",
  articlesAmount: 8
},
{
  _id: "6881563901add19ee16fcffb"
  ,
  name: "Дарина Ковальчук",
  avatarUrl: "https://ftp.goit.study/img/harmoniq/users/6881563901add19ee16fcffb.webp",
  articlesAmount: 13
},
{
  _id: "6881563901add19ee16fcffc"
  ,
  name: "Поліна Романенко",
  avatarUrl: "https://ftp.goit.study/img/harmoniq/users/6881563901add19ee16fcffc.webp",
  articlesAmount: 9
},
{
  _id:  "6881563901add19ee16fcffd"
  ,
  name: "Софія Ковальчук",
  avatarUrl: "https://ftp.goit.study/img/harmoniq/users/6881563901add19ee16fcffd.webp",
  articlesAmount: 2
}];
    
  return(
    <>
     {/* {loading && <div className={css.loading}><h3>Please wait. Loading...</h3><Loader color='blue' loading={loading}/></div>}
    {error && <div className={css.loading}><h2>Sorry. Server is dead...</h2><Loader color='red' loading={loading}/></div>} */}
    <div>
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
    </div>
  </>)
};
export default AuthorsList;
