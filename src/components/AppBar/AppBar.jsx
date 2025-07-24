import React from 'react'
import Navigation from '../Navigation/Navigation'
import { useSelector } from 'react-redux'
import { selectLoggedIn } from '../../redux/auth/selectors'
import UserMenu from '../UserMenu/UserMenu'
import AuthNav from '../AuthNav/AuthNav'
import s from './AppBar.module.css'

const AppBar = () => {
  const isLoggedIn = useSelector(selectLoggedIn)
  return (
    <header className={s.header}> 
      <Navigation/>
      {isLoggedIn ? <UserMenu/> : <AuthNav/>}
    </header>
  )
}

export default AppBar