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
        return format(new Date(date), 'HH:MM');
    };
    useEffect(() => {
        if (movieName) {
            setSelectedValue(""); 
        }
    },[movieName])
    return (
        <div className="flex mr-1">
            <FontAwesomeIcon icon={faClock} color="orange" className="h-6 my-auto mx-2" />

            {movieName !== ''  ? (
                <select
                    value={selectedValue}
                    data-e2e={attributeName}
                    onChange={(event) => onChangeAttribute(event)}
                    className="p-[9px]  bg-gray-50 w-48 h-full focus: outline-none"
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
                    {showTime.map((attribute, index) => (
                        <option
                            className="font-roboto capitalize"
                            key={attribute.id}
                            value={attribute.id}
                        >
                            {formatTime(attribute.startTime)}
                        </option>
                    ))}
                </select>
            ) : (
                <select
                    value={''}
                    className="p-[9px]  bg-gray-50 w-48 h-full focus: outline-none"
                    style={{ pointerEvents: 'none' }}
                >
                    <option
                        className="font-roboto capitalize"
                        value=""
                        data-e2e="default"
                        disabled
                        hidden
                    >
                        Chọn Xuất
                    </option>

                </select>
            )}
        </div>
    );
}
export default ChoiseTime;