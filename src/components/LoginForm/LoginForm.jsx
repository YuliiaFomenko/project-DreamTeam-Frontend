import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react'
import { useDispatch } from 'react-redux'
import { logInThunk } from '../../redux/auth/operations';
import s from './LoginForm.module.css'
import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string().email("Невірний формат email").required("Email обовʼязковий"),
  password: Yup.string().min(6, "Пароль має містити щонайменше 6 символів").required("Пароль обовʼязковий"),
});

const LoginForm = () => {
  const dispatch = useDispatch();
  
  const initialValues = {
    email: '',
    password: '',
  }

  const handleSubmit = (values) => {
    dispatch(logInThunk(values));
    console.log(values);
  }

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
      <Form className={s.form}>
        <fieldset className={s.fieldset}>
          <label>Email</label>
          <Field name="email" type="email"  />
          <ErrorMessage name="email" component="div" className={s.errorMessage} />
          <label>Password</label>
          <Field name="password" type="password"/>
          <ErrorMessage name="password" component="div" className={s.errorMessage} />
          <button type="submit">Log In</button>
        </fieldset>
      </Form>
    </Formik>
  );
}

export default LoginForm