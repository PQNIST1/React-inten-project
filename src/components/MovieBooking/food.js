import React from "react";
import { useState } from "react";


const Food = () => {
    const [count, setCount] = useState(0);

    const handleIncrement = () => {
        setCount(count + 1);
    };

    const handleDecrement = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    };
    return(
        <div className="flex">
        <div className="flex mb-4 w-1/2">
            <img src="https://cdn.galaxycine.vn/media/2024/3/29/menuboard-coonline-2024-combo1-copy-min_1711699814762.jpg" alt="" className="h-24 rounded" />
            <div className="text-sm ml-3 space-y-2">
                <p className="font-bold">iCombo 1 Big STD</p>
                <p className="text-sm">01 Ly nước ngọt size L + 01 Hộp bắp</p>
                <p className="font-bold">Giá: 89.000 ₫</p>
            </div>
        </div>
        <div className="flex w-1/2 justify-end text-lg space-x-5 pr-24 pt-6">
            <div>
                <button className="px-2" onClick={handleDecrement}>-</button>
            </div>
            <p>{count}</p>
            <div>
                <button className="px-2" onClick={handleIncrement}>+</button>
            </div>
        </div>
    </div>
    )
}
export default Food;