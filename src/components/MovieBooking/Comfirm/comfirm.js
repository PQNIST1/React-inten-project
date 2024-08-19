import React from "react";
import MovieCf from "./moiveCf";
import FoodCf from "./foodCf";
import { useSelector } from "react-redux";

const Comfirm = () => {
    const payment = useSelector((state) => state.payment.paymentMethod);
    return (
        <div className="w-full">
            <div className="flex pr-10">
                <MovieCf />
                <FoodCf />

            </div>
            <div className="space-y-3">
                <p className="mt-5">Phương thức thanh toán:</p>
                <div className="flex space-x-3">
                    <img src={payment.image} alt="" className="h-10" />
                    <p className="m-auto">{payment.name}</p>
                </div>
            </div>
        </div>
    )
}
export default Comfirm;
