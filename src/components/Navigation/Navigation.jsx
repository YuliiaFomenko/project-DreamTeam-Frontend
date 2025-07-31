import React from 'react';
import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css';

const Navigation = ({ onLinkClick }) => {
  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/articles', label: 'Articles' },
    { to: '/authors', label: 'Creators' },
  ];

  return (
    <nav className={css.navigation}>
      {navLinks.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) => 
            `${css.navLink} ${isActive ? css.active : ''}`
          }
          onClick={onLinkClick}
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navigation;