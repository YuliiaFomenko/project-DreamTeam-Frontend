import React, { useEffect } from 'react';
import { RegisterForm } from '../../components/RegisterForm/RegisterForm';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

const RegisterPage = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/photo');
    }
  }, [isLoggedIn, navigate]);

  return <RegisterForm />;
};

export default RegisterPage;
