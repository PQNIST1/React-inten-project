import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSeatType, getSeatTypePrice } from "../../../../controller/SliceReducer/seat";
import { getPriceBySeatTypeId } from "../../../Admin/Seat/seat";

export const getPrice = (prices) => {
    const today = new Date();
    const isWeekend = today.getDay() === 6 || today.getDay() === 0; // 6: Saturday, 0: Sunday

    for (let price of prices) {
        const startDate = new Date(price.start);
        const endDate = new Date(price.end);

        // Kiểm tra nếu ngày hiện tại nằm trong khoảng thời gian giá
        if (today >= startDate && today <= endDate) {
            if (price.special) {
                return price.price; // Ngày đặc biệt
            } else if (price.weekend && isWeekend) {
                return price.price; // Ngày cuối tuần
            } else if (price.normal && !isWeekend) {
                return price.price; // Ngày thường
            } else if (price.early) {
                return price.price; // Chiếu sớm
            }
        }
    }

    return '';
};


const TicketHover = () => {
    const dispatch = useDispatch();
    const seats = useSelector((state) => state.seat.data);
    const prices = useSelector((state) => state.seat.seat_price);

    useEffect(() => {
        dispatch(getSeatType());
        dispatch(getSeatTypePrice());
    }, [dispatch]);

 

    const getPropertyName = (item) => {
        if (item === 'single') return 'Ghế đơn';
        if (item === 'double') return 'Ghế đôi';
        if (item === 'vip') return 'Ghế vip';
        return '';
    }

    


    const getPropertyImage = (item) => {
        if (item === 'single') return (<img className="h-10 px-1.5" src="https://i.imgur.com/zUj49xa.png" alt="" />);
        if (item === 'double') return (<img className="h-10" src="https://i.imgur.com/hrjLbOL.png" alt="" />);
        if (item === 'vip') return (<img className="h-8 px-1" src="https://i.imgur.com/tVi7abY.png" alt="" />);
        return '';
    }
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            currencyDisplay: 'symbol'
        }).format(amount);
    };

    return (
        <div className="border rounded shadow-inner z-10  w-64 h-auto bg-white absolute top-20 mt-1 text-gray-400">
            {seats.data && prices.data && seats.data.content.map((item) => {
                const image = getPropertyImage(item.object.name.toLowerCase());
                const price = getPriceBySeatTypeId(prices.data.content, item.object.id);
                const name = getPropertyName(item.object.name.toLowerCase());
                const pricess = getPrice(price);
               
                return (
                    <div
                        key={item.id} // Ensure each item has a unique key
                        className="hover:text-blue-800 p-1 flex hover:bg-yellow-400 hover:bg-opacity-5 hover:border-l-4 hover:border-yellow-500 text-center"
                    >
                        {image}
                        <p className="m-auto">{name} </p>
                        <p  className="m-auto">{formatCurrency(pricess)}</p>
                    </div>
                );
            })}

        </div>
    )
}

export default TicketHover;