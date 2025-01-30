import React, { useState, useEffect } from 'react';
import { Range } from 'react-range';

const Filter = ({ items, onFilteredItemsChange }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    availability: [],
    category: [],
    institution: [],
    targetParticipants: [],
    duration: [0, 100], // Default duration range (min, max)
    mode: []
  });

  // Get unique options for filters
  const availabilityOptions = [...new Set(items.map((item) => item.availability))];
  const categoryOptions = [...new Set(items.map((item) => item.category))];
  const institutionOptions = [...new Set(items.map((item) => item.institution))];
  const targetParticipantsOptions = [...new Set(items.map((item) => item['target-participants']))];
  const modeOptions = [...new Set(items.map((item) => item.mode))];

  // Get the maximum duration available (in minutes)
  const maxDuration = Math.max(...items.map(item => item.duration), 100); // Default max to 100 minutes if no duration

  useEffect(() => {
    // Set default range values when the component loads or when maxDuration is updated
    setSelectedFilters((prevState) => ({
      ...prevState,
      duration: [0, maxDuration] // Default to min and max duration
    }));
  }, [maxDuration]);

  const handleFilterChange = (e) => {
    const { name, value, checked } = e.target;

    let newSelectedFilters = { ...selectedFilters };

    if (e.target.type === 'checkbox') {
      // Handle multi-select for checkboxes
      const updatedArray = checked
        ? [...newSelectedFilters[name], value]
        : newSelectedFilters[name].filter((item) => item !== value);
      newSelectedFilters[name] = updatedArray;
    } else {
      // Handle other filters like duration or single select
      newSelectedFilters[name] = value;
    }

    setSelectedFilters(newSelectedFilters);
    applyFilters(newSelectedFilters);
  };

  const handleSliderChange = (values) => {
    setSelectedFilters((prevState) => ({
      ...prevState,
      duration: values,
    }));

    applyFilters({ ...selectedFilters, duration: values });
  };

  const applyFilters = (newSelectedFilters) => {
    let filteredItems = items;

    if (newSelectedFilters.availability.length > 0) {
      filteredItems = filteredItems.filter(item => newSelectedFilters.availability.includes(item.availability));
    }

    if (newSelectedFilters.category.length > 0) {
      filteredItems = filteredItems.filter(item => newSelectedFilters.category.includes(item.category));
    }

    if (newSelectedFilters.institution.length > 0) {
      filteredItems = filteredItems.filter(item => newSelectedFilters.institution.includes(item.institution));
    }

    if (newSelectedFilters.targetParticipants.length > 0) {
      filteredItems = filteredItems.filter(item =>
        newSelectedFilters.targetParticipants.includes(item['target-participants'])
      );
    }

    if (newSelectedFilters.duration[0] > 0 || newSelectedFilters.duration[1] < maxDuration) {
      filteredItems = filteredItems.filter(
        item => item.duration >= newSelectedFilters.duration[0] && item.duration <= newSelectedFilters.duration[1]
      );
    }

    if (newSelectedFilters.mode.length > 0) {
      filteredItems = filteredItems.filter(item => newSelectedFilters.mode.includes(item.mode));
    }

    // Update the filtered items
    onFilteredItemsChange(filteredItems);
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
   <>
     <div className='fixed z-50 bg-white top-0 left-0 h-full px-8 pt-4 w-[280px] md:w-[400px] lg:relative lg:w-[300px] rounded-md'>
      {/* Availability Filter */}
      <div className="my-4">
        <strong>Availability</strong>
        <div className="flex gap-4 flex-col mt-2">
          {availabilityOptions.map((availability) => (
            <label key={availability} className="cursor-pointer">
              <input
                type="checkbox"
                value={availability}
                name="availability"
                onChange={handleFilterChange}
                checked={selectedFilters.availability.includes(availability)}
              />
              <span> {availability}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div className="my-4">
        <strong>Category/Topic</strong>
        <div className="flex gap-4 flex-col mt-2">
          {categoryOptions.map((category) => (
            <label key={category} className="cursor-pointer">
              <input
                type="checkbox"
                value={category}
                name="category"
                onChange={handleFilterChange}
                checked={selectedFilters.category.includes(category)}
              />
              <span> {category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Institution Filter */}
      <div className="my-4">
        <strong>Institution:</strong>
        <div className="flex gap-4 flex-col mt-2">
          {institutionOptions.map((institution) => (
            <label key={institution} className="cursor-pointer">
              <input
                type="checkbox"
                value={institution}
                name="institution"
                onChange={handleFilterChange}
                checked={selectedFilters.institution.includes(institution)}
              />
              <span> {institution}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Target Participants Filter */}
      <div className="my-4">
        <strong>Target Participants</strong>
        <div className="flex gap-4 flex-col mt-2">
          {targetParticipantsOptions.map((target) => (
            <label key={target} className="cursor-pointer">
              <input
                type="checkbox"
                value={target}
                name="targetParticipants"
                onChange={handleFilterChange}
                checked={selectedFilters.targetParticipants.includes(target)}
              />
              <span> {target}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Duration Filter (Dual Range Slider) */}
      <div className="my-4">
        <label className='flex justify-between mb-4'><strong>Duration</strong> 
        <span>{formatDuration(selectedFilters.duration[0])}, - {formatDuration(selectedFilters.duration[1])}</span>
        </label>
        <Range
          values={selectedFilters.duration}
          step={15}
          min={0}
          max={maxDuration}
          onChange={handleSliderChange} // Use the new slider handler
          renderTrack={({ props, children }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: '6px',
                width: '100%',
                backgroundColor: '#ccc',
                borderRadius: '3px',
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props, isDragged }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: '20px',
                width: '20px',
                borderRadius: '50%',
                backgroundColor: isDragged ? '#12183b' : '#12183b',
              }}
            />
          )}
        />
      </div>

      {/* Mode Filter */}
      <div className="my-4">
        <strong>Mode:</strong>
        <div className="flex gap-4 flex-col mt-2">
          {modeOptions.map((mode) => (
            <label key={mode} className="cursor-pointer">
              <input
                type="checkbox"
                value={mode}
                name="mode"
                onChange={handleFilterChange}
                checked={selectedFilters.mode.includes(mode)}
              />
              <span> {mode}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
   </>
  );
};

export default Filter;
