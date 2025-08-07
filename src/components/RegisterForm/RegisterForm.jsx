import { useState } from "react";
import { useDispatch } from "react-redux";
import { setPendingRegistration } from "../../redux/auth/slice";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./RegisterForm.module.css";
import { useNavigate } from "react-router-dom";
import sprite from "../../assets/img/sprite.svg";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Repeat your password")
    .min(8, "Password must be at least 8 characters long"),
  name: Yup.string().required("Name is required"),
});

export const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword((prev) => !prev);
  const toggleShowConfirmPassword = () =>
    setShowConfirmPassword((prev) => !prev);

  const handleSubmit = async (values, { resetForm }) => {
    const { email, password, name } = values;
    const registrationData = { email, password, name };
    dispatch(setPendingRegistration(registrationData));
    resetForm();
    navigate("/photo");
    console.log("Registration values:", JSON.stringify(values, null, 2));
  };

  return (
    <div className={css.formAuthWrapper}>
      <Formik
        initialValues={{
          email: "",
          password: "",
          confirmPassword: "",
          name: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={css.formAuth}>
          <h1>Register</h1>
          <p className={css.advertisementRegister}>
            Join our community of mindfulness and wellbeing!
          </p>
          <div className={css.fieldAuth}>
            <p className={css.nameAuth}>Enter your name</p>
            <Field
              type="text"
              name="name"
              placeholder="Max"
              className={css.inputAuth}
            />
            <ErrorMessage
              name="name"
              component="div"
              className={css.errorAuth}
            />
          </div>
          <div className={css.fieldAuth}>
            <p className={css.descriptionAuth}>Enter your email address</p>
            <Field
              type="email"
              name="email"
              placeholder="email@gmail.com"
              className={css.inputAuth}
            />
            <ErrorMessage
              name="email"
              component="div"
              className={css.errorAuth}
            />
          </div>

          <div className={css.fieldAuth}>
            <p className={css.descriptionAuth}>Create a strong password</p>
            <Field name="password" className={css.inputAuth}>
              {({ field }) => (
                <div className={css.passwordWrapper}>
                  <input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    placeholder="*********"
                    className={css.inputAuth}
                  />
                  <button
                    type="button"
                    className={css.eyeButton}
                    onClick={toggleShowPassword}
                    tabIndex={-1}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    <svg
                      width="30px"
                      height="30px"
                      stroke="black"
                      fill="none"
                      strokeWidth="1px"
                    >
                      <use
                        href={
                          showPassword
                            ? `${sprite}#icon-eye`
                            : `${sprite}#icon-eye-crossed`
                        }
                      />
                    </svg>
                  </button>
                </div>
              )}
            </Field>
            <ErrorMessage
              name="password"
              component="div"
              className={css.errorAuth}
            />
          </div>
          <div className={css.fieldAuth}>
            <p className={css.descriptionAuth}>Repeat your password</p>
            <Field name="confirmPassword" className={css.inputAuth}>
              {({ field }) => (
                <div className={css.passwordWrapper}>
                  <input
                    {...field}
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="*********"
                    className={css.inputAuth}
                  />
                  <button
                    type="button"
                    className={css.eyeButton}
                    onClick={toggleShowConfirmPassword}
                    tabIndex={-1}
                    aria-label={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                  >
                    <svg
                      width="30px"
                      height="30px"
                      stroke="black"
                      fill="none"
                      strokeWidth="1px"
                    >
                      <use
                        href={
                          showConfirmPassword
                            ? `${sprite}#icon-eye`
                            : `${sprite}#icon-eye-crossed`
                        }
                      />
                    </svg>
                  </button>
                </div>
              )}
            </Field>
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className={css.errorAuth}
            />
            <button type="submit" className={css.buttonAuth}>
              Create account
            </button>
            <div className={css.descriptionRegister}>
              <h3 className={css.descriptionRegister}>
                Already have an account?{" "}
                <Link to="/login" className={css.spanRegister}>
                  Log in
                </Link>
              </h3>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};
