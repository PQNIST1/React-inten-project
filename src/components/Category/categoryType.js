import React from "react";
import { useState } from "react";


const CategoryType = () => {
    const [selectedValue, setSelectedValue] = useState(""); // State để lưu giá trị đã chọn từ dropdown

    const attributeValues = [
        { label: "Gia đình", value: "action" },
        { label: "Hài hước", value: "comedy" },
        { label: "Drama", value: "drama" },
        { label: "Tình cảm", value: "drama" },
        { label: "Hành dộng", value: "drama" },
       
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
                    Thể loại
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
export default CategoryType;