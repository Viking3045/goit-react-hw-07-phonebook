import { useState } from 'react';
import css from './Form.module.css';
import {
  useAddContactMutation,
  useGetContactsApiQuery,
} from 'redux/contactsSlice';

function Form() {
const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [addContact] = useAddContactMutation();
  const { data } = useGetContactsApiQuery();

  const handelInputChange = e => {
    const prop = e.currentTarget.name;
    switch (prop) {
      case 'name':
        setName(e.currentTarget.value);
        break;
      case 'number':
        setNumber(e.currentTarget.value);
        break;
      default:
        throw new Error('Error');
    }
  };

  const handelSubmit = async e => {
    e.preventDefault();
    if (
      data.find(contact => contact.name.toLowerCase() === name.toLowerCase())
    ) {
      setName('');
      setNumber('');
      return alert(`User with name ${name} is already in contacts`);
    }
    if (name && number) {
      await addContact({ name: name, number: number }).unwrap();
      setName('');
      setNumber('');
    }
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
