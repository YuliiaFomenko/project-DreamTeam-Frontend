import React from 'react'

import { Link } from 'react-router-dom';
import css from './Footer.module.css';
import logo from '../../assets/img/footer/logo-_1x_360.png';
import logoFull from '../../assets/img/footer/logo-_2x_360.png';

const Footer = () => {
  return (
    <footer className={css.footer}>
      <div className='container'>
        <div className={css.inner}>
        <Link to="/" className={css.logo}>
          <img
            src={logo}
            srcSet={`${logo} 1x, ${logoFull} 2x`}
            alt="Harmoniq Logo"
            className={css.logoImg}
            width="165"
            height="46"
          />
        </Link>

        <p className={css.copyright}>
          © 2025 Harmoniq. All rights reserved.
        </p>

        <ul className={css.nav}>
          <li><Link to="/articles">Articles</Link></li>
          <li><Link to="/account">Account</Link></li>
        </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;