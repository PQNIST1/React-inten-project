import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { isPastDate } from "../Detail/Content/Time/dateCtr/datecontroller";
import { getShowTimeMovie } from "../../controller/SliceReducer/addShowTime";
import { setSelectedDate, setShowtimes } from "../../controller/SliceReducer/booking";
import { formatDay } from "../../controller/SliceReducer/img";

const ChoiseDay = () => {
    const [selectedValue, setSelectedValue] = useState("");
    const dispatch = useDispatch();
    const selectedDate = useSelector((state) => state.movie.selectedDate);
    const movieId = useSelector((state) => state.movie.selectedMovieId);
    const form = useSelector((state) => state.showTime);
    const [datas, setDatas] = useState({});
    const [validDates, setValidDates] = useState([]);
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
            setDatas({});
        }
    }, [show]);

    useEffect(() => {
        if (datas) {
            const valid = Object.keys(datas).filter(date => !isPastDate(new Date(date)));
            setValidDates(valid.reverse());
        } else {
            setValidDates([]);
        }
    }, [datas, selectedDate]);

    const attributeName = "movieAttribute";
    const onChangeAttribute = (event) => {
        setSelectedValue(event.target.value);
        dispatch(setSelectedDate(event.target.value));
        dispatch(setShowtimes(datas[event.target.value]));
    };

    // Tính toán ngày bắt đầu và ngày kết thúc của tuần hiện tại
    const startOfWeek = new Date();
    const endOfWeek = new Date();

    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1); // Bắt đầu từ thứ 2
    startOfWeek.setHours(0, 0, 0, 0); // Đặt thời gian về 00:00:00

    endOfWeek.setDate(startOfWeek.getDate() + 6); // Kết thúc vào Chủ nhật
    endOfWeek.setHours(23, 59, 59, 999); // Đặt thời gian về 23:59:59

    // Lọc các ngày nằm trong tuần hiện tại
    const currentWeekDates = validDates.filter((date) => {
        const dateObj = new Date(date);
        return dateObj >= startOfWeek && dateObj <= endOfWeek;
    });

    return (
        <div className="flex">
            <FontAwesomeIcon icon={faCalendarDays} color="orange" className="h-6 my-auto mx-2" />
            <select
                value={selectedValue}
                data-e2e={attributeName}
                onChange={onChangeAttribute}
                className="p-[9px] bg-gray-50 w-52 h-full focus:outline-none"
                disabled={validDates.length === 0}
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
                {currentWeekDates.map((attribute, index) => (
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
        </div>
    );
}

export default ChoiseDay;
