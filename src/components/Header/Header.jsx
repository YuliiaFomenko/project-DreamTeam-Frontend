import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectLoggedIn, selectUser } from '../../redux/auth/selectors';
import { logOutThunk } from '../../redux/auth/operations';
import Navigation from '../Navigation/Navigation';
import s from './Header.module.css';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectLoggedIn);
  const user = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(logOutThunk());
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={s.header}>
      <div className={s.container}>
        <Link to="/" className={s.logo} onClick={closeMobileMenu}>
          harmoniq
        </Link>

        <button
          className={s.mobileMenuBtn}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <svg width="24" height="24" viewBox="0 0 32 32">
            <use href="/src/assets/img/sprite.svg#icon-burger-regular"></use>
          </svg>
        </button>

        <nav className={`${s.nav} ${isMobileMenuOpen ? s.navOpen : ''}`}>
          <Navigation onLinkClick={closeMobileMenu} />
          
          <div className={s.authSection}>
            {isLoggedIn ? (
              <>
                <Link 
                  to="/create" 
                  className={s.createBtn}
                  onClick={closeMobileMenu}
                >
                  Create an article
                </Link>
                <div className={s.userMenu}>
                  <div className={s.userAvatar}>
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <button 
                    className={s.logoutBtn} 
                    onClick={handleLogout}
                    aria-label="Logout"
                  >
                    <svg width="20" height="20" viewBox="0 0 32 32">
                      <use href="/src/assets/img/sprite.svg#icon-log-out"></use>
                    </svg>
                  </button>
                </div>
              </>
            ) : (
              <div className={s.authButtons}>
                <Link 
                  to="/login" 
                  className={s.loginBtn}
                  onClick={closeMobileMenu}
                >
                  Log In
                </Link>
                <Link 
                  to="/register" 
                  className={s.registerBtn}
                  onClick={closeMobileMenu}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </nav>

        {isMobileMenuOpen && (
          <div 
            className={s.overlay} 
            onClick={closeMobileMenu}
            aria-hidden="true"
          />
        )}
      </div>
    </header>
  );
};

export default Header;