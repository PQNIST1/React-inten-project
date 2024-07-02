import React from "react";

const Food = ({data}) => {
    return (
        <div className="flex mb-4">
            <img src="https://cdn.galaxycine.vn/media/2024/3/29/menuboard-coonline-2024-combo1-copy-min_1711699814762.jpg" alt="" className="h-20 rounded" />
            <div className="text-sm ml-2">
                <p className="font-bold">{data.foodId}</p>
                <p >01 Ly nước ngọt size L + 01 Hộp bắp</p>
                <p className="font-bold">Giá: 89.000 ₫  - <span>SL: {data.quantity}</span></p>
            </div>
        </div>
    )
}
export default Food;