import React, { useState } from 'react';

const Hero = ({ onSearch, filteredItems, setFilteredItems }) => {
  const [searchQuery, setSearchQuery] = useState(''); // Local state to store search query

  const handleChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    onSearch(query); // Trigger the search function passed down from App
  };

  return (
    <div className="relative">
      <div className="absolute flex items-center justify-center h-full w-full z-20 bg-blue-950 opacity-40"></div>
      <div className="relative flex items-center justify-center h-full w-full top-20 lg:top-40">
        <p className="absolute z-30 text-white font-bold text-center text-3xl lg:text-6xl">Trainings and Programs</p>
      </div>
      
      <div className="relative bg-green-300 w-full h-[200px] lg:h-[400px]">
        {/* Cover Photo */}
        <img
          src="/assets/CoverPhoto.svg" // Path to image in public folder
          alt="Cover Photo"
          className="object-none object-bottom lg:object-cover w-full h-full" // Image covers the whole width and height of the container
        />
      </div>
    </div>



  );
};

export default Hero;
