import React from 'react';
import SingleSeat from './Seat/SingleSeat';
import DoubleSeat from './Seat/doubleSeat';
import VipSeat from './Seat/vipSeat';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedDoubleSeats, setSelectedSingleSeats, setSelectedVipSeats } from '../../../controller/SliceReducer/booking';

const SeatSelector = () => {
  const dispatch = useDispatch();
  const selectedSingleSeats = useSelector((state)=> state.movie.selectedSingleSeats);
  const selectedDoubleSeats = useSelector((state)=> state.movie.selectedDoubleSeats);
  const selectedVipSeats = useSelector((state)=> state.movie.selectedVipSeats);
  const maxSeats = 5;

  const rows = Array.from({ length: 9 }, (_, i) => String.fromCharCode(66 + i)).reverse(); // ['A', 'B', ..., 'I']
  const cols = Array.from({ length: 9 }, (_, i) => i + 1); // [1, 2, ..., 9]

  const doubleRows = ['K'];
  const doubleCols = Array.from({ length: 4 }, (_, i) => i + 1); // [1, 2, 3, 4]

  const vipRows = ['A'];
  const vipCols = Array.from({ length: 7 }, (_, i) => i + 1); // [1, 2, ..., 7]

  const reservedSeats = ['A1', 'B2', 'C3', 'D2', 'E3'];

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
        alert(`You can only select up to ${maxSeats} seats.`);
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
      } else {
        alert(`You can only select up to ${maxSeats} seats.`);
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

  const renderSeats = (rows, cols, type, SeatComponent) => {
    return rows.map(row => (
      <div key={row} className="flex items-center space-x-36">
        <span className="w-6">{row}</span>
        <div className='flex items-center space-x-2 w-424 '>
          {cols.map(col => {
            const seat = `${row}${col}`;
            const isDouble = type === 'double';
            const seat1 = `${row}${col * 2 - 1}`;
            const seat2 = `${row}${col * 2}`;

            return (
              <SeatComponent
                key={seat}
                col={col}
                seat={seat}
                seat1={seat1}
                seat2={seat2}
                selectedSeats={getSelectedSeats(type)}
                reservedSeats={reservedSeats}
                toggleSeat={() => isDouble ? toggleDoubleSeat(seat1, seat2) : toggleSeat(seat, type)}
              />
            );
          })}
        </div>
        <span className="w-6">{row}</span>
      </div>
    ));
  };

  return (
    <div className="p-4">
      <div className="space-y-2">
        {renderSeats(doubleRows, doubleCols, 'double', DoubleSeat)}
        {renderSeats(rows, cols, 'single', SingleSeat)}
        {renderSeats(vipRows, vipCols, 'vip', VipSeat)}
      </div>
    </div>
  );
};

export default SeatSelector;
