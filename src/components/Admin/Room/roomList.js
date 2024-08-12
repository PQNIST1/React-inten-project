import React, { useState, useEffect } from "react";
import AddSearch from "../AddFood/addSearch";
import Pagination from "../AddFood/page";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRoom } from "../../../controller/SliceReducer/addRoom";
import Room from "./room";
import { setPage } from "../../../controller/SliceReducer/tab";


const RoomList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const rooms = useSelector((state) => state.room.data);
    const page = useSelector((state) => state.tab.page);
    const form = useSelector((state) => state.room);
    const [data, setData] = useState([]);
    const [filter, setFilterData] = useState([]);
    const { success, status } = form;
    const [itemsPerPage] = useState(4);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentItems, setCurrentItems] = useState([]);
    const { searchQuery } = useSelector((state) => state.seacrh);
    const [isFirstLoad, setIsFirstLoad] = useState(true);

    useEffect(() => {
        dispatch(getRoom());
    }, [dispatch]);
    useEffect(() => {
        if (success) {
            dispatch(getRoom());
        }
    }, [success, dispatch]);
    useEffect(() => {
        if (status === 'succeeded') {
            setData(rooms);
        }
    }, [status, rooms]);
    const handlePageChange = (page) => {
        setCurrentPage(page);
        if (!searchQuery) {
            dispatch(setPage(page));
        }
    };
    useEffect(() => {
        if (data.data) {
            const filteredData = data.data.content.slice().filter((item) =>
                item.object.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilterData(filteredData);
            if (searchQuery) {
                const newUrl = `#room?page=1`;
                navigate(newUrl, { replace: true });
            }
        }
    }, [data.data, searchQuery, navigate]);

    useEffect(() => {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentFilteredItems = filter.slice(indexOfFirstItem, indexOfLastItem);
        setCurrentItems(currentFilteredItems);
    }, [filter, currentPage, itemsPerPage]);

    useEffect(() => {
        if (data && currentItems.length > 0 && isFirstLoad) {
            setIsFirstLoad(false);
        } else if (data && !isFirstLoad && currentItems.length === 0) {
            const prePage = Math.max(page - 1, 1); // Đảm bảo prePage không dưới 1
            const newUrl = `#?page=${prePage}`;
            navigate(newUrl, { replace: true });
            setIsFirstLoad(true);
        }
    }, [currentItems, data, navigate, page, isFirstLoad, dispatch]);

    useEffect(() => {
        if (!searchQuery) {
            const newUrl = `#room?page=${page}`;
            navigate(newUrl, { replace: true });
        }
    }, [searchQuery, navigate, page]);

    return (
        <div className=" flex flex-col">
            <div className="flex mb-5">
                <p className="font-bold text-lg my-auto">Phòng</p>
                <AddSearch />
            </div>
            {data.data && (
                <>
                    <div className="overflow-hidden w-full pr-36 h-448">
                        <table className=" min-w-full">
                            <thead>
                                <tr className=" text-gray-400 bg-gray-50 bg-opacity-10">
                                    <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold capitalize"> Tên </th>
                                    <th scope="col" className="  p-5 text-left text-sm leading-6 font-semibold  capitalize"> Mã </th>
                                    <th scope="col" className="  p-5 text-left text-sm leading-6 font-semibold capitalize"> Tạo </th>
                                    <th scope="col" className=" p-5 text-left text-sm leading-6 font-semibold capitalize"> Sửa </th>
                                    <th scope="col" className="  p-5 text-left text-sm leading-6 font-semibold  capitalize"> Actions </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-300 capitalize">
                                {currentItems.map((item) => (
                                    <Room key={item.object.id} data={item.object} pp={item} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex">
                        <div className="w-1/2">
                            <Link to={'/create/seat'}>
                                <button className="h-10 border rounded px-5 bg-orange-400 text-white">Tạo ghế cho phòng</button>

                            </Link>
                        </div>
                        <div className="w-1/2"> <Pagination
                            currentPage={currentPage}
                            totalPages={Math.ceil(filter.length / itemsPerPage)}
                            onPageChange={handlePageChange}
                        /></div>

                    </div>

                </>

            )}
        </div>
    )
}
export default RoomList;