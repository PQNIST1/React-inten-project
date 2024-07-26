import React from "react";
import RoomSelect from "./selected";
import { useDispatch, useSelector } from "react-redux";
import { addSeats, clearForm, setSuccess, setError } from "../../../../controller/SliceReducer/seatsSlice";
import { clearForm as clearForm1 } from "../../../../controller/SliceReducer/addShowTime";

const SelectedRoom = () => {
    const dispatch = useDispatch();
    const form = useSelector((state) => state.seats);
    const { loading, error, success, isSaved, seats } = form;
    const seatss = useSelector((state) => state.seat.data);
    const { room } = useSelector((state) => state.showTime);
    const  generateSeatData = (seats, seatTypes, room) => {
        const result = [];
        // Duyệt qua từng hàng trong ma trận ghế
        seats.forEach((row, rowIndex) => {
            // Duyệt qua từng cột trong hàng hiện tại
            row.forEach((seatTypeCode, columnIndex) => {
                if (seatTypeCode !== null) {
                    // Tìm loại ghế dựa trên mã ghế
                    const seatType = seatTypes.find(type => type.object.name === seatTypeCode);

                    if (seatType) {
                        result.push({
                            name: seatType.object.name,
                            row: rowIndex,
                            column: columnIndex,
                            seatType: { id: seatType.object.id },
                            room: { id: room.value },
                        });
                    }
                }
            });
        });

        return result;
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSaved && room ) {
            const result = generateSeatData(seats, seatss.data.content, room)
            dispatch(addSeats(result));
            dispatch(clearForm());
            dispatch(clearForm1());
            setTimeout(() => {
                dispatch(setSuccess());
                dispatch(setError());
            }, 3000);
        }

    };
    return (
        <div className="dark:bg-gray-900 bg-gray-100 flex justify-center items-center mt-10 mb-10">
            <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-md shadow-lg">
                <h2 className="text-3xl font-semibold text-center mb-6 dark:text-white">Phòng</h2>
                <form className="" onSubmit={handleSubmit}>
                    <div className="relative border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md px-8  py-8 space-y-5">
                        <div className="w-48 space-y-2">
                            <label htmlFor="name">Tên phòng</label>
                            <RoomSelect />
                        </div>
                    </div>

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

                    {error && error.error && <p style={{ color: 'red' }}>{error.error}</p>}
                    {success && <div className="mt-4 text-green-500">Tải lên thành công!</div>}
                </form>
            </div>
        </div>
    )
}

export default SelectedRoom;