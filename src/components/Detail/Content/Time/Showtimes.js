// components/TimeSlider.js
import React from 'react';
import {  useLocation, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const TimeSlider = ({ times, selectedTime, onTimeSelect }) => {
  const location = useLocation();
  const pathname = location.pathname.split('/')[1];
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');
  const formatTime = (date) => {
    return format(new Date(date), 'HH:MM');
  };
  const handleClick = () => {
    if (accessToken) {
      navigate('/booking/#seat');
    } else {
      navigate('/login');
    }
  }
  return (
    <div className="flex-wrap py-2 flex">
      {times.map((time, index) => (
        <div key={index}>
          {pathname === 'detail' ? (
            <div onClick={handleClick}>
              <button
                className={`inline-block px-4 py-2 m-2 rounded ${selectedTime.startTime === time.startTime ? 'bg-green-500 text-white' : 'bg-transparent border hover:bg-green-500 hover:border-none hover:text-white'}`}
                onClick={() => onTimeSelect(time)}
              >
                {formatTime(time.startTime)}
              </button>
            </div>
          ) : (
            <button
              className={`inline-block px-4 py-2 m-2 rounded ${selectedTime.startTime === time.startTime ? 'bg-green-500 text-white' : 'bg-transparent border  hover:bg-green-500 hover:border-none hover:text-white'}`}
              onClick={() => onTimeSelect(time)}
            >
              {formatTime(time.startTime)}
            </button>
          )}
        </div>
      ))}

    </div>
  );
};

export default TimeSlider;

