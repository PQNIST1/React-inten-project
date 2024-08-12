import React, { useState, useEffect } from "react";
import AddSearch from "../AddFood/addSearch";
import Pagination from "../AddFood/page";
import { useDispatch, useSelector } from "react-redux";
import { getSeatType, getSeatTypePrice } from "../../../controller/SliceReducer/seat";
import Seat from "./seat";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { setPage } from "../../../controller/SliceReducer/tab";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";

const SeatList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const seats = useSelector((state) => state.seat.data);
    const page = useSelector((state) => state.tab.page);
    const prices = useSelector((state) => state.seat.seat_price);
    const form = useSelector((state) => state.seat);
    const [data, setData] = useState([]);
    const [filter, setFilterData] = useState([]);
    const [price, setPrice] = useState([]);
    const status = useSelector((state) => state.seat.status);
    const { success } = form;
    const [itemsPerPage] = useState(3);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentItems, setCurrentItems] = useState([]);
    const { searchQuery } = useSelector((state) => state.seacrh);
    const [isFirstLoad, setIsFirstLoad] = useState(true);

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
        if (!searchQuery) {
            dispatch(setPage(page));
        }
    };
    useEffect(() => {
        if (data.data) {
            const filteredData = data.data.content.filter((item) =>
                item.object.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilterData(filteredData);
            if (searchQuery) {
                const newUrl = `#seat-type?page=1`;
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
            const newUrl = `#seat-type?page=${page}`;
            navigate(newUrl, { replace: true });
        }
    }, [searchQuery, navigate, page]);
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
                                    <th scope="col" className="  p-5 text-left text-sm leading-6 font-semibold capitalize"> Loại </th>
                                    <th scope="col" className="   p-5 text-left text-sm leading-6 font-semibold capitalize"> Mã </th>
                                    <th scope="col" className="    text-left text-sm leading-6 font-semibold capitalize pl-7">tiền - bắt đầu - kết thúc - date - <FontAwesomeIcon icon={faSquarePlus} /></th>
                                    <th scope="col" className="  p-5 text-left text-sm leading-6 font-semibold capitalize"> Tạo </th>
                                    <th scope="col" className=" p-5 text-left text-sm leading-6 font-semibold capitalize"> Sửa </th>    
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-300 capitalize">
                                {currentItems.map((item) => (
                                    <Seat key={item.object.id} data={item.object} prices={price.data.content} pp={item} />
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