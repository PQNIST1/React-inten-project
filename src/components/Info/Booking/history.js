import React from "react";
import Ticket from "./ticket";
import { Link } from "react-router-dom";

const HistoryBooking = () => {
    return (
        <div className="">
            <Link to={'/ticket'}>
                <div className="w-full border-y-2  px-10 py-5 my-10 relative overflow-hidden rounded">
                    <Ticket />
                    <div className=" flex">
                        <img src="https://cdn.galaxycine.vn/media/2024/6/4/mua-he-dep-nhat-2_1717486022304.jpg" alt="" className="h-32 rounded" />
                        <div className="capitalize ml-3">
                            <div className="flex">
                                <p className="text-lg font-bold">Mùa hè đẹp nhất</p>
                                <span className="ml-5  bg-orange-500 text-white font-bold rounded h-7 px-2">T18</span>
                            </div>
                            <div className="space-y-2 mt-3">
                                <p>11:30 - Thứ Năm, 27/6/2024</p>
                                <p>Cinema Center - Rạp 2</p>
                            </div>
                        </div>
                        <div className="ml-32">
                            <img src="https://i.imgur.com/utVCQHK.png" alt="" className="h-32" />
                        </div>
                    </div>
                </div>
            </Link>



        </div>

    )
}
export default HistoryBooking;