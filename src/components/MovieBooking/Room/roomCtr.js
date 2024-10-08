import React from "react";
import Seats from "./seats";
import { useSelector } from "react-redux";

const RomCtr = () => {
    const { seats } = useSelector(state => state.seatsEdit);
    return (
        <div className="">
            <Seats />
            {seats.length > 0 && (
                <>
                    <div className="w-11/12 border-b-2  border-orange-400  text-center mt-10 pb-2 mb-5">
                        <p>Màn Hình</p>
                    </div>
                    <div className="flex w-11/12">
                        <div className="flex w-1/2 space-x-4">
                            <div className="w-5 h-5 rounded bg-gray-500 ">
                            </div>
                            <p className="">Ghế đã bán</p>
                            <div className="w-5 h-5 rounded bg-orange-400 ">
                            </div>
                            <p className="">Ghế đang chọn</p>
                        </div>
                        <div className="flex w-1/2 space-x-4 justify-end">
                            <div className="w-5 h-5 rounded border border-orange-400 ">
                            </div>
                            <p className="">Ghế vip</p>
                            <div className="w-5 h-5 rounded border border-green-700 ">
                            </div>
                            <p className="">Ghế đơn</p>
                            <div className="w-10 h-5 rounded border border-blue-700 ">
                            </div>
                            <p className="">Ghế đôi</p>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
export default RomCtr;