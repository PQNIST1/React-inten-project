import React from "react";
import { Link } from "react-router-dom";

const TicketHover = () => {
    return (
        <div className="border rounded shadow-inner z-10  w-64 h-auto bg-white absolute top-20 mt-1 text-gray-400">
            <div className="hover:text-blue-800 p-1 flex hover:bg-yellow-400 hover: bg-opacity-5 hover:border-l-4 hover:border-yellow-500 text-center">
                <img className="h-10 px-1.5" src="https://i.imgur.com/zUj49xa.png" alt="" />
                <p className="m-auto">Ghế Đơn (85.000 VNĐ)</p>
            </div>
            <div className="hover:text-blue-800 p-1 flex hover:bg-yellow-400 hover: bg-opacity-5 hover:border-l-4 hover:border-yellow-500 text-center">
                <img className="h-10" src="https://i.imgur.com/hrjLbOL.png" alt="" />
                <p className="m-auto">
                    Ghế Đôi (190.000 VNĐ)
                </p>
            </div>
            <div className="hover:text-blue-800 p-1 flex hover:bg-yellow-400 hover: bg-opacity-5 hover:border-l-4 hover:border-yellow-500 text-center">
                <img className="h-8 px-1" src="https://i.imgur.com/tVi7abY.png" alt="" />
                <p className="m-auto">Ghế Vip (300.000 VNĐ)</p>
            </div>
        </div>
    )
}

export default TicketHover;