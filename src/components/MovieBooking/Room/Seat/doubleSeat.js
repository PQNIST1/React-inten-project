import React from 'react';
import clsx from 'clsx';

const DoubleSeat = ({ col, seat1, seat2, selectedSeats, reservedSeats, toggleSeat }) => {
    const isSelected = selectedSeats.includes(seat1) && selectedSeats.includes(seat2);
    const isReserved = reservedSeats.includes(seat1) || reservedSeats.includes(seat2);

    return (
        <button
            onClick={toggleSeat}
            className={clsx(
                'w-22 h-10 flex items-center justify-center border rounded space-x-10', // Adjusted width for double seats
                {
                    'bg-orange-400': isSelected,
                    'text-white': isSelected,
                    'border-orange-400': isSelected,
                    'bg-transparent': !isSelected && !isReserved,
                    'border-blue-700': !isSelected && !isReserved,
                    'bg-gray-500': isReserved,
                    'cursor-not-allowed': isReserved,
                }
            )}
            disabled={isReserved}
        >
            <span>{`${col * 2 - 1}`}</span>
            <span>{`${col * 2}`}</span>
        </button>
    );
};

export default DoubleSeat;
