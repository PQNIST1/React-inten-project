import React from "react";

const FoodBillDetail = ({ data }) => {
    return (
        <div className="flex">
            <div className="w-1/2">
                <p className=""><span className="font-bold"><span>{data.quantity}</span>x </span>{data.foodId}</p>
            </div>
            <div className="w-1/2 flex justify-end">
                <p className="">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(70000 * data.quantity)}
                </p>

            </div>
        </div>
    )
}
export default FoodBillDetail;