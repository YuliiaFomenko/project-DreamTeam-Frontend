import React from 'react';
import css from './Loader.module.css';

const Loader = ({ size = 'medium', color = 'green', className = '' }) => {
  return (
    <div className={`${css.loaderContainer} ${className}`}>
      <div className={`${css.loader} ${css[size]} ${css[color]}`}>
        <div className={css.spinner}></div>
        <div className={css.harmoniqText}>harmoniq</div>
      </div>
    </div>
  );
};

export default Loader;