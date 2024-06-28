import React from "react";

const TimeBooking = () => {
    return (
        <div className="w-5/6 flex space-x-10 mb-5">
            <div className="capitalize my-auto">đổi xuất chiếu</div>
            <div className="flex space-x-5">
                <button className="border rounded py-2 px-5 hover:bg-orange-400 hover:text-white">11:30</button>
                <button className="border rounded py-2 px-5 hover:bg-orange-400 hover:text-white">11:30</button>
                <button className="border rounded py-2 px-5 hover:bg-orange-400 hover:text-white">11:30</button>
                <button className="border rounded py-2 px-5 hover:bg-orange-400 hover:text-white">11:30</button>
            </div>
        </div>
    )
}
export default TimeBooking;