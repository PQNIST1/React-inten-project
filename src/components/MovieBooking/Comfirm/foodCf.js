import React from "react";
import Food from "../../Info/Booking/foodDetail";



const FoodCf = () => {
    return (
        <div className="w-1/2">
            <div className="pl-5">
                <p className="text-lg font-bold mb-2">Đồ ăn</p>
                <div className="">
                    <Food/>
                    <Food/>
                    <Food/>
                    <Food/>
                </div>
                <div className="border-t-2 border-dotted flex space-x-20 pt-5 mt-5 ">
                    <div className="">
                        <p className="font-bold">Số lượng</p>
                        <p>4</p>
                    </div>
                    <div className="capitalize">
                        <p className="font-bold">Tổng cộng</p>
                        <p>356.000 VNĐ</p>
                    </div>
                </div>


            </div>
        </div>
    )
}
export default FoodCf;