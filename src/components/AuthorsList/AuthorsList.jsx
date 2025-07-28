import React from 'react'

const AuthorsList = () => {
  return (
    <div>      {/* {loading && <div className={css.loading}><h3>Please wait. Loading...</h3><Loader color='blue' loading={loading}/></div>}
      {error && <div className={css.loading}><h2>Sorry. Server is dead...</h2><Loader color='red' loading={loading} /></div>}
       */}
      <ul className={css.list}>
        {contact.map((card) => {
          return (<li key={card.id} className={css.cardItem}>
            <div>
              <div className={css.text}> {card.avatar} </div>
              <p className={css.text}> {card.name} </p>
            </div>
          </li>);
          })}
      </ul>
    </div>
  )
}

export default AuthorsList;

// import css from './ContactList.module.css'
// import Contact from '../Contact/Contact';
// import { useSelector } from 'react-redux';
// import { selectLoading, selectError, selectFilteredContacts } from '../../redux/contacts/selectors';
// import Loader from '../Loader/Loader';

// const ContactList = () => {
//     const error = useSelector(selectError);
//     const loading = useSelector(selectLoading);
//     const contact = useSelector(selectFilteredContacts);
    
//     return <div>
//         {loading && <div className={css.loading}><h3>Please wait. Loading...</h3><Loader color='blue' loading={loading}/></div>}
//         {error && <div className={css.loading}><h2>Sorry. Server is dead...</h2><Loader color='red' loading={loading}/></div>}
//         <ul className={css.list}>
//             {contact.map((card) => {
//                 return (<li key={card.id} className={css.cardItem}>
//                     <Contact
//                         contact={card}
//                     />
//                 </li>);
//             })}
//         </ul>
//     </div>
// };

// export default ContactList;