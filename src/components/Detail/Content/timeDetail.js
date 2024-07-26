import React, { useEffect } from "react";
import { dates, showtimesData } from "../../../data/hashData"; // Adjust the path as needed
import DateSlider from "./Time/DateSlider";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedDate, setSelectedTime, setShowtimes } from "../../../controller/SliceReducer/booking";
import TimeSlider from "./Time/Showtimes";
import { formatDate, isPastDate, isToday, getDayOfWeek } from "./Time/dateCtr/datecontroller";



const TimeDetail = () => {
    const dispatch = useDispatch();
    const selectedDate = useSelector((state) => state.movie.selectedDate);
    const selectedTime = useSelector((state) => state.movie.selectedTime);

    const today = new Date();
    const formattedToday = formatDate(today);

    const validDates = dates.filter(date => !isPastDate(new Date(date)));

    useEffect(() => {
        if (!validDates.includes(selectedDate)) {
            const initialDate = validDates.includes(formattedToday) ? formattedToday : validDates[0] || '';
            dispatch(setSelectedDate(initialDate));
            dispatch(setSelectedTime(showtimesData[initialDate]?.[0] || ''));
            dispatch(setShowtimes(showtimesData[initialDate]));
            //   
        }
    }, [formattedToday, validDates, selectedDate, dispatch]);

    const handleDateSelect = (date) => {
        dispatch(setSelectedDate(date));
        dispatch(setSelectedTime(showtimesData[date]?.[0] || ''));
        dispatch(setShowtimes(showtimesData[date]));

    };
    const times = showtimesData[selectedDate] || []; // Mặc định là một mảng trống nếu không có dữ liệu

    const handleTimeSelect = (time) => {
        dispatch(setSelectedTime(time));
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
            <TimeSlider times={times} selectedTime={selectedTime} onTimeSelect={handleTimeSelect} />
            {/* <div className="text-center my-4">
                <p>Selected Date: {selectedDate}</p>
                <p>Day of Week: {getDayOfWeek(new Date(selectedDate))}</p>
                <p>Selected Time: {selectedTime}</p>
            </div> */}
        </div>
    );
};

export default TimeDetail;
