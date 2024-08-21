import React from "react";
import { imageUrl } from  "../../../controller/SliceReducer/img";

const Food = ({ data }) => {

    return (
        <div className="flex mb-4">
            <img src={`${imageUrl}${data.image}`} alt="" className="h-20 rounded w-36" />
            <div className="text-sm ml-2">
                <p className="font-bold">{data.foodId}</p>
                <p className="font-bold">Giá: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(data.price)} - <span>SL: {data.quantity}</span></p>
            </div>
        </div>
    )
}
export default Food;