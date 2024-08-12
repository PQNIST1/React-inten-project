import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { isPastDate } from "../Detail/Content/Time/dateCtr/datecontroller";
import { getShowTimeMovie } from "../../controller/SliceReducer/addShowTime";
import { setSelectedDate, setShowtimes } from "../../controller/SliceReducer/booking";
import { formatDay } from "../../controller/SliceReducer/img";

const ChoiseDay = () => {
    const [selectedValue, setSelectedValue] = useState(""); // State để lưu giá trị đã chọn từ dropdown
    const dispatch = useDispatch();
    const selectedDate = useSelector((state) => state.movie.selectedDate);
    const movieId = useSelector((state) => state.movie.selectedMovieId);
    const form = useSelector((state) => state.showTime);
    const [datas, setDatas] = useState([]);
    const [date, setDate] = useState();
    const [validDates, setValidDates] = useState();
    const { show } = form;








    useEffect(() => {
        if (movieId) {
            dispatch(getShowTimeMovie(movieId));
            setSelectedValue(""); 
        }
    }, [dispatch, movieId]);

    useEffect(() => {
        if (show.data) {
            setDatas(show.data);
        } else {
            setDatas([]);
        }
    }, [show]);


    useEffect(() => {
        if (datas) {
            setDate(datas);
            const valid = Object.keys(datas).filter(date => !isPastDate(new Date(date)));
            setValidDates(valid.reverse());
        } else {
            setValidDates();
        }
    }, [datas, selectedDate]);



    const attributeName = "movieAttribute"; // Tên attribute dùng cho data-e2e
    const onChangeAttribute = (event) => {
        setSelectedValue(event.target.value);
        dispatch(setSelectedDate(event.target.value));
        dispatch(setShowtimes(date[event.target.value]));
    };
    return (
        <div className="flex">
            <FontAwesomeIcon icon={faCalendarDays} color="orange" className="h-6 my-auto mx-2" />
            {movieId !== '' && validDates  ?   (
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
                            {formatDay(attribute)}
                        </option>
                    ))}
                </select>
            ) : (
                <select
                    value={''}
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