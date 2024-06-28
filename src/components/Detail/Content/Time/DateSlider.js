// components/DateSlider.js
import React from 'react';

const DateSlider = ({ dates, selectedDate, onDateSelect }) => {
  return (
    <div className=" py-2 flex-wrap ">
      {dates.map((date) => (
        <button
          key={date}
          className={`inline-block px-4 py-2 m-2 rounded ${selectedDate === date ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => onDateSelect(date)}
        >
          {date}
        </button>
      ))}
    </div>
  );
};

export default DateSlider;
