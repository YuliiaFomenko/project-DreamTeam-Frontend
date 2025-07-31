import React from 'react';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import css from './RegisterPage.module.css';

const RegisterPage = () => {
  return (
    <div className={css.container}>
      <div className={css.registerWrapper}>
        <div className={css.header}>
          <h1 className={css.title}>Join Harmoniq</h1>
          <p className={css.subtitle}>
            Create your account and start sharing your wellness journey
          </p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;