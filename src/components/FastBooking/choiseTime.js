import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedTime } from "../../controller/SliceReducer/booking";

const ChoiseTime = () => {
    const dispatch = useDispatch();
    const [selectedValue, setSelectedValue] = useState(""); // State để lưu giá trị đã chọn từ dropdown
    const movieName = useSelector((state) => state.movie.selectedMovieName);
    const showTime = useSelector((state) => state.movie.showtimes);
    const attributeValues = [
        { label: "Action", value: "action" },
        { label: "Comedy", value: "comedy" },
        { label: "Drama", value: "drama" },
        // Thêm các giá trị khác nếu cần
    ];

    const attributeName = "movieAttribute"; // Tên attribute dùng cho data-e2e
    const onChangeAttribute = (event) => {
        const selectedOption = event.target.options[event.target.selectedIndex];
        const name = selectedOption.getAttribute('data-name');
        const room = selectedOption.getAttribute('data-room');
        const time = selectedOption.getAttribute('data-time');
        setSelectedValue(event.target.value); // Cập nhật giá trị đã chọn khi dropdown thay đổi
        dispatch(setSelectedTime({time, room, name}));
      
    };

    return (
        <div className="flex">
            <FontAwesomeIcon icon={faClock} color="orange" className="h-6 my-auto mx-2" />

            { movieName !== '' && showTime ? (
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
                        key={attribute.room}
                        value={attribute.time}
                        data-name={attribute.name}
                        data-room={attribute.room}
                        data-time={attribute.time}
                    >
                        {attribute.time}
                    </option>
                ))}
            </select>
            ):(
                <select
                value={selectedValue}
                data-e2e={attributeName}
                onChange={(event) => onChangeAttribute(event)}
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