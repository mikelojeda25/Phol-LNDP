import React from 'react';
import PropTypes from 'prop-types';
import { FaCalendar, FaClock, FaGear, FaLaptopCode } from 'react-icons/fa6';

const LearnMore = ({ item, onClose }) => {
  const availabilityClasses = item.availability === 'Closed'
    ? 'bg-red-500 text-white w-[70px]' 
    : item.availability === 'Upcoming'
    ? 'bg-green-500 text-white w-[90px]' 
    : 'bg-amber-200 text-amber-950 w-[180px]';

  return (
    <>
      {/* Overlay to close the modal */}
      <div className="absolute inset-0 bg-black opacity-50 z-10 cursor-pointer" onClick={onClose} />

      <div className="p-6 h-full md:h-auto bg-white rounded-lg shadow-lg z-50 overflow-y-auto custom-scrollbar w-full md:mx-[10%] lg:w-[1000px] ">
        {/* GRIDED CONTAINER */}
        <div className="md:grid grid-cols-[45%_65%] gap-2">
          {/* Image Section */}
          <div className="mt-4 flex justify-center">
            <img
              src={item.poster}
              alt={item.title}
              className="rounded-lg max-w-full h-auto mb-5 md:max-h-[500px] shadow-lg"
            />
          </div>

          {/* Details Section */}
          <div className="relative md:text-sm">
            <p className={`p-2 flex items-center justify-center h-10 rounded-xl md:hidden ${availabilityClasses}`}>
              {item.availability}
            </p>

            <h2 className="text-xl font-bold mb-4 text-blue-950 mt-4 md:mt-0">{item.title}</h2>
            <div className="md:flex items-center gap-5 text-gray-500">
              <div className="flex items-center gap-2">
                <FaCalendar />
                {item["start-date"]}
              </div>
              <div className="flex items-center gap-2">
                <FaClock />
                <span>
                  {Math.floor(item.duration / 60) > 0 
                    ? `${Math.floor(item.duration / 60)} hour${Math.floor(item.duration / 60) > 1 ? 's' : ''}` 
                    : ''}
                  {item.duration % 60 > 0 
                    ? `${item.duration % 60} minute${item.duration % 60 > 1 ? 's' : ''}` 
                    : ''}
                </span>
              </div>
              <p className={`p-2 items-center justify-center h- rounded-xl hidden md:block ${availabilityClasses}`}>
                {item.availability}
              </p>
              <div className="flex items-center gap-2 md:hidden">
                <FaLaptopCode />
                {item.mode}
              </div>
            </div>

            {/* Registration Prerequisites */}
            <h2 className="text-xl font-bold mb-4 text-blue-950 mt-4 md:mt-0">Registration prerequisites</h2>
            <div className="flex flex-col w-full md:w-[350px] border-4 border-blue-300 rounded-lg">
              {['Accomplished e-Training Needs Analysis Form', 'Accomplished Individual Development Learning Plan Form', 'Uploaded Individual Development Learning Plan Form'].map((label, index) => (
                <div key={index} className="flex items-center gap-5 px-4 py-4 bg-blue-100 border-b-2 border-blue-300">
                  <input
                    type="checkbox"
                    onChange={(e) => console.log(e.target.checked)}
                    className="h-6 w-6 text-blue-600 rounded-full border-2 border-gray-300 focus:ring-blue-500 checked:bg-blue-600 checked:border-transparent"
                  />
                  <span className="text-gray-800 font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Training Requirements */}
        <div className="mt-6">
          <h1 className="text-xl font-[500]">Training Requirements:</h1>
          <div className="flex items-center gap-8 ml-10 mt-4">
            {['Endorsement Letter', 'Passed Pre-assessment Test'].map((requirement, index) => (
              <div key={index} className="bg-red-200 flex items-center p-2 rounded-md border-2 border-red-300 px-4 gap-4 shadow-md">
                <input
                  type="checkbox"
                  onChange={(e) => console.log(e.target.checked)}
                  className="h-6 w-6 text-blue-600 rounded-full border-2 border-gray-300 focus:ring-blue-500 checked:bg-blue-600 checked:border-transparent"
                />
                <span className="text-gray-800 text-lg">{requirement}</span>
              </div>
            ))}
          </div>

          {/* Target Participants */}
          <h1 className="text-xl font-[500] mt-6">
            Target Participants:
            <span className="ml-8 italic text-sm text-gray-600">(A maximum of two participants per DOU is allowed)</span>
          </h1>
          <div className="flex gap-3 flex-wrap items-center mt-5 ml-12 text-base">
            {[
              "Chief Administrative Officers", "Department Heads", "Officer-in-Charge", 
              "Assistant Department Heads", "Division/Section Chiefs", "Supervisors", 
              "Managers", "Other GCQ Personnel"
            ].map((participant, index) => (
              <div key={index} className="bg-blue-100 px-5 py-2 rounded-full shadow-md cursor-pointer hover:bg-violet-100">
                {participant}
              </div>
            ))}
          </div>

          {/* Course Description */}
          <div className="mt-6">
            <h1 className="text-xl font-[500]">Course Description</h1>
            <p className="ml-12 mt-3">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla facilis dolore eum maxime beatae minus dicta. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla facilis dolore eum maxime beatae minus dicta.
            </p>
          </div>
          <hr className="mt-10 w-full border-t-2 border-gray-400" />
          {/* Action Buttons */}
          <div className="flex justify-end mt-6 gap-4">
            <button className="bg-gray-200 py-1 px-6 rounded-md text-gray-500 hover:bg-gray-300 cursor-pointer" onClick={onClose}>Close</button>
            <button className="bg-blue-900 text-white py-1 px-6 rounded-md hover:bg-gray-400">Register</button>
          </div>
        </div>
      </div>
    </>
  );
};

LearnMore.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    "start-date": PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    mode: PropTypes.string.isRequired,
    availability: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default LearnMore;
