import React from "react";
import s from "./Contact.module.css";
import { FaUser, FaPhone } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contacts/operations";


const Contact = ({ name, number, id }) => {

  const dispatch = useDispatch()
  
  return (
    <div className={s.contact}>
      <li>
        <p>
          <FaUser />
          {name}
        </p>
        <p>
          <FaPhone />
          {number}
        </p>
      </li>
      <button type="button" onClick={() => dispatch(deleteContact(id))}>
        Delete
      </button>
    </div>
  );
};

export default Contact;
