import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedDoubleSeats, setSelectedSingleSeats, setSelectedVipSeats ,setSingle, setVip, setDouble } from '../../../controller/SliceReducer/booking';
import { toggleBookingSeat, getSeatRoom, setSeat, setCol, setAlert, clearSelectedSeats } from '../../../controller/SliceReducer/seatEdit';
import CustomAlert from "../../Alert/alert";
import { getBookingPrice, getBookingSeats } from "../../../controller/SliceReducer/payment";


// Hàm để lấy các hàng
const getRows = (seat) => seat;

// Hàm để lấy các cột
const getColumns = (seat) => {
    const numCols = seat[0].length;
    const columns = [];

    for (let col = 0; col < numCols; col++) {
        const column = [];
        for (const element of seat) {
            column.push(element[col]);
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
    const reservedSeat = useSelector((state) => state.payment.seats);
    const pricess = useSelector((state) => state.payment.price);
    const [reservedSeats, setReservedSeats] = useState([]);



    const isReserved = (seat) => reservedSeats.includes(seat);


    const convertToSeatsMatrixx = (seatData) => {
        // Chuyển đổi các giá trị row và column thành số nguyên
        const formattedData = seatData.map(seat => ({
            ...seat,
            object: {
                ...seat,
                row: parseInt(seat.row, 10),
                column: parseInt(seat.column, 10)
            }
        }));

        // Tìm số hàng và số cột lớn nhất
        const maxRow = Math.max(...formattedData.map(seat => seat.row)) + 1;
        const maxCol = Math.max(...formattedData.map(seat => seat.column)) + 1;

        // Tạo ma trận với số hàng và cột tối đa
        const seats = Array.from({ length: maxRow }, () => Array(maxCol).fill(null));

        // Cập nhật ma trận với thông tin ghế
        formattedData.forEach(seat => {
            seats[seat.object.row][seat.object.column] = {
                type: seat.seatType.name,
                id: seat.id,
                type_id: seat.seatType.id
            };
        });

        return seats;
    };




    const handleClose = () => {
        dispatch(setAlert(false));
    }

    useEffect(() => {
        dispatch(getBookingSeats(selectedTime.id));
        dispatch(getBookingPrice(selectedTime.id));
        dispatch(clearSelectedSeats());
    }, [dispatch, selectedTime]);

    useEffect(() => {
        if (selectedTime.room) {
            dispatch(getSeatRoom(selectedTime.room.id));
            dispatch(setSeat([]));
        }
    }, [dispatch, selectedTime.room]);

    useEffect(() => {
        if (pricess.data) {
            const prices = {
                single: null,
                double: null,
                vip: null
            };
            pricess.data.forEach(item => {
                const seatType = item.object.seatType.name;
                const price = item.object.price;

                if (seatType === 'single') {
                    prices.single = price;
                } else if (seatType === 'double') {
                    prices.double = price;
                } else if (seatType === 'vip') {
                    prices.vip = price;
                }
            });
            if (prices.single !== null) {
                dispatch(setSingle(prices.single));
            }
            if (prices.double !== null) {
                dispatch(setDouble(prices.double));
            }
            if (prices.vip !== null) {
                dispatch(setVip(prices.vip));
            }
        }
    }, [dispatch, pricess]);

    useEffect(() => {
        if (reservedSeat.data) {
            setReservedSeats(reservedSeat.data.filter(item => item.booked).map(item => item.seat.name));
        }
    }, [reservedSeat.data])
    useEffect(() => {
        if (seatsRoom.data) {
            dispatch(setCol({ rows: 0, cols: 0 }));
            const seatData = seatsRoom.data.map(item => item.object);
            const results = convertToSeatsMatrixx(seatData);
            dispatch(setSeat(results));
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
    // Hàm để chọn ghế
    const handleToggleSelectSeat = (row, col) => {
        dispatch(toggleBookingSeat({ row, col }));
    };
    // Hàm để lấy kiểu ghế
    const getSeatTypes = (row, col) => {
        if (doubleSeatStates[row] && doubleSeatStates[row][col]) {
            return doubleSeatStates[row][col];
        }
        return seats[row][col] ? seats[row][col].type : 'single'; // Default to single seat if not set
    };

    // Cập nhật trạng thái ghế đôi
    const doubleSeatStates = [];

    const updateDoubleSeatStates = (row) => {
        doubleSeatStates[row] = [];
        let isLastDouble = false;

        for (let col = 0; col < seats[row].length; col++) {
            const seat = seats[row][col];
            if (seat && seat.type === 'double') {
                if (!isLastDouble) {
                    doubleSeatStates[row][col] = 'left';
                } else {
                    doubleSeatStates[row][col] = 'right';
                }
                isLastDouble = !isLastDouble;
            } else {
                doubleSeatStates[row][col] = seat ? seat.type : 'single';
                isLastDouble = false;
            }
        }
    };

    const toggleSeat = (seat, type) => {
        if (reservedSeats.includes(seat.id)) {
            return;
        }
        const selectedSeats = getSelectedSeats(type);
        const seatIdentifier = `${seat.letter}${seat.number}`;
        if (selectedSeats.some(s => s.id === seat.id)) {
            updateSelectedSeats(type, selectedSeats.filter(s => s.id !== seat.id));
        } else {  
            if (getTotalSelectedSeats() < maxSeats) {        
                updateSelectedSeats(type, [...selectedSeats, { id: seat.id, label: seatIdentifier, type_id: seat.type_id }]);
            }
        }
    };


    const toggleDoubleSeat = (seat1, seat2) => {
        const seatsToToggle = [seat1, seat2];
        const seatIdentifiers = seatsToToggle.map(seat => ({
            id: seat.id,
            label: `${seat.letter}${seat.number}`,
            type_id: seat.type_id,
            type: seat.type
        }));
        const allSeatsSelected = seatIdentifiers.every(seat =>
            selectedDoubleSeats.some(selected => selected.id === seat.id)
        );
        const someSeatsSelected = seatIdentifiers.some(seat =>
            selectedDoubleSeats.some(selected => selected.id === seat.id)
        );

        if (someSeatsSelected && !allSeatsSelected) {
            alert('Please select or deselect both seats together.');
            return;
        }
        if (allSeatsSelected) {
            dispatch(setSelectedDoubleSeats(selectedDoubleSeats.filter(selected =>
                !seatIdentifiers.some(seat => seat.id === selected.id)
            )));
        } else {
            if (getTotalSelectedSeats() + 2 <= maxSeats) {
                // Add the seats to selectedDoubleSeats
                dispatch(setSelectedDoubleSeats([
                    ...selectedDoubleSeats,
                    ...seatIdentifiers
                ]));
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
                    className={`flex border-blue-700 h-3 w-13 rounded border p-2.5 cursor-pointer text-sm box-border ${isSelected ? 'bg-orange-400 border-transparent text-white' : isReserved(seatIdentifier) ? 'bg-gray-500 cursor-not-allowed hover:border-none border-none hover:bg-gray-500' : 'hover:bg-orange-400 hover:border-transparent'}`}
                    style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    onClick={() => {
                        if (seat) {
                            handleToggleSelectSeat(row, col);
                            const rightSeatId = seatNumber[col + 1] ? seats[row][col + 1].id : null;
                            toggleDoubleSeat({ letter: letter, number: seatNumber[col], id: seat.id, type_id: seat.type_id, type: seat.type }, { letter: letter, number: seatNumber[col + 1], id: rightSeatId, type_id: seat.type_id, type: seat.type });
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
                className={`rounded text-sm h-3 w-3 border p-2.5 cursor-pointer ${isSelected ? 'bg-orange-400 border-transparent text-white' : isReserved(seatIdentifier) ? 'bg-gray-500 cursor-not-allowed border-none' : seat && seat.type === 'single'
                    ? 'border-green-700 hover:bg-orange-400 hover:border-transparent'
                    : seat && seat.type === 'vip'
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
                        toggleSeat({ letter: letter, number: seatNumber[col], id: seat.id, type_id: seat.type_id }, seat.type);
                    }
                }}
                disabled={isReserved(seatIdentifier)}
            >
                {seat ? seatNumber[col] : ''}
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
                                <div key={letter} className="flex items-center justify-center">
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
