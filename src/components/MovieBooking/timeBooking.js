import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedTime } from "../../controller/SliceReducer/booking";
import { format } from "date-fns";


const TimeBooking = () => {
    const dispatch = useDispatch();
    const showtimes = useSelector((state) => state.movie.showtimes);
    const selectedTime = useSelector((state) => state.movie.selectedTime);
    const handleClick = (data) => {
        dispatch(setSelectedTime(data));
    }
    const formatTime = (date) => {
        return format(new Date(date), 'HH:MM');
    };
    return (
        <div className="w-5/6 flex space-x-10 mb-5">
            <div className="capitalize my-auto">đổi xuất chiếu</div>
            <div className="flex space-x-5 text-sm">
                {showtimes && (
                    <>
                        {showtimes.map((data) => (
                            <button key={data.id} onClick={() => handleClick(data)} className={`border rounded py-2 px-5  ${selectedTime.startTime === data.startTime? 'bg-orange-400 text-white' : 'hover:bg-orange-400 hover:text-white'}`}>{formatTime(data.startTime)}</button>
                        ))}
                    </>
                )}

            </div>
        </div>
    )
}
export default TimeBooking;