import React from "react";
import { splitDateTime } from "../../../controller/SliceReducer/img";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { deleteFood, setEdit, setError, setId, setImage, setName, setPrice, setSuccess, clearForm } from "../../../controller/SliceReducer/addFood";

const Food = ({ data, pp }) => {
    const dispatch = useDispatch();
    const form = useSelector((state) => state.addFood);
    const { isEdit, id } = form;
    const handleDelete = (id) => {
        dispatch(deleteFood(id));
        setTimeout(() => {
            dispatch(setSuccess());
            dispatch(setError());
        }, 3000);
        dispatch(clearForm());
    };
    const handleUpdate = (idd) => {
        if (isEdit && idd === id) {
            dispatch(setEdit(false));
            dispatch(clearForm());
        } else {
            dispatch(setId(idd));
            dispatch(setEdit(true));
            dispatch(setName(data.name));
            dispatch(setPrice(data.price));
            dispatch(setImage(data.image));
        }
    }
    return (
        <div className="flex">
            <div className="flex mb-4 w-3/4">
                <img src={`http://localhost:8080${data.image}`} alt="" className="h-24 w-44 rounded" />
                <div className="text-sm ml-3 space-y-2">
                    <p className="font-bold">{data.name}</p>
                    <p className="text-sm">{data.detail}</p>
                    <p className="font-bold">Giá: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(data.price)}
                    </p>
                    <div className="flex text-tn gap-2">
                        <div>
                            <p>Tạo: {pp.createdBy.name}</p>
                            <p> {splitDateTime(pp.createdAt)}</p>
                        </div>
                        <div>
                            {pp.updatedBy && (
                                <div>
                                    <p>Sửa: {pp.updatedBy.name}</p>
                                    <p> {splitDateTime(pp.updatedAt)}</p>
                                </div>
                            )}
                        </div>

                    </div>
                </div>


            </div>
            <div className=" w-1/3 h-24  flex text-2xl space-x-5 ">
                <button onClick={() => handleUpdate(data.id)} className="hover:text-blue-700"><FontAwesomeIcon icon={faPenToSquare} className={`${isEdit && id === data.id ? 'text-orange-500' : 'text-indigo-500'}`}
                /></button>
                <button onClick={() => handleDelete(data.id)} className="hover:text-blue-700"><FontAwesomeIcon icon={faTrashCan} className="text-red-600" /></button>
            </div>
        </div>
    )
}
export default Food;