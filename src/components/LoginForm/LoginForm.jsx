import { useDispatch } from "react-redux";
import { logInThunk } from "../../redux/auth/operations";
import { Formik, Form, Field, ErrorMessage } from "formik"; 
import * as Yup from "yup";
import css from "./LoginForm.module.css";
import { Link } from "react-router-dom";

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
      <Form className={css.formAuth }>
        <h1>Login</h1>
        <div className={css.fieldAuth }>
          <p className={css.descriptionAuth }>Enter your email address</p>
          <Field
            type="email"
            name="email"
            placeholder="email@gmail.com"
            className={css.inputAuth }
          />
          <ErrorMessage name="email" component="div" className={css.errorAuth } />
        </div>

        <div className={css.fieldAuth }>
          <p className={css.descriptionAuth }>Enter a password</p>
          <Field
            type="password"
            name="password"
            placeholder="*********"
            className={css.inputAuth }
          />
          <ErrorMessage name="password" component="div" className={css.errorAuth } />
        </div>

        <button type="submit" className={css.buttonAuth }>
          Login
        </button>
        <h3 className={css.descriptionRegister}>
          Don’t have an account?{" "}
          <Link to="/register" className={css.spanRegister}>
            Register
          </Link>
        </h3>
      </Form>
    </Formik>
  );
};
