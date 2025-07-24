import React from "react";
import Contact from "../Contact/Contact";
import s from "./ContactList.module.css";
import { useSelector } from "react-redux";
import { selectError, selectLoading } from "../../redux/contacts/selectors";
import { selectFilteredContacts } from "../../redux/filters/selectors";

const ContactList = () => {
  const filteredContacts = useSelector(selectFilteredContacts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  if (filteredContacts.length === 0) {
    return <p>No contacts found</p>;
  }

  return (
    <div>
      {loading && <span>Loading...</span>}
      {error && <h2>Server is dead...</h2>}
      <ul className={s.contactList}>
        {filteredContacts.map((contact) => (
          <Contact key={contact.id} id={contact.id} name={contact.name} number={contact.number} />
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
