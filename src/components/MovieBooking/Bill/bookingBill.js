import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleNext, handlePrev, setActiveTab } from "../../../controller/SliceReducer/tab";
import { useNavigate } from "react-router-dom";
import MovieBill from "./movieBill";
import MovieNull from "./movieNull";


const getTotalFoodPrice = (selectedFood) => {
    return selectedFood.reduce((total, food) => total + (food.quantity), 0);
};
const BookingBill = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const activeTab = useSelector((state) => state.tab.activeTab);
    const tabs = useSelector((state) => state.tab.tabs);
    const selectedSingleSeats = useSelector((state) => state.movie.selectedSingleSeats);
    const selectedDate = useSelector((state) => state.movie.selectedDate);
    const selectedTime = useSelector((state) => state.movie.selectedTime);
    const selectedMovieName = useSelector((state) => state.movie.selectedMovieName);
    const selectedMovieImg = useSelector((state) => state.movie.selectedMovieImg);
    const selectedDoubleSeats = useSelector((state) => state.movie.selectedDoubleSeats);
    const selectedVipSeats = useSelector((state) => state.movie.selectedVipSeats);
    const selectedFood = useSelector(state => state.movie.selectedFood);
    const totalFoodPrice = getTotalFoodPrice(selectedFood);
    const getTotal = selectedSingleSeats.length + selectedDoubleSeats.length + selectedVipSeats.length + totalFoodPrice;
    const handlePrevClick = () => {
        const currentIndex = tabs.indexOf(activeTab);
        if (currentIndex === 0) {
            navigate('/');
            dispatch(setActiveTab('profile'))
        } else {
            dispatch(handlePrev());
        }
    };

    const handleNextClick = () => {
        if (selectedDate !== '' && selectedMovieName !== '' && activeTab === 'movie') {
            dispatch(handleNext()); 
        } else if (activeTab === 'seat' && getTotal > 0) {
            dispatch(handleNext()); 
        } else if ( activeTab === 'food') {
            dispatch(handleNext());
        } else if ( activeTab === 'payment') {
            dispatch(handleNext());
        }
    };
    return (
        <div className="space-y-5">
            {selectedMovieName === '' ? <MovieNull /> :
                <MovieBill date={selectedDate} time={selectedTime} name={selectedMovieName} img={selectedMovieImg} sseats={selectedSingleSeats} dseats={selectedDoubleSeats} vseats={selectedVipSeats} food={selectedFood} active={activeTab} />
            }
            <div className="border-t-2 border-dotted h-full pt-5">
                <div className="flex text-lg font-bold">
                    <div className="w-1/2">
                        <p className="capitalize">Tổng cộng</p>
                    </div>
                    <div className="w-1/2 flex justify-end">
                        <p className="text-orange-400">
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(70000 * getTotal)}
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex">
                <button onClick={handlePrevClick} className="w-1/2 text-orange-400 text-lg p-2 hover:text-white">Quay lại</button>
                <button onClick={handleNextClick} className={`w-1/2 text-white text-lg bg-orange-400 rounded p-2 hover:bg-orange-300 ${selectedMovieName !== '' && selectedDate !== '' && getTotal > 0 ? '' : 'cursor-not-allowed'}`}>
                    {activeTab === 'comfirm' ? 'Thanh toán' : 'Tiếp tục'}
                </button>
            </div>
        </div>

    )
}
export default BookingBill;