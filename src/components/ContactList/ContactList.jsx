
import css from './ContactList.module.css'
import { useSelector } from 'react-redux';
import { useGetContactsApiQuery, useDeleteContactMutation } from 'redux/contactsSlice';


const ContactList = () => {
  const { data, isLoading } = useGetContactsApiQuery();
  const filter = useSelector(state => state.filter.value);

   const filteredContacts = () => {
    const normalizeFilter = filter.toLowerCase();
    return (
      data &&
      data.filter(contact =>
        contact.name.toLowerCase().includes(normalizeFilter)
      )
    );
  };

  const filterContacts = filteredContacts();
  

   const [deleteContact] = useDeleteContactMutation();

  const handleDeleteContact = async id => {
    await deleteContact(id).unwrap();
  };
  return (
    <>
      {isLoading && <p>Loading...</p>}
       {
        <ul>
          {!isLoading && data && filterContacts.length > 0 ? (
            filterContacts.map(({ id, name, number }) => (
          <li className={css.item} key={id} id={id}>
          {`${name}: ${number}`}
          <button className={css.button}
            type="submit"
        onClick={() => handleDeleteContact(id)}
          >
            Delete
          </button>
        </li>
            ))
          ) : (
            <p>No contacts</p>
          )}
        </ul>
      }
        </> 
      );
    }





export default ContactList