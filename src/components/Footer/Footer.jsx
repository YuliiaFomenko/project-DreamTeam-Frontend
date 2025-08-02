import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import sprite from '../../assets/img/sprite.svg';
import css from './Footer.module.css';

import { selectUser, selectIsLoggedIn } from '../../redux/auth/selectors';

const Footer = () => {
  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <footer className={css.footer}>
      <div className="container">
        <div className={css.inner}>
          <Link to="/" className={css.logo}>
            <svg width="165" height="46" className={css.logo} stroke="var(--green)">
              <use href={`${sprite}#icon-logo`} />
            </svg>
          </Link>

          <p className={css.copyright}>
            © 2025 Harmoniq. All rights reserved.
          </p>

          <ul className={css.nav}>
            <li>
              <Link to="/articles">Articles</Link>
            </li>
            <li>
              {!isLoggedIn && <Link to="/login">Account</Link>}
              {isLoggedIn && user?.id && <Link to={`/authors/${user.id}`}>Account</Link>}
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
