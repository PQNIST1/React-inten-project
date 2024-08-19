import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEarly, setNormal, setSpecial, setWeekend, clearForm, setSuccess, setError, setDateEnd, setDateStart, setId, setPrice, setType_id, setIsAddPrice, setEditPrice, deleteSeatTypePrice, clearText } from "../../../controller/SliceReducer/seat";
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
    const {  type_id, isAddPrice, isEditPrice, id } = form;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, 'dd-MM-yy');
    };

    useEffect(() => {
        setPrices(getPriceBySeatTypeId(prices, data.id));
    }, [prices, data])

    

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
            dispatch(clearText());
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
        </tr>
    )
}
export default Seat;