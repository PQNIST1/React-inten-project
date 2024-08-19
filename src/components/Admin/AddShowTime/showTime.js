import React from "react";
import { format } from 'date-fns';
import { useNavigate } from "react-router-dom";
import { normalizeStringForURL } from "../../../data/tranformData";
import { useDispatch } from "react-redux";
import { clearSearch } from "../../../controller/SliceReducer/search";



const formatDate = (date) => {
    return format(new Date(date), 'dd/MM/yy');
};

const ShowTime = ({ data }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const pathname = `/showtime/detail/${normalizeStringForURL(data.movie)}?page=1`;
    const handleClick = () => {
        navigate(pathname);
        dispatch(clearSearch());
    }
    return (
        <tr className=" transition-all duration-500  text-gray-400 ">
            <td onClick={handleClick} className="p-5 whitespace-nowrap text-sm leading-6 font-medium hover:text-orange-400">{data.movie}</td>
            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium ">{formatDate(data.start)}</td>
            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium ">{formatDate(data.end)}</td>
            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium ">{data.data.length}</td>
        </tr>
    )
}
export default ShowTime;