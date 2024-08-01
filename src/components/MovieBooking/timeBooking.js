import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedTime } from "../../controller/SliceReducer/booking";



const TimeBooking = () => {
    const dispatch = useDispatch();
    const showtimes = useSelector((state) => state.movie.showtimes);
    const selectedTime = useSelector((state) => state.movie.selectedTime);
    const handleClick = (data) => {
        dispatch(setSelectedTime(data));
    }
    return (
        <div className="w-5/6 flex space-x-10 mb-5">
            <div className="capitalize my-auto">đổi xuất chiếu</div>
            <div className="flex space-x-5 text-sm">
                {showtimes && (
                    <>
                        {showtimes.map((data) => (
                            <button key={data.time} onClick={() => handleClick(data)} className={`border rounded py-2 px-5  ${selectedTime.time === data.time ? 'bg-orange-400 text-white' : 'hover:bg-orange-400 hover:text-white'}`}>{data.time}</button>
                        ))}
                    </>
                )}

            </div>
        </div>
    )
}
export default TimeBooking;