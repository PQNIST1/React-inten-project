import React, { useState, useEffect } from "react";
import AddSearch from "../AddFood/addSearch";
import Pagination from "../AddFood/page";
import { useDispatch, useSelector } from "react-redux";
import { getSeatType } from "../../../controller/SliceReducer/seat";
import Seat from "./seat";

const SeatList = () => {
    const dispatch = useDispatch();
    const seats = useSelector((state) => state.seat.data);
    const form = useSelector((state) => state.seat);
    const [data, setData] = useState([]);
    const status = useSelector((state) => state.seat.status);
    const { success } = form;
    const [itemsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentItems, setCurrentItems] = useState([]);

    useEffect(() => {
        dispatch(getSeatType());
    }, [dispatch]);
    useEffect(() => {
        if (success) {
            dispatch(getSeatType());
        }
    }, [success, dispatch]);
    useEffect(() => {
        if (status === 'succeeded') {
            setData(seats);
        }
    }, [status, seats]);
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    useEffect(() => {
        if (data.data) {
            setCurrentItems(data.data.slice(indexOfFirstItem, indexOfLastItem));
        }
    }, [data.data, indexOfFirstItem, indexOfLastItem, status]);
    return (
        <div className=" flex flex-col">
            <div className="flex mb-5">
                <p className="font-bold text-lg my-auto">Ghế</p>
                <AddSearch />
            </div>
            {data.data && (
                <>
                    <div className="overflow-hidden w-full pr-28 h-448">
                        <table className=" min-w-full ">
                            <thead>
                                <tr className=" text-gray-400 bg-gray-50 bg-opacity-10">
                                    <th scope="col" className=" w-1/4 p-5 text-left text-sm leading-6 font-semibold capitalize"> Loại ghế </th>
                                    <th scope="col" className="  w-1/4 p-5 text-left text-sm leading-6 font-semibold capitalize"> Mã ghế </th>
                                    <th scope="col" className="   w-1/4 p-5 text-left text-sm leading-6 font-semibold capitalize"> Giá tiền </th>
                                    <th scope="col" className="  w-1/4 p-5 text-left text-sm leading-6 font-semibold  capitalize"> Actions </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-300 capitalize">
                                {currentItems.map((item) => (
                                    <Seat key={item.object.id} data={item.object} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={Math.ceil(data.data.length / itemsPerPage)}
                        onPageChange={handlePageChange}
                    />
                </>

            )}
        </div>
    )
}
export default SeatList;