import React from "react";
import { format } from 'date-fns';
import { Link } from "react-router-dom";
import { normalizeStringForURL } from "../../../data/tranformData";



const formatDate = (date) => {
    return format(new Date(date), 'dd/MM/yy');
};

const ShowTime = ({ data }) => {
   
    const pathname = `/showtime/detail/${normalizeStringForURL(data.movie)}?page=1`;
    return (
        <tr className=" transition-all duration-500  text-gray-400 ">
            <Link to={pathname}>
                <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium hover:text-orange-400">{data.movie}</td>
            </Link>
            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium ">{formatDate(data.start)}</td>
            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium ">{formatDate(data.end)}</td>
            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium ">{data.data.length}</td>
        </tr>
    )
}
export default ShowTime;