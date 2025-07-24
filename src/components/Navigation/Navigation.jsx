import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { selectLoggedIn } from '../../redux/auth/selectors'
import clsx from 'clsx'
import s from './Navigation.module.css'

const Navigation = () => {
  const isLoggedIn = useSelector(selectLoggedIn)

  const setActiveClass = ({ isActive}) => {
    return clsx(s.link, isActive && s.active)
  }
  return (
    <nav>
      <NavLink className={setActiveClass} to='/'>Home</NavLink>
      {isLoggedIn && (
        <NavLink className={setActiveClass} to='/contacts'>Contacts</NavLink>
      )}
    </nav>
  )
}

export default Navigation