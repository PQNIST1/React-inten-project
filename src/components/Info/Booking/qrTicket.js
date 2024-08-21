import React from "react";
import { format } from "date-fns";
import QRCodeComponent from "./qrCode";

const QrTicket = ({ booking }) => {
    const formatTime = (date) => {
        return format(new Date(date), 'HH:MM');
    };
    const formatDate = (date) => {
        return format(new Date(date), 'dd/MM/yy');
    };
    const getDayName = (dateString) => {
        const daysOfWeek = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
        const date = new Date(dateString);
        return daysOfWeek[date.getDay()];
    };
    const calculateTotalPrice = (items) => {
        return items.reduce((total, item) => {
            // Kiểm tra loại ghế
            if (item.seat.seatType.name === 'double') {
                // Nếu loại ghế là "double", chia giá vé cho 2
                return total + item.price ;
            } else {
                // Nếu không phải loại ghế "double", giữ nguyên giá vé
                return total + item.price;
            }
        }, 0);
    };
    
    const getSeatNamesArray = (tickets) => {
        return tickets.map(ticket => ticket.seat.name);
    };
    const convertOrdersToFoodArray = (orders) => {
        return orders.map(order => ({
            name: order.food.name,
            amount: order.amount
        }));
    };    
    const jsonData = {
        id: booking.data.object.booking.id,
        name: booking.data.object.tickets[0].showtime.movie.name,
        image: `http://localhost:8080${booking.data.object.tickets[0].showtime.movie.image}`,
        room: booking.data.object.tickets[0].showtime.room.name,
        time: formatTime(booking.data.object.tickets[0].showtime.startTime),
        date: formatDate(booking.data.object.tickets[0].showtime.startTime),
        seat: getSeatNamesArray(booking.data.object.tickets),
        food: convertOrdersToFoodArray(booking.data.object.orders),
        total: booking.data.object.booking.totalPrice
    }
    const jsonString = JSON.stringify(jsonData);
    const encodedData = encodeURIComponent(jsonString);
    const url = `https://ticket-cpmn.onrender.com/?data=${encodedData}`;


    return (
        <div className="w-1/2  space-y-5">
            <div className="flex">
                <img src={`http://localhost:8080${booking.data.object.tickets[0].showtime.movie.image}`} alt="" className="rounded h-52" />
                <div>
                    <div className="flex ml-5">
                        <p className="text-lg font-bold w-40 ">{booking.data.object.tickets[0].showtime.movie.name}</p>
                        <span className=" bg-orange-500 text-white font-bold rounded h-7 px-2">T18</span>
                    </div>
                </div>

            </div>
            <div>
                <div className="space-y-2 mt-3">
                    <p><span className=" font-bold">Cinema Center</span> - {booking.data.object.tickets[0].showtime.room.name}</p>
                    <p><span className=" font-bold">Xuất: {formatTime(booking.data.object.tickets[0].showtime.startTime)}</span> - {getDayName(booking.data.object.tickets[0].showtime.startTime)}, {formatDate(booking.data.object.tickets[0].showtime.startTime)}</p>
                </div>
            </div>
            <div className="flex items-center justify-center">
                <QRCodeComponent url={url} />
            </div>
            <div className="border-t-2 border-dotted pt-5 flex">
                <div className="flex space-x-1"><span className="font-bold">Ghế</span> - {booking.data.object.tickets.map((item, index) => (
                    <p key={item.seat.id} >
                        {item.seat.name}
                        {index < (booking.data.object.tickets).length - 1 ? ", " : ""}
                    </p>
                ))}</div>
            </div>
            <div className="flex border-t-2 border-dotted py-5 space-x-11">
                <div className="">
                    <p className="font-bold">Mã vé</p>
                    <p>{booking.data.object.booking.id}</p>
                </div>
                <div className="">
                    <p className="font-bold">Số lượng</p>
                    <p>{(booking.data.object.tickets).length}</p>
                </div>
                <div className="capitalize">
                    <p className="font-bold">Tổng cộng</p>
                    <p>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(calculateTotalPrice(booking.data.object.tickets))}</p>
                </div>
            </div>
        </div>
    )
}
export default QrTicket;