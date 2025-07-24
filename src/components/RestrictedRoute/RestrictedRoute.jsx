import React from 'react'
import { useSelector } from 'react-redux'
import { selectLoggedIn } from '../../redux/auth/selectors'
import { Navigate } from 'react-router-dom'

const RestrictedRoute = ({component, redirectTo = '/'}) => {
  const isLoggedIn = useSelector(selectLoggedIn)

  if (isLoggedIn) {
    return <Navigate to={redirectTo} />
  }
  return component
}

export default RestrictedRoute