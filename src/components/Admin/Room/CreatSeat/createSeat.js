import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSeatType } from '../../../../controller/SliceReducer/seat';
import { setDimensions, toggleSelectSeat, setSeatsType, clearSelectedSeats, resetSeats, saveSeats, editSeats, setResult, } from '../../../../controller/SliceReducer/seatsSlice';
import { setRoomCtr } from '../../../../controller/SliceReducer/addShowTime';





const CreateSeat = () => {
    const dispatch = useDispatch();
    const { rows, cols, seats, selectedSeats, isSaved } = useSelector(state => state.seats);
    const [dimensions, setDimensionsInput] = useState({ rows: 0, cols: 0 });
    const seatss = useSelector((state) => state.seat.data);
    useEffect(() => {
        dispatch(getSeatType());
        setDimensionsInput({ rows: rows, cols: cols});
        dispatch(setRoomCtr(true));
    }, [dispatch, rows, cols]);

    const getSeatNumbers = (row) => {
        let seatNumber = 1;
        return seats[row].map(seat => {
            if (seat !== null) {
                return seatNumber++;
            } else {
                return null;
            }
        });
    };



    const handleInputChange = (e) => {
        setDimensionsInput({
            ...dimensions,
            [e.target.name]: parseInt(e.target.value, 10),
        });
    };

    const handleSetDimensions = () => {
        dispatch(setDimensions(dimensions));
    };

    const handleToggleSelectRow = (row) => {
        const allSelected = Array.from({ length: cols }, (_, col) => selectedSeats.some(s => s.row === row && s.col === col)).every(Boolean);

        if (allSelected) {
            for (let col = 0; col < cols; col++) {
                dispatch(toggleSelectSeat({ row, col }));
            }
        } else {
            const newSelectedSeats = [];
            for (let col = 0; col < cols; col++) {
                const isSelected = selectedSeats.some(s => s.row === row && s.col === col);
                const isDouble = seats[row][col] === 'double';
                if (!isSelected) {
                    if (isDouble) {
                        newSelectedSeats.push({ row, col });
                        col++;
                    } else {
                        newSelectedSeats.push({ row, col });
                    }
                }
            }
            newSelectedSeats.forEach(seat => dispatch(toggleSelectSeat(seat)));
        }
    };



    const handleToggleSelectSeat = (row, col) => {
        dispatch(toggleSelectSeat({ row, col }));
    };

    const handleSetSeatsType = (type, id) => {
        dispatch(setSeatsType({ type }));
    };

    const handleClearSelectedSeats = () => {
        dispatch(clearSelectedSeats());
    };

    const handleResetSeats = () => {
        dispatch(resetSeats());
    };

   

    const handleSaveSeats = () => {


        // const totalSeats = rows * cols;
        // const assignedSeats = seats.flat().filter(seat => seat !== null).length;
        // const assignedPercentage = (assignedSeats / totalSeats) * 100;

        const rowsNotEmpty = seats.every(row => row.some(seat => seat !== null));

        if ( rowsNotEmpty) {
            dispatch(saveSeats());
        } else {
            alert("Can't save!");
        }

    };



    const handleEditSeats = () => {
        dispatch(editSeats());
    };

    const generateRowLetters = () => {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return Array.from({ length: rows }, (_, index) => letters[index]).reverse();
    };
    // Khởi tạo mảng lưu trữ trạng thái ghế đơn, ghế đôi trái và ghế đôi phải cho từng hàng
    const doubleSeatStates = [];

    const renderSeatContent = (seat, row, col, seatNumber) => {
        const cols = seats[row].length;
        const isSelected = selectedSeats.some(s => s.row === row && s.col === col);

        // Function to determine seat type (single, double left, double right)
        const getSeatType = (row, col) => {
            if (doubleSeatStates[row] && doubleSeatStates[row][col]) {
                return doubleSeatStates[row][col];
            }
            return 'single'; // Default to single seat if not set
        };

        // Function to update double seat states
        const updateDoubleSeatStates = (row) => {
            doubleSeatStates[row] = []; // Initialize row if not initialized
            let isLastDouble = false;

            for (let col = 0; col < cols; col++) {
                if (seats[row][col] === 'double') {
                    if (!isLastDouble) {
                        doubleSeatStates[row][col] = 'left';
                    } else {
                        doubleSeatStates[row][col] = 'right';
                    }
                    isLastDouble = !isLastDouble;
                } else {
                    doubleSeatStates[row][col] = 'single';
                    isLastDouble = false;
                }
            }
        };

        // Initialize double seat states for current row if not already initialized
        if (!doubleSeatStates[row]) {
            updateDoubleSeatStates(row);
        }

        // Determine seat type for current seat
        const seatType = getSeatType(row, col);

        // Render double seat left
        if (seatType === 'left') {
            return (
                <button
                    key={`${row}-${col}`}
                    className={` flex  border-blue-700 h-3 w-13 rounded border p-2.5 cursor-pointer  text-sm  box-border ${isSaved && isSelected ? 'border-transparent' : isSelected && 'bg-orange-400 border-transparent text-white'}`}
                    style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    onClick={() => {
                        if (!isSaved) {
                            handleToggleSelectSeat(row, col);
                        }
                    }}
                >
                    <div className='mr-3.5'>{seatNumber[col]}</div>
                    <div>{seatNumber[col + 1]}</div>
                </button>
            );
        }

        // Render double seat right
        if (seatType === 'right') {
            return null;
        }
        let buttonClass;

        if (isSaved && isSelected) {
            buttonClass = 'border-transparent';
        } else if (isSelected) {
            buttonClass = 'bg-orange-400 border-transparent text-white';
        } else if (isSaved && !seat) {
            buttonClass = 'border-transparent';
        } else if (seat === 'single') {
            buttonClass = 'border-green-700';
        } else if (seat === 'vip') {
            buttonClass = 'border-orange-400';
        } else {
            buttonClass = 'border-gray-300';
        }
        // Render single seat or non-double pair seat
        return (
            <button
                key={`${row}-${col}`}
                className={`rounded text-sm h-3 w-3 border p-2.5 cursor-pointer ${buttonClass}`}
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                onClick={() => {
                    if (!isSaved) {
                        handleToggleSelectSeat(row, col);
                    }
                }}
            >
                {seatNumber[col]}
            </button>

        );

    };




    return (
        <div className="container mx-auto p-4  w-3/4">

            <div className='flex mb-5  h-10'>
                <div className='text-xl text-blue-700 mr-10'><h1>Tạo Phòng Ghế</h1></div>
                {
                    !isSaved && (
                        <div className="">
                            <input
                                type="number"
                                name="rows"
                                value={dimensions.rows}
                                onChange={handleInputChange}
                                placeholder="Số dòng"
                                className="border p-1 mr-2 bg-transparent rounded"
                            />
                            <input
                                type="number"
                                name="cols"
                                value={dimensions.cols}
                                onChange={handleInputChange}
                                placeholder="Số cột"
                                className="border p-1 mr-2 bg-transparent rounded"
                            />
                            <button onClick={handleSetDimensions} className="bg-orange-400 text-white p-1 rounded">Tạo Phòng</button>
                        </div>
                    )
                }

            </div>


            {seats.length > 0 && (
                <div>
                    <div className="grid gap-2 items-center justify-center " >
                        {generateRowLetters().map((letter, rowIndex) => {
                            const seatNumbers = getSeatNumbers(rowIndex);
                            return (
                                <div key={`row-${rowIndex}`} className="flex items-center justify-center">
                                    <button className="w-5 cursor-pointer" onClick={() => !isSaved && handleToggleSelectRow(rowIndex)}>{letter}</button>
                                    <div className="grid gap-2 px-4" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
                                        {seats[rowIndex].map((seat, colIndex) => (
                                            <React.Fragment key={`${rowIndex}-${colIndex}`}>
                                                {renderSeatContent(seat, rowIndex, colIndex, seatNumbers)}
                                            </React.Fragment>
                                        )).filter(content => content !== null)}
                                    </div>
                                    <button className="w-5 cursor-pointer" onClick={() => !isSaved && handleToggleSelectRow(rowIndex)}>{letter}</button>

                                </div>
                            );
                        })}
                        <div className="border-b-2  border-orange-400  text-center mt-10 pb-2 mb-5">
                            <p>Màn Hình</p>
                        </div>
                        <div className="flex">
                            <div className="flex space-x-4 justify-end">
                                <div className="w-5 h-5 rounded border border-orange-400 ">
                                </div>
                                <p className="">Ghế vip</p>
                                <div className="w-5 h-5 rounded border border-green-700 ">
                                </div>
                                <p className="">Ghế đơn</p>
                                <div className="w-10 h-5 rounded border border-blue-700 ">
                                </div>
                                <p className="">Ghế đôi</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex mt-4 h-24">
                        {!isSaved && (
                            <>
                                <div className='m-auto'>
                                    <div className='mb-3'><p>Đặt kiểu ghế</p></div>
                                    <div className='flex gap-2'>
                                        {seatss.data?.content?.map((item) => (
                                            <button
                                                key={item.id}
                                                onClick={() => handleSetSeatsType(item.object.name)}
                                                className={`rounded border-2  text-white p-2 m-2 w-20 ${item.object.name === 'single' ? 'border-green-700' : item.object.name === 'vip' ? 'border-orange-400' : 'border-blue-700'}`}
                                            >
                                                {item.object.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className='m-auto'>
                                    <div className='mb-3'><p>Thiết lập</p></div>
                                    <div className='flex gap-2'>
                                        <button onClick={handleClearSelectedSeats} className="border-yellow-500 border-2 rounded text-white p-2">Bỏ Chọn Kiểu Ghế</button>
                                        <button onClick={handleResetSeats} className="border-red-500 border-2 rounded text-white p-2">Reset Phòng</button>
                                        <button onClick={handleSaveSeats} className="border-purple-500 border-2 rounded text-white p-2">Lưu</button>
                                    </div>
                                </div>

                            </>
                        )}
                        {
                            isSaved && (
                                <div className='w-5/6 flex  justify-end h-10'>
                                    <button onClick={handleEditSeats} className="border-pink-500 border-2 rounded text-white p-2">Sửa</button>
                                </div>

                            )
                        }
                    </div>
                </div>
            )
            }
        </div >
    );
}

export default CreateSeat;
