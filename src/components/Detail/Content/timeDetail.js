import React from "react";
import { useState, useEffect } from "react";
import { dates, showtimesData } from "../../../data/hashData";
import DateSlider from "./Time/DateSlider";
import TimeSlider from "./Time/Showtimes";

const getDayOfWeek = (date) => {
    const daysOfWeek = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
    return daysOfWeek[date.getDay()];
};

const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};
const isToday = (date) => {
    const today = new Date();
    return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
    );
};
const isPastDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Đặt thời gian thành 00:00:00 để chỉ so sánh ngày
    return date < today;
};

const TimeDetail = () => {
    const today = new Date();
    const formattedToday = formatDate(today);

    const validDates = dates.filter(date => !isPastDate(new Date(date)));

    const [selectedDate, setSelectedDate] = useState(formattedToday);
    const [selectedTime, setSelectedTime] = useState(showtimesData[formattedToday]?.[0] || '');

    useEffect(() => {
        if (!validDates.includes(formattedToday)) {
            setSelectedDate(validDates[0]);
            setSelectedTime(showtimesData[validDates[0]]?.[0] || '');
        }
    }, [formattedToday, validDates]);

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        setSelectedTime(showtimesData[date]?.[0] || '');
    };

    const handleTimeSelect = (time) => {
        setSelectedTime(time);
    };

    const selectedDateObject = new Date(selectedDate);
    const displayDate = isToday(selectedDateObject) ? "Hôm nay" : formatDate(selectedDateObject);

    return (
        <div className="w-full">
            <div className="border-l-4 border-blue-800 font-bold h-7 flex mb-4">
                <h1 className="mr-10 capitalize inline ml-3 text-white my-auto">lịch chiếu</h1>
            </div>
            <DateSlider dates={validDates} selectedDate={selectedDate} onDateSelect={handleDateSelect} />
            <div className="border-l-4 border-blue-800 font-bold h-7 flex mb-4">
                <h1 className="mr-10 capitalize inline ml-3 text-white my-auto">xuất chiếu: {displayDate} ({getDayOfWeek(new Date(selectedDate))})</h1>
            </div>
            <TimeSlider times={showtimesData[selectedDate]} selectedTime={selectedTime} onTimeSelect={handleTimeSelect} />
            {/* <div className="text-center my-4">
                <p>Selected Date: {selectedDate}</p>
                <p>Day of Week: {getDayOfWeek(new Date(selectedDate))}</p>
                <p>Selected Time: {selectedTime}</p>
            </div> */}
        </div>
    )
}
export default TimeDetail;