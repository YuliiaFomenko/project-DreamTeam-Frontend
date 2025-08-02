import React from 'react'
import { RegisterForm } from '../../components/RegisterForm/RegisterForm'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { selectIsLoggedIn } from '../../redux/auth/selectors'

const LoginPage = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/'); // або на потрібну сторінку
    }
  }, [isLoggedIn, navigate]);

  return (
    <RegisterForm></RegisterForm>
  )
}

export default LoginPage