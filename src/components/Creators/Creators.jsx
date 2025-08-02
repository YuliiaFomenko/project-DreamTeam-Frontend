import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import css from './Creators.module.css';
import sprite from '../../assets/img/sprite.svg';

import { fetchTopAuthors } from '../../redux/user/operations';
import {
  selectTopAuthors,
  selectUserIsLoading,

} from '../../redux/user/selectors';


const Creators = () => {
  const dispatch = useDispatch();
  const creators = useSelector(selectTopAuthors);
  const isLoading = useSelector(selectUserIsLoading);


  useEffect(() => {
    if (!creators || creators.length === 0) {
      dispatch(fetchTopAuthors(1));
    }
  }, [dispatch, creators]);

  return (
    <section className={css.section} data-testid="creators-section">
      <div className="container">
        <div className={css.titleline}>
          <h2 className={css.title}>Top Creators</h2>
          <Link to="/authors" className={css.link} data-testid="creators-link">
            Go to all Creators
            <svg className={css.icon} width="25" height="25">
              <use href={`${sprite}#icon-arrows-right`} />
            </svg>
          </Link>
        </div>



        <ul className={css.list}>
          {Array.isArray(creators) && creators.length > 0 ? (
            creators.slice(0, 6).map((creator) => {
              const creatorId = creator._id || creator.id;


              return (
                <li key={creatorId} className={css.card} data-testid="creator-card">
                  <Link to={`/authors/${creatorId}`}>
                    <img
                      className={css.img}
                      src={creator.avatarUrl}
                      alt={creator.name}
                    />
                    <span className={css.name}>

                      {creator.name}
                    </span>
                  </Link>
                </li>
              );
            })
          ) : (
            !isLoading && <p className={css.error}>No creators found.</p>
          )}
        </ul>
      </div>
    </section>
  );
};

export default Creators;


