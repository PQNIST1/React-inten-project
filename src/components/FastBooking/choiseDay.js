import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { formatDate, isPastDate } from "../Detail/Content/Time/dateCtr/datecontroller";
import { getShowTime } from "../../controller/SliceReducer/addShowTime";
import { setSelectedDate, setSelectedTime ,setShowtimes } from "../../controller/SliceReducer/booking";
import { transformData } from "../../controller/SliceReducer/img";

const ChoiseDay = () => {
    const [selectedValue, setSelectedValue] = useState(""); // State để lưu giá trị đã chọn từ dropdown
    const dispatch = useDispatch();
    const selectedDate = useSelector((state) => state.movie.selectedDate);
    const movieName = useSelector((state) => state.movie.selectedMovieName);
    const form = useSelector((state) => state.showTime);
    const [datas, setDatas] = useState([]);
    const [date, setDate] = useState();
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
                setValidDates(valid);
            }
        } else {
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



    const attributeName = "movieAttribute"; // Tên attribute dùng cho data-e2e
    const onChangeAttribute = (event) => {
        setSelectedValue(event.target.value); 
        dispatch(setSelectedDate(event.target.value));
        // dispatch(setSelectedTime(date[event.target.value]?.[0] || ''));
        dispatch(setShowtimes(date[event.target.value]));
    };
    return (
        <div className="flex">
            <FontAwesomeIcon icon={faCalendarDays} color="orange" className="h-6 my-auto mx-2" />
            { movieName !== '' && validDates ? (
                <select
                value={selectedValue}
                data-e2e={attributeName}
                onChange={(event) => onChangeAttribute(event)}
                className="p-[9px]  bg-gray-50 w-52 h-full focus: outline-none"
            >
                <option
                    className="font-roboto capitalize"
                    value=""
                    data-e2e="default"
                    disabled
                    hidden
                >
                    Chọn ngày
                </option>
                {validDates.map((attribute, index) => (
                    <option
                        className="font-roboto capitalize"
                        key={`${attribute}-${index}`}
                        value={attribute}
                        data-e2e={attribute}
                    >
                        {attribute}
                    </option>
                ))}
            </select>
            ):(
                <select
                value={selectedValue}
                data-e2e={attributeName}
                onChange={(event) => onChangeAttribute(event)}
                className="p-[9px]  bg-gray-50 w-52 h-full focus: outline-none"
                style={{ pointerEvents: 'none' }}
            >
                <option
                    className="font-roboto capitalize"
                    value=""
                    data-e2e="default"
                    disabled
                    hidden
                >
                    Chọn ngày
                </option>

            </select>
            )}
          
        </div>
    );
}
export default ChoiseDay;