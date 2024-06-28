import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleNext,handlePrev } from "../../controller/SliceReducer/tab";
import SeatBill from "./seatBill";

const BookingBill = () => {
    const dispatch = useDispatch();
    const activeTab = useSelector((state) => state.tab.activeTab);
    return (
        <div className="space-y-5">
            <div className=" flex">
                <img src="https://cdn.galaxycine.vn/media/2024/6/4/mua-he-dep-nhat-2_1717486022304.jpg" alt="" className="h-52 rounded" />
                <div className="capitalize ml-3">
                    <div className="flex">
                        <p className="text-lg font-bold">Mùa hè đẹp nhất</p>
                        <span className="ml-5  bg-orange-500 text-white font-bold rounded h-7 px-2">T18</span>
                    </div>
                </div>
            </div>
            <div className="space-y-5 mt-3">
                <p className="font-bold text-lg">Cinema Center - Rạp 2</p>
                <p className="text-lg">Suất: <span className="font-bold">11:30</span> - Thứ Năm, <span className="font-bold">27/6/2024</span></p>
            </div>
            <SeatBill/>
            <div className="border-t-2 border-dotted h-full pt-5">
                <div className="flex text-lg font-bold">
                    <div className="w-1/2">
                        <p className="capitalize">Tổng cộng</p>
                    </div>
                    <div className="w-1/2 flex justify-end">
                        <p className="text-orange-400">70.000 <span className="border-b-2  border-orange-400">đ</span></p>
                    </div>
                </div>
            </div>
            <div className="flex">
                <button  onClick={() => dispatch(handlePrev())}  className="w-1/2 text-orange-400 text-lg p-2 hover:text-white">Quay lại</button>
                <button onClick={() => dispatch(handleNext())}  className="w-1/2 text-white text-lg bg-orange-400 rounded p-2 hover:bg-orange-300">Tiếp tục</button>
            </div>
        </div>

    )
}
export default BookingBill;