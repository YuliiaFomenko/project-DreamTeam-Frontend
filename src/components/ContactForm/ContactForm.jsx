import * as Yup from "yup";
import React, { useId } from "react";
import { ErrorMessage, Form, Field, Formik } from "formik";
import s from "./ContactForm.module.css";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contacts/operations";


const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Must be at least 3 characters!")
    .max(50, "Must be 50 characters or less!")
    .required("Required"),
  number: Yup.string()
    .min(3, "Must be at least 3 characters!")
    .max(50, "Must be 50 characters or less!")
    .required("Required"),
});

const ContactForm = () => {

  
  const dispatch = useDispatch()

  const nameFieldId = useId();
  const numberFieldId = useId();

  return (
    <Formik
      initialValues={{ name: "", number: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        dispatch(addContact(values));
        resetForm();
      }}
    >
      <Form className={s.form}>
        <div className={s.formGroup}>
          <label htmlFor={nameFieldId}>Name</label>
          <Field
            className={s.input}
            name="name"
            type="text"
            id={nameFieldId}
          ></Field>
          <ErrorMessage
            name="name"
            component="div"
            className={s.errorMessage}
          ></ErrorMessage>
        </div>
        <div className={s.formGroup}>
          <label htmlFor={numberFieldId}>Number</label>
          <Field
            className={s.input}
            name="number"
            type="text"
            id={numberFieldId}
          ></Field>
          <ErrorMessage
            name="number"
            component="div"
            className={s.errorMessage}
          ></ErrorMessage>
        </div>
        <button className={s.button} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
