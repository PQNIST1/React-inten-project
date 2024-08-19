import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedTime } from "../../controller/SliceReducer/booking";
import { format } from "date-fns";

const ChoiseTime = () => {
    const dispatch = useDispatch();
    const [selectedValue, setSelectedValue] = useState(""); // State để lưu giá trị đã chọn từ dropdown
    const movieName = useSelector((state) => state.movie.selectedMovieName);
    const showTime = useSelector((state) => state.movie.showtimes);

    const attributeName = "movieAttribute"; // Tên attribute dùng cho data-e2e

    const onChangeAttribute = (event) => {
        const selectedId = parseInt(event.target.value, 10);
        setSelectedValue(selectedId);
        const selectedAttr = showTime.find(attr => attr.id === selectedId);
        dispatch(setSelectedTime(selectedAttr));
    };

    const formatTime = (date) => {
        return format(new Date(date), 'HH:mm'); // Sửa lỗi format thời gian từ 'HH:MM' thành 'HH:mm'
    };

    useEffect(() => {
        if (movieName) {
            setSelectedValue(""); 
        }
    }, [movieName]);

    return (
        <div className="flex mr-1">
            <FontAwesomeIcon icon={faClock} color="orange" className="h-6 my-auto mx-2" />

            <select
                value={selectedValue}
                data-e2e={attributeName}
                onChange={movieName ? onChangeAttribute : () => {}} // Đảm bảo onChange luôn có mặt
                className="p-[9px] bg-gray-50 w-48 h-full focus:outline-none"
                disabled={!movieName} // Chỉ disable khi không có movieName
            >
                <option
                    className="font-roboto capitalize"
                    value=""
                    data-e2e="default"
                    disabled
                    hidden
                >
                    Chọn xuất
                </option>
                {showTime.map((attribute) => (
                    <option
                        className="font-roboto capitalize"
                        key={attribute.id}
                        value={attribute.id}
                    >
                        {formatTime(attribute.startTime)}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ChoiseTime;
