import { v4 as uuidv4 } from 'uuid';
import css from './ContactList.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'redux/contactsSlice'
import { getFilteredContacts } from 'redux/selectors'

const ContactList = () => {
    const dispatch = useDispatch();
  const contacts = useSelector(getFilteredContacts);
  const  deleteId = id => {
   dispatch(deleteContact(id));
  };
  const createList = () => {
    return contacts.map(contact => {
      return (
        <li className={css.item} key={uuidv4()} id={contact.id}>
          {`${contact.name}: ${contact.number}`}
          <button className={css.button}
            data-id={contact.id}
            onClick={() => deleteId(contact.id)}
          >
            Delete
          </button>
        </li>
      );
    });
  };


    return <ul className={css.list}>{createList()}</ul>;
}


export default ContactList