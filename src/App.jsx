import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import skills from './skills.json'; // Original dataset
import SkillList from './components/SkillList';
import SearchBar from './components/SearchBar';
import Filter from './components/Filter';
import SortBy from './components/SortBy';
import Hero from './components/Hero';
import Bookmark from './components/Bookmark';
import { FaFilter } from 'react-icons/fa6';

const App = () => {
  const [filteredItems, setFilteredItems] = useState(skills); // Keep full list for filtering
  const [currentItem, setCurrentItem] = useState(null); // Manage current item for LearnMore
  const [modalOpen, setModalOpen] = useState(false); // Modal open state
  const [filterVisible, setFilterVisible] = useState(false); // State to control filter visibility

  // Function to handle search/filter
  const handleSearch = useCallback((searchQuery) => {
    const filtered = skills.filter((item) =>
      `${item.title} ${item.trainer}`.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredItems(filtered);
  }, []);

  // Function to handle filtered items from filter
  const handleFilteredItemsChange = useCallback((filtered) => {
    setFilteredItems(filtered);
  }, []);

  // Function to open the modal
  const openModal = (item) => {
    setCurrentItem(item);
    setModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setCurrentItem(null);
    setModalOpen(false);
  };

  // Toggle the visibility of the filter
  const toggleFilter = () => {
    setFilterVisible((prev) => !prev);
  };

  // Close the filter
  const closeFilter = () => {
    setFilterVisible(false);
  };

  return (
    <>
      <div className='z-10'>
        <Hero onSearch={handleSearch} currentItem={currentItem} closeModal={closeModal} />
      </div>

      <div className='grid grid-cols-3 gap-4 z-40 absolute top-20 justify-center w-full p-10 items-center lg:flex lg:mt-40'>
        <div className='col-span-3 flex justify-center mb-15 lg:mb-auto'>
          <SearchBar onSearch={handleSearch}/>
        </div>

        <button onClick={toggleFilter} className='bg-blue-800 text-white rounded-full cursor-pointer p-2 lg:hidden flex items-center justify-between px-4'>
          Filter 
          <span className=''><FaFilter/></span>
        </button>

        <SortBy items={filteredItems} onSortedItemsChange={setFilteredItems} />

        <div className='flex justify-center'>
          <Bookmark />
        </div>
      </div>

      <div className="mx-5 mt-5">
        {/* Display the Filter component with a close button */}
        {filterVisible && (
          <div className="relative">
            <div 
              onClick={closeFilter} 
              className="fixed bg-white opacity-50 inset-0 z-40"
              aria-label="Close Filter"
            >
            </div>
            <Filter items={skills} onFilteredItemsChange={handleFilteredItemsChange} />
          </div>
        )}

        <div className="flex mt-25 lg:mt-15 justify-evenly gap-5 2xl:mx-2">
          {/* Main content area */}
            <div className='hidden lg:block border border-gray-300 rounded-md lg:h-[100%] pb-5 lg:w-[320px]'>
              <Filter items={skills} onFilteredItemsChange={handleFilteredItemsChange} />
            </div>
          
            <div className='w-full'>
              <SkillList items={filteredItems} />
            </div>

        </div>

        {modalOpen && currentItem && <LearnMore item={currentItem} onClose={closeModal} />}
      </div>  
    </>
  );
};

export default App;
