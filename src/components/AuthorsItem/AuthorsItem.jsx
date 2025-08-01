import React from 'react'
import css from './AuthorsItem.module.css';
import { useDispatch } from 'react-redux';

const AuthorsItem = ({author}) => {
  const dispatch = useDispatch();
  const handleLink = () => dispatch();
  const name = author.card.name;
  console.log(name);
  return (
    <div className={css.item} onClick={handleLink}>
      <div>
        <img src={author.card.avatarUrl} alt={author.card.name} className={css.cardAutor} onClick={() => {}} />
        <p className={css.name}> {name} </p>
       </div>
     </div>
  )
}

export default AuthorsItem
