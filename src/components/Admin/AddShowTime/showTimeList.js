import React, { useEffect, useState } from "react";
import AddSearch from "../AddFood/addSearch";
import Pagination from "../AddFood/page";
import { useDispatch, useSelector } from "react-redux";
import { getShowTime } from "../../../controller/SliceReducer/addShowTime";
import ShowTime from "./showTime";


const ShowTimeList = () => {
    const dispatch = useDispatch();
    const showTimes = useSelector((state) => state.showTime.data);
    const form = useSelector((state) => state.showTime);
    const [data, setData] = useState([]);
    const [filter, setFilterData] = useState([]);
    const { success, status } = form;
    const [itemsPerPage] = useState(6);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentItems, setCurrentItems] = useState([]);
    const { searchQuery } = useSelector((state) => state.seacrh);
    useEffect(() => {
        dispatch(getShowTime());
    }, [dispatch]);
    useEffect(() => {
        if (success) {
            dispatch(getShowTime());
        }
    }, [success, dispatch]);
    useEffect(() => {
        if (status === 'succeeded') {
            setData(showTimes);
        }
    }, [status, showTimes]);
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    useEffect(() => {
        if (data.data) {
            const filteredData = data.data.content.slice().reverse().filter((item) =>
                item.object.movie.name.toLowerCase().includes(searchQuery.toLowerCase())
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
            {data.data && (
                <>
                <div className="overflow-hidden w-full h-[600px] pr-28">
                        <table className=" min-w-full ">
                            <thead>
                                <tr className=" text-gray-400 bg-gray-50 bg-opacity-10">
                                    <th scope="col" className="  p-5 text-left text-sm leading-6 font-semibold capitalize"> Phim </th>
                                    <th scope="col" className="  p-5 text-left text-sm leading-6 font-semibold capitalize"> Phòng </th>
                                    <th scope="col" className="   p-5 text-left text-sm leading-6 font-semibold capitalize"> Bắt đầu</th>
                                    <th scope="col" className="    p-5 text-left text-sm leading-6 font-semibold capitalize"> Kết thúc </th>
                                    <th scope="col" className="   p-5 text-left text-sm leading-6 font-semibold capitalize"> Tạo </th>
                                    <th scope="col" className="    p-5 text-left text-sm leading-6 font-semibold capitalize"> Sửa </th>
                                    <th scope="col" className="   p-5 text-left text-sm leading-6 font-semibold  capitalize"> Actions </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-300 capitalize">
                            {currentItems.map((item) => (
                                    <ShowTime key={item.object.id} data={item.object} pp={item} />
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
export default ShowTimeList;