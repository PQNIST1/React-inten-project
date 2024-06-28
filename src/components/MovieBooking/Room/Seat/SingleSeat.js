import React from 'react';
import clsx from 'clsx';

const SingleSeat = ({col, seat, selectedSeats, reservedSeats, toggleSeat  }) => {
    const isSelected = selectedSeats.includes(seat);
    const isReserved = reservedSeats.includes(seat);
    return (
        <button
            onClick={toggleSeat}
            className={clsx(
                'w-10 h-10 flex items-center justify-center border rounded',
                {
                    'bg-orange-400': isSelected,
                    'text-white': isSelected,
                    'border-none': isReserved,
                    'border-orange-400': isSelected,
                    'bg-transparent': !isSelected && !isReserved,
                    'bg-gray-500': isReserved,
                    'cursor-not-allowed': isReserved,
                }
            )}
            disabled={isReserved}
        >
            {col}
        </button>
    );
};

export default SingleSeat;
