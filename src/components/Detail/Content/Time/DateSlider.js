// components/DateSlider.js
import React from 'react';
import { formatDay } from '../../../../controller/SliceReducer/img';

const DateSlider = ({ dates, selectedDate, onDateSelect }) => {
  // Tính toán ngày bắt đầu và ngày kết thúc của tuần hiện tại
  const startOfWeek = new Date();
  const endOfWeek = new Date();

  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1); // Bắt đầu từ thứ 2
  startOfWeek.setHours(0, 0, 0, 0); // Đặt thời gian về 00:00:00

  endOfWeek.setDate(startOfWeek.getDate() + 6); // Kết thúc vào Chủ nhật
  endOfWeek.setHours(23, 59, 59, 999); // Đặt thời gian về 23:59:59

  // Lọc các ngày nằm trong tuần hiện tại
  const currentWeekDates = dates.filter((date) => {
    const dateObj = new Date(date);
    return dateObj >= startOfWeek && dateObj <= endOfWeek;
  });

  return (
    <div className="py-2 flex-wrap">
      {currentWeekDates.map((date) => (
        <button
          key={date}
          className={`inline-block px-4 py-2 m-2 rounded ${
            selectedDate === date ? 'bg-blue-500 text-white' : 'bg-transparent border'
          }`}
          onClick={() => onDateSelect(date)}
        >
          {formatDay(date)}
        </button>
      ))}
    </div>
  );
};

export default DateSlider;
