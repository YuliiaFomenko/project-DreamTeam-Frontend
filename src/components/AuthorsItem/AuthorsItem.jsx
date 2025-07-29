import React from 'react'
import css from './AuthorsItem.module.css';
import { useDispatch } from 'react-redux';
import { authorItem } from '../../redux/authors/operations';

const AuthorsItem = () => {
  const dispatch = useDispatch();
  const handleLink = () => dispatch(authorItem(author.id));
  return (
    <div className={css.item}>
      <div>
         <p className={css.avatar}>  {contact.avatar} </p>
         <p className={css.name}>  {contact.name} </p>
       </div>
     </div>
  )
}

export default AuthorsItem
