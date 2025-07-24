import clsx from 'clsx'
import React from 'react'
import { NavLink } from 'react-router-dom'
import s from './AuthNav.module.css'

const AuthNav = () => {

  const setActiveClass = ({isActive}) => {
    return clsx (s.link, isActive && s.active)
  }
  return (
    <div>
      <NavLink className={setActiveClass} to="/login">
        Log In
      </NavLink>
      <NavLink className={setActiveClass} to="/register">
        Register
      </NavLink>
    </div>
  );
}

export default AuthNav