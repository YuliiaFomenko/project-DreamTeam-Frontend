import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { registerThunk } from '../../redux/auth/operations';
import css from './RegisterForm.module.css';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await dispatch(registerThunk(formData)).unwrap();
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.inputGroup}>
        <label htmlFor="name" className={css.label}>
          Full Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={css.input}
          placeholder="Enter your full name"
          required
        />
      </div>

      <div className={css.inputGroup}>
        <label htmlFor="email" className={css.label}>
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={css.input}
          placeholder="Enter your email"
          required
        />
      </div>

      <div className={css.inputGroup}>
        <label htmlFor="password" className={css.label}>
          Password
        </label>
        <div className={css.passwordWrapper}>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={css.input}
            placeholder="Create a password"
            required
          />
          <button
            type="button"
            className={css.passwordToggle}
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            <svg width="20" height="20" viewBox="0 0 32 32">
              <use href={`/src/assets/img/sprite.svg#icon-${showPassword ? 'eye-crossed' : 'eye'}`}></use>
            </svg>
          </button>
        </div>
      </div>

      <button
        type="submit"
        className={css.submitBtn}
        disabled={isLoading}
      >
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </button>

      <div className={css.loginLink}>
        Already have an account?{' '}
        <Link to="/login" className={css.link}>
          Sign in
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;