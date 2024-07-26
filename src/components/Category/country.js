import React from "react";
import { useState } from "react";

const Country = () => {
    const [selectedValue, setSelectedValue] = useState(""); // State để lưu giá trị đã chọn từ dropdown

    const attributeValues = [
        { label: "Việt Nam", value: "action" },
        { label: "Hàn Quốc", value: "comedy" },
        { label: "Trung Quốc", value: "drama" },
        { label: "Đài Loan", value: "drama" },
        { label: "Mỹ", value: "drama" },
       
        // Thêm các giá trị khác nếu cần
    ];

    const attributeName = "movieAttribute"; // Tên attribute dùng cho data-e2e
    const onChangeAttribute = (event) => {
        setSelectedValue(event.target.value); // Cập nhật giá trị đã chọn khi dropdown thay đổi
        console.log(event.target.value); // Log giá trị đã chọn
    };

    return (
        <div className="flex">
            <select
                value={selectedValue}
                data-e2e={attributeName}
                onChange={(event) => onChangeAttribute(event)}
                className="p-[9px]  bg-transparent w-96 h-full focus:outline-none border"
            >
                <option
                    className="font-roboto capitalize"
                    value=""
                    data-e2e="default"
                    disabled
                    hidden
                >
                        Quốc gia
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
export default Country;