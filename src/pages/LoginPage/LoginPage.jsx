import React from 'react'
import { LoginForm } from '../../components/LoginForm/LoginForm'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { selectIsLoggedIn } from '../../redux/auth/selectors'

const LoginPage = () => {
  // const isLoggedIn = useSelector(selectIsLoggedIn);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     navigate('/');
  //   }
  // }, [isLoggedIn, navigate]);

  return (
    <LoginForm></LoginForm>
  )
}

export default LoginPage