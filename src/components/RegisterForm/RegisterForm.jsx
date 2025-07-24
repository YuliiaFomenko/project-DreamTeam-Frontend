import React from 'react'
import { useDispatch } from 'react-redux';
import { registerThunk } from '../../redux/auth/operations';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import s from './RegisterForm.module.css'
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string().min(2, "Імʼя має містити щонайменше 2 символи").required("Імʼя обовʼязкове"),
  email: Yup.string().email("Невірний формат email").required("Email обовʼязковий"),
  password: Yup.string().min(6, "Пароль має містити щонайменше 6 символів").required("Пароль обовʼязковий"),
});

const RegisterForm = () => {
  const dispatch = useDispatch();

  const initialValues = {
    name: '',
    email: "",
    password: "",
  };

  const handleSubmit = (values) => {
    dispatch(registerThunk(values));
    console.log(values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
      <Form className={s.form}>
        <fieldset className={s.fieldset}>
          <label>Name</label>
          <Field name="name" type="name"/>
          <ErrorMessage name="name" component="div" className={s.errorMessage} />
          <label>Email</label>
          <Field name="email" type="email"/>
          <ErrorMessage name="email" component="div" className={s.errorMessage} />
          <label>Password</label>
          <Field name="password" type="password" />
          <ErrorMessage name="password" component="div" className={s.errorMessage} />

          <button type="submit">Register</button>
        </fieldset>
      </Form>
    </Formik>
  );
}

export default RegisterForm