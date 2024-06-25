import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";

const ChoiseDay = () => {
    const [selectedValue, setSelectedValue] = useState(""); // State để lưu giá trị đã chọn từ dropdown

    const attributeValues = [
        { label: "Action", value: "action" },
        { label: "Comedy", value: "comedy" },
        { label: "Drama", value: "drama" },
        // Thêm các giá trị khác nếu cần
    ];

    const attributeName = "movieAttribute"; // Tên attribute dùng cho data-e2e
    const onChangeAttribute = (event) => {
        setSelectedValue(event.target.value); // Cập nhật giá trị đã chọn khi dropdown thay đổi
        console.log(event.target.value); // Log giá trị đã chọn
    };

    return (
        <div className="flex">
            <FontAwesomeIcon icon={faCalendarDays} color="orange" className="h-6 my-auto mx-2" />
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
                {attributeValues.map((attribute, index) => (
                    <option
                        className="font-roboto capitalize"
                        key={`${attribute.label}-${index}`}
                        value={attribute.value}
                        data-e2e={attribute.value}
                    >
                        {attribute.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
export default ChoiseDay;