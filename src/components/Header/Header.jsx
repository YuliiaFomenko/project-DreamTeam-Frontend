import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectLoggedIn, selectUser } from '../../redux/auth/selectors';
import { logOutThunk } from '../../redux/auth/operations';
import Navigation from '../Navigation/Navigation';
import Modal from '../Modal/Modal';
import LoginForm from '../LoginForm/LoginForm';
import AddArticleForm from '../AddArticleForm/AddArticleForm';
import s from './Header.module.css';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
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

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    closeMobileMenu();
  };

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
    closeMobileMenu();
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleArticleCreated = (articleData) => {
    console.log('Article created:', articleData);
    // Тут можна додати логіку для оновлення списку статей
    // або перенаправлення на сторінку нової статті
  };

  return (
    <>
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
                  <button 
                    className={s.createBtn}
                    onClick={openCreateModal}
                  >
                    Create an article
                  </button>
                  <div className={s.userMenu}>
                    <Link to="/profile" className={s.userAvatar} onClick={closeMobileMenu}>
                      {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </Link>
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
                  <button 
                    className={s.loginBtn}
                    onClick={openLoginModal}
                  >
                    Log In
                  </button>
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

      {/* Модальні вікна */}
      <Modal 
        isOpen={isLoginModalOpen} 
        onClose={closeLoginModal}
        closeOnOverlayClick={true}
        closeOnEscKey={true}
      >
        <LoginForm onClose={closeLoginModal} />
      </Modal>

      <Modal 
        isOpen={isCreateModalOpen} 
        onClose={closeCreateModal}
        closeOnOverlayClick={true}
        closeOnEscKey={true}
      >
        <AddArticleForm 
          onClose={closeCreateModal} 
          onSubmit={handleArticleCreated}
        />
      </Modal>
    </>
  );
};

export default Header;