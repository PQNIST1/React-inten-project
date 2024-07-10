import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setName, setPrice, setImage, addFood, clearForm } from '../../../controller/SliceReducer/addFood';
import { getFood } from "../../../controller/SliceReducer/food";

const FoodForm = () => {
    const dispatch = useDispatch();
    const form = useSelector((state) => state.addFood);
    const { name, price, image, loading, error, success } = form;
    const [fileInputKey, setFileInputKey] = useState(Date.now());
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            dispatch(setImage(files[0]));
        } else if (name === 'name') {
            dispatch(setName(value));
        } else if (name === 'price') {
            dispatch(setPrice(value));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', name);
        data.append('price', price);
        data.append('file', image);
        dispatch(addFood(data));
        dispatch(clearForm());
        setFileInputKey(Date.now());
    };
    return (
        <div>
            <div className="dark:bg-gray-900 bg-gray-100 flex justify-center items-center">
                <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-md shadow-lg">
                    <h2 className="text-3xl font-semibold text-center mb-6 dark:text-white">Thêm đồ ăn</h2>
                    <form className="" onSubmit={handleSubmit}>
                        <div className="relative border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md px-8  py-8 space-y-5">
                            <div>
                                <label htmlFor="name">Tên</label>
                                <input id="name" name="name" value={name} onChange={handleChange} className="bg-transparent border w-full h-10 rounded focus:outline-none px-2" type="text" required></input>
                            </div>
                            <div>
                                <label htmlFor="price">Giá</label>
                                <input id="price" name="price" value={price} onChange={handleChange} className="bg-transparent border w-full h-10 rounded focus:outline-none px-2" type="number" required></input>
                            </div>
                            <div>
                                <label htmlFor="image">Hình ảnh</label>
                                <input key={fileInputKey}  id="image" name="image" onChange={handleChange} className="mt-2 block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-teal-500 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-teal-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60" type="file" required></input>
                            </div>
                        </div>
                        <button type="submit" className="mb-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-md w-full mt-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-500 dark:focus:ring-opacity-50">
                            {loading ? (
                                <div className="flex justify-center items-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <p>Đang thêm....</p>
                                </div>
                            ) : (
                                'Thêm'
                            )}
                        </button>
                        {error && error.error && <p style={{ color: 'red' }}>{error.error}</p>}
                        {success && <div className="mt-4 text-green-500">Tải lên thành công!</div>}
                    </form>
                </div>
            </div>
        </div>
    )
}
export default FoodForm;