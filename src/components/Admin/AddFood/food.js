import React, { useState, useEffect } from "react";
import { ImgController } from "../../../controller/SliceReducer/img";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { useDispatch } from "react-redux";
import { deleteFood } from "../../../controller/SliceReducer/addFood";

const Food = ({ data }) => {
    const dispatch = useDispatch();
    const [imageSrc, setImageSrc] = useState('');
    useEffect(() => {
        const imgData = data.image;
        const imageUrl = ImgController(imgData);
        setImageSrc(imageUrl);
        return () => URL.revokeObjectURL(imageUrl);
    }, [data]);
    const handleDelete = (id) => {
        dispatch(deleteFood(id));
    };
    return (
        <div className="flex">
            <div className="flex mb-4 w-3/4">
                <img src={imageSrc} alt="" className="h-24 w-44 rounded" />
                <div className="text-sm ml-3 space-y-2">
                    <p className="font-bold">{data.name}</p>
                    <p className="text-sm">{data.detail}</p>
                    <p className="font-bold">Giá: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(data.price)}
                    </p>
                </div>


            </div>
            <div className=" w-1/3 h-24  flex text-2xl space-x-5 ">
                <button className="hover:text-blue-700"><FontAwesomeIcon icon={faPenToSquare}  className="text-indigo-500" /></button>
                <button onClick={() => handleDelete(data.id)} className="hover:text-blue-700"><FontAwesomeIcon icon={faTrashCan} className="text-red-600"/></button>
            </div>
        </div>
    )
}
export default Food;