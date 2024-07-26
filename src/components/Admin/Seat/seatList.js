import React, { useState, useEffect } from "react";
import AddSearch from "../AddFood/addSearch";
import Pagination from "../AddFood/page";
import { useDispatch, useSelector } from "react-redux";
import { getSeatType, getSeatTypePrice } from "../../../controller/SliceReducer/seat";
import Seat from "./seat";

const SeatList = () => {
    const dispatch = useDispatch();
    const seats = useSelector((state) => state.seat.data);
    const prices = useSelector((state) => state.seat.seat_price);
    const form = useSelector((state) => state.seat);
    const [data, setData] = useState([]);
    const [filter, setFilterData] = useState([]);
    const [price, setPrice] = useState([]);
    const status = useSelector((state) => state.seat.status);
    const { success } = form;
    const [itemsPerPage] = useState(4);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentItems, setCurrentItems] = useState([]);
    const { searchQuery } = useSelector((state) => state.seacrh);
    useEffect(() => {
        dispatch(getSeatType());
        dispatch(getSeatTypePrice());
    }, [dispatch]);
    useEffect(() => {
        if (success) {
            dispatch(getSeatType());
            dispatch(getSeatTypePrice());
        }
    }, [success, dispatch]);
    useEffect(() => {
        if (status === 'succeeded') {
            setData(seats);
            setPrice(prices);
        }
    }, [status, seats, prices]);
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    useEffect(() => {
        if (data.data) {
            const filteredData = data.data.content.filter((item) =>
                item.object.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilterData(filteredData);
        }
    }, [data.data, searchQuery]);

    useEffect(() => {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentFilteredItems = filter.slice(indexOfFirstItem, indexOfLastItem);
        setCurrentItems(currentFilteredItems);
    }, [filter, currentPage, itemsPerPage]);
    return (
        <div className=" flex flex-col">
            <div className="flex mb-5">
                <p className="font-bold text-lg my-auto">Ghế</p>
                <AddSearch />
            </div>
            {data.data && price.data && (
                <>
                    <div className="overflow-hidden w-full pr-28 h-448">
                        <table className=" min-w-full ">
                            <thead>
                                <tr className=" text-gray-400 bg-gray-50 bg-opacity-10">
                                    <th scope="col" className="  p-5 text-left text-sm leading-6 font-semibold capitalize"> Loại ghế </th>
                                    <th scope="col" className="   p-5 text-left text-sm leading-6 font-semibold capitalize"> Mã ghế </th>
                                    <th scope="col" className="   p-5 text-left text-sm leading-6 font-semibold capitalize"> Giá tiền </th>
                                    <th scope="col" className="  p-5 text-left text-sm leading-6 font-semibold capitalize"> Tạo </th>
                                    <th scope="col" className=" p-5 text-left text-sm leading-6 font-semibold capitalize"> Sửa </th>
                                    <th scope="col" className="   p-5 text-left text-sm leading-6 font-semibold  capitalize"> Actions </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-300 capitalize">
                                {currentItems.map((item) => (
                                    <Seat key={item.object.id} data={item.object} prices={price.data.content} pp={item}/>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={Math.ceil(filter.length / itemsPerPage)}
                        onPageChange={handlePageChange}
                    />
                </>

            )}
        </div>
    )
}
export default SeatList;