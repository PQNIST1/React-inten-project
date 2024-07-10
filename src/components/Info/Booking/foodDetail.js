import React from "react";
import { useEffect, useState } from "react";
import {ImgController} from '../../../controller/SliceReducer/img';

const Food = ({ data }) => {
    const [imageSrc, setImageSrc] = useState('');
    useEffect(() => {
        const imgData = data.image;
        const imageUrl = ImgController(imgData);
        setImageSrc(imageUrl);
        return () => URL.revokeObjectURL(imageUrl);
    }, [data]);
    return (
        <div className="flex mb-4">
            <img src={imageSrc} alt="" className="h-20 rounded" />
            <div className="text-sm ml-2">
                <p className="font-bold">{data.foodId}</p>
                <p className="font-bold">Giá: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(data.price)} - <span>SL: {data.quantity}</span></p>

            </div>
        </div>
    )
}
export default Food;