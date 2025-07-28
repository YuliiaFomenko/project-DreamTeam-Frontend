import { useDispatch } from "react-redux";
import { logInThunk } from "../../redux/auth/operations";
import { Formik, Form, Field, ErrorMessage } from "formik"; 
import * as Yup from "yup";
import css from "./RegisterForm.module.css";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  name: Yup.string()
    .required("Name is required"),
  
});

export const RegisterForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    dispatch(logInThunk(values));
    resetForm();
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" , name:""}}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <h1>Register</h1>
        <p className={css.advertisementRegister}>Join our community of mindfulness and wellbeing!</p>
        <div className={css.field}>
          <p className={css.description}>Enter your name</p>
          <Field
            type="text"
            name="name"
            placeholder="Max"
            className={css.input}
          />
          <ErrorMessage name="name" component="div" className={css.error} />
        </div>
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
          <p className={css.description}>Create a strong password</p>
          <Field
            type="password"
            name="password"
            placeholder="*********"
            className={css.input}
          />
          <ErrorMessage name="password" component="div" className={css.error} />
          </div>
          <div className={css.field}>
          <p className={css.description}>Repeat your password</p>
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
        <h3 className={css.descriptionRegister}>Already have an account? <span className={css.spanRegister}>Log in</span></h3>
      </Form>
    </Formik>
  );
};
