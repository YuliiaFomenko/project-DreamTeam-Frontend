import { useDispatch } from "react-redux";
import { logInThunk } from "../../redux/auth/operations";
import { Formik, Form, Field, ErrorMessage } from "formik"; 
import * as Yup from "yup";
import css from "./LoginForm.module.css";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const LoginForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    dispatch(logInThunk(values));
    resetForm();
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <h1>Login</h1>
        <div className={css.field}>
          <p className={css.description}>Enter your email address</p>
          <Field
            type="email"
            name="email"
            placeholder="email@gmail.com"
            className={css.input}
          />
          <ErrorMessage name="email" component="div" className={css.error} />
        </div>

        <div className={css.field}>
          <p className={css.description}>Enter a password</p>
          <Field
            type="password"
            name="password"
            placeholder="*********"
            className={css.input}
          />
          <ErrorMessage name="password" component="div" className={css.error} />
        </div>

        <button type="submit" className={css.button}>
          Login
        </button>
        <h3 className={css.descriptionRegister}>Don’t have an account? <span href="../RegisterForm/RegisterForm.jsx" className={css.spanRegister}>Register</span></h3>
      </Form>
    </Formik>
  );
};
