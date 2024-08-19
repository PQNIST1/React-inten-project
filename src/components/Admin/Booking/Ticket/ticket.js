import React from "react";

import { format } from 'date-fns';



const formatDate = (date) => {
    return format(new Date(date), 'dd/MM/yyy');
};

const Ticket = ({ data, pp }) => {

    return (
        <tr className=" transition-all duration-500  text-gray-400 ">
            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium">
                {data.user && data.user.name ? (
                    <>
                        {data.user.name}
                    </>
                ) : (
                    <>

                    </>
                )}
            </td>
            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium">
                {data.user && data.user.phone ? (
                    <>
                        {data.user.phone}
                    </>
                ) : (
                    <>

                    </>
                )}
            </td>
            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium ">{pp.createdBy.name}</td>
            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium ">{formatDate(data.bookingDate)}</td>
            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium ">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(data.totalPrice)}</td>
            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium ">{data.paymentMethod}</td>
            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium ">{data.paymentStatus}</td>
        </tr>
    )
}
export default Ticket;