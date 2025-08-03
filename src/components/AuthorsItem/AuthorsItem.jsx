import React from 'react'
import { Link } from 'react-router-dom';
import css from './AuthorsItem.module.css';
// import { useDispatch } from 'react-redux';

const AuthorsItem = ({author}) => {
  // const dispatch = useDispatch();
  // const handleLink = () => dispatch();

    return (
    <div className={css.item}>
      <Link to={`/authors/${author.card._id}`}>
      <div>
        <img src={author.card.avatarUrl} alt={author.card.name} className={css.cardAutor} />
        <p className={css.name}> {author.card.name.split(' ')[0]} </p>
      </div>
      </Link>
     </div>
  )
}

export default AuthorsItem
