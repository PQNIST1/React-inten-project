import React from "react";


const Food = ({ data, amount }) => {

    return (
        <div className="flex mb-4">
            <img src={`http://localhost:8080${data.image}`} alt="" className="h-20 rounded w-36" />
            <div className="text-sm ml-2">
                <p className="font-bold">{data.name}</p>
                <p className="font-bold">Giá: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(data.price)} - <span>SL: {amount}</span></p>
            </div>
        </div>
    )
}
export default Food;