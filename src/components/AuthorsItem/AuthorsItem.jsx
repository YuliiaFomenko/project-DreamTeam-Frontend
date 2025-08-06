import React from 'react'
import { Link } from 'react-router-dom';
import css from './AuthorsItem.module.css';

const AuthorsItem = ({ author }) => {

    return (
    <div className={css.item}>
      <Link to={`/authors/${author.card._id}`}>
      <div className={css.cardAuthor} >
        <img src={author.card.avatarUrl} alt={author.card.name} className={css.avatarAuthor} />
        <p className={css.name}> {author.card.name.split(' ')[0]} </p>
      </div>
      </Link>
     </div>
  )
}

export default AuthorsItem
