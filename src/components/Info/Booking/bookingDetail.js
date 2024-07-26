import React from "react";
import QrTicket from "./qrTicket";
import FoodBooking from "./food";

const BookingTicket = () => {
    return (
        <div className="w-5/6  m-auto mt-10 mb-10 flex justify-center items-center">
            <div className="border rounded w-2/3 h-1/2 p-10 flex">
                <QrTicket />
                <FoodBooking/>
            </div>
        </div>
    )
}
export default BookingTicket;