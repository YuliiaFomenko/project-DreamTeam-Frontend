import React from 'react'
import sprite from "../../assets/img/sprite.svg";
import { Link } from 'react-router-dom';
import css from './Footer.module.css';
// import logo from '../../assets/img/footer/logo-_1x_360.png';
// import logoFull from '../../assets/img/footer/logo-_2x_360.png';

const Footer = () => {
  return (
    <footer className={css.footer}>
      <div className='container'>
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
          <li><Link to="/articles">Articles</Link></li>
          <li><Link to="authors/:id">Account</Link></li>
        </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;