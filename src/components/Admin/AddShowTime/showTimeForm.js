import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {  clearForm, setSuccess, setError, editShowTime, addShowTime, clearShowtimes } from "../../../controller/SliceReducer/addShowTime";
import { clearForm as clear } from "../../../controller/SliceReducer/specialDay";
import MyDatePicker from "../SpecialDay/selectDay";
import RoomSelect from "../Room/CreatSeat/selected";
import MovieSelect from "./selectMovie";
import ShowtimeManager from "./time";

const formatDate = (dateString) => {
    return dateString.split('T')[0];
};
const ShowTimeForm = () => {
    const dispatch = useDispatch();
    const form = useSelector((state) => state.showTime);
    const { movie, room, loading, error, success, id, isEdit, showtimes } = form;
    const { dateStart, dateEnd} = useSelector((state) => state.special);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (movie && dateStart && dateEnd && Array.isArray(showtimes) && showtimes.length > 0) { 
            const data = {
                "startDate":formatDate(dateStart),  
                "endDate": formatDate(dateEnd),
                "movie": {
                    id: movie.value
                },
                "room": {
                    id: room.value
                },
                "times": showtimes,
            }
            dispatch(addShowTime(data));
            dispatch(clearForm());
            dispatch(clear());
            dispatch(clearShowtimes());
            setTimeout(() => {
                dispatch(setSuccess());
                dispatch(setError());
            }, 3000);
        }
      
    };
    const handleUpdate = (e) => {
        e.preventDefault();
        const data = {
           "startDate": formatDate(dateStart),
            "endDate": formatDate(dateEnd),
            "movie": {
                id: movie.value
            },
            "room": {
                id: room.value
            }
        }
        dispatch(editShowTime({ id, data }));
        dispatch(clearForm());
        setTimeout(() => {
            dispatch(setSuccess());
            dispatch(setError());
        }, 3000);
    };
    const handleEdit = () => {
        dispatch(clearForm());
    };
    return (
        <div className="w-full">
            <div className="dark:bg-gray-900 bg-gray-100 flex justify-center items-center mt-10 mb-10 w-full">
                <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-md shadow-lg w-full">
                    {isEdit ? (
                        <h2 className="text-3xl font-semibold text-center mb-6 dark:text-white">Cập nhập </h2>
                    ) : (
                        <h2 className="text-3xl font-semibold text-center mb-6 dark:text-white">Thêm Lịch</h2>
                    )}
                    <form className="" onSubmit={isEdit ? handleUpdate : handleSubmit}>
                        <div className="relative border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md px-8  py-8 space-y-5">
                            <div>
                                <label htmlFor="name">Phim</label>
                                <div className="custom">
                                    <MovieSelect/>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="name">Phòng</label>
                                <div>
                                    <RoomSelect/>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="name">Ngày tồn tại</label>
                                <div className="input-date">
                                    <MyDatePicker />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="name">Xuất chiếu</label>
                                <div>
                                    <ShowtimeManager />
                                </div>
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
export default ShowTimeForm;