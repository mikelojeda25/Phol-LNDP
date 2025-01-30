import React, { useState } from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    onSearch(query); // Call the onSearch function directly
  };

  return (
    <>
      <div className="flex px-5 bg-white rounded-full items-center justify-evenly h-10">
        <input
          type="text"
          value={searchQuery}
          onChange={handleChange}
          placeholder="Search..."
          aria-label="Search"
          className="focus:outline-none focus:ring-0 w-[300px] md:w-[500px] lg:w-[800px] xl:w-[1000px]"
        />

        <FaMagnifyingGlass className='relative right-0'/>
      </div>
    </>
  );
};

export default SearchBar;
