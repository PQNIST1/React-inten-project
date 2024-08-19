import React, { useEffect, useState } from "react";
import DateSlider from "./Time/DateSlider";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedDate, setSelectedTime, setShowtimes } from "../../../controller/SliceReducer/booking";
import TimeSlider from "./Time/Showtimes";
import { formatDate, isPastDate, isToday, getDayOfWeek } from "./Time/dateCtr/datecontroller";
import { getShowTimeMovie, setShow } from "../../../controller/SliceReducer/addShowTime";





const TimeDetail = () => {
    const dispatch = useDispatch();
    const selectedDate = useSelector((state) => state.movie.selectedDate);
    const selectedTime = useSelector((state) => state.movie.selectedTime);
    const movieId = useSelector((state) => state.movie.selectedMovieId);
    const form = useSelector((state) => state.showTime);
    const [datas, setDatas] = useState([]);
    const [date, setDate] = useState([]);
    const [time, setTime] = useState([]);
    const [validDates, setValidDates] = useState([]);
    const { show, status } = form;
    const today = new Date();
    const formattedToday = formatDate(today);

    useEffect(() => {
        dispatch(setSelectedTime(''));
        dispatch(setShow([]));
        dispatch(setShowtimes([]));
    }, [dispatch]);

    useEffect(() => {
        if (movieId) {
            dispatch(getShowTimeMovie(movieId));
        }
    }, [dispatch, movieId]);

    useEffect(() => {
        if (show.data) {
            const sortedEntries = Object.entries(show.data).sort(([dateA], [dateB]) => {
                const timestampA = new Date(dateA).getTime();
                const timestampB = new Date(dateB).getTime();
                return timestampA - timestampB;
            });
            const sortedData = Object.fromEntries(sortedEntries);
            setDatas(sortedData);

        } else {
            setDatas([]);
        }
    }, [show]);

    useEffect(() => {
        if (datas && status === 'succeeded') {
            setDate(datas);
            const valid = Object.keys(datas).filter(date => !isPastDate(new Date(date)));
            const times = datas[selectedDate] || [];
            setTime(times);
            setValidDates(valid);
        } else {
            setTime([]);
            setValidDates([]);
        }
    }, [datas, selectedDate, status]);

    useEffect(() => {
        if (validDates && status === 'succeeded') {
            if (!validDates.includes(selectedDate)) {
                const initialDate = validDates.includes(formattedToday) ? formattedToday : validDates[0] || '';
                if (selectedDate === '') {
                    dispatch(setSelectedDate(initialDate));
                }
            }
        }
    }, [formattedToday, validDates, selectedDate, dispatch, status]);

    useEffect(() => {
        if (selectedDate !== '' && time.length > 0) {
            dispatch(setShowtimes(time))
        }
    }, [dispatch, time, selectedDate]);

    const handleDateSelect = (day) => {
        dispatch(setSelectedDate(day));
        dispatch(setShowtimes(date[day]));
        dispatch(setSelectedTime(''));
    };

    const handleTimeSelect = (time) => {
        dispatch(setSelectedTime(time));
    };
    const selectedDateObject = new Date(selectedDate);
    const displayDate = isToday(selectedDateObject) ? "Hôm nay" : formatDate(selectedDateObject);
    return (
        <>
            {validDates.length >  0 && date && (
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
