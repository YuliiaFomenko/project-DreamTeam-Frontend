import { useState } from "react";
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
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword((prev) => !prev);

              

  const handleSubmit = (values, { resetForm }) => {
    dispatch(logInThunk(values));
    resetForm();
  };

  return (
    <div className={css.formAuthWrapper}>
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
          <Field name="password" className={css.inputAuth}>
            {({ field }) => (
              <div className={css.passwordWrapper}>
                <input
                  {...field}
                  type={showPassword ? "text" : "password"}
                  placeholder="*********"
                  className={css.inputAuth }
                />
                <button
                  type="button"
                  className={css.eyeButton}
                  onClick={toggleShowPassword}
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <svg width="26px" height="26px" stroke="black" fill="none" stroke-width="1px">
                    <use
                      href={
                        showPassword
                          ? "/src/assets/img/sprite.svg#icon-eye"
                          : "/src/assets/img/sprite.svg#icon-eye-crossed"
                      }
                    />
                  </svg>
                </button>
                {/* <svg width="15px" height="15px" stroke="black">
                  <use href="/src/assets/img/sprite.svg#icon-eye-crossed"></use>
                </svg>
                <svg width="15px" height="15px">
                  <use href="/src/assets/img/sprite.svg#icon-eye"></use>
                </svg> */}
              </div>
            )}
          </Field>
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
    </div>
  );
};
