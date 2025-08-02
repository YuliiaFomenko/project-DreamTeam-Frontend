import React, { useEffect } from 'react';
import { UploadPhoto } from '../../components/UploadPhoto/UploadPhoto';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectPendingRegistration } from '../../redux/auth/selectors';
import Loader from '../../components/Loader/Loader'; // ваш компонент Loader

const UploadPhotoPage = () => {
  const pendingRegistration = useSelector(selectPendingRegistration);
  const navigate = useNavigate();

  useEffect(() => {
    if (!pendingRegistration) {
      navigate('/register');
    }
  }, [pendingRegistration, navigate]);

  const handleClose = () => {
    navigate('/');
  };

  if (!pendingRegistration) {
    return <Loader />; 
  }

  return <UploadPhoto onClose={handleClose} />;
};

export default UploadPhotoPage;