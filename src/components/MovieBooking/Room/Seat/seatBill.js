import React from "react";

const SeatBill = () => {
    return (
        <div className="border-t-2 border-dotted h-full pt-5">
        <div className="flex">
            <div className="w-1/2">
                <p><span className="font-bold">1x </span>Ghế đơn</p>
                <p>Ghế: <span className="font-bold">N10</span></p>
            </div>
            <div className="w-1/2 flex justify-end">
                <p >70.000 <span className="border-b-2  border-gray-400">đ</span></p>
            </div>
        </div>
    </div>
    )
}
export default SeatBill;