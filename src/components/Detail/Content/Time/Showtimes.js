// components/TimeSlider.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';


const TimeSlider = ({ times, selectedTime, onTimeSelect }) => {
  const location = useLocation();
  const pathname = location.pathname.split('/')[1];
  return (
    <div className="flex-wrap py-2 flex">
      {times.map((time, index) => (
        <div key={index}>
          {pathname === 'detail' ? (
            <Link to={'/booking/#seat'}>
              <button
                className={`inline-block px-4 py-2 m-2 rounded ${selectedTime.time === time.time ? 'bg-green-500 text-white' : 'bg-transparent border hover:bg-green-500 hover:border-none hover:text-white'}`}
                onClick={() => onTimeSelect(time)}
              >
                {time.time}
              </button>
            </Link>
          ) : (
            <button
              className={`inline-block px-4 py-2 m-2 rounded ${selectedTime.time === time.time ? 'bg-green-500 text-white' : 'bg-transparent border  hover:bg-green-500 hover:border-none hover:text-white'}`}
              onClick={() => onTimeSelect(time)}
            >
              {time.time}
            </button>
          )}
        </div>
      ))}

    </div>
  );
};

export default TimeSlider;

