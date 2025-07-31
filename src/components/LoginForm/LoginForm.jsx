import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logInThunk } from '../../redux/auth/operations';
import css from './LoginForm.module.css';

const LoginForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      await dispatch(logInThunk(formData)).unwrap();
      if (onClose) onClose();
    } catch (error) {
      setErrors({ submit: 'Invalid email or password' });
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={css.formContainer}>
      <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.header}>
          <h2 className={css.title}>Welcome Back</h2>
          <p className={css.subtitle}>Sign in to your Harmoniq account</p>
        </div>

        {errors.submit && (
          <div className={css.errorMessage}>
            {errors.submit}
          </div>
        )}

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
            className={`${css.input} ${errors.email ? css.inputError : ''}`}
            placeholder="Enter your email"
            disabled={isLoading}
          />
          {errors.email && (
            <span className={css.fieldError}>{errors.email}</span>
          )}
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
              className={`${css.input} ${errors.password ? css.inputError : ''}`}
              placeholder="Enter your password"
              disabled={isLoading}
            />
            <button
              type="button"
              className={css.passwordToggle}
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              disabled={isLoading}
            >
              <svg width="20" height="20" viewBox="0 0 32 32">
                <use href={`/src/assets/img/sprite.svg#icon-${showPassword ? 'eye-crossed' : 'eye'}`}></use>
              </svg>
            </button>
          </div>
          {errors.password && (
            <span className={css.fieldError}>{errors.password}</span>
          )}
        </div>

        <div className={css.formActions}>
          <button
            type="submit"
            className={css.submitBtn}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className={css.spinner}></div>
            ) : (
              'Sign In'
            )}
          </button>
        </div>

        <div className={css.registerLink}>
          Don't have an account?{' '}
          <Link to="/register" className={css.link} onClick={onClose}>
            Create account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;