import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedDoubleSeats, setSelectedSingleSeats, setSelectedVipSeats } from '../../../controller/SliceReducer/booking';
import { toggleBookingSeat, getSeatRoom, setSeat, setCol, setAlert } from '../../../controller/SliceReducer/seatEdit';
import { getSeatType } from '../../../controller/SliceReducer/seat';
import CustomAlert from "../../Alert/alert";

// Hàm để lấy các hàng
const getRows = (seat) => seat;

// Hàm để lấy các cột
const getColumns = (seat) => {
    const numCols = seat[0].length;
    const columns = [];

    for (let col = 0; col < numCols; col++) {
        const column = [];
        for (let row = 0; row < seat.length; row++) {
            column.push(seat[row][col]);
        }
        columns.push(column);
    }

    return columns;
};

const Seats = () => {
    const dispatch = useDispatch();
    const { seats, selectedSeats, seatsRoom, cols, rows, showAlert } = useSelector(state => state.seatsEdit);
    const selectedSingleSeats = useSelector((state) => state.movie.selectedSingleSeats);
    const selectedDoubleSeats = useSelector((state) => state.movie.selectedDoubleSeats);
    const selectedVipSeats = useSelector((state) => state.movie.selectedVipSeats);
    const maxSeats = 8;
    const selectedTime = useSelector((state) => state.movie.selectedTime);
    const reservedSeats = ['A1', 'B2', 'C3', 'D2', 'E3'];

    const isReserved = (seat) => reservedSeats.includes(seat);

    const convertToSeatsMatrix = (seatData) => {

        const maxRow = Math.max(...seatData.map(seat => seat.row)) + 1;
        const maxCol = Math.max(...seatData.map(seat => seat.column)) + 1;


        const seats = Array.from({ length: maxRow }, () => Array(maxCol).fill(null));


        seatData.forEach(seat => {
            seats[seat.row][seat.column] = seat.seatType.name;
        });

        return seats;
    }
 
    const handleClose = () => {
        dispatch(setAlert(false));
    }
   
    useEffect(() => {
        dispatch(getSeatType());
    },[dispatch]);

    useEffect(() => {
        if (selectedTime.room) {
            dispatch(getSeatRoom(selectedTime.room));
            dispatch(setSeat([]));
            dispatch(setCol({ rows: 0, cols: 0 }));
        }
    }, [dispatch, selectedTime.room]);

    useEffect(() => {
        if (seatsRoom.data) {
            const seatData = seatsRoom.data.map(item => item.object);
            const result = convertToSeatsMatrix(seatData);
            dispatch(setSeat(result));
        }
    }, [seatsRoom, dispatch]);

    useEffect(() => {
        if (seats.length > 0) {
            const newCols = getColumns(seats).length;
            const newRows = getRows(seats).length;
            if (newCols !== cols || newRows !== rows) {
                dispatch(setCol({ rows: newRows, cols: newCols }));
            }
        }
    }, [seats, dispatch, rows, cols]);















    const generateRowLetters = () => {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return Array.from({ length: rows }, (_, index) => letters[index]).reverse();
    };

    // Hàm để lấy số thứ tự ghế
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

    const handleToggleSelectSeat = (row, col) => {
        dispatch(toggleBookingSeat({ row, col }));
    };
    // Hàm để lấy kiểu ghế
    const getSeatTypes = (row, col) => {
        if (doubleSeatStates[row] && doubleSeatStates[row][col]) {
            return doubleSeatStates[row][col];
        }
        return 'single'; // Default to single seat if not set
    };

    // Cập nhật trạng thái ghế đôi
    const doubleSeatStates = [];

    const updateDoubleSeatStates = (row) => {
        doubleSeatStates[row] = [];
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

    const toggleSeat = (seat, type) => {
        if (reservedSeats.includes(seat)) {
            alert('This seat is already reserved.');
            return;
        }

        const selectedSeats = getSelectedSeats(type);
        if (selectedSeats.includes(seat)) {
            updateSelectedSeats(type, selectedSeats.filter(s => s !== seat));
        } else {
            if (getTotalSelectedSeats() < maxSeats) {
                updateSelectedSeats(type, [...selectedSeats, seat]);
            } else {
                // alert(`You can only select up to ${maxSeats} seats.`);
            }
        }
    };

    const toggleDoubleSeat = (seat1, seat2) => {
        const seatsToToggle = [seat1, seat2];
        const allSeatsSelected = seatsToToggle.every(seat => selectedDoubleSeats.includes(seat));
        const someSeatsSelected = seatsToToggle.some(seat => selectedDoubleSeats.includes(seat));

        if (someSeatsSelected && !allSeatsSelected) {
            alert('Please select or deselect both seats together.');
            return;
        }

        if (allSeatsSelected) {
            dispatch(setSelectedDoubleSeats(selectedDoubleSeats.filter(seat => !seatsToToggle.includes(seat))));
        } else {
            if (getTotalSelectedSeats() + 2 <= maxSeats) {
                dispatch(setSelectedDoubleSeats([...selectedDoubleSeats, ...seatsToToggle]));
            } 
        }
    };

    const getSelectedSeats = (type) => {
        switch (type) {
            case 'single':
                return selectedSingleSeats;
            case 'double':
                return selectedDoubleSeats;
            case 'vip':
                return selectedVipSeats;
            default:
                return [];
        }
    };

    const updateSelectedSeats = (type, seats) => {
        switch (type) {
            case 'single':
                dispatch(setSelectedSingleSeats(seats));
                break;
            case 'double':
                dispatch(setSelectedDoubleSeats(seats));
                break;
            case 'vip':
                dispatch(setSelectedVipSeats(seats));
                break;
            default:
                break;
        }
    };

    const getTotalSelectedSeats = () => {
        const singleCount = selectedSingleSeats.length;
        const doubleCount = selectedDoubleSeats.length;
        const vipCount = selectedVipSeats.length;
        return singleCount + doubleCount + vipCount;
    };

    // Hàm để render nội dung ghế
    const renderSeatContent = (seat, row, col, seatNumber, letter) => {
        const isSelected = selectedSeats.some(s => s.row === row && s.col === col);
        if (!doubleSeatStates[row]) {
            updateDoubleSeatStates(row);
        }

        const seatType = getSeatTypes(row, col);
        const seatIdentifier = `${letter}${seatNumber[col]}`;

        if (seatType === 'left') {
            return (
                <button
                    key={`${row}-${col}`}
                    className={` flex border-blue-700 h-3 w-13 rounded border p-2.5 cursor-pointer text-sm box-border ${isSelected ? 'bg-orange-400 border-transparent text-white' : isReserved(seatIdentifier) ? 'bg-gray-500 cursor-not-allowed hover:border-none border-none hover:bg-gray-500' : 'hover:bg-orange-400 hover:border-transparent'}`}
                    style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    onClick={() => {
                        if (seat) {
                            handleToggleSelectSeat(row, col);
                            toggleDoubleSeat(`${letter}${seatNumber[col]}`, `${letter}${seatNumber[col + 1]}`);
                        }
                    }}
                    disabled={isReserved(seatIdentifier)}
                >
                    <div className='mr-3.5'>{seatNumber[col]}</div>
                    <div>{seatNumber[col + 1]}</div>
                </button>
            );
        }

        if (seatType === 'right') {
            return null;
        }

        return (
            <button
                key={`${row}-${col}`}
                className={`rounded text-sm h-3 w-3 border p-2.5 cursor-pointer ${isSelected ? 'bg-orange-400 border-transparent text-white' : isReserved(seatIdentifier) ? 'bg-gray-500 cursor-not-allowed  border-none' : seat === 'single'
                    ? 'border-green-700 hover:bg-orange-400 hover:border-transparent'
                    : seat === 'vip'
                        ? 'border-orange-400 hover:bg-orange-400 hover:border-transparent' : 'border-transparent'
                    }`}
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                onClick={() => {
                    if (seat) {
                        handleToggleSelectSeat(row, col);
                        toggleSeat(`${letter}${seatNumber[col]}`, seat);
                    }
                }}
                disabled={isReserved(seatIdentifier)}
            >
                {seatNumber[col]}
            </button>
        );
    };

    return (
        <div className="container mx-auto p-4 w-3/4 text-gray-400">
            {seats.length > 0 && (
                <div>
                    <div className="grid gap-2 items-center justify-center">
                        {generateRowLetters().map((letter, rowIndex) => {
                            const seatNumbers = getSeatNumbers(rowIndex);
                            return (
                                <div key={`row-${rowIndex}`} className="flex items-center justify-center">
                                    <div className="w-5 cursor-pointer">{letter}</div>
                                    <div className="grid gap-2 px-4" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
                                        {seats[rowIndex].map((seat, colIndex) => (
                                            <React.Fragment key={`${rowIndex}-${colIndex}`}>
                                                {renderSeatContent(seat, rowIndex, colIndex, seatNumbers, letter)}
                                            </React.Fragment>
                                        )).filter(content => content !== null)}
                                    </div>
                                    <div className="w-5 ml-2 cursor-pointer">{letter}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
            {showAlert && (
                <CustomAlert
                    message="Chỉ được đặt giới hạn 8 ghế!"
                    onClose={handleClose}
                />
            )}
        </div>
    );
};

export default Seats;
