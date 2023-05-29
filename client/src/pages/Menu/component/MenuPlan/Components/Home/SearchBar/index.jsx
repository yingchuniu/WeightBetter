// import { SearchIcon } from '@material'
import React from 'react'
import './styles.css';



const SearchBar = ({ value, changeInput }) => (
  
    <div className='searchBar-wrap'>
      {/* <SearchIcon className='searchBar-icon' /> */}
      <input
        type="text"
        placeholder="search..."
        value={value}
        onChange={changeInput} />
    </div>
  
);

export default SearchBar