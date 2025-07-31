import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm';
import css from './LoginPage.module.css';

const LoginPage = () => {
  return (
    <div className={css.container}>
      <div className={css.loginWrapper}>
        <div className={css.header}>
          <Link to="/" className={css.backLink}>
            <svg width="20" height="20" viewBox="0 0 32 32">
              <use href="/src/assets/img/sprite.svg#icon-arrows-left"></use>
            </svg>
            Back to Home
          </Link>
          <h1 className={css.title}>Sign In to Harmoniq</h1>
          <p className={css.subtitle}>
            Welcome back! Please sign in to your account
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;