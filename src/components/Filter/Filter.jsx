import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setFilter } from 'redux/filterSlice'
import { getFilter } from 'redux/selectors';
const Filter = () => {

        const onSetFilter = payload => {
        dispatch(setFilter(payload));
      };
    
      const updateFilter = event => {
        onSetFilter(event.target.value);
      };
    
      const dispatch = useDispatch();
    
      const filter = useSelector(getFilter);
  
    return (
       <div>
        <h2>Find contacts by name</h2>
        <input onChange={updateFilter}
           value={filter}/>
        
    </div>
    )
}

export default Filter 
