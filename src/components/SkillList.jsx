import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import LearnMore from './LearnMore'; // Assuming LearnMore is in the same directory
import { FaCalendar, FaClock, FaLaptopCode } from 'react-icons/fa6';
import { FaMapMarker } from 'react-icons/fa';

const SkillList = ({ items }) => {
  const itemsPerPage = 9; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredItems, setFilteredItems] = useState(items); // Store the filtered items
  const [currentItem, setCurrentItem] = useState(null); // For modal content

  // Update the filtered items whenever items change (e.g., after filtering)
  useEffect(() => {
    setFilteredItems(items);
    setCurrentPage(1); // Reset to the first page whenever the items change
  }, [items]);

  // Pagination logic
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Pagination numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Determine when to show ellipses
  const renderPageNumbers = () => {
    if (totalPages <= 5) {
      return pageNumbers.map((number) => (
        <button
          key={number}
          className={`p-2 border rounded ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </button>
      ));
    }

    const displayNumbers = [];
    if (currentPage <= 3) {
      displayNumbers.push(1, 2, 3, '...', totalPages);
    } else if (currentPage >= totalPages - 2) {
      displayNumbers.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
    } else {
      displayNumbers.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
    }

    return displayNumbers.map((number, index) => {
      if (number === '...') {
        return (
          <span key={index} className="p-2 cursor-default text-gray-500">
            ...
          </span>
        );
      } else {
        return (
          <button
            key={number}
            className={`p-2 border rounded ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => handlePageChange(number)}
          >
            {number}
          </button>
        );
      }
    });
  };

  const openModal = (item) => {
    setCurrentItem(item);
  };

  const closeModal = () => {
    setCurrentItem(null);
  };

  return (
    <div>
      <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 grid-cols-1 gap-6 w-full">
        {filteredItems.length === 0 ? (
          <div className="col-span-full text-center p-4 max-w-[200px] h-[200px]">
            <p>No data available</p>
          </div>
        ) : (
          currentItems.map((item, index) => (
            <div key={index} className="relative border border-gray-200 rounded-md shadow-[0_4px_6px_0_rgba(0,0,0,0.3)]">
              <div className="w-full h-[70px] md:h-[100px] lg:h-[150px] rounded-2xl">
                <img src={item["skill-cover-photo"]} alt={item.title} className="w-full h-full object-cover lg:object-bottom" />
              </div>
              <div className="hidden md:block h-[80px] w-[80px] lg:h-[100px] lg:w-[100px] 2xl:h-[140px] 2xl:w-[140px] absolute top-15 lg:top-25 xl:top-25 2xl:top-17 left-5 rounded-md overflow-hidden bg-red-700 shadow-[0_4px_6px_0_rgba(0,0,0,0.3)]">
                <img src={item["display-photo"]} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <button
                className="bg-blue-900 text-white py-2 px-10 shadow-lg rounded-2xl top-12 absolute right-5 md:top-30 md:px-4 md:text-sm  2xl:right-10 lg:top-42  xl:rounded-md 2xl:text-md 2xl:px-10 2xl:top-43"
                onClick={() => openModal(item)} // Open modal on button click
              >
                Learn More
              </button>


              <div className='grid grid-cols-2 pb-3 px-5 mt-7 md:mt-16 lg:mt-20'>
                <h1 className='text-xl col-span-2'>{item.title}</h1>
                <h2 className='text-gray-500 col-span-2 mb-3'>by {item.trainer}</h2>
                
                <h3 className='flex items-center gap-2 mb-2 text-gray-500'><FaCalendar/><span>{item["start-date"]}</span></h3> 
                <h3 className='flex items-center gap-2 mb-2 text-gray-500'><FaClock/>
                  <span>
                    {Math.floor(item.duration / 60) > 0 
                      ? `${Math.floor(item.duration / 60)} hour${Math.floor(item.duration / 60) > 1 ? 's' : ''} ` 
                      : ""}
                    {item.duration % 60 > 0 
                      ? `${item.duration % 60} minute${item.duration % 60 > 1 ? 's' : ''}` 
                      : ""}
                  </span>
                </h3>
                <h3 className='flex items-center gap-2 mb-2 text-gray-500'><FaMapMarker/><span>{item.location}</span></h3>
                <h3 className='flex items-center gap-2 mb-2 text-gray-500'><FaLaptopCode/><span>{item.mode}</span></h3>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center gap-2 mt-4">
        <button
          className="p-2 border rounded bg-gray-200 hover:bg-gray-300"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {renderPageNumbers()}
        <button
          className="p-2 border rounded bg-gray-200 hover:bg-gray-300"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* Modal */}
      {currentItem && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <LearnMore item={currentItem} onClose={closeModal} />
        </div>
      )}
    </div>
  );
};

SkillList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      trainer: PropTypes.string.isRequired,
      "start-date": PropTypes.string.isRequired,
      duration: PropTypes.number.isRequired,
      location: PropTypes.string.isRequired,
      mode: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      institution: PropTypes.string.isRequired,
      "target-participants": PropTypes.string.isRequired,
      availability: PropTypes.string.isRequired,
      "display-photo": PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default SkillList;
