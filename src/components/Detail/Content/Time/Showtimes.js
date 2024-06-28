// components/TimeSlider.js
import React from 'react';

const TimeSlider = ({ times, selectedTime, onTimeSelect }) => {
  return (
    <div className=" flex-wrap py-2">
      {times.map((time) => (
        <button
          key={time}
          className={`inline-block px-4 py-2 m-2 rounded ${selectedTime === time ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
          onClick={() => onTimeSelect(time)}
        >
          {time}
        </button>
      ))}
    </div>
  );
};

export default TimeSlider;

