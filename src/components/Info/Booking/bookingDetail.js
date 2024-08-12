import React, { useEffect } from "react";
import QrTicket from "./qrTicket";
import FoodBooking from "./food";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBooking } from "../../../controller/SliceReducer/payment";

const BookingTicket = () => {
    const dispatch = useDispatch();
    const { prama } = useParams();
    const booking = useSelector((state) => state.payment.booking);
    useEffect(() => {
        dispatch(getBooking(prama));
    }, [dispatch, prama])
    return (
        <div className="w-5/6  m-auto mt-10 mb-10 flex justify-center items-center">
            <div className="border rounded w-2/3 h-1/2 p-10 flex">
                {booking?.data && (
                    <>
                        <QrTicket booking={booking} />
                        <FoodBooking booking={booking} />
                    </>
                )}


            </div>
        </div>
    )
}
export default BookingTicket;