import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import css from './Creators.module.css';
import { fetchTopCreators } from '../../redux/creators/operations';
import {
  selectTopCreators,
  selectIsLoadingCreators,
  selectErrorCreators,
} from '../../redux/creators/selectors';

const Creators = () => {
  const dispatch = useDispatch();
  const creators = useSelector(selectTopCreators);
  const isLoading = useSelector(selectIsLoadingCreators);
  const error = useSelector(selectErrorCreators);

  useEffect(() => {
    dispatch(fetchTopCreators());
  }, [dispatch]);

  return (
    <section className={css.section} data-testid="creators-section">
      <div className="container">
        <div className={css.titleline}>
          <h2 className={css.title}>Top Creators</h2>
          <Link to="/authors" className={css.link} data-testid="creators-link">
            Go to all Creators
            <svg className={css.icon} width="25" height="25">
              <use href="/src/assets/img/sprite.svg#icon-arrows-right" />
            </svg>
          </Link>
        </div>

        {isLoading && <p className={css.loading}>Loading...</p>}
        {error && <p className={css.error}>Error: {error}</p>}

        <ul className={css.list}>
          {Array.isArray(creators?.data) && creators.data.length > 0 ? (
            creators.data.slice(0, 6).map((creator) => (
              <li key={creator._id || creator.id} className={css.card} data-testid="creator-card">
                <Link to={`/authors/${creator._id || creator.id}`}>
                  <img
                    className={css.img}
                    src={creator.avatarUrl}
                    alt={creator.name}
                  />
                  <span className={css.name}>{creator.name.split(' ')[0]}</span>
                </Link>
              </li>
            ))
          ) : (
            !isLoading && <p className={css.error}>No creators found.</p>
          )}
        </ul>
      </div>
    </section>
  );
};

export default Creators;
