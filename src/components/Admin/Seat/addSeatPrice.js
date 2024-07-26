import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { editSeatType, setPrice, clearForm, setName, setCode, addSeatType, setSuccess, setError } from "../../../controller/SliceReducer/seat";
import MyDatePicker from "./clendar";
import DayTypeSelector from "./selectDay";


const AddSeatPrice = () => {
    const dispatch = useDispatch();
    const form = useSelector((state) => state.seat);
    const { isEdit, loading, error, success, price, dateStart, dateEnd, normalDay, weekend, specialDay, earlyShow, name, code, type_id, id } = form;
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'price') {
            dispatch(setPrice(value));
        } else if (name === 'name') {
            dispatch(setName(value));
        } else if (name === 'code') {
            dispatch(setCode(value));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data1 = {
            "normalDay": normalDay,
            "weekend": weekend,
            "specialDay": specialDay,
            "earlyShow": earlyShow,
            "startDate": dateStart,
            "endDate": dateEnd,
            "price": price
        }
        const data = {
            "name": name,
            "code": code,
            "createdAt": "",
            "updatedAt": ""
        }
        dispatch(addSeatType({ data, data1 }));
        dispatch(clearForm());
        setTimeout(() => {
            dispatch(setSuccess());
            dispatch(setError());
        }, 3000);
    };
    const handleUpdate = (e) => {
        e.preventDefault();
        const data1 = {
            "normalDay": normalDay,
            "weekend": weekend,
            "specialDay": specialDay,
            "earlyShow": earlyShow,
            "startDate": dateStart,
            "endDate": dateEnd,
            "price": price
        }
        const data = {
            "name": name,
            "code": code,
            "createdAt": "",
            "updatedAt": ""
        }
        dispatch(editSeatType({ type_id, id, data, data1 }));
        dispatch(clearForm());
        setTimeout(() => {
            dispatch(setSuccess());
            dispatch(setError());
        }, 3000);
    };
    const handleEdit = () => {
        dispatch(clearForm());
    }
    return (
        <div>
            <div className="dark:bg-gray-900 bg-gray-100 flex justify-center items-center mt-10 mb-10">
                <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-md shadow-lg">
                    {isEdit ? (
                        <h2 className="text-3xl font-semibold text-center mb-6 dark:text-white">Cập nhập ghế</h2>
                    ) : (
                        <h2 className="text-3xl font-semibold text-center mb-6 dark:text-white">Thêm ghế</h2>

                    )}
                    <form className="" onSubmit={isEdit ? handleUpdate : handleSubmit}>
                        <div className="relative border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md px-8  py-8 space-y-5">
                            <div>
                                <label htmlFor="name">Loại ghế</label>
                                <input id="name" name="name" value={name} onChange={handleChange} className="bg-transparent border w-full h-10 rounded focus:outline-none px-2" type="text" required></input>
                            </div>
                            <div>
                                <label htmlFor="name">Mã ghế</label>
                                <input id="code" name="code" value={code} onChange={handleChange} className="bg-transparent border w-full h-10 rounded focus:outline-none px-2" type="text" required></input>
                            </div>
                            <div>
                                <label htmlFor="name">Giá</label>
                                <input id="price" name="price" value={price} onChange={handleChange} className="bg-transparent border w-full h-10 rounded focus:outline-none px-2" type="number" required></input>
                            </div>
                            <div>
                                <label htmlFor="name">Ngày tồn tại</label>
                                <div>
                                    <MyDatePicker />

                                </div>
                            </div>
                            <div>
                                <label htmlFor="day">Chọn chương trình</label>
                                <DayTypeSelector />
                            </div>
                        </div>
                        {isEdit ? (
                            <div>
                                <button
                                    type="submit"
                                    className="mb-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-md w-full mt-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-500 dark:focus:ring-opacity-50"
                                >
                                    {loading ? (
                                        <div className="flex justify-center items-center">
                                            <svg
                                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                            <p>Đang chỉnh sửa....</p>
                                        </div>
                                    ) : (
                                        'Chỉnh sửa'
                                    )}
                                </button>
                                <button onClick={handleEdit} type="button" className="mb-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-md w-full mt-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-500 dark:focus:ring-opacity-50">
                                    Hủy
                                </button>
                            </div>

                        ) : (
                            <button
                                type="submit"
                                className="mb-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-md w-full mt-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-500 dark:focus:ring-opacity-50"
                            >
                                {loading ? (
                                    <div className="flex justify-center items-center">
                                        <svg
                                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                        <p>Đang thêm....</p>
                                    </div>
                                ) : (
                                    'Thêm'
                                )}
                            </button>
                        )}
                        {error && error.error && <p style={{ color: 'red' }}>{error.error}</p>}
                        {success && <div className="mt-4 text-green-500">Tải lên thành công!</div>}
                    </form>
                </div>
            </div>
        </div>
    )
}
export default AddSeatPrice;