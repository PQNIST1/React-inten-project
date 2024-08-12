// components/DateSlider.js
import React from 'react';
import { formatDay } from '../../../../controller/SliceReducer/img';

const DateSlider = ({ dates, selectedDate, onDateSelect }) => {
  return (
    <div className=" py-2 flex-wrap ">
      {dates.map((date) => (
        <button
          key={date}
          className={`inline-block px-4 py-2 m-2 rounded ${selectedDate === date ? 'bg-blue-500 text-white' : 'bg-transparent border'}`}
          onClick={() => onDateSelect(date)}
        >
          {formatDay(date)}
        </button>
      ))}
    </div>
  );
};

export default DateSlider;
