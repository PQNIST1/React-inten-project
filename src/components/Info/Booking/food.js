import React from "react";
import Food from "./foodBooking";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const FoodBooking = ({booking}) => {
    const calculateTotalPrice = (items) => {
        return items.reduce((total, item) => total + item.price , 0);
    };    
    return (
        <div className="w-1/2  h-96 pl-5">
            <p className="text-lg font-bold mb-2">Đồ ăn</p>
            <div className="">
                {booking.data.object.orders.map((item)=> (
                    <>
                    <Food data={item.food} amount={item.amount} /> 
                    </>
                ))}
                {/* <Food /> */}
                {/* <Food />
                <Food />
                <Food /> */}
            </div>
            <div className="border-t-2 border-dotted flex space-x-20 pt-5 mt-5 ">
                <div className="">
                    <p className="font-bold">Số lượng</p>
                    <p>{(booking.data.object.orders).length}</p>
                </div>
                <div className="capitalize">
                    <p className="font-bold">Tổng cộng</p>
                    <p>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(calculateTotalPrice(booking.data.object.orders))}</p>
                </div>
            </div>
            <div className=" flex mt-24 justify-end items-center">
                <div >
                    <Link to={"/info/#history"} className="bg-orange-500 text-white rounded p-3 space-x-2">
                        <FontAwesomeIcon icon={faArrowLeft} className="" />
                        <button className="">Quay lại</button>
                    </Link>
                </div>
            </div>

        </div>
    )
}
export default FoodBooking;