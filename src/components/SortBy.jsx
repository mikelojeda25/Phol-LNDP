import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';

const SortBy = ({ items, onSortedItemsChange }) => {
  const [sortType, setSortType] = useState('title'); // 'title' or 'year'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
  const [isOpen, setIsOpen] = useState(false); // Whether the dropdown is open

  const handleSortToggle = (type) => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc'; // Toggle order
    setSortOrder(newSortOrder);
    setSortType(type);

    // Sort the items based on selected type and order
    let sortedItems = [...items];

    if (type === 'title') {
      sortedItems.sort((a, b) =>
        newSortOrder === 'asc'
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title)
      );
    } else if (type === 'year') {
      sortedItems.sort((a, b) => {
        const dateA = new Date(a['start-date']);
        const dateB = new Date(b['start-date']);

        return newSortOrder === 'asc'
          ? dateA - dateB // Ascending: Old-New
          : dateB - dateA; // Descending: New-Old
      });
    }

    onSortedItemsChange(sortedItems);
  };

  return (
    <div className="relative inline-block">
      {/* Main Sort Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='bg-blue-800 text-white rounded-full cursor-pointer p-2 w-full lg:w-[150px] flex px-4 justify-between items-center lg:text-black lg:bg-white'
      >
        <p className='text-[15px]'>Sort By</p>
        <span className='text-[8px]'><FaChevronUp/><FaChevronDown/></span>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute mt-1 bg-white border border-gray-200 rounded shadow-lg z-10 w-[180px]">
          <div
            className="p-2 cursor-pointer hover:bg-gray-100"
            onClick={() => handleSortToggle('title')}
          >
            {sortOrder === 'asc' ? 'Alphabetically: Z-A' : 'Alphabetically: A-Z'}
          </div>
          <div
            className="p-2 cursor-pointer hover:bg-gray-100"
            onClick={() => handleSortToggle('year')}
          >
            {sortOrder === 'asc' ? 'Date: Latest-Oldest' : 'Date: Oldest-Latest'}
          </div>
        </div>
      )}
    </div>
  );
};

export default SortBy;
