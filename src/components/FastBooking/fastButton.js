import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const FastButton = () => {
    const navigate = useNavigate();
    const selectedDate = useSelector((state) => state.movie.selectedDate);
    const selectedTime = useSelector((state) => state.movie.selectedTime);
    const selectedMovieName = useSelector((state) => state.movie.selectedMovieName);
    const accessToken = localStorage.getItem('accessToken');
    const handleNext = () => {
        if (selectedTime  !== '' && selectedDate !== '' && selectedMovieName !== '' && accessToken) {
            navigate('/booking/#seat');
        } else {
            navigate('/login');
        }
    }

    return (
        <div>
                <button onClick={handleNext} className="w-40 h-full bg-blue-700 rounded capitalize text-white hover:bg-blue-600">đặt vé nhanh</button>
        </div>
    )
}
export default FastButton;