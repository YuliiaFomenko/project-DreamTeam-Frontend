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
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Repeat your password"),
  name: Yup.string()
    .required("Name is required"),
  
});

export const RegisterForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    const { email, password } = values;
    dispatch(logInThunk({ email, password,name }));
    resetForm();
  };

  return (
    <Formik
      initialValues={{ email: "", password: "", confirmPassword: "", name: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.formAuth}>
        <h1>Register</h1>
        <p className={css.advertisementRegister}>Join our community of mindfulness and wellbeing!</p>
        <div className={css.fieldAuth}>
          <p className={css.nameAuth}>Enter your name</p>
          <Field
            type="text"
            name="name"
            placeholder="Max"
            className={css.inputAuth}
          />
          <ErrorMessage name="name" component="div" className={css.errorAuth} />
        </div>
        <div className={css.fieldAuth}>
          <p className={css.descriptionAuth}>Enter your email address</p>
          <Field
            type="email"
            name="email"
            placeholder="email@gmail.com"
            className={css.inputAuth}
          />
          <ErrorMessage name="email" component="div" className={css.errorAuth} />
        </div>

        <div className={css.fieldAuth}>
          <p className={css.descriptionAuth}>Create a strong password</p>
          <Field
            type="password"
            name="password"
            placeholder="*********"
            className={css.inputAuth}
          />
          <ErrorMessage name="password" component="div" className={css.error} />
          </div>
          <div className={css.fieldAuth}>
          <p className={css.descriptionAuth}>Repeat your password</p>
          <Field
            type="password"
            name="confirmPassword"
            placeholder="*********"
            className={css.inputAuth}
          />
          <ErrorMessage name="confirmPassword" component="div" className={css.errorAuth} />
        </div>

        <button type="submit" className={css.buttonAuth}>
          Login
        </button>
        <h3 className={css.descriptionRegister}>
          Already have an account?{" "}
          <Link to="/login" className={css.spanRegister}>
            Log in
          </Link>
        </h3>
      </Form>
    </Formik>
  );
};
