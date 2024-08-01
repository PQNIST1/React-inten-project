import React, { useEffect, useState } from "react";
import DateSlider from "./Time/DateSlider";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedDate, setSelectedTime, setShowtimes } from "../../../controller/SliceReducer/booking";
import TimeSlider from "./Time/Showtimes";
import { formatDate, isPastDate, isToday, getDayOfWeek } from "./Time/dateCtr/datecontroller";
import { getShowTime } from "../../../controller/SliceReducer/addShowTime";
import { transformData } from "../../../controller/SliceReducer/img";



const TimeDetail = () => {
    const dispatch = useDispatch();
    const selectedDate = useSelector((state) => state.movie.selectedDate);
    const selectedTime = useSelector((state) => state.movie.selectedTime);
    const movieName = useSelector((state) => state.movie.selectedMovieName);
    const form = useSelector((state) => state.showTime);
    const [datas, setDatas] = useState([]);
    const [date, setDate] = useState();
    const [time, setTime] = useState();
    const [validDates, setValidDates] = useState();
    const { data, status } = form;

    const today = new Date();
    const formattedToday = formatDate(today);

    
      

    const findAllMoviesByName = (movies, movieName) => {
        return movies.filter(movie =>
            movie.object.movie.name.toLowerCase() === movieName.toLowerCase()
        );
    };

    useEffect(() => {
        dispatch(getShowTime());
    }, [dispatch]);
    useEffect(() => {
        if (status === 'succeeded' && movieName) {
            const foundMovie = findAllMoviesByName(data.data.content, movieName);

            if (foundMovie.length > 0) {
                setDatas(foundMovie);
            } else {
                setDatas([]);
            }
        }
    }, [dispatch, status, movieName, data]);

    useEffect(() => {
        if (datas.length > 0) {
            const showtimesData = transformData(datas);
            if (showtimesData) {
                setDate(showtimesData);
                const dates = Object.keys(showtimesData).sort((a, b) => new Date(a) - new Date(b));
                const valid = dates.filter(date => !isPastDate(new Date(date)));
                const times = showtimesData[selectedDate] || [];
                setTime(times);
                setValidDates(valid);
            }
        } else {
            setTime();
            setValidDates()
        }
    }, [datas, selectedDate]);

    useEffect(() => {
        if (validDates && date) {
            if (!validDates.includes(selectedDate)) {
                const initialDate = validDates.includes(formattedToday) ? formattedToday : validDates[0] || '';
                dispatch(setSelectedDate(initialDate));
                // dispatch(setSelectedTime(date[initialDate]?.[0] || ''));
                dispatch(setShowtimes(date[initialDate]));
                //   
            }
        }
    }, [formattedToday, validDates, selectedDate, dispatch, date]);

    const handleDateSelect = (day) => {
        dispatch(setSelectedDate(day));
        // dispatch(setSelectedTime(date[day]?.[0] || ''));
        dispatch(setShowtimes(date[day]));
    };
    // Mặc định là một mảng trống nếu không có dữ liệu

    const handleTimeSelect = (time) => {
        dispatch(setSelectedTime(time));
    };
    const selectedDateObject = new Date(selectedDate);
    const displayDate = isToday(selectedDateObject) ? "Hôm nay" : formatDate(selectedDateObject);

    return (
        <>
            {validDates && date && (
                <div className="w-full">
                    <div className="border-l-4 border-blue-800 font-bold h-7 flex mb-4">
                        <h1 className="mr-10 capitalize inline ml-3 text-white my-auto">lịch chiếu</h1>
                    </div>
                    <DateSlider dates={validDates} selectedDate={selectedDate} onDateSelect={handleDateSelect} />
                    <div className="border-l-4 border-blue-800 font-bold h-7 flex mb-4">
                        <h1 className="mr-10 capitalize inline ml-3 text-white my-auto">
                            xuất chiếu: {displayDate} ({getDayOfWeek(new Date(selectedDate))})
                        </h1>
                    </div>
                    <TimeSlider times={time} selectedTime={selectedTime} onTimeSelect={handleTimeSelect} />
                </div>
            )}

        </>
    );
};

export default TimeDetail;
