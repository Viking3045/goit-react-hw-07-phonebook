import { useState } from 'react';
import { addContact } from 'redux/contactsSlice'
import { getFilteredContacts } from 'redux/selectors'
import { useSelector, useDispatch } from 'react-redux';

import css from './Form.module.css'
const Form = () => {
    const dispatch = useDispatch();
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const contacts = useSelector(getFilteredContacts);
const handelInputChange = event => {
    const {name,  value } = event.target;
  switch (name) {
    case 'name':
      setName(value);
      break;
    case 'number':
      setNumber(value);
      break;
    default:
      return;
   }
  };

  const handelSubmit = event => {
      event.preventDefault();
  
      const isContactExist = contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      );
      if (isContactExist) {
        alert(`User with name ${name} is already in contacts`);
        return;
      }
  
      dispatch(addContact({ name, number }));
      setName('');
      setNumber('');
    };


    return (
      <form
        onSubmit={handelSubmit}
      >
          <label>
            Name
            <input
              value={name}
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              onChange={handelInputChange}
            />
          </label>
          <label> Number
            <input
              value={number}
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              onChange={handelInputChange}
            />
          </label>
          <button className={css.button} type="submit">Add contact</button>
        </form>

    );

}

export default Form;
