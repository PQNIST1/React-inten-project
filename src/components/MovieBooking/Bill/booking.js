import React, { useEffect } from "react";
import BookingTabs from "./bookingTab";
import RomCtr from "../Room/roomCtr";
import TimeBooking from "../timeBooking";
import BookingBill from "./bookingBill";
import { useSelector } from "react-redux";
import FoodList from "../Food/foodList";
import Payment from "../Payment/payment";
import Comfirm from "../Comfirm/comfirm";
import MovieDrop from "../Drop/moiveDrop";


const Seat = () => {
    const accessToken = localStorage.getItem('accessToken');
    useEffect(() => {
        if (!accessToken) {
            window.location.href = '/login';
        }
    }, [accessToken]);
    return (
        <div className="w-full">
            <TimeBooking />
            <RomCtr />
        </div>
    )
}



const Booking = () => {
    const activeTab = useSelector((state) => state.tab.activeTab);
    return (
        <div className="w-5/6 m-auto  mt-10 mb-10 ">
            <BookingTabs />
            <div className="flex">
                <div className="w-4/6">
                    {activeTab === 'movie' && <MovieDrop />}
                    {activeTab === 'seat' &&  <Seat />}
                    {activeTab === 'food' && <FoodList />}
                    {activeTab === 'payment' && <Payment />}
                    {activeTab === 'comfirm' && <Comfirm />}
                </div>
                <div className=" w-1/3">
                    <BookingBill />
                </div>
            </div>


        </div>
    )
}
export default Booking;

