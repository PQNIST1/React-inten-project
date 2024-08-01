import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEarly, setNormal, setSpecial, setWeekend, clearForm, deleteSeatType, setSuccess, setError, setName, setCode, setDateEnd, setDateStart, setEdit, setId, setPrice, setType_id, setIsAddPrice, setEditPrice, deleteSeatTypePrice } from "../../../controller/SliceReducer/seat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan, faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import { splitDateTime } from "../../../controller/SliceReducer/img";
import { format } from 'date-fns';

export const getPriceBySeatTypeId = (data, seatTypeId) => {
    const result = [];

    for (let item of data) {
        if (item.object.seatType.id === seatTypeId) {
            result.push({
                price: item.object.price,
                id: item.object.id,
                start: item.object.startDate,
                end: item.object.endDate,
                normal: item.object.normalDay,
                weekend: item.object.weekend,
                special: item.object.specialDay,
                early: item.object.earlyShow
            });
        }
    }

    return result;
}

const getPropertyName = (item) => {
    if (item.normal) return 'normal';
    if (item.weekend) return 'weekend';
    if (item.special) return 'special';
    if (item.early) return 'early';
    return '';
}

const Seat = ({ data, prices, pp }) => {

    const [price, setPrices] = useState([]);
    const dispatch = useDispatch();
    const form = useSelector((state) => state.seat);
    const { isEdit, type_id, isAddPrice, isEditPrice, id } = form;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, 'dd-MM-yy');
    };

    useEffect(() => {
        setPrices(getPriceBySeatTypeId(prices, data.id));
    }, [prices, data])

    const handleDelete = () => {
        dispatch(deleteSeatType(data.id));
        setTimeout(() => {
            dispatch(setSuccess());
            dispatch(setError());
        }, 3000);
        dispatch(clearForm());
    };

    const handleDeletePrice = (idd) => {
        dispatch(deleteSeatTypePrice(idd));
        setTimeout(() => {
            dispatch(setSuccess());
            dispatch(setError());
        }, 3000);
        dispatch(clearForm());
    };


    const handleAdd = () => {
        if ( isAddPrice && data.id === type_id) {
            dispatch(setIsAddPrice(false));
            dispatch(clearForm());
        } else {
            dispatch(setIsAddPrice(true));
            dispatch(setType_id(data.id));
        }
        
    };
    const handleEditPrice = (idd, price, start, end, normal, weekend, early, special) => {
        if (isEditPrice && idd === id) {
            dispatch(setEditPrice(false));
            dispatch(clearForm());
        } else {
            dispatch(setEditPrice(true));
            dispatch(setType_id(data.id));
            dispatch(setId(idd));
            dispatch(setPrice(price));
            dispatch(setDateStart(start));
            dispatch(setDateEnd(end));
            dispatch(setNormal(normal));
            dispatch(setWeekend(weekend));
            dispatch(setEarly(early));
            dispatch(setSpecial(special));
        }

    }
    const handleUpdate = () => {
        if (isEdit && data.id === type_id) {
            dispatch(setEdit(false));
            dispatch(clearForm());
        } else {
            dispatch(setType_id(data.id));
            dispatch(setEdit(true));
            dispatch(setName(data.name));
            dispatch(setCode(data.code));
        }

    };
    return (
        <tr className=" transition-all duration-500  text-gray-400 ">
            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium ">{data.name}</td>
            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium ">{data.code}</td>
            <td>
                {price.length > 0 ? (
                    <div className="text-lg flex space-x-2">
                        <FontAwesomeIcon onClick={handleAdd} icon={faSquarePlus} className={`${isAddPrice && data.id === type_id ? 'text-orange-500' : 'text-indigo-500 '} m-auto`} />
                        <div className="text-tn">
                            {price.map((item) => (
                                <div key={item.id} className="flex space-x-2">
                                    <p className="w-10">{item.price}</p>
                                    <p className="w-12">{formatDate(item.start)}</p>
                                    <p className="w-12">{formatDate(item.end)}</p>
                                    <p className="w-12">{getPropertyName(item)}</p>
                                    <div className="flex items-center">
                                        <button className="p-2  rounded-full  group transition-all duration-500  flex item-center">
                                            <FontAwesomeIcon onClick={() => { handleEditPrice(item.id,item.price,item.start,item.end,item.normal,item.weekend,item.early,item.special) }} icon={faPenToSquare} className={`${isEditPrice && id === item.id ? 'text-orange-500' : 'text-indigo-500'}`} />
                                        </button>
                                        <button onClick={() => {handleDeletePrice(item.id)}} className="p-2 rounded-full  group transition-all duration-500  flex item-center">
                                            <FontAwesomeIcon icon={faTrashCan} className='text-red-600' />
                                        </button>
                                    </div>
                                </div>

                            ))}
                        </div>

                    </div>
                ) : (
                    <div className="text-2xl flex justify-center" onClick={handleAdd}>
                        <FontAwesomeIcon icon={faSquarePlus} className={`${isAddPrice && type_id === data.id ? 'text-orange-500' : 'text-indigo-500 '}`} />
                    </div>
                )}
            </td>
            <td className="p-5 whitespace-nowrap  leading-6 font-medium text-tn"><div>
                <p>{pp.createdBy.name}</p>
                <p> {splitDateTime(pp.createdAt)}</p>
            </div></td>
            <td className="p-5 whitespace-nowrap leading-6 font-medium text-tn">{pp.updatedBy && (
                <div>
                    <p>{pp.updatedBy.name}</p>
                    <p> {splitDateTime(pp.updatedAt)}</p>
                </div>
            )}</td>
            <td className=" p-5 ">
                <div className="flex items-center gap-1">
                    <button onClick={handleUpdate} className="p-2  rounded-full  group transition-all duration-500  flex item-center">
                        <FontAwesomeIcon icon={faPenToSquare} className={`${isEdit && type_id === data.id ? 'text-orange-500' : 'text-indigo-500'}`} />
                    </button>
                    <button onClick={handleDelete} className="p-2 rounded-full  group transition-all duration-500  flex item-center">
                        <svg className="" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path className="fill-red-600" d="M4.00031 5.49999V4.69999H3.20031V5.49999H4.00031ZM16.0003 5.49999H16.8003V4.69999H16.0003V5.49999ZM17.5003 5.49999L17.5003 6.29999C17.9421 6.29999 18.3003 5.94183 18.3003 5.5C18.3003 5.05817 17.9421 4.7 17.5003 4.69999L17.5003 5.49999ZM9.30029 9.24997C9.30029 8.80814 8.94212 8.44997 8.50029 8.44997C8.05847 8.44997 7.70029 8.80814 7.70029 9.24997H9.30029ZM7.70029 13.75C7.70029 14.1918 8.05847 14.55 8.50029 14.55C8.94212 14.55 9.30029 14.1918 9.30029 13.75H7.70029ZM12.3004 9.24997C12.3004 8.80814 11.9422 8.44997 11.5004 8.44997C11.0585 8.44997 10.7004 8.80814 10.7004 9.24997H12.3004ZM10.7004 13.75C10.7004 14.1918 11.0585 14.55 11.5004 14.55C11.9422 14.55 12.3004 14.1918 12.3004 13.75H10.7004ZM4.00031 6.29999H16.0003V4.69999H4.00031V6.29999ZM15.2003 5.49999V12.5H16.8003V5.49999H15.2003ZM11.0003 16.7H9.00031V18.3H11.0003V16.7ZM4.80031 12.5V5.49999H3.20031V12.5H4.80031ZM9.00031 16.7C7.79918 16.7 6.97882 16.6983 6.36373 16.6156C5.77165 16.536 5.49093 16.3948 5.29823 16.2021L4.16686 17.3334C4.70639 17.873 5.38104 18.0979 6.15053 18.2013C6.89702 18.3017 7.84442 18.3 9.00031 18.3V16.7ZM3.20031 12.5C3.20031 13.6559 3.19861 14.6033 3.29897 15.3498C3.40243 16.1193 3.62733 16.7939 4.16686 17.3334L5.29823 16.2021C5.10553 16.0094 4.96431 15.7286 4.88471 15.1366C4.80201 14.5215 4.80031 13.7011 4.80031 12.5H3.20031ZM15.2003 12.5C15.2003 13.7011 15.1986 14.5215 15.1159 15.1366C15.0363 15.7286 14.8951 16.0094 14.7024 16.2021L15.8338 17.3334C16.3733 16.7939 16.5982 16.1193 16.7016 15.3498C16.802 14.6033 16.8003 13.6559 16.8003 12.5H15.2003ZM11.0003 18.3C12.1562 18.3 13.1036 18.3017 13.8501 18.2013C14.6196 18.0979 15.2942 17.873 15.8338 17.3334L14.7024 16.2021C14.5097 16.3948 14.229 16.536 13.6369 16.6156C13.0218 16.6983 12.2014 16.7 11.0003 16.7V18.3ZM2.50031 4.69999C2.22572 4.7 2.04405 4.7 1.94475 4.7C1.89511 4.7 1.86604 4.7 1.85624 4.7C1.85471 4.7 1.85206 4.7 1.851 4.7C1.05253 5.50059 1.85233 6.3 1.85256 6.3C1.85273 6.3 1.85297 6.3 1.85327 6.3C1.85385 6.3 1.85472 6.3 1.85587 6.3C1.86047 6.3 1.86972 6.3 1.88345 6.3C1.99328 6.3 2.39045 6.3 2.9906 6.3C4.19091 6.3 6.2032 6.3 8.35279 6.3C10.5024 6.3 12.7893 6.3 14.5387 6.3C15.4135 6.3 16.1539 6.3 16.6756 6.3C16.9364 6.3 17.1426 6.29999 17.2836 6.29999C17.3541 6.29999 17.4083 6.29999 17.4448 6.29999C17.4631 6.29999 17.477 6.29999 17.4863 6.29999C17.4909 6.29999 17.4944 6.29999 17.4968 6.29999C17.498 6.29999 17.4988 6.29999 17.4994 6.29999C17.4997 6.29999 17.4999 6.29999 17.5001 6.29999C17.5002 6.29999 17.5003 6.29999 17.5003 5.49999C17.5003 4.69999 17.5002 4.69999 17.5001 4.69999C17.4999 4.69999 17.4997 4.69999 17.4994 4.69999C17.4988 4.69999 17.498 4.69999 17.4968 4.69999C17.4944 4.69999 17.4909 4.69999 17.4863 4.69999C17.477 4.69999 17.4631 4.69999 17.4448 4.69999C17.4083 4.69999 17.3541 4.69999 17.2836 4.69999C17.1426 4.7 16.9364 4.7 16.6756 4.7C16.1539 4.7 15.4135 4.7 14.5387 4.7C12.7893 4.7 10.5024 4.7 8.35279 4.7C6.2032 4.7 4.19091 4.7 2.9906 4.7C2.39044 4.7 1.99329 4.7 1.88347 4.7C1.86974 4.7 1.86051 4.7 1.85594 4.7C1.8548 4.7 1.85396 4.7 1.85342 4.7C1.85315 4.7 1.85298 4.7 1.85288 4.7C1.85284 4.7 2.65253 5.49941 1.85408 6.3C1.85314 6.3 1.85296 6.3 1.85632 6.3C1.86608 6.3 1.89511 6.3 1.94477 6.3C2.04406 6.3 2.22573 6.3 2.50031 6.29999L2.50031 4.69999ZM7.05028 5.49994V4.16661H5.45028V5.49994H7.05028ZM7.91695 3.29994H12.0836V1.69994H7.91695V3.29994ZM12.9503 4.16661V5.49994H14.5503V4.16661H12.9503ZM12.0836 3.29994C12.5623 3.29994 12.9503 3.68796 12.9503 4.16661H14.5503C14.5503 2.8043 13.4459 1.69994 12.0836 1.69994V3.29994ZM7.05028 4.16661C7.05028 3.68796 7.4383 3.29994 7.91695 3.29994V1.69994C6.55465 1.69994 5.45028 2.8043 5.45028 4.16661H7.05028ZM2.50031 6.29999C4.70481 6.29998 6.40335 6.29998 8.1253 6.29997C9.84725 6.29996 11.5458 6.29995 13.7503 6.29994L13.7503 4.69994C11.5458 4.69995 9.84724 4.69996 8.12529 4.69997C6.40335 4.69998 4.7048 4.69998 2.50031 4.69999L2.50031 6.29999ZM13.7503 6.29994L17.5003 6.29999L17.5003 4.69999L13.7503 4.69994L13.7503 6.29994ZM7.70029 9.24997V13.75H9.30029V9.24997H7.70029ZM10.7004 9.24997V13.75H12.3004V9.24997H10.7004Z" fill="#F87171"></path>
                        </svg>
                    </button>
                </div>
            </td>
        </tr>
    )
}
export default Seat;