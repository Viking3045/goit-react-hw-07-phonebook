import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterContact } from 'redux/filterSlice';
const Filter = () => {

        const dispatch = useDispatch();
  const filter = useSelector(state => state.filter.value);

  const updateFilter = e => {
    dispatch(filterContact(e.currentTarget.value));
  }
  
    return (
       <div>
        <h2>Find contacts by name</h2>
        <input onChange={updateFilter}
           value={filter}/>
        
    </div>
    )
}

export default Filter 
