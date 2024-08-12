import React from "react";
import Ticket from "../ticket";
import { formatTime, getDayName, formatDate } from "../history";

const PendingBooking = ({ item }) => (
    <div className="w-full border-y-2 px-10 py-5 my-10 relative overflow-hidden rounded">
      <Ticket />
      <div className="flex">
        <img src={`http://localhost:8080${item.tickets[0].showtime.movie.image}`} alt="" className="h-32 rounded" />
        <div className="capitalize ml-3 w-64">
          <div className="flex">
            <p className="text-lg font-bold">{item.tickets[0].showtime.movie.name}</p>
            <span className="ml-5 bg-orange-500 text-white font-bold rounded h-7 px-2">T18</span>
          </div>
          <div className="space-y-2 mt-3">
            <p>{formatTime(item.tickets[0].showtime.startTime)} - {getDayName(item.tickets[0].showtime.startTime)}, {formatDate(item.tickets[0].showtime.startTime)}</p>
            <p>Cinema Center - {item.tickets[0].showtime.room.name}</p>
          </div>
        </div>
        <div className="ml-32 m-auto">
          <img src="https://i.imgur.com/PaL9wb9.png" alt="" className="h-20 w-20 animate-spin" />
        </div>
      </div>
    </div>
  );
export default PendingBooking;